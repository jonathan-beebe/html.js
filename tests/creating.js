define([
  'jquery',
  'underscore',
  'html'
], function ($, _, html) {

  return {
    run: function() {

      test('creating elements', function() {

        equal(html().div({
          'class':'row'
        }), '<div class="row"></div>');

        equal(html().p('text'), '<p>text</p>');
        equal(html().span('text'), '<span>text</span>');
        equal(html().pre('text'), '<pre>text</pre>');
        equal(html().code('text'), '<code>text</code>');
        equal(html().label('text'), '<label>text</label>');
        equal(html().legend('text'), '<legend>text</legend>');
        equal(html().button('text'), '<button>text</button>');
        equal(html().option('text'), '<option value="text">text</option>');

        equal(html().section('text'), '<section>text</section>');
        equal(html().details('text'), '<details>text</details>');
        equal(html().dl('text'), '<dl>text</dl>');
        equal(html().dd('text'), '<dd>text</dd>');
        equal(html().dt('text'), '<dt>text</dt>');
        equal(html().summary('text'), '<summary>text</summary>');
        equal(html().datalist('text'), '<datalist>text</datalist>');
        equal(html().article('text'), '<article>text</article>');
        equal(html().aside('text'), '<aside>text</aside>');
        equal(html().hgroup('text'), '<hgroup>text</hgroup>');
        equal(html().header('text'), '<header>text</header>');
        equal(html().footer('text'), '<footer>text</footer>');
        equal(html().nav('text'), '<nav>text</nav>');
        equal(html().figure('text'), '<figure>text</figure>');
        equal(html().figcaption('text'), '<figcaption>text</figcaption>');
        equal(html().time('text'), '<time>text</time>');
        equal(html().meter('text'), '<meter>text</meter>');
        equal(html().progress('text'), '<progress>text</progress>');
        equal(html().mark('text'), '<mark>text</mark>');
        equal(html().data('text'), '<data>text</data>');
        equal(html().canvas(), '<canvas></canvas>');

        // some elements should never have text content, only attributes if set
        equal(html().hr(), '<hr/>');
        equal(html().hr('something'), '<hr/>');
        equal(html().hr({id:'id'}), '<hr id="id"/>');
        equal(html().hr('some text'), '<hr/>');
        equal(html().hr({id:'id'}, 'some text'), '<hr id="id"/>');

        equal(html().br(), '<br/>');
        equal(html().br('something'), '<br/>');
        equal(html().br({id:'id'}), '<br id="id"/>');
        equal(html().br('some text'), '<br/>');
        equal(html().br({id:'id'}, 'some text'), '<br id="id"/>');

        equal(html().img(), '<img/>');
        equal(html().img('text'), '<img/>');
        equal(html().img({src:'img.jpg'}), '<img src="img.jpg"/>');

        equal(html().a({href:'#'}, 'text'), '<a href="#">text</a>');

        equal(html().h1('text'), '<h1>text</h1>');
        equal(html().h2('text'), '<h2>text</h2>');
        equal(html().h3('text'), '<h3>text</h3>');
        equal(html().h4('text'), '<h4>text</h4>');
        equal(html().h5('text'), '<h5>text</h5>');
        equal(html().h6('text'), '<h6>text</h6>');

        equal(html().div('text'), '<div>text</div>');
        equal(html().form('text'), '<form>text</form>');
        equal(html().fieldset('text'), '<fieldset>text</fieldset>');
        equal(html().ul('text'), '<ul>text</ul>');
        equal(html().li('text'), '<li>text</li>');
        equal(html().table('text'), '<table>text</table>');
        equal(html().tr('text'), '<tr>text</tr>');
        equal(html().td('text'), '<td>text</td>');
        equal(html().th('text'), '<th>text</th>');
        equal(html().thead('text'), '<thead>text</thead>');
        equal(html().colgroup('text'), '<colgroup>text</colgroup>');
        equal(html().col('text'), '<col>text</col>');

        equal(html().input(), '<input/>');
        equal(html().input('text'), '<input/>');
        equal(html().input({name:'monkey'}), '<input name="monkey"/>');

        equal(html().select(), '<select></select>');

      });

    } // end run
  };

});
