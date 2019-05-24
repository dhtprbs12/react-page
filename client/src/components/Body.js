
/*
	Body.js

	This gets called when the page is being loaded.
*/

import React from 'react'
import Element from './Element'
import Header from './Header'
import '../Body.css'

class Body extends React.Component {

	constructor(){
		super()
		this.state = {
			result:''
		};
		this.fetchUrl = this.fetchUrl.bind(this);
	}

	/*
		componentDidMount()

		This is one of the lifecycle methods in react.
		This gets called when the file is about to be mount.
		When the page is mount, call fetchUrl().
	*/
	componentDidMount() {
		this.fetchUrl();
  }

	/*
		fetchUrl()

		This calls the server and gets all elements that have been uploaded by user.
		This set state so that it refreshes HTML.
	*/
	fetchUrl(){
		let url = 'http://52.9.186.77/get-elements';
		// fetch url
		fetch(url)
		.then((response) => {
			response.text().then((result) => {
				this.setState({
					result:JSON.parse(result)
				})
			})
		})
		.catch(function(error) {
			// error: do something with error
      console.log(error)
		});
	}

  componentWillUnmount() {
		console.log('componentWillUnmount');
  }

	render(){
		{/*
			This creates Element DOM by using values from the server.
		*/}
		var elements;
		if(this.state.result['result'] !== undefined){
			elements = this.state.result['result'].map(element => <Element key={element.id} id={element.id} imgSrc={element.image} title={element.title} description={element.description} created={element.created} count={element.count} fetchElement={this.fetchUrl.bind(this)} />)
		}
		return(
			<div className='body'>
				<Header func={this.fetchUrl} />
				<div className='grid-container'>
					{elements}
				</div>
			</div>
		)
	}
}

export default Body
