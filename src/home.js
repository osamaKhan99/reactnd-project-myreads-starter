import React, { useState, useEffect } from 'react';
import './App.css'
import { Link } from 'react-router-dom'
import * as Api from './BooksAPI'


function Home(){

  const [books, setBooks] = useState([])


  useEffect(() => {
    let isActive = true
    Api.getAll()
    .then( async(res) => { 
      if(isActive){
        await setBooks(res)
      }})
    return () => {
      isActive = false
    }
  },[books]);

  
  
  const handleChange = (book,event) => {
    const shelf = event.target.value
    books.forEach(b=>{
      if(b.id === book.id){
        b.shelf = shelf
        setBooks((book)=>({
          books: book.books
        }))
      }
    })
    Api.update(book, shelf)
  }

    const shelves = [
      {
          name: "Currently Reading",
          title: "currentlyReading"
      },
      {
          name: "Want To Read",
          title: "wantToRead"
      },
      {
          name: "Read",
          title: "read"
      }
  ]
    return(
        <div className="list-books">
          <div>
          <div className="list-books-title">
          <h1>My Reads</h1>
          </div>
          <div className="list-books-content">
          <div>
            {
              shelves.map((shelf,index)=>{
                return(
                  <div key={index} className="bookshelf">
                    <h2 className="bookshelf-title">{shelf.name}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {
                          books.length > 0 ?( books.filter(arr=> arr.shelf === shelf.title).map((item)=>(
                            <li key={item.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${item.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select value={item.shelf} onChange={(e)=>handleChange(item,e)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                                </div>
                                <div className="book-title">{item.title}</div>
                              <div className="book-authors">{item.author}</div>
                            </div>
                            </li>
                          )))
                          : null
                        }
                      </ol>
                    </div>
                    </div>
                  )
                })
              }
            </div>
            </div>
            </div>
          )
          <div className="open-search">
            <Link to="/search"><button>Add a book</button></Link>
          </div>
        </div>
    )
}
export default Home