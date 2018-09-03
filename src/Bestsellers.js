import React, { Component } from 'react';
import Book from './Book';


class Bestsellers extends Component {
    addToList= () => {
        this.props.addToMyList()
    }

    
    componentDidMount() {
        console.log('switched the list!')
    }
    
    render() {
        return (
            <div className="bestsellers">
                {/* <h2>Current {this.props.listTitle} Bestsellers: </h2> */}
                {/* {map through the chosen list and create a book component for each book in the list, sending that book details about itself} */}
                
                {this.props.list.map((item) => {
                    return (
                        <div className="book-container" key={item.book_details[0].primary_isbn10}>
                            <Book  addToList={this.props.addToMyList} current={this.props.current} details={item} />
                        </div>
                        
                    )
                })}
                
            </div>

        )
    }
}

export default Bestsellers;

