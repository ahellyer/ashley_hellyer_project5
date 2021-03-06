import React, { Component } from 'react';
import firebase from 'firebase';

class MyList extends Component {
    handleSubmit = (e) => {
        
        //remove from firebase
        firebase.database().ref('books/').child(e.target.parentElement.id).remove()
        // dbref.child(key).remove();
    }
    
    render () {
        

        const booksInList = this.props.listOfBooks
        let listItem;

        if (booksInList.length > 0) {
            listItem = this.props.listOfBooks.map((item) => {
                return (
                        <li className="my-list__item" id={item.key}>
                            <img src={item.bookImage} alt=""/>
                            <div >{item.bookTitle}</div>
                            <button className="my-list__button" onClick={this.handleSubmit}>x</button>
                            {/* <input type="submit" value="delete" onClick={this.handleSubmit} /> */}
                        </li>
                    )
            })
        } else {
            listItem = <li className="my-list__default">Click the <i class="far fa-heart"></i> icon to add a book to your list! </li>

        }

        return (
            <div className="my-list">
                <p className="my-list__title">My Favourites</p>
                <ul className="my-list__ul">
                    
                    { listItem }
                
                </ul>
            </div>
        )
    }
}

export default MyList;