require.config({
  paths: {
    // Major libraries
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    html: 'html',

    // Require.js plugins
    text: 'lib/require/text',
    css: 'lib/require/css',
  },

  shim: {
    underscore: {
      exports: '_'
    }
  }
});

// Let's kick off the application

require([
  'jquery',
  'underscore',
  'html'
], function ($, _, html) {

  console.log(html);
  window.html = html;

  var rendered = '';

  rendered += html.div({
      'class': 'row'
    }
    , html.div({'class':'span12'}
      , html.div({'class':'page-header'}
        , html.h1('html.js Test'))
      , html.ul({'class':'breadcrumb'}
        , html.li(
            html.a({href:'#'}, 'Home')
          , html.span({'class':'divider'}, '/')
        )
        , html.li(
            html.a({href:'#'}, '2nd')
          , html.span({'class':'divider'}, '/')
        )
        , html.li({'class':'active'}, '3rd')
      )
    )
  );

  rendered += html.div({
    'class': 'row'
  }
    , html.div({'class':'span12'}
      , html.div({
          'class': 'page-header'
        }
        , html.h1('Monkeys')) /* </ div.page-header > */
      , html.h3('More about that later')
      , html.p('Eat this monkey face!!!')
      , html.hr()
      , html.pre('testing pre')
      , html.hr()
      , html.ul(
          html.li('list content')
        , html.li('list content')
        , html.li('list content')
      )
      , html.div('inline text inside div')
      , html.hr()
      , html.img({
          src: 'http://placehold.it/220x180&text=First+thumbnail',
          'class': 'img-polaroid'
        })
    )
  );

  rendered += html.div({'class':'row'}
    , html.div({'class':'span12'}
      , html.div({
          'class': 'page-header'
        }
        , html.h1('Table')) /* </ div.page-header > */
      , html.table({
          'class': 'table table-bordered table-striped'
        }
        , html.thead({}
          , html.tr({}
            , html.th({}
              , 'Tag'
            )
            , html.th({}
              , 'Description'
            )
          )
        )
        , html.tbody({}
          , html.tr({}
            , html.td(html.code(_.escape('<table>')))
            , html.td('Wrapping element for displaying data in a tabular format')
          )
          , html.tr({}
            , html.td(html.code(_.escape('<thead>')))
            , html.td('Container element for table header rows (' + html.code(_.escape('<tr>')) + ') to label table columns')
          )
          , html.tr({}
            , html.td(html.code(_.escape('<tbody>')))
            , html.td('Container element for table rows (' + html.code(_.escape('<tr>')) + ') in the body of the table')
          )
        )
      )
    )
  );

  rendered += html.form({},
    html.fieldset({}
    , html.legend('Fieldset')
    , html.label('Form Elem Label')
    , html.input({
        type: 'text',
        value: 'oh mama',
        name: 'text'
    })
    , html.label('Country')
    , html.select({
        name: 'country'
      }
      , 'Canada'
      , 'Mexico'
      , 'USA')
    , html.p(html.button({
      'class': 'btn btn-primary'
    }, 'Submit'))
  ));

  console.log('html', rendered.trim());

  $('body > div').append(rendered.trim());

});
