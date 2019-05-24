/*
	AdminPopup.js

	This gets called when user click the admin button in header.
*/

import React from 'react'
import '../AdminPopup.css'

class AdminPopup extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			id:'',
			pw:'',
			validation:''
		}
		/*Every function needs to bind in order to be used*/
		this.idHandler = this.idHandler.bind(this);
		this.pwHandler = this.pwHandler.bind(this);
		this.validationHandler = this.validationHandler.bind(this);
	}

	/*
		idHandler(e)

		This allows user to type ID.
		This changes id value in state.
	*/
	idHandler(e){
		this.setState({
			id:e.target.value
		})
	}

	/*
		pwHandler(e)

		This allows user to type PASSWORD
		This changes password value in state.
	*/
	pwHandler(e){
		this.setState({
			pw:e.target.value
		})
	}

	/*
		handleLogin(e)

		This gets called when user click login button in popup.
	*/
	handleLogin(e){
		e.preventDefault();
    // validate input
    if(this.state.id === '' || this.state.pw === ''){
      alert('Both ID and PASSWORD should be filled!');
      return;
    }
	}

	/*
		validationHandler(e)

		This communicates with server and validates values that user entered.
	*/
	validationHandler(){
		let url = 'http://localhost:3000/server/validation';

		let object = {
			id: this.state.id,
			pw: this.state.pw
		}
		let fetchOptions = {
			method:'POST',
			headers : {
				'Accept': 'application/json',
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify(object)
		}
		fetch(url, fetchOptions)
		.then((response) => {
			response.text().then((result) => {
				this.setState({
					validation: result
				})
			})
		})
		.catch(function(error) {
			this.setState({
				validation: 'fail'
			})
			console.log(error);
		})
	}

	render(){
		var result = this.state.validation
		return(
			<div className='adminPopup-cotainer'>
				<button onClick={this.props.closeAdminPopup}>X</button>
				<div className='adminPopup-inner-container'>
					<div className='adminPopup-inner'>
						<div className='adminPopup-inner-info'>
							<div className='info-id'>
								<b>
									ID
								</b>
								<br />
								<input type='text' value={this.state.id} onChange={this.idHandler} placeholder='ID here...'/>
							</div>
							<div className='info-password'>
								<b>
									PASSWORD
								</b>
								<br />
								<input type='text' value={this.state.pw} onChange={this.pwHandler} placeholder='Password here...'/>
							</div>
							<div className='info-button'>
								<button className='adminPopupButton' type="submit" onClick={(e)=>this.handleLogin(e)}>
								Login
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default AdminPopup
