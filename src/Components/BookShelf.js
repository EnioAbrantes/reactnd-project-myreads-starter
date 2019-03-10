import React from 'react'
import Book from './Book'


const bookShelf = (props) => {
    return (
        <div className="bookshelf-books">
          <ol className="books-grid">
            {props.books.filter((book) => (book.shelf===props.shelf)).map((book) => (
              <li key={book.id}>
                <Book updateShelf={(newShelf) => (props.updateShelf(newShelf,book))} bookShelf={book.shelf} bookAuthors={book.authors} bookTitle={book.title} style={!book.imageLinks?
                { width: 128, height: 192, backgroundColor: 'black'} :
                { width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})`}} />
              </li>
            ))}
          </ol>
        </div>
    ) 
}

export default bookShelf;