# sql-easy-query
A plugin to make quering more easy and comfortable.

## Installation
```bash
npm install sql-easy-query --save
```

### Usage
``` Javascript
var Query = require('sql-easy-query');
function Insert(){
  let user = {
    name:'SomeName',
    age:21,
  }
  let query = Query.Insert("Users", user).query;
}
function CreateDatase(){
  let query = Query.CreateDatabase('Name').query;
}
function CreateTable(){
  let Scheme = {
    id:'INT(32) NOT NULL PRIMARY AUTO_INCREMENT'
    name:'VARCHAR(255) NOT NULL',
    age:'INT(32)'
  }
  let query = Query.CreateTable('TableName',Scheme).query;
}

```
