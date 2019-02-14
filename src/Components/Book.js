import React from 'react';
import BookShelf from './BookShelf';

const Book = (props) => {

    return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={props.style}></div>
                    <BookShelf updateShelf={(e) => props.updateShelf(e)} bookShelf={props.bookShelf}/>
                </div>
                <div className="book-title">{props.bookTitle}</div>
                <div className="book-authors">{props.bookAuthors}</div>
            </div>
            )
    }
export default Book;