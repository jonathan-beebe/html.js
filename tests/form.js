define([
  'jquery',
  'underscore',
  'dom'
], function ($, _, dom) {

  return {
    run: function() {

      test('form elements', function() {

        // option elements as a simple list of text arguments
        equal(dom.select({
            name: 'goober',
            id:'mySelect'
          }, 'Item1', 'Item2')
        , '<select name="goober" id="mySelect">'
        + '<option value="Item1">Item1</option>'
        + '<option value="Item2">Item2</option>'
        + '</select>');

        // option elements as calls to dom.option(...)
        equal(dom.select({
            name: 'goober',
            id:'mySelect'
          }, 'Item1', dom.option('Item2'))
        , '<select name="goober" id="mySelect">'
        + '<option value="Item1">Item1</option>'
        + '<option value="Item2">Item2</option>'
        + '</select>');

        // option elements as dictionary definitions
        equal(dom.select({
              name: 'goober',
              id:'mySelect'
            }
          , 'Item1'
          , {
              nodeName:'option',
              text: 'Underscore.js',
              attr:{
                value: '_'
              }
            }
          )
        , '<select name="goober" id="mySelect">'
        + '<option value="Item1">Item1</option>'
        + '<option value="_">Underscore.js</option>'
        + '</select>');

      });

    } // end run
  };

});
