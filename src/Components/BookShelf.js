import React from 'react';

class BookShelf extends React.Component {
    
    updateSelect = function(event,shelf){
        shelf ? event.target.value = shelf : event.target.value = 'none'
    }
    render(){
        return(
        <div className="book-shelf-changer" >
            <select onFocus={(e) => this.updateSelect(e,this.props.bookShelf)} onChange={(e) => this.props.updateShelf(e)}>
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