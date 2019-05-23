/*
	Header.js

	This is a helper class component responsible for the header in the page.
	This imports ImageUploadPopup and AdminPopup.
	This also refreshes HTML when popups get closed.
*/

import React from 'react'
import profile from '../profile.jpeg'
import ImageUploadPopup from './ImageUploadPopup'
import AdminPopup from './AdminPopup'
import '../Header.css'

class Header extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			showPopup: false,
			adminPopup: false
		}
		/*Every function needs to be bound*/
		this.togglePopup = this.togglePopup.bind(this);
		this.adminBtnTapped = this.adminBtnTapped.bind(this);
	}

	/*
		togglePopup()

		This gets called when user click create button.
		When this function is called, fetchUrl() in parent(body.js) gets called and
		refreshes every elements again.
	*/
	togglePopup(){
		this.setState({
      showPopup: !this.state.showPopup
    })
		this.props.func();
	}

	/*
		adminBtnTapped()

		This gets called when user click admin button.
	*/
	adminBtnTapped(){
		this.setState({
      adminPopup: !this.state.adminPopup
    })
	}

	render(){
		return(
			<div className='Header'>
				<div className='nav'>
					<div className='welcome'>
						<h3>Welcome</h3>
					</div>
					<div className='buttons'>
						<button className='createButton' onClick={this.togglePopup.bind(this)}>Create</button>
						<button className='adminButton' onClick={this.adminBtnTapped}>Admin</button>
					</div>
				</div>
				<div className='Header-picture'>
					<img src={profile} alt='sekyunoh-profile' />
					<div className='Header-info'>
						<div>
							<h1>Sekyun Oh</h1>
							<div className='Header-info-detail'>
								<div>
									<p className='post-number'>7</p>
									<p className='post'>post</p>
								</div>
								<div>
									<p className='visitors-number'>123</p>
									<p className='visitors'>visitors</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr />
				{/*
					Popup gets called dependent on the values
				*/}
				{this.state.showPopup ?
	        <ImageUploadPopup closePopup={this.togglePopup} /> : null
	      }
				{this.state.adminPopup ?
	        <AdminPopup closeAdminPopup={this.adminBtnTapped} /> : null
	      }
			</div>
		)
	}
}

export default Header
