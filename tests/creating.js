define([
  'jquery',
  'underscore',
  'dom'
], function ($, _, dom) {

  return {
    run: function() {

      test('creating elements', function() {
        equal(dom.div({
          'class':'row'
        }), '<div class="row"></div>');

        equal(dom.p('text'), '<p>text</p>');
        equal(dom.span('text'), '<span>text</span>');
        equal(dom.pre('text'), '<pre>text</pre>');
        equal(dom.code('text'), '<code>text</code>');
        equal(dom.label('text'), '<label>text</label>');
        equal(dom.legend('text'), '<legend>text</legend>');
        equal(dom.button('text'), '<button>text</button>');
        equal(dom.option('text'), '<option value="text">text</option>');

        // some elements should never have text content, only attributes if set
        equal(dom.hr(), '<hr/>');
        equal(dom.hr('something'), '<hr/>');
        equal(dom.hr({id:'id'}), '<hr id="id"/>');

        equal(dom.br(), '<br/>');
        equal(dom.br('something'), '<br/>');
        equal(dom.br({id:'id'}), '<br id="id"/>');

        equal(dom.img(), '<img/>');
        equal(dom.img('text'), '<img/>');
        equal(dom.img({src:'img.jpg'}), '<img src="img.jpg"/>');

        equal(dom.a({href:'#'}, 'text'), '<a href="#">text</a>');

        equal(dom.h1('text'), '<h1>text</h1>');
        equal(dom.h2('text'), '<h2>text</h2>');
        equal(dom.h3('text'), '<h3>text</h3>');
        equal(dom.h4('text'), '<h4>text</h4>');
        equal(dom.h5('text'), '<h5>text</h5>');
        equal(dom.h6('text'), '<h6>text</h6>');

        equal(dom.div('text'), '<div>text</div>');
        equal(dom.form('text'), '<form>text</form>');
        equal(dom.fieldset('text'), '<fieldset>text</fieldset>');
        equal(dom.ul('text'), '<ul>text</ul>');
        equal(dom.li('text'), '<li>text</li>');
        equal(dom.table('text'), '<table>text</table>');
        equal(dom.tr('text'), '<tr>text</tr>');
        equal(dom.td('text'), '<td>text</td>');
        equal(dom.th('text'), '<th>text</th>');
        equal(dom.thead('text'), '<thead>text</thead>');
        equal(dom.colgroup('text'), '<colgroup>text</colgroup>');
        equal(dom.col('text'), '<col>text</col>');

        equal(dom.input(), '<input/>');
        equal(dom.input('text'), '<input/>');
        equal(dom.input({name:'monkey'}), '<input name="monkey"/>');

        equal(dom.select(), '<select></select>');

      });

    } // end run
  };

});
