require.config({
  paths: {
    // Major libraries
    jquery: 'jquery',
    underscore: 'underscore',
    dom: 'dom'
  },

  shim: {
    underscore: {
      exports: '_'
    },
  }
});

// Let's kick off the application

require([
  'jquery',
  'underscore',
  'dom'
], function ($, _, dom) {

  console.log(dom);

  var rendered = '';

  rendered += dom.div({
      'class': 'row'
    }
    , dom.div({'class':'span12'}
      , dom.div({'class':'page-header'}
        , dom.h1('dom.js Test'))
      , dom.ul({'class':'breadcrumb'}
        , dom.li(
            dom.a('Home', {href:'#'})
          , dom.span('/', {'class':'divider'})
        )
        , dom.li(
            dom.a('2nd', {href:'#'})
          , dom.span('/', {'class':'divider'})
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
        , dom.colgroup({}
          , dom.col({'class':'span1'})
          , dom.col({'class':'span7'})
        )
        , dom.thead({}
          , dom.tr({}
            , dom.th({}
              , 'Table Header'
            )
            , dom.th({}
              , 'Table Header'
            )
          )
        )
        , dom.tbody({}
          , dom.tr({}
            , dom.td({}
              , 'td content'
            )
            , dom.td({}
              , 'more and more'
            )
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
    , dom.p(dom.button('Submit', {
      'class': 'btn btn-primary'
    }))
  ));

  console.log('html', rendered.trim());

  $('body > div').append(rendered.trim());

});
