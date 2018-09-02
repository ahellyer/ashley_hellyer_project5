import React, { Component } from 'react';
import axios from 'axios';
import firebase from 'firebase';
import Modal from './Modal';

const googleURL = 'https://www.googleapis.com/books/v1/volumes';
const googleKey = 'AIzaSyBRHR3FXjHFoFsh5iRztvXQy_nzMkDCkPE';

// let client = '';

class Book extends Component {
    constructor() {
        super()
        this.state = {
            imageThumbnail: '',
            bookPreview: '',
            show: false,
            description: ''
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
            }
        }).then((res) => {
            // console.log(res)
            const imageThumbnail = res.data.items[0].volumeInfo.imageLinks.thumbnail
            const bookPreview = res.data.items[0].volumeInfo.previewLink
            const description = res.data.items[0].volumeInfo.description
            console.log(imageThumbnail)
            console.log(bookPreview)
            console.log(description);
            this.setState({
                imageThumbnail: imageThumbnail,
                bookPreview: bookPreview,
                description: description

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
        //function to get isbn?
     
        
        this.getIsbn();

    }

    sendToDatabase = (e) => {
        e.preventDefault()

        console.log('gonna send to firebase YO');
        // console.log(this.state.imageThumbnail);
        // console.log(this.props.details.book_details[0].title);

        firebase.database().ref('books/' + this.props.details.book_details[0].primary_isbn10).set({
            date: Date.now(),
            key: this.props.details.book_details[0].primary_isbn10,
            bookTitle: this.props.details.book_details[0].title,
            bookImage: this.state.imageThumbnail,
            bookAuthor: this.props.details.book_details[0].author,
            bookLink: this.props.details.amazon_product_url,
            bookDescription: this.props.details.book_details[0].description
        });

        //call preview function using isbn number
        

     

    }

    render() {
        return (
           
            <div>
                {this.state.imageThumbnail ? <img src={this.state.imageThumbnail} alt={`Book cover for ${this.props.details.book_details[0].title}`} /> : <p>loading</p>}
                
                <h3>{this.props.details.rank}{this.props.details.book_details[0].title}</h3>
                <p>{this.props.details.book_details[0].author}</p>
                <p>{this.props.details.book_details[0].description}</p>
                <a href={this.props.details.amazon_product_url}>Buy now!</a>
                <a href={this.state.bookPreview}>Preview on Google!</a>
               
                {/* {client = new window.GBS_insertPreviewButtonPopup('ISBN:0738531367')} */}
                <Modal url={this.state.bookPreview} description={this.state.description} show={this.state.show} handleClose={this.hideModal} />
                    
                <button type="button" onClick={this.showModal}>
                    Open Google Preview
                </button>
                <form action="" onSubmit={this.sendToDatabase}>
                    <input type="submit" value="add to My List"  />
                </form>
            </div>
               
        )
    }
}

// const container = document.createElement("div");
// document.body.appendChild(container);
// ReactDOM.render(<Book />, container);

export default Book;

