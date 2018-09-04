import React, { Component } from 'react';

class Modal extends Component {
   
    

    render () {
        const showHideClassName = this.props.show ? 'modal display-block' : 'modal display-none';
        
        
        return (
            <div className={showHideClassName}>
                <div className="modal-main">
                    <div className="modal-main__title-bar">
                        
                        
                        <p className="modal-main__book-title">{this.props.details.book_details[0].title}</p>
                        <div className="modal-main__book-info-container">
                            <p className="modal-main__book-rank">Current Rank: {this.props.details.rank}</p>
                            <p className="modal-main__book-weeks">Weeks on List: {this.props.details.weeks_on_list}</p>
                            <p className="modal-main__book-rating">Average rating: {this.props.rating}/5</p>
                        </div>
                        
                    </div>
                    <div className="modal-main__description clearfix">
                        <div className="modal-main__img-container">
                            <img src={this.props.thumbnail} alt="" />
                        </div>

                        <p className="modal-main__description-text">{this.props.description}</p>

                        <div className="modal-main__link-container">
                            <a className="modal-main__link" href={this.props.details.amazon_product_url}><i className="fas fa-shopping-cart"></i>

                                Buy now</a>
                            <a className="modal-main__link" href={this.props.url}><i className="fas fa-book-reader"></i>

                                Preview on Google</a>
                        
                        </div>
                    
                        <button className="modal-main__close" onClick={this.props.handleClose}><i className="fas fa-times"></i>

</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal
