function Query() {
  this.query = "";
}
Query.prototype.toString = function(){
  return this.query;
}
Query.prototype.Select = function(Columns = '') {
  this.query += `SELECT ${Columns} `;
  return this;
};
Query.prototype.SelectDistinct = function(Columns = '') {
  this.query += `SELECT DISTINCT ${Columns} `;
  return this;
};
Query.prototype.From = function(Table = '') {
  this.query += `FROM ${Table} `;
  return this;
};
Query.prototype.Where = function(Condition) {
  this.query += `WHERE ${Condition} `;
  return this;
};
Query.prototype.Having = function(Condition) {
  this.query += `HAVING ${Condition} `;
  return this;
};
Query.prototype.Exists = function(query) {
  if (!(query instanceof Query)) {
    this.query += "EXISTS";
    return this;
  } else {
    this.query += `EXISTS (${query.query}) `;
    return this;
  }
};
Query.prototype.Any = function(query) {
  if (!(query instanceof Query)) {
    this.query += "ANY";
    return this;
  } else {
    this.query += `ANY (${query.query}) `;
    return this;
  }
};

Query.prototype.ALL = function(query) {
  if (!(query instanceof Query)) {
    this.query += "ALL";
    return this;
  } else {
    this.query += `ALL (${query.query}) `;
    return this;
  }
};
Query.prototype.Limit = function(number) {
  this.query += `LIMIT ${number} `;
  return this;
};
Query.prototype.And = function(Condition) {
  this.query += `AND ${Condition} `;
  return this;
};
Query.prototype.Or = function(Condition) {
  this.query += `OR ${Condition} `;
  return this;
};
Query.prototype.Not = function(Condition) {
  this.query += `NOT ${Condition} `;
  return this;
};
Query.prototype.OrderBy = function(Condition) {
  this.query += `ORDERBY ${Condition} `;
  return this;
};
Query.prototype.GroupBy = function(Column) {
  this.query += `GROUP BY ${Column} `;
};
Query.prototype.Delete = function(FromTable) {
  this.query += `DELETE ${FromTable} `;
  return this;
};
Query.prototype.Update = function(fromTable) {
  this.query += `UPDATE ${fromTable} `;
  return this;
};
Query.prototype.Set = function(Data){
  let properties = '';
  for(let member in Data){
    properties+= `${member} = '${Data[member]}',`;
  }
  properties = properties.substring(0,properties.length-1);
  this.query += `SET ${properties}`;
  return this;
}
Query.prototype.Like = function(Condition) {
  this.query += `Like ${Condition}`;
  return this;
};
Query.prototype.In = function(Option) {
  if (Option instanceof Array) {
    let values = "";
    Option.forEach(value => {
      values += `${value}, `;
    });
    values = values.substring(0, values.length - 1);
    this.query += `IN (${values}) `;
    return this;
  } else if (Option instanceof Query) {
    this.query += `In (${Option.query}) `;
    return this;
  }else{
    this.query += `IN ${Option} `;
    return this;
  }
};
Query.prototype.Between = function(value) {
  this.query += `BETWEEN ${value}`;
  return this;
};
Query.prototype.As = function(AliasName) {
  this.query += `AS ${AliasName} `;
  return this;
};
Query.prototype.On = function(Condition) {
  this.query += `ON ${Condition} `;
};
Query.prototype.Join = function(Table) {
  this.query += `JOIN ${Table} `;
  return this;
};
Query.prototype.InnerJoin = function(Table) {
  this.query += `INNER JOIN ${Table} `;
  return this;
};
Query.prototype.LeftJoin = function(Table) {
  this.query += `LEFT JOIN ${Table} `;
  return this;
};
Query.prototype.RightJoin = function(Table) {
  this.query += `RIGHT JOIN ${Table} `;
  return this;
};
Query.prototype.FullOuterJoin = function(Table) {
  this.query += `FULL OUTER JOIN ${Table} `;
  return this;
};
Query.prototype.Unioun = function(Query) {
  if (Query instanceof Query) {
    this.query += `UNION ${Query.query} `;
    return this;
  }else{
    this.query += `UNION ${Query} `;
    return this;
  }
};
Query.prototype.UniounAll = function(Query) {
  if (Query instanceof Query) {
    this.query += `UNION ALL ${Query.query} `;
    return this;
  }else{
    this.query += `UNION ALL ${Query} `;
    return this;
  }
};
Query.prototype.CreateDatabase = function(Name) {
  this.query = `CREATE DATABASE ${Name} `;
  return this;
};
Query.prototype.CreateTable = function(name, Scheme) {
  let properties = "";
  if (Scheme instanceof Object) {
    for (let sche in Scheme) {
      properties += `${sche} ${Scheme[sche]}, `;
    }
  }
  let q = `CREATE TABLE ${name} (${properties})`;
  this.query = q.replace(", )", " )");
  return this;
};
Query.prototype.Insert = function(table, Data) {
  let selector = "";
  let values = "";
  for (let member in Data) {
    selector += `${member},`;
    values += `'${Data[member]}',`;
  }
  selector = selector.substring(0, selector.length - 1);
  values = values.substring(0, values.length - 1);
  this.query = `INSERT INTO ${table} (${selector}) VALUES (${values}) `;
  return this;
};
Query.prototype.DropTable = function(Table) {
  this.query = `DROP TABLE ${Table} `;
  return this;
};
module.exports = Query;