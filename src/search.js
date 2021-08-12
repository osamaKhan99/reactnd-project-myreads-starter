import React from 'react';
import './App.css'
import {Link} from "react-router-dom"
import * as Api from './BooksAPI'

class Search extends React.Component{

    state={
        books: [],
        error: false,
        query:'',
    }

    handleInput = (event) =>{
        const query = event.target.value
        this.setState({query})
        if(query){
         Api.search(query)
            .then( res => 
                    res.length > 0 
                    ? this.setState({ books: res, error:false})
                    : this.setState({ books:[], error:true})
                )   
        }
        else {
            this.setState({ books:[]})
        }
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
        const { books, error } = this.state
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/"><button className="close-search">Close</button></Link>
              <div className="search-books-input-wrapper">
                <input type="text" value={this.state.query} placeholder="Search by title or author" onChange={this.handleInput}/>

              </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                {
                    books.length > 0? ( books.map((item,i)=>(
                        <li key={i}>
                        <div className="book">
                            <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${item.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                                <select value="none" onChange={(e)=>this.handleChange(item,e)}>
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
                        :( error && (<h2>Sorry! Cannot find book with this keyword</h2>))
                    }
                </ol>
            </div>
          </div>
        )
    }
}
export default Search