import React from 'react';
import './App.css'
import { Link } from 'react-router-dom'
import * as Api from './BooksAPI'

class Home extends React.Component {
    state = {
        books: [],
        book: ''
    }

    componentDidMount() {
      Api.getAll()
      .then( res => this.setState({
        books: res
      }))
    }
    
    
    handleChange = (book,event) => {
      const shelf = event.target.value
      this.state.books.forEach(b=>{
        if(b.id === book.id){
          b.shelf = shelf
          this.setState((book)=>({
            books: book.books
          }))
        }
      })
      Api.update(book, shelf)
    }


    render(){
        console.log(this.state.books)
        const books = this.state.books;
        return (
            <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Currently Reading</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          {
                              books.filter(shelf=> shelf.shelf === "currentlyReading").map((item,i)=>(
                                <li key={i}>
                                <div className="book">
                                  <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${item.imageLinks.thumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                      <select value="currentlyReading" onChange={(e)=>this.handleChange(item,e)}>
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
                              ))
                          }
                            </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="list-books-content">
                  <div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Want To Read</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          {
                              books.filter(shelf=> shelf.shelf === "wantToRead").map((item,i)=>(
                                <li key={i}>
                                <div className="book">
                                  <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${item.imageLinks.thumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                      <select value="wantToRead" onChange={(e)=>this.handleChange(item,e)}>
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
                              ))
                          }
                            </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="list-books-content">
                  <div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Read</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          {
                              books.filter(shelf=> shelf.shelf === "read").map((item,i)=>(
                                <li key={i}>
                                <div className="book">
                                  <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${item.imageLinks.thumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                      <select value="read" onChange={(e)=>this.handleChange(item,e)}>
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
                              ))
                          }
                            </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
              <Link to="/search"><button>Add a book</button></Link>
            </div>
            </div>
        )
    }
}
export default Home