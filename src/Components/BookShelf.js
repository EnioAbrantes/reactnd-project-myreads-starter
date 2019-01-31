import React from 'react';

class BookShelf extends React.Component {
    
    render(){
        return(
        <div className="book-shelf-changer" >
            <select onChange={(e) => this.props.updateShelf(e)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading" >Currently Reading</option>
                <option value="wantToRead" >Want to Read</option>
                <option value="read" >Read</option>
                <option value="none">None</option>
            </select>
        </div>)
    }
}


export default BookShelf;