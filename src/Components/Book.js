import React from 'react';
import BookShelf from './BookShelf';

const Book = (props) => {
    return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={props.style}></div>
                    <BookShelf/>
                </div>
                <div className="book-title">{props.bookName}</div>
                <div className="book-authors">{props.bookWriter}</div>
            </div>
            )
    }
export default Book;