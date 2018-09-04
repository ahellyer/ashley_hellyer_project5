import React, { Component } from 'react';
import axios from 'axios';
import firebase from 'firebase';
import Modal from './Modal';

const googleURL = 'https://www.googleapis.com/books/v1/volumes';
const googleKey = 'AIzaSyBRHR3FXjHFoFsh5iRztvXQy_nzMkDCkPE';


class Book extends Component {
    constructor() {
        super()
        this.state = {
            imageThumbnail: '',
            bookPreview: '',
            show: false,
            description: '',
            rating: ''
        }
    }
    
    getIsbn = () => {
        const bookIsbn10 = this.props.details.book_details[0].primary_isbn10;
        const bookIsbn13 = this.props.details.book_details[0].primary_isbn13;
        if (bookIsbn10) {
            this.getImage(bookIsbn10);
        } else {
            this.getImage(bookIsbn13);
        }
        
    }

    getImage(isbn) {
        axios.get(googleURL, {
            params: {
                key: googleKey,
                q: isbn,
                country: 'CA',
            }
        }).then((res) => {
            
            const imageThumbnail = res.data.items[0].volumeInfo.imageLinks.thumbnail
            const bookPreview = res.data.items[0].volumeInfo.previewLink
            const description = res.data.items[0].volumeInfo.description
            const rating = res.data.items[0].volumeInfo.averageRating
           
            this.setState({
                imageThumbnail: imageThumbnail,
                bookPreview: bookPreview,
                description: description,
                rating: rating

            })
        })
    }

    showModal = () => {
        this.setState({ show: true });
    }

    hideModal = () => {
        this.setState({ show: false });
    };

    componentDidMount() {
        //make API call based on book isbn:
        
        this.getIsbn();

    }

    sendToDatabase = (e) => {
        e.preventDefault()
        
        //send book info to firebase on click of icon
        firebase.database().ref('books/' + this.props.details.book_details[0].primary_isbn10).set({
            date: Date.now(),
            key: this.props.details.book_details[0].primary_isbn10,
            bookTitle: this.props.details.book_details[0].title,
            bookImage: this.state.imageThumbnail,
            bookAuthor: this.props.details.book_details[0].author,
            bookLink: this.props.details.amazon_product_url,
            bookDescription: this.props.details.book_details[0].description
        });


    }

    render() {
        return (
           
            <div className="book">
                <div className="book__img-container">
                    {this.state.imageThumbnail ? <img className="book__img"src={this.state.imageThumbnail} alt={`Book cover for ${this.props.details.book_details[0].title}`} /> : <p className="book__img-loading">loading</p>}
                </div>
                <h3 className="book__title">{this.props.details.book_details[0].title}</h3>
                <p className="book__author">{this.props.details.book_details[0].author}</p>
                <div className="book__info">
                    <button className="book__info-button"type="button" onClick={this.showModal}>
                        <i className="fas fa-info-circle"></i>
                    </button>
                    <form action="" onSubmit={this.sendToDatabase}>
                        <button className="book__fave-button" type="submit" >
                        <i className="far fa-heart"></i></button>
                    </form>
                    
                </div>
                
                <div className="book__rank-container">
                    <p className="book__rank">{this.props.details.rank}</p>
                </div>
                    
                <Modal url={this.state.bookPreview} description={this.state.description} thumbnail={this.state.imageThumbnail} show={this.state.show} handleClose={this.hideModal} details={this.props.details} rating={this.state.rating}/>
                    
                
            </div>
               
        )
    }
}


export default Book;

