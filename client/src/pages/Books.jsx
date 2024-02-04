import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Books = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get('http://localhost:8800/books')
        // console.log(res.data)
        setBooks(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllBooks()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:8800/books/' + id)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section>
      <h1>LimbePuli Book Shop</h1>
      <div className="books">
        {books.map((book) => {
          const { id, title, desc, cover, price } = book
          return (
            <div key={id} className="book">
              {cover && <img src={cover} alt="" />}
              <h2>{title}</h2>
              <h3>{desc}</h3>
              <span>{price}</span>
              <button className="delete" onClick={() => handleDelete(id)}>
                Delete
              </button>
              <button className="update">
                <Link to={`/update/${id}`}>Update</Link>
              </button>
            </div>
          )
        })}
      </div>
      <button>
        <Link to={'/add'}>Add new Book</Link>
      </button>
    </section>
  )
}
export default Books
