import React, { Component } from 'react';

class Modal extends Component {
   
    
    // createMarkup = () => {
    //     // const iframe = <iframe title="google preview" src={this.props.url} width="550" height="550" scrolling="yes" style={{ width: '100%' }}> </iframe> 
    //     return { __html: <iframe title="google preview" src={this.props.url} width="550" height="550" scrolling="yes" style={{ width: '100%' }}> </iframe>};
    // }


    render () {
        const showHideClassName = this.props.show ? 'modal display-block' : 'modal display-none';
        
        
        return (
            <div className={showHideClassName}>
                <div className="modal-main">
                    <p>Extended Description</p>
                    <p>{this.props.description}</p>
                    
                    <button onClick={this.props.handleClose}>close</button>
                </div>
            </div>
        )
    }
}

export default Modal
