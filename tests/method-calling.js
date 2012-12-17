define([
  'jquery',
  'underscore',
  'html'
], function ($, _, html) {

  return {
    run: function() {

      test('method calling patterns', function() {

        // basic text content
        var basic = function() {
          equal(html().div('text').toString(), '<div>text</div>');
          equal(html().div({id:'id'}, 'text').toString(), '<div id="id">text</div>');
          equal(html().div({id:'id'}, 'a', 'b', 'c', 'd', 'e').toString(), '<div id="id">abcde</div>');
        };

        // nested content as object definitions
        var nested = function() {
          equal(html().div(
              {id:'id'}
            , {nodeName:'span', text:'span content'}
          ).toString(), '<div id="id"><span>span content</span></div>');

          // nested content as plain text & objects
          equal(html().div(
              {id:'id'}
            , '<span>some text</span>'
            , {nodeName:'span', text:'span content'}
          ).toString(), '<div id="id"><span>some text</span><span>span content</span></div>');

          // nested content via chained method calls
          equal(
            html().div({id:'id'})
              .children()
              .span('span content')
              .toString()
            , '<div id="id"><span>span content</span></div>'
          );
        };

        var stringification = function() {
          // we can forcefully call toString.
          equal(html().p('test').toString(), '<p>test</p>');
          // or toString will get called for us when a string is expected
          equal(html().p('test'), '<p>test</p>');
        };

        basic();
        nested();
        stringification();

      });

      test('children', function() {

        var endTest = function() {

          // call end like normal
          equal(html()
            .div()
              .children()
              .p('test')
              .end().toString()
          , '<div><p>test</p></div>');

          // we forgot to end it, but no worries.
          equal(html()
            .div()
              .children()
              .p('test')
              .toString()
          , '<div><p>test</p></div>');

          // and extra end, still works
          equal(html()
            .div()
              .children()
              .p('test')
              .end().end()
              .toString()
          , '<div><p>test</p></div>');
        };

        var childrenTest = function() {

          // adding an extra call to child has no effect
          equal(html()
            .div()
              .children().children()
              .p('test')
              .end().toString()
          , '<div><p>test</p></div>');

        };

        childrenTest();
        endTest();

      });

    } // end run
  };

});
