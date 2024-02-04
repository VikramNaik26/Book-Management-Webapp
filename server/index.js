import express from 'express'
import mysql from 'mysql'

const app = express()

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'vikr@m03Mysql',
  database: 'test',
})

app.get('/', (req, res) => {
  res.json({ msg: 'hello this is server' })
})

app.get('/books', (req, res) => {
  const getAllBooks = 'SELECT * FROM books'
  db.query(getAllBooks, (err, data) => {
    if (err) return res.json({ msg: err.message })
    return res.json(data)
  })
})

app.listen(8800, () => {
  console.log('server listening on port 8800')
})
