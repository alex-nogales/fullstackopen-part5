import React, { useState } from 'react'

const CreateBlog = ({ addBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] =  useState('')

  const createBlog = (e) => {
    e.preventDefault()

    addBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className='formDiv'>
      <form onSubmit={createBlog} >
        <div>
          <p>Title <input id="title" type="text" name="Title" key="title" onChange={({ target }) => setTitle(target.value)} /> </p>
          <p>Author <input id="author" type="text" name="Author" key="author" onChange={({ target }) => setAuthor(target.value)} /></p>
          <p>Url <input id="url" type="text" name="Url" key="url" onChange={({ target }) => setUrl(target.value)} /></p>
        </div>
        <button type="submit" id="create-blog">create</button>
      </form>
    </div>

  )
}

export default CreateBlog