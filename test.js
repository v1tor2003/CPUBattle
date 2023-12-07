import db from './models/db.js'

async function getPrimaryKey(table){
  const sql = `SELECT COLUMN_NAME 
             FROM INFORMATION_SCHEMA.COLUMNS
             WHERE TABLE_NAME = '${table}' 
             AND COLUMN_KEY = 'PRI' 
             AND DATA_TYPE = 'int'`;
  const params = []
  const res = await db.execute(sql, params)
  
  return (res[0].COLUMN_NAME)
}

async function update(data, fillableColumns, table){
  const tablePrimaryKey = await getPrimaryKey(table)

  const setStatemmentsArray = fillableColumns.map(colmun  => data[colmun] ? `${colmun} = ?` : '')
  
  const colmuns = setStatemmentsArray.filter(column => column !== '').join(', ')
  
  const params = fillableColumns.map(colmun => data[colmun]).filter(column => column !== undefined)
  params.push(data.id)

  const sql = `UPDATE ${table} SET ${colmuns} WHERE ${tablePrimaryKey} = ?`
  
  
  return await db.execute(sql, params)
}


const fillableColumns = ['bench_single_pontuation', 'bench_mult_pontuation', 'bench_single_done_at']
const table = 'benchmarks'

const data = {
  id: 5,
  bench_single_pontuation: 777
}

update(data, fillableColumns, table)

