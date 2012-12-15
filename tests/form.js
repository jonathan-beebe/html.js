define([
  'jquery',
  'underscore',
  'html'
], function ($, _, html) {

  return {
    run: function() {

      test('form elements', function() {

        // option elements as a simple list of text arguments
        equal(html.select({
            name: 'goober',
            id:'mySelect'
          }, 'Item1', 'Item2')
        , '<select name="goober" id="mySelect">'
        + '<option value="Item1">Item1</option>'
        + '<option value="Item2">Item2</option>'
        + '</select>');

        // option elements as calls to html.option(...)
        equal(html.select({
            name: 'goober',
            id:'mySelect'
          }, 'Item1', html.option('Item2'))
        , '<select name="goober" id="mySelect">'
        + '<option value="Item1">Item1</option>'
        + '<option value="Item2">Item2</option>'
        + '</select>');

        // option elements as dictionary definitions
        equal(html.select({
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
