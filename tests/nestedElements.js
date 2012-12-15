define([
  'jquery',
  'underscore',
  'html'
], function ($, _, html) {

  return {
    run: function() {

      test('nested elements', function() {

        var div1 = function() {
          var rendered = html.div({id:'container'}
            , html.p('nested text')
            , html.p('more nested text')
          );

          var result = '<div id="container"><p>nested text</p><p>more nested text</p></div>';

          equal(rendered, result);
        };

        var list1 = function() {
          var rendered = html.ul({'class':'breadcrumb'}
            , html.li(
                html.a({href:'#'}, 'Home')
              , html.span({'class':'divider'}, '/')
            )
            , html.li(
                html.a({href:'#'}, '2nd')
              , html.span({'class':'divider'}, '/')
            )
            , html.li({'class':'active'}, '3rd')
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
