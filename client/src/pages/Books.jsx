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
