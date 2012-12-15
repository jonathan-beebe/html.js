define([
  'jquery',
  'underscore',
  'html'
], function ($, _, html) {

  return {
    run: function() {

      test('method calling patterns', function() {

        // basic text content
        equal(html.div('text'), '<div>text</div>');
        equal(html.div({id:'id'}, 'text'), '<div id="id">text</div>');
        equal(html.div({id:'id'}, 'a', 'b', 'c', 'd', 'e'), '<div id="id">abcde</div>');

        // nested content as object definitions
        equal(html.div(
            {id:'id'}
          , {nodeName:'span', text:'span content'}
        ), '<div id="id"><span>span content</span></div>');

        // nested content as plain text & objects
        equal(html.div(
            {id:'id'}
          , '<span>some text</span>'
          , {nodeName:'span', text:'span content'}
        ), '<div id="id"><span>some text</span><span>span content</span></div>');

        // nested content as html.* calls
        equal(html.div(
            {id:'id'}
          , html.span('span content')
        ), '<div id="id"><span>span content</span></div>');

      });

    } // end run
  };

});
