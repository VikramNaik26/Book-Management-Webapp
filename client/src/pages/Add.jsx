import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Add = () => {
  const [book, setBook] = useState({
    title: '',
    desc: '',
    price: null,
    cover: '',
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setBook((prev) => ({ ...book, [e.target.name]: e.target.value }))
  }
  console.log(book)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:8800/books', book)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Add new Book</h1>
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
