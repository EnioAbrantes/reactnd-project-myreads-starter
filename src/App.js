import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import SearchPage from './Components/SearchPage';
import BookShelf from './Components/BookShelf';
import { debounce } from "throttle-debounce";

const currentlyReading = 'currentlyReading';
const wantToRead = 'wantToRead';
const read = 'read';

class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books : [],
      queryResult : []
    }
    this.searchDebounced =  debounce(300, this.updateQuery)
  }
  
  
  performSearch = (newQuery) => {
    this.searchDebounced(newQuery)
  };

  componentWillMount(){
    BooksAPI.getAll().then((books) =>
      this.setState({ books : books})
    );
  }

  updateShelf = function(shelf,book) {
    // sometimes the book does't match with includes, because this we need to check according the ids.
    this.state.books.map((b) => (b.id === book.id? book = b : false))
    const updatedBook = {
      ...book,
      shelf
    }
    BooksAPI.update(updatedBook, shelf);
    const updatedBooks = this.state.books.filter(b => b.id !== updatedBook.id).concat(updatedBook)
    this.setState({ books : updatedBooks})
  }

  updateQuery = function(newQuery){
    let shelf = 'none';
    BooksAPI.search(newQuery).then((books) => {
      if(books){
        this.setState({ queryResult : []})
        books && books.length && books.map((book) => {
          this.state.books.forEach((b) => {
            if(b.id === book.id){
             return shelf = b.shelf
            }
          })
          let updatedBook = {
            ...book,
            shelf
          }
          this.setState((state) => { 
             return {queryResult : state.queryResult.concat([updatedBook])}
          })
          return shelf = 'none';
        })
      }else{
        return this.setState(() => ({ queryResult : []}))
      }
    })
  }

  render() {
    let {books} = this.state; 
    let {queryResult} = this.state;
    
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/'> 
                <button className="close-search">Close</button> 
              </Link>
              <div className="search-books-input-wrapper">
                <input 
                  type="text" 
                  placeholder="Search by title or author"
                  onChange= {(event) => this.performSearch(event.target.value)} 
                  />
              </div>
            </div>
            <div className="search-books-results">
              <SearchPage books={queryResult} updateShelf={(newShelf,book) => (this.updateShelf(newShelf,book))}/>
              </div>
            </div>
        )} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <BookShelf shelf={currentlyReading} books={books} updateShelf={(newShelf,book) => (this.updateShelf(newShelf,book))}/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <BookShelf shelf={wantToRead} books={books} updateShelf={(newShelf,book) => (this.updateShelf(newShelf,book))}/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <BookShelf shelf={read} books={books} updateShelf={(newShelf,book) => (this.updateShelf(newShelf,book))}/>
                </div>
              </div>
            </div>

            <Link to='/search' onClick={this.updateQuery} className="open-search">
              <button>Add a book</button>
            </Link>

          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
