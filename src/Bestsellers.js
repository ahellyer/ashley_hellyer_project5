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

