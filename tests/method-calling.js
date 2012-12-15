define([
  'jquery',
  'underscore',
  'dom'
], function ($, _, dom) {

  return {
    run: function() {

      test('method calling patterns', function() {

        // basic text content
        equal(dom.div('text'), '<div>text</div>');
        equal(dom.div({id:'id'}, 'text'), '<div id="id">text</div>');
        equal(dom.div({id:'id'}, 'a', 'b', 'c', 'd', 'e'), '<div id="id">abcde</div>');

        // nested content as object definitions
        equal(dom.div(
            {id:'id'}
          , {nodeName:'span', text:'span content'}
        ), '<div id="id"><span>span content</span></div>');

        // nested content as plain text & objects
        equal(dom.div(
            {id:'id'}
          , '<span>some text</span>'
          , {nodeName:'span', text:'span content'}
        ), '<div id="id"><span>some text</span><span>span content</span></div>');

        // nested content as dom.* calls
        equal(dom.div(
            {id:'id'}
          , dom.span('span content')
        ), '<div id="id"><span>span content</span></div>');

      });

    } // end run
  };

});
