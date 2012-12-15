require.config({
  paths: {
    // Major libraries
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    dom: 'dom',

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
  'dom'
], function ($, _, dom) {

  console.log(dom);
  window.dom = dom;

  var rendered = '';

  rendered += dom.div({
      'class': 'row'
    }
    , dom.div({'class':'span12'}
      , dom.div({'class':'page-header'}
        , dom.h1('dom.js Test'))
      , dom.ul({'class':'breadcrumb'}
        , dom.li(
            dom.a({href:'#'}, 'Home')
          , dom.span({'class':'divider'}, '/')
        )
        , dom.li(
            dom.a({href:'#'}, '2nd')
          , dom.span({'class':'divider'}, '/')
        )
        , dom.li({'class':'active'}, '3rd')
      )
    )
  );

  rendered += dom.div({
    'class': 'row'
  }
    , dom.div({'class':'span12'}
      , dom.div({
          'class': 'page-header'
        }
        , dom.h1('Monkeys')) /* </ div.page-header > */
      , dom.h3('More about that later')
      , dom.p('Eat this monkey face!!!')
      , dom.hr()
      , dom.pre('testing pre')
      , dom.hr()
      , dom.ul(
          dom.li('list content')
        , dom.li('list content')
        , dom.li('list content')
      )
      , dom.div('inline text inside div')
      , dom.hr()
      , dom.img({
          src: 'http://placehold.it/220x180&text=First+thumbnail',
          'class': 'img-polaroid'
        })
    )
  );

  rendered += dom.div({'class':'row'}
    , dom.div({'class':'span12'}
      , dom.div({
          'class': 'page-header'
        }
        , dom.h1('Table')) /* </ div.page-header > */
      , dom.table({
          'class': 'table table-bordered table-striped'
        }
        , dom.thead({}
          , dom.tr({}
            , dom.th({}
              , 'Tag'
            )
            , dom.th({}
              , 'Description'
            )
          )
        )
        , dom.tbody({}
          , dom.tr({}
            , dom.td(dom.code(_.escape('<table>')))
            , dom.td('Wrapping element for displaying data in a tabular format')
          )
          , dom.tr({}
            , dom.td(dom.code(_.escape('<thead>')))
            , dom.td('Container element for table header rows (' + dom.code(_.escape('<tr>')) + ') to label table columns')
          )
          , dom.tr({}
            , dom.td(dom.code(_.escape('<tbody>')))
            , dom.td('Container element for table rows (' + dom.code(_.escape('<tr>')) + ') in the body of the table')
          )
        )
      )
    )
  );

  rendered += dom.form({},
    dom.fieldset({}
    , dom.legend('Fieldset')
    , dom.label('Form Elem Label')
    , dom.input({
        type: 'text',
        value: 'oh mama',
        name: 'text'
    })
    , dom.label('Country')
    , dom.select({
        name: 'country'
      }
      , 'Canada'
      , 'Mexico'
      , 'USA')
    , dom.p(dom.button({
      'class': 'btn btn-primary'
    }, 'Submit'))
  ));

  console.log('html', rendered.trim());

  $('body > div').append(rendered.trim());

});
