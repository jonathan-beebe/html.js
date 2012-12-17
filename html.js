define(['jquery', 'underscore'], function($, _) {

  // Helper Functions
  // ================
  //
  // The main function for rendering an element
  var renderElement = function(data) {

    // If we have an instance of the html object, simple return as a string.
    if(data instanceof html) {
      return data.toString();
    }

    // Assemble the element's attributes
    var attrs = _.reduce(data.attr, function(attrs, value, key) {
      return attrs += ' ' + key + '="' + _.escape(value) + '"';
    }, '');

    // Build the text for the element.
    // This can be a string, html, or
    // more template data to be compiled into html
    var text = '';
    if (!_.isUndefined(data.text)) {
      text = data.text;
    }
    else if (!_.isUndefined(data.html)) {
      text = data.html;
    }
    else if (!_.isUndefined(data.children)) {
      _.each(data.children, function(definition, key, obj) {
        if (_.isString(definition)) {
          text += definition;
        }
        else {
          text += renderElement(definition, {
            variable: 'data'
          }).trim();
        }
      });
    }

    // Adjust the close tag for self-closing elements
    if (_.contains(['input', 'br', 'hr', 'img'], data.nodeName.toLowerCase())) {
      return '<' + data.nodeName + attrs + '/>';
    }
    else {
      return '<' + data.nodeName + attrs + '>' + text + '</' + data.nodeName + '>';
    }
  };

  // this method can be called in 2 ways
  //
  // `('div', {attr:value}, 'child node', ...)`
  //
  // `('div', 'child node', ...)` where attr is ignored
  var renderNode = function(nodeName, attr) {
    var args = Array.prototype.slice.call(arguments);
    var children;

    if (_.isString(attr)) {
      children = args.slice(1);
      attr = {};
    }
    else {
      children = args.slice(2);
    }

    var def = {
      nodeName: nodeName,
      attr: attr || {},
      children: children || [],
      parentQueue: this.currentQueue
    };

    this.currentQueue.children.push(def);

    return this;
  };

  var html = function() {

    if (!(this instanceof html)) {
      return new html();
    }

    // This is the top-level queue
    this.queue = {
      children: []
    };

    // Track the current queue, which can be a nested element, such
    // as a div within the top queue
    this.currentQueue = this.queue;

  };

  // Current version
  html.VERSION = '0.2';

  // Render the queue to an html string.
  html.prototype.toString = function() {

    var s = '';
    var max = this.queue.children.length;

    for(var i = 0; i < max; i++) {
        var def = this.queue.children[i];
        s += renderElement(def);
    }

    return s;
  };

  // Place subsequent nodes into the last element's children
  html.prototype.children = function() {
    var len = this.currentQueue.children.length;
    var nextQueue = this.currentQueue.children[len - 1];
    if(nextQueue && nextQueue.children !== undefined) {
        this.currentQueue = nextQueue;
    }
    return this;
  };

  // If we have been working in a child queue,
  // move up to the parent queue
  html.prototype.end = function() {
    if(this.currentQueue.parentQueue !== undefined) {
        this.currentQueue = this.currentQueue.parentQueue;
    }
    return this;
  };

  // html Node Methods
  // ================
  // Create all the text-node elements
  _.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'p', 'pre', 'code',
    'label', 'legend', 'button', 'a'
  ], function(nodeName) {
    html.prototype[nodeName] = function(text, attr) {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(nodeName);
      return renderNode.apply(this, args);
    };
  });

  // Some elements should never have text content, only attributes if defined
  _.each(['hr', 'br', 'img', 'input'], function(nodeName) {
    html.prototype[nodeName] = function(attr) {
      if (!_.isObject(attr)) {
        attr = {};
      }
      return renderNode.apply(this, [nodeName, attr]);
    };
  });

  // Create all the content elements
  _.each(['div', 'form', 'fieldset', 'ul', 'li', 'table', 'tbody', 'tr', 'td',
    'th', 'thead', 'colgroup', 'col',
    'section','article','aside', 'hgroup',
    'header','footer','nav','figure','figcaption','time', 'meter','progress',
    'mark','data','canvas','details','dl','dd','dt','summary','datalist'
  ], function(nodeName) {
    html.prototype[nodeName] = function(attr) {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(nodeName);
      return renderNode.apply(this, args);
    };
  });

  html.prototype.option = function() {
    var args = Array.prototype.slice.call(arguments);
    if (args.length == 1 && _.isString(args[0])) {
      var text = args[0];
      args[0] = {
        value: text
      };
      args.push(text);
    }
    args.unshift('option');
    return renderNode.apply(this, args);
  };

  html.prototype.select = function(attr) {
    var args = Array.prototype.slice.call(arguments);
    var children = args.slice(1);

    // If we were given simple strings, treat them as values
    // for the option elements. Turn them into element definitions.
    _.each(children, function(item, index, array) {
      // ignore non-strings or pre-renderend option elements
      if (_.isString(item) && String(item).indexOf('</option>') === - 1) {
        var def = {
          nodeName: 'option',
          attr: {
            value: item
          },
          text: item,
        };
        children[index] = def;
      }
    });

    // create the new arguments array for the select element
    var newArgs = children.slice(0);
    newArgs.unshift(attr);
    newArgs.unshift('select');

    return renderNode.apply(this, newArgs);

  };

  return html;

});
