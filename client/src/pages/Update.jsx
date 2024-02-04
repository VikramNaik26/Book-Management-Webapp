import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

import '../styles.css'

const Add = () => {
  const [book, setBook] = useState({
    title: '',
    desc: '',
    price: null,
    cover: '',
  })

  const navigate = useNavigate()
  const location = useLocation()

  const bookId = location.pathname.split('/')[2]

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  // console.log(book)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.put('http://localhost:8800/books/' + bookId, book)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Update Book</h1>
        <input
          name="title"
          type="text"
          placeholder="title"
          onChange={handleChange}
        />
        <input
          name="desc"
          type="text"
          placeholder="desc"
          onChange={handleChange}
        />
        <input
          name="price"
          type="text"
          placeholder="price"
          onChange={handleChange}
        />
        <input
          name="cover"
          type="text"
          placeholder="cover"
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </section>
  )
}
export default Add
