### Table Format

If the content being marked up is tabular data (key-value or multidimensional data), use a table. Make use of the caption, `<thead>`, `<tfoot>`, `<tbody>` and `<th>` tags when necessary. In general, all `<th>` elements should always have a scope attribute associating them with a row or column, for accessibility reasons.

```html
<table>
    <caption>Income and Taxes for 2014</caption>
    <thead>
        <tr>
            <th scope="col">Income</th>
            <th scope="col">Taxes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>$ 5.00</td>
            <td>$ 4.50</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>Table Data 1</td>
            <td>Table Data 2</td>
        </tr>
    </tfoot>
</table>
```

If data is grouped, tables may have more than one `<tbody>`. Columns may also have more than one `<th>`, representing a hierarchy of column labels, with the topmost `<th>` elements able to span several secondary headers using the `colspan` attribute. The same is true of table rows, using multiple `<th>` and the `rowspan` attribute.

```html
<table>
    <caption>Results for growth variables of mountain birches subjected to fertilization-shade (FS) treatment (two year) and previous-season manual defoliation, D (50% of leaf area).</caption>

    <thead>
        <tr>
            <th scope="col" colspan="2">Growth variables</th>
            <th scope="col">MS</th>
            <th scope="col">F</th>
            <th scope="col">df</th>
            <th scope="col">P</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row" rowspan="3">Long-shoot length</th>
            <th scope="row">FS</th>
            <td>1.242</td>
            <td>6.45</td>
            <td>3,12</td>
            <td>0.075</td>
        </tr>
        <tr>
            <th scope="row">D</th>
            <td>1.2342</td>
            <td>14.8</td>
            <td>6, 8</td>
            <td>0.005</td>
        </tr>
        <tr>
            <th scope="row">FS × D</th>
            <td>1.3445</td>
            <td>18.6</td>
            <td>2, 3</td>
            <td>0.455</td>
        </tr>
    </tbody>
    <tbody>
        <tr>
            <th scope="row" rowspan="3">Leaf Area</th>
            <th scope="row">FS</th>
            <td>0.745</td>
            <td>5.45</td>
            <td>2,12</td>
            <td>0.435</td>
        </tr>
        <tr>
            <th scope="row">D</th>
            <td>2.76</td>
            <td>12.1</td>
            <td>7,77</td>
            <td>0.234</td>
        </tr>
        <tr>
            <th scope="row">FS × D</th>
            <td>23.335</td>
            <td>13.0</td>
            <td>1,10</td>
            <td>1.865</td>
        </tr>
    </tbody>
</table>
```
