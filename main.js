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

  //$('body > div').append(html().div('test div').toString());

  var h = new html();

  console.log(h);

  h.div({
    'class': 'row'
  }).children()
    .div({'class':'span12'}).children()
      .div({'class':'page-header'})
        .children()
        .h1('html.js Test')
        .end()
      .ul({'class':'breadcrumb'})
        .children()
        .li()
          .children()
          .a({href:'#'}, 'Home')
          .span({'class':'divider'}, '/')
          .end()
        .li()
          .children()
          .a({href:'#'}, '2nd')
          .span({'class':'divider'}, '/')
          .end()
        .li({'class':'active'}, '3rd')
      .end()
    .end()
  .end();


  h.div({
    'class': 'row'
  })
  .children()
    .div({'class':'span12'})
    .children()
      .div({
        'class': 'page-header'
      })
        .children()
        .h1('Monkeys')
        .end()
      .h3('More about that later')
      .p('Eat this monkey face!!!')
      .hr()
      .pre('testing pre')
      .hr()
      .ul()
        .children()
        .li('list content')
        .li('list content')
        .li('list content')
        .end()
      .div('inline text inside div')
      .hr()
      .img({
          src: 'http://placehold.it/220x180&text=First+thumbnail',
          'class': 'img-polaroid'
        })
    .end()
  .end();

  /*
  rendered += html.div({'class':'row'}
    div({'class':'span12'}
      div({
          'class': 'page-header'
        }
        h1('Table'))
      table({
          'class': 'table table-bordered table-striped'
        }
        thead({}
          tr({}
            th({}
              , 'Tag'
            )
            th({}
              , 'Description'
            )
          )
        )
        tbody({}
          tr({}
            td(html.code(_.escape('<table>')))
            td('Wrapping element for displaying data in a tabular format')
          )
          tr({}
            td(html.code(_.escape('<thead>')))
            td('Container element for table header rows (' + html.code(_.escape('<tr>')) + ') to label table columns')
          )
          tr({}
            td(html.code(_.escape('<tbody>')))
            td('Container element for table rows (' + html.code(_.escape('<tr>')) + ') in the body of the table')
          )
        )
      )
    )
  );
  */

  /*
  rendered += html.form({},
    html.fieldset({}
    legend('Fieldset')
    label('Form Elem Label')
    input({
        type: 'text',
        value: 'oh mama',
        name: 'text'
    })
    label('Country')
    select({
        name: 'country'
      }
      , 'Canada'
      , 'Mexico'
      , 'USA')
    p(html.button({
      'class': 'btn btn-primary'
    }, 'Submit'))
  ));
  */

  var s = h.toString();
  console.log('html', s);

  $('body > div').append(s);
  // $('body > div').append('' + h);

});
