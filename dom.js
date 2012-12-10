define([
  'jquery',
  'underscore'
], function($, _) {

  var dom = {};

  dom.tmpl = {};
  dom.tmpl.html = {};

  // Create some helper functions

  dom.renderElement = function(data) {

    // Determine the closing type of this element.

    // open-tag closing mark for non-auto-closing elements
    var otc = '>';
    // closing tag for normal elements
    var ctc = '</' + data.nodeName + '>';
    if(_.contains(['input', 'br', 'hr', 'img'], data.nodeName.toLowerCase())) {
      otc = '/>';
      ctc = '';
    }

    // -----

    // Build the attribute string
    // var attrs = '';
    // _.each(data.attr, function(value, key, obj) {
    //   attrs += ' ' + key + '="' + _.escape(value) + '"';
    // });

    var attrs = _.reduce(data.attr, function(attrs, value, key) {
      return attrs += ' ' + key + '="' + _.escape(value) + '"';
    }, '');

    // -----

    // Build the text for the element. This can be text, html, or
    // more template data to be compiled into html
    var text = '';
    if(!_.isUndefined(data.text)) {
      text = data.text;
    }
    else if(!_.isUndefined(data.html)) {
      text = data.html;
    }
    else if(!_.isUndefined(data.children)) {
      _.each(data.children, function(definition, key, obj) {
        if(_.isString(definition)) {
          text += definition;
        }
        else {
          text += dom.renderElement(definition, {
            variable: 'data'
          }).trim();
        }
      });
    }

    return '<' + data.nodeName + attrs + otc + text + ctc;
  };

  dom.renderTextNode = function(nodeName, text, attr) {
    return dom.renderElement({
      nodeName: nodeName,
      text: text,
      attr: attr || {}
    });
  };

  // this method can be called in 2 ways
  // ...('div', {attr:value}, 'child node', ...)
  // ...('div', 'child node', ...) where attr is ignored
  dom.renderBlockNode = function(nodeName, attr) {
    var args = Array.prototype.slice.call(arguments);
    var children;

    if(_.isString(attr)) {
      children = args.slice(1);
      attr = {};
    }
    else {
      children = args.slice(2);
    }

    return dom.renderElement({
      nodeName: nodeName,
      attr: attr || {},
      children: children || undefined
    });
  };

  // create all the text-node elements
  _.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'span', 'p', 'pre', 'label', 'legend',
      'button', 'a', 'option', 'hr', 'br'], function(nodeName) {
        console.log('each', nodeName);
    dom[nodeName] = function(text, attr) {
      return dom.renderTextNode(nodeName, text, attr);
    };
  });

  // create all the content elements
  _.each(['div', 'form', 'fieldset', 'img','ul','li',
      'table', 'tbody','tr','td', 'th', 'thead', 'colgroup','col'], function(nodeName) {
    dom[nodeName] = function(attr) {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(nodeName);
      return dom.renderBlockNode.apply(dom, args);
    };
  });

  dom.input = function(attr) {
    return dom.renderElement({
      nodeName: 'input',
      attr: attr
    });
  };

  dom.select = function(attr) {
    var args = Array.prototype.slice.call(arguments);
    var children = args.slice(1);

    // If we were given simple strings, treat them as values
    // for the option elements. Turn them into element definitions.
    _.each(children, function(item, index, array) {
      if(_.isString(item)) {
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

    return dom.renderBlockNode.apply(dom, newArgs);

  };

  return dom;

});
