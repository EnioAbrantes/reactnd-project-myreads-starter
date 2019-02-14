import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Book from './Components/Book'

class BooksApp extends React.Component {

  state = {
    books : [],
    queryResult : []
  }
  
  componentWillMount(){
    BooksAPI.getAll().then((books) =>
      books.map((book) => 
        this.setState((state) => ({ books : state.books.concat([book])}))
      )
    );
  }

  updateShelf = function(event,book) {
    //console.log(Object.keys(this.state.currentlyReading).map(function (atribute){
    console.log(book); 
    console.log(event.target.options[event.target.selectedIndex].value);
    BooksAPI.update(book, event.target.options[event.target.selectedIndex].value);
    /* var bookx = event.target.options[event.target.selectedIndex].value
    var y = <Book updateShelf={(e,bookName) => (this.updateShelf(e,bookName))} bookWriter= {'Orson Scott Card'} bookName={'Ender\'s Game'}style={{ width: 128, height: 188, backgroundImage: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")' }}/>
    var obj = {}
    obj[bookx] = [y,y]
    this.setState(obj) */
  }

  updateQuery = function(newQuery){
    console.log(newQuery)
    BooksAPI.search(newQuery).then((books) => {
      console.log(books+'books');
      if(books){
        this.setState({ queryResult : []})
        books && books.length && books.map((book) => {
          this.setState((state) => { 
            return {queryResult : state.queryResult.concat([<Book updateShelf={(e) => (this.updateShelf(e,book))} bookWriter={book.authors} bookName={book.title} style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}/>])}
          }) 
        })
      }else{
        console.log(this.state.books)
        return this.setState(() => ({ queryResult : []}))
      }
    })
  }

  updateAll = function(){
    BooksAPI.getAll().then((books) =>
      books.map((book) => 
        this.setState((state) => ({ books : state.books.concat([book])}))
      )
    );
  }

  render() {
    
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/'> 
                <button className="close-search" onClick={this.updateAll}>Close</button> 
              </Link>
              <div className="search-books-input-wrapper">
                <input 
                  type="text" 
                  placeholder="Search by title or author"
                  onChange= {(event) => this.updateQuery(event.target.value)}
                  />
              </div>
              
            </div>
            <div className="search-books-results">
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.queryResult.filter((book) => (
                    <li key={book.props.bookName}>
                      {book}
                    </li>
                  )) }
                </ol>
              </div>
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
                  <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.state.books.filter((book) => (book.shelf==='currentlyReading')).map((book) => (
                          <li key={book.id}>
                            <Book bookShelf={book.shelf} bookAuthors={book.authors} bookTitle={book.title} style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }} />
                          </li>
                        )) }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.state.books.filter((book) => (book.shelf==='wantToRead')).map((book) => (
                          <li key={book.id}>
                            <Book bookShelf={book.shelf} bookAuthors={book.authors} bookTitle={book.title} style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }} />
                          </li>
                        )) }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.state.books.filter((book) => (book.shelf==='read')).map((book) => (
                          <li key={book.id}>
                            <Book bookShelf={book.shelf} bookAuthors={book.authors} bookTitle={book.title} style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }} />
                          </li>
                        )) }
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <Link to='/search' className="open-search">
              <button onClick= {(event) => this.updateQuery(event.target.value)}>Add a book</button>
            </Link>

          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
