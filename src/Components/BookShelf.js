import React from 'react';

const BookShelf = (props) => {
    return(
    <div className="book-shelf-changer" >
        <select onFocus={(e) => props.bookShelf ? e.target.value = props.bookShelf : e.target.value = 'none'} onChange={(e) => props.updateShelf(e)}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading" >Currently Reading</option>
            <option value="wantToRead" >Want to Read</option>
            <option value="read" >Read</option>
            <option value="none">None</option>
        </select>
    </div>)
}

export default BookShelf;