define([
  'jquery',
  'underscore',
  'dom'
], function ($, _, dom) {

  return {
    run: function() {

      test('nested elements', function() {

        var div1 = function() {
          var rendered = dom.div({id:'container'}
            , dom.p('nested text')
            , dom.p('more nested text')
          );

          var result = '<div id="container"><p>nested text</p><p>more nested text</p></div>';

          equal(rendered, result);
        };

        var list1 = function() {
          var rendered = dom.ul({'class':'breadcrumb'}
            , dom.li(
                dom.a({href:'#'}, 'Home')
              , dom.span({'class':'divider'}, '/')
            )
            , dom.li(
                dom.a({href:'#'}, '2nd')
              , dom.span({'class':'divider'}, '/')
            )
            , dom.li({'class':'active'}, '3rd')
          );

          var result = '<ul class="breadcrumb">'
            + '<li><a href="#">Home</a>'
            + '<span class="divider">/</span>'
            + '</li>'
            + '<li><a href="#">2nd</a>'
            + '<span class="divider">/</span>'
            + '</li>'
            + '<li class="active">3rd</li>'
            + '</ul>';

          equal(rendered, result);
        };

        div1();
        list1();

      });

    } // end run
  };

});
