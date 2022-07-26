<p align="center">

## Atpro-ORM

</p>

<p align="center">
  The new orm for node js and mysql database.
</p>

<p align="center">
  <a href="https://gitpod.io/#https://github.com/babel/babel"><img alt="Gitpod ready-to-code" src="https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod"></a>
</p>


<h2 align="center">Installation</h2>
run command :

````npm
    npm i @atpro/orm

````

## Documentation

````js
const orm = require('@atpro/orm');
````

**OPTIONAL OPTIONS**:

| Options        |                       Description                       |
|:---------------|:-------------------------------------------------------:|
| `add`          |                add new rows to the table                |
| `findLastRows` |               Find last rows in the table               | 
| `deleteItem`   |              delete one rows in the table               |
| `count`        |          count the number of rows in the table          |
| `findAll`      |                get all rows in the table                |
| `findAllBy`    |     get all rows in the table by a specific column      |
| `findLimitBy`  |  find all rows in the table with limit count specified  |
| `findBy`       |           find one rows with specific column            |
| `find`         |                  find one rows with id                  |
| `search`       | search all rows in the table containing specified words |
| `update`       |               Update one row in the table               |



### Who maintains Atpro?

Mostly a handful of volunteers, funded by you! Please check out our [team page]!


## License

[ISC](LICENSE)