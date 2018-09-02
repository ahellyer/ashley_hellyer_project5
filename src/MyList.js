import React, { Component } from 'react';
import firebase from 'firebase';

class MyList extends Component {
    handleSubmit = (e) => {
        console.log(e.target.parentElement.id)
        console.log('delete was clicked')
        //remove from firebase
        firebase.database().ref('books/').child(e.target.parentElement.id).remove()
        // dbref.child(key).remove();
    }
    
    render () {
        console.log(this.props.listOfBooks);

        const booksInList = this.props.listOfBooks
        let listItem;

        if (booksInList.length > 0) {
            listItem = this.props.listOfBooks.map((item) => {
                return (
                        <li id={item.key}>
                            <div >{item.bookTitle}</div>
                            <input type="submit" value="delete" onClick={this.handleSubmit} />
                        </li>
                    )
            })
        } else {
            listItem = <li>WHYYYYYYY </li>

        }

        return (
            <div className="myList">
                <p>this is where my list will go </p>
                <ul>
                    
                    { listItem }
                
                </ul>
            </div>
        )
    }
}

export default MyList;