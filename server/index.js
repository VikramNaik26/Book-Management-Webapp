import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'vikr@m03Mysql',
  database: 'test',
})

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'hello this is server' })
})

app.get('/books', (req, res) => {
  const getAllBooks = 'SELECT * FROM books'
  db.query(getAllBooks, (err, data) => {
    if (err) return res.json({ msg: err.message })
    return res.status(200).json(data)
  })
})

app.post('/books', (req, res) => {
  const postBooks =
    'INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)'
  //   const values = ['title', 'desc', 'cover from server']
  const values = [req.body.title, req.body.desc, req.body.price, req.body.cover]

  db.query(postBooks, [values], (err, data) => {
    if (err) return res.json({ msg: err.message })
    return res.status(200).json('book created successfully')
  })
})

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id
  const deleteBook = 'DELETE FROM books WHERE id = ?'

  db.query(deleteBook, [bookId], (err, data) => {
    if (err) return res.json({ msg: err.message })
    return res.status(200).json('book deleted successfully')
  })
})

app.put('/books/:id', (req, res) => {
  const bookId = req.params.id
  const q =
    'UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?'

  const values = [req.body.title, req.body.desc, req.body.price, req.body.cover]

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err)
    return res.json(data)
  })
})

app.listen(8800, () => {
  console.log('server listening on port 8800')
})
