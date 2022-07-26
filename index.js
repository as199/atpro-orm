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
 * @param {string} tableName the name of the table
 * @param {string} column the column name default id
 * @param {function} results callable
 */
const findLastRows = (tableName, column = 'id', results) => {
    let sql =`SELECT * FROM ${tableName} ORDER BY ${column} DESC LIMIT 1`;
    database.query(sql, function (err, rows) {
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
 * @param {string} column the column name for ordering the results
 * @param {string} limit the limit of the results
 * @param {function} results callable
 */
const findLimitBy =  (tableName,[column, limit], results) => {
    let sql = `SELECT * FROM ${tableName}  ORDER BY ${column} DESC LIMIT ${limit}`;
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
 * @param {Object} column
 * @param results
 */
const findBy =  (tableName,column, results) => {
    const {conditions, values}= getConditions(column);
    let sql = `SELECT * FROM ${tableName} WHERE ${conditions}`;
    database.query(sql,values, function (err, rows) {
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
 * @param {string} column the value of the column default id
 * @param {string|number} value the value of the column
 * @param {function} results callable
 */
const find =  (tableName, value,column='id', results) => {
    database.query(`SELECT * FROM ${tableName} WHERE ${column} =?`,[value], function (err, rows) {
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
 * @param {string}  column the column name for searching
 * @param {string|number} words the word to search
 * @param {function} results callable
 */
const search =  (tableName,column, words ,results) => {
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
    const {conditions, values}= hydrateObject(value);
    values.push(id);
    database.query(`UPDATE ${tableName} SET ${conditions} WHERE ${column}=?`,values, function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows);
        }

    });
};

/**
 *
 * @param {Object} data
 */
function hydrateObject(data) {
    let columns = Object.keys(data);
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
    const values = Object.values(data);
    return {conditions, values};
}
/**
 *
 * @param {Object} data
 */
function getConditions(data) {
    let columns = Object.keys(data);
    const columnsCount = columns.length - 1;
    let conditions ='';
    columns.forEach((column, index) => {
        if(columnsCount === index)
        {
            conditions += `${column} = ?`;
        }
        else{
            conditions += `${column} = ? AND `;
        }
    })
    const values = Object.values(data);
    return {conditions, values};
}

module.exports = {findLastRows,findLimitBy, update, add, findAll, findAllBy, count, findBy, find, search, deleteItem};