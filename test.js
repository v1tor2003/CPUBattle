import db from "./models/db.js";


const query = await db.execute('DELETE FROM bench WHERE id = ?', [2])

console.log(query)