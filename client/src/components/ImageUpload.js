/*
	ImageUpload.js

	This is a helper class component invoked when user click create button in Header.js.
  This is responsible for uploading an element to the server.
*/

import React from 'react'
import '../ImageUpload.css'

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      title:'',
      description:'',
      imageUrlToSave:''
    };
    /*Every function needs to be bound*/
    this.handleTitleInput = this.handleTitleInput.bind(this);
    this.handleDescInput = this.handleDescInput.bind(this);
  }

  /*
    handleSubmit(e)

    This function uploads image and calls a function when stream succeeds.
  */
  handleSubmit(e) {
    e.preventDefault();
    // validate input
    if(this.state.file === '' || this.state.title === '' || this.state.description === ''){
      alert('Everything should be filled. Select image to upload, fill your title and description! ');
      return;
    }
    // if everything is valid
    let url = 'http://localhost:9000/server/image-upload';
    const formData = new FormData();
    formData.append('photo',this.state.file);

		let fetchOptions = {
			method : 'POST',
      headers: {
        url: this.state.imageUrlToSave
      },
			body : formData
		};
    // fetch url
		fetch(url, fetchOptions)
		.then(() => {
      console.log('Image Successfully Uploaded')
      this.infoUpload();
    })
		.catch(function(error) {
			// error: do something with error
		});

  }

  /*
    handleImageChange(e)

    This gets called when user selects an image from a computer.
  */
  handleImageChange(e) {
    e.preventDefault();

    var now     = new Date();
    var year    = now.getFullYear();
    var month   = now.getMonth()+1;
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds();
    var format = year+'-'+month+'-'+day+'-'+hour+':'+minute+':'+second;

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
        imageUrlToSave: format
      });
    }

    reader.readAsDataURL(file)
  }

  /*
    handleTitleInput(e)

    This gets called when user types title.
  */
  handleTitleInput(e){
    this.setState({
			title: e.target.value
		})
  }

  /*
    handleDescInput(e)

    This gets called when user types description.
  */
  handleDescInput(e){
    this.setState({
			description: e.target.value
		})
  }

  /*
    infoUpload()

    This function uploads title and description about the element.
    This gets called when uploading image succeeds.
  */
  infoUpload(){
    let url = 'http://localhost:9000/server/info-upload';
    let info = {
			title: this.state.title,
			description: this.state.description,
      imageUrl: this.state.imageUrlToSave
		};

		let fetchOptions = {
			method : 'POST',
			headers : {
				'Accept': 'application/json',
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify(info)
		};
		// fetch url
		fetch(url, fetchOptions)
		.then(() => {
      console.log('Info Successfully Uploaded')
      // let go back
      this.props.closePopup()
    })
		.catch(function(error) {
			// error: do something with error
      console.log(error)
		});
  }

  render() {
    {/*
      Set value to display an image that user has chosen.
    */}
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt='my-pic'/>);
    } else {
      $imagePreview = (<div className="previewText">No Image Selected To Preview</div>);
    }

    return (
      <div>
        <div className="previewComponent">
          <div className='left'>
            <h3>1. Upload Image</h3>
            <div className="fileInput">
              <input type="file" onChange={(e)=>this.handleImageChange(e)} />
            </div>
            <div className="imgPreview">
              {$imagePreview}
            </div>
          </div>
          <div className='right'>
            <h3>2. Description</h3>
            <div className='description-title'>
              <input type='text' value={this.state.title} onChange={this.handleTitleInput} placeholder='Title here...'/>
            </div>
            <div className='right-textarea'>
              <textarea value={this.state.description} onChange={this.handleDescInput} placeholder="Describe whatever you want..."></textarea>
            </div>
          </div>
        </div>
        <button className="submitButton" type="submit" onClick={(e)=>this.handleSubmit(e)}>
        Upload
        </button>
      </div>
    )
  }
}

export default ImageUpload
