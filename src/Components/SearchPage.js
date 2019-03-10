import React from 'react'
import Book from './Book'

const SearchPage = (props) => {
    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {props.books.map((book) => (
                <li key={book.id}>
                    <Book bookShelf={book.shelf} updateShelf={(shelf) => props.updateShelf(shelf,book)}
                    bookAuthors={book.authors} bookTitle={book.title} style={!book.imageLinks?
                    { width: 128, height: 192, backgroundColor: 'black'} :
                    { width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})`}}/>
                </li>
                )) }
            </ol>
        </div>
    )
}

export default SearchPage