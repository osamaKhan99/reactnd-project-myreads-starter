import React, { useState} from 'react';
import './App.css'
import {Link} from "react-router-dom"
import * as Api from './BooksAPI'

function Search(){

  const [books, setBooks] = useState([])
  const [error, setError] = useState(false)
  const [query, setQuery] = useState('')
    
    const handleInput = (event) =>{
        const queryString = event.target.value
        setQuery(queryString)
        if(queryString){
         Api.search(queryString)
            .then( res => 
                    res.length > 0 
// eslint-disable-next-line
                    ? (setBooks(res),
                      setError(false))
                    : (setBooks([]), setError(true))
                )   
        }
        
    }

    const handleChange = (book,event) => {
        const shelfState = event.target.value
        books.forEach(b=>{
          if(b.id === book.id){
            b.shelf = shelfState
            setBooks((book)=>({
              books: book.books
            }))
          }
        })
        Api.update(book, shelfState)
    }

        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/"><button className="close-search">Close</button></Link>
              <div className="search-books-input-wrapper">
                <input type="text" value={query} placeholder="Search by title or author" onChange={(e)=>handleInput(e)}/>

              </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                {
                    books.length > 0 ? ( books.map((item)=>(
                        <li key={item.id}>
                        <div className="book">
                            <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${item.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                                <select value="none" onChange={(e)=>handleChange(item,e)}>
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
                        :(error &&<h2>Sorry! Cannot find book with this keyword</h2>)
                    }
                </ol>
            </div>
          </div>
        )
}
export default Search