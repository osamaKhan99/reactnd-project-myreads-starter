import React from 'react';
import './App.css'
import { Link } from 'react-router-dom'
import * as Api from './BooksAPI'

class Home extends React.Component {
  state = {
      books: []
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
                          books.filter(arr=> arr.shelf === shelf.title).map((item,i)=>(
                            <li key={i}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${item.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select value={item.shelf} onChange={(e)=>this.handleChange(item,e)}>
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
}
export default Home