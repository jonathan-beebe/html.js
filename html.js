define(['jquery', 'underscore'], function($, _) {

  // Setup our base object
  // =====================
  // The root object
  var dom = {};

  // Current version
  dom.VERSION = '0.1';

  // Helper Functions
  // ================
  // The main function for rendering an element
  var renderElement = function(data) {

    // Assemble the attributes
    var attrs = _.reduce(data.attr, function(attrs, value, key) {
      return attrs += ' ' + key + '="' + _.escape(value) + '"';
    },
    '');

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

    // Determine the closing tag we should use for this element
    var cbracket = '>';
    // closing tag for normal elements
    var closetag = '</' + data.nodeName + '>';

    // Adjust the close tag for self-closing elements
    if (_.contains(['input', 'br', 'hr', 'img'], data.nodeName.toLowerCase())) {
      cbracket = '/>';
      closetag = '';
    }

    return '<' + data.nodeName + attrs + cbracket + text + closetag;
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

    return renderElement({
      nodeName: nodeName,
      attr: attr || {},
      children: children || undefined
    });
  };

  // Dom Node Methods
  // ================
  // Create all the text-node elements
  _.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'p', 'pre', 'code',
    'label', 'legend', 'button', 'a'
  ], function(nodeName) {
    dom[nodeName] = function(text, attr) {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(nodeName);
      return renderNode.apply(dom, args);
    };
  });

  // Some elements should never have text content, only attributes if defined
  _.each(['hr', 'br', 'img', 'input'], function(nodeName) {
    dom[nodeName] = function(attr) {
      if (!_.isObject(attr)) {
        attr = {};
      }
      return renderNode.apply(dom, [nodeName, attr]);
    };
  });

  // Create all the content elements
  _.each(['div', 'form', 'fieldset', 'ul', 'li', 'table', 'tbody', 'tr', 'td',
    'th', 'thead', 'colgroup', 'col',
    'section','article','aside', 'hgroup',
    'header','footer','nav','figure','figcaption','time', 'meter','progress',
    'mark','data','canvas','details','dl','dd','dt','summary','datalist'
  ], function(nodeName) {
    dom[nodeName] = function(attr) {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(nodeName);
      return renderNode.apply(dom, args);
    };
  });

  dom.option = function() {
    var args = Array.prototype.slice.call(arguments);
    if (args.length == 1 && _.isString(args[0])) {
      var text = args[0];
      args[0] = {
        value: text
      };
      args.push(text);
    }
    args.unshift('option');
    return renderNode.apply(dom, args);
  };

  dom.select = function(attr) {
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

    return renderNode.apply(dom, newArgs);

  };

  return dom;

});

