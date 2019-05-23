/*
	ImageUploadPopup.js

	This is a helper class component invoked when user click create button in Header.js.
  This is a parent component of ImageUpload.js.
	This is responsible for closing popup and setting props so that child can use.
*/

import React from 'react'
import '../Popup.css'
import ImageUpload from './ImageUpload'

class ImageUploadPopup extends React.Component {
	render(){
		return(
			<div className='popup'>
				<div className='popup-inner'>
					<button onClick={this.props.closePopup}>X</button>
					<br />
					<br />
					<ImageUpload closePopup={this.props.closePopup}/>
				</div>
			</div>
			)
		}
	}

	export default ImageUploadPopup
