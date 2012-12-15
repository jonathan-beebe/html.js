
dom.tmpl.html['#element'] = $('#element').html();

var e = dom.tmpl.html['#element'];

var rendered = '';

rendered += dom.div({
  'class': 'row'
}
, dom.div({
    'class': 'page-header'
  }
  , dom.h1('Monkeys')) /* </ div.page-header > */
, dom.h3('More about that later')
, dom.p('Eat this monkey face!!!')
);

rendered += dom.form({},
  dom.fieldset({}
  , dom.legend('Fieldset')
  , dom.label('Form Elem Label')
  , dom.input({
    type: 'text',
    value: 'oh mama'
  })
  , dom.p(dom.button('Submit', {
    'class': 'btn btn-primary'
  }))
));

console.log('html', rendered.trim());

$('body > div').append(rendered.trim());
