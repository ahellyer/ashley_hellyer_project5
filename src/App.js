import React, { Component } from 'react';
import axios from 'axios';
// import Qs from 'qs';
import './App.css';
import firebase from './firebase';

//COMPONENTS
import Bestsellers from './Bestsellers'
import MyList from './MyList'

//create global variable
const dbRef = firebase.database().ref('books/');

let listType = null;

const url = "http://api.nytimes.com/svc/books/v3/lists";
const apiKey = "d73fa0a7cb05443386054d5de0324882";

const nytLists = ["Combined-Print-and-E-Book-Fiction", "Combined-Print-and-E-Book-Nonfiction", "Advice-How-To-and-Miscellaneous", "Young-Adult-Hardcover", "Business-Books", "Science"]

class App extends Component {
constructor() {
  super();
  this.state = {
    lists: {
      "Science": [],
      "Young Adult Hardcover": [],
      "Business Books": [],
      "Combined Print and E-Book Fiction": [],
      "Combined Print and E-Book Nonfiction": [],
      "Advice How-To and Miscellaneous": []
      
    },
    chosenList: null,
    current: null,
    myBooks: []
  }
}


  
componentDidMount() {
  //i could send my request through the proxy and they would cache the data so i would make less calls per day if I wanted...
  console.log('it mounted!')

  dbRef.on('value', (snapshot) => {
    //snapshot of database
    if(snapshot.val()) {
      //send the database object to a new function to do something with 
      this.updateBooks(snapshot.val());
    } else {
      this.setState({
        myBooks: []
      })
    }

  });


  function getNYTList(listName) {
    return axios.get(url, {
      params: {
        "api-key": apiKey,
        "list-name": listName ,
      } 
    })
  }

  const dataRequest = nytLists.map((list) => {
    return getNYTList(list);
  })

  Promise.all(dataRequest).then((responses)=> {
    // console.log(responses);
    responses=responses.map((response) => {
      return response.data.results
    }).reduce((acc, cur) => {
      // console.log(acc, cur)
      
      //we use reduce to take our array of values and reduce it into an object whre the keys are the list_names and the values are the array of books that live in that list 
      const list = cur[0].list_name
      if(acc[list]=== undefined) {
        acc[list] = cur
      } 
      return acc
    }, {})
    // console.log(responses)
    this.setState({
      lists: responses
    })
  })

}

  //when firebase database changes, this function is called to get information about the books in the database and reset the myBooks array in state 
  updateBooks = (bookObject) => {
    console.log('update the books was called')

    const booksArray = Object.entries(bookObject).map((item) => {
      return ({
        date: item[1].date,
        key: item[0],
        bookAuthor: item[1].bookAuthor,
        bookDescription: item[1].bookDescription,
        bookImage: item[1].bookImage,
        bookTitle: item[1].bookTitle,
      })
    }).sort((a,b) => {
      return b.date - a.date
    })
    console.log(booksArray);

    this.setState({
      myBooks: booksArray
    })

  }
  //when you put book on list add date and sort based on date (on click of book )

  // conditionally rendering the Bestsellers page depending on what button was pressed and updating the "current:"" state to the genre picked
  handleEvent = (e) => {
    console.log('handling the event!')

    this.setState({
      current: e.target.id
    })
    
    if (e.target.id === "fiction") {
      listType = <Bestsellers className="bestsellers-container" addToList={this.addToMyList} current={this.state.current} list={this.state.lists["Combined Print and E-Book Fiction"]} />
    
    } else if (e.target.id === "nonfiction") {
      listType = <Bestsellers className="bestsellers-container" addToList={this.addToMyList} current={this.state.current} list={this.state.lists["Combined Print and E-Book Nonfiction"]} />
    } else if (e.target.id === "business") {
      listType = <Bestsellers className="bestsellers-container" addToList={this.addToMyList} current={this.state.current} list={this.state.lists["Business Books"]} />
    } else if (e.target.id === "science") {
      listType = <Bestsellers className="bestsellers-container" addToList={this.addToMyList} current={this.state.current} list={this.state.lists["Science"]} />
    } else if (e.target.id === "youngAdult") {
      listType = <Bestsellers className="bestsellers-container" addToList={this.addToMyList} current={this.state.current} list={this.state.lists["Young Adult Hardcover"]} />
    } else if (e.target.id === "advice") {
      listType = <Bestsellers className="bestsellers-container" addToList={this.addToMyList} current={this.state.current} list={this.state.lists["Advice How-To and Miscellaneous"]} />
    }

    this.setState({
      chosenList: listType
    })
        
  } 

  render() {
    return (
    <div className="App">
        <nav className="main-nav">
          <h1 className="main-nav__title">Up With The Times</h1>
          <div className="main-nav__button-container">
            <button className="main-nav__button" onClick={this.handleEvent} id="fiction">Fiction</button>
            <button className="main-nav__button" onClick={this.handleEvent} id="nonfiction">Nonfiction</button>
            <button className="main-nav__button" onClick={this.handleEvent} id="business">Business</button>
            <button className="main-nav__button" onClick={this.handleEvent} id="science">Science</button>
            <button className="main-nav__button" onClick={this.handleEvent} id="youngAdult">Young Adult</button>
            <button className="main-nav__button" onClick={this.handleEvent} id="advice">Advice</button>
          </div>
        </nav>
        <main className="mainSection">
          <MyList listOfBooks={this.state.myBooks}/>
          { listType }
        </main>
      </div>
    )
  }

}



export default App;
