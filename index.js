const database = require('./services/atpro.database');

/**
 * create new record
 * @param {string} tableName the name of the table
 * @param {Object} data the data to insert
 * @param {function} results callable
 */
const add =  (tableName,data, results) => {
    database.query(`INSERT INTO ${tableName} SET ?`,[data ], function (err) {
        if (err) {
            results(null, err);
        } else {
            findLastRows([tableName], (err, rows) => {
                if (err) {
                    results(null, err);
                } else {
                    results(null, rows.id);
                }
            });
        }

    });
}

/**
 * @param {string[]} tableName the name of the table
 * @param {function} results callable
 */
const findLastRows = (tableName, results) => {
    let sql =`SELECT * FROM ${tableName} ORDER BY id DESC LIMIT 1`;
    database.query(sql,[id], function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows[0]);
        }

    });
}



/**
 * @param {string} tableName the name of the table
 * @param {string} column the name of the column
 * @param {number|string} value the value of the column
 * @param {function} results callable
 */
const deleteItem = (tableName,[value, column = 'id'], results) => {
    database.query(`DELETE FROM ${tableName} WHERE ${column}=?`,[value] , function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows);
        }

    });
}

/**
 * @param {string} tableName the name of the table
 * @param column
 * @param value
 * @param results
 */
const count = ([tableName, column=null, value=null], results) =>{
    let sql = (column ===null) ? `SELECT COUNT(*) as count FROM ${tableName}` : `SELECT COUNT(*) as count FROM ${tableName} WHERE ${column}=?`;
    database.query(sql,[value], function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows[0]);
        }

    });
}



/**
 * @param {string} tableName the name of the table
 * @param all
 * @param results
 */
const findAll =  ([tableName], results) => {
    let sql = `SELECT * FROM ${tableName}`;
      database.query(sql, function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows);
        }

    });
}


/**
 *
 * @param {string} tableName the name of the table
 * @param column
 * @param value
 * @param limit
 * @param results
 */
const findAllBy =  (tableName,[column, value, order=0], results) => {
    let sql =`SELECT * FROM ${tableName} WHERE ${column}=?`;
    database.query(sql,[value], function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows);
        }

});
}

/**
 *
 * @param {string} tableName the name of the table
 * @param column
 * @param value
 * @param limit
 * @param results
 */
const findLimitBy =  (tableName,[column, value], results) => {
    let sql = `SELECT * FROM ${tableName}  ORDER BY ${column} DESC LIMIT ${value}`;
    database.query(sql,[value], function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows);
        }

    });
}


/**
 *
 * @param {string} tableName the name of the table
 * @param column
 * @param value
 * @param limit
 * @param results
 */
const findBy =  (tableName,[column, value, limit=0], results) => {
    let sql = `SELECT * FROM ${tableName} WHERE ${column}=?`;
    database.query(sql,[value], function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows);
        }

    });
}


/**
 *
 * @param {string} tableName the name of the table
 * @param value []
 * @param results callable
 */
const find =  (tableName, value, results) => {
      database.query(`SELECT * FROM ${tableName} WHERE id =?`,[value], function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows[0]);
        }

    });
}


/**
 *@description: Search for a record when the column contains a word
 * @param {string} tableName the name of the table
 * @param column string
 * @param words string
 * @param results callable
 */
const search =  (tableName,[column, words] ,results) => {
    database.query(`SELECT * FROM ${tableName} WHERE ${column} LIKE '%${words}%'` , function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows);
        }
    });
}



/**
 * @description: update a record
 * @param {string} tableName the name of the table
 * @param {Object} value the value to update
 * @param {number| string} id  (id of the record)
 * @param {string} column  colum name of primary key
 * @param {function}  results
 */
const update = (tableName, [value, id, column], results) => {
    let columns = Object.keys(value);
    const columnsCount = columns.length - 1;
    let conditions ='';
    columns.forEach((column, index) => {
        if(columnsCount === index)
        {
            conditions += `${column} = ?`;
        }
        else{
            conditions += `${column} = ?,`;
        }
    })
    const values = Object.values(value);
    values.push(id);
    database.query(`UPDATE ${tableName} SET ${conditions} WHERE ${column}=?`,values, function (err) {
        if (err) {
            results(null, err);
        } else {
            findLastRows([tableName, id], (err, rows) => {
                if (err) {
                    results(null, err);
                } else {
                    results(null, rows);
                }
            });
        }

    });
};

module.exports = {findLastRows,findLimitBy, update, add, findAll, findAllBy, count, findBy, find, search, deleteItem};