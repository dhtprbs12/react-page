/*
	Element.js

	This is a helper class component to create elements in body.js.
	This fetches every element based on values passed into props.
*/

import React from 'react'
import '../Element.css'
import ElementPopup from './ElementPopup'

class Element extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			displayPopup: false
		}
	}

	/*
		elementHandler()

		This handles whether ElementPopup.js should be called or not.
	*/
	elementHandler(){
		this.setState({
			displayPopup: !this.state.displayPopup
		})
		//call fetchUrl function in the parent class (Body.js)
		this.props.fetchElement()
	}

	render(){
		return(
			<div className='Element' id={this.props.id}>
				<img src={'http://localhost:3000/get-images?name=' + this.props.imgSrc} alt='element-pic' />
				<div className='title'>
					<h3>{this.props.title} <span className='date'>{this.props.created}</span></h3>
				</div>
				<div className='description'>
					{this.props.description}
				</div>
				<div className='bottom'>
					<div className='read-more'>
						<button onClick={this.elementHandler.bind(this)}>MORE >></button>
					</div>
					<div className='comment'>
						<p>
							<span><b>Comments  </b> <span className="w3-tag">{this.props.count}</span></span>
						</p>
					</div>
				</div>
				{/*
					If displayPopup is true, ElementPopup.js gets called.
					Otherwise, close popup or nothing happen
				*/}
				{this.state.displayPopup ?
	        <ElementPopup imgSrc={this.props.imgSrc} closePopup={this.elementHandler.bind(this)} title={this.props.title} description={this.props.description} id={this.props.id}/> : null
	      }
			</div>
		)
	}
}

export default Element
