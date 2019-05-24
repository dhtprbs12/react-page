/*
	ElementPopup.js

	This gets called when user clicks an element.
	This allows user to see the element in detail.
*/

import React from 'react'
import '../ElementPopup.css'
import Comment from './Comment'

class ElementPopup extends React.Component {
	constructor(props){
		super(props)
		this.state = {
      nickname:'',
			comment:'',
			result:[]
    };
		{/*Every function needs to be bound in order to be used*/}
    this.handleNicknameInput = this.handleNicknameInput.bind(this);
    this.handleCommentInput = this.handleCommentInput.bind(this);
		this.fetchUrl = this.fetchUrl.bind(this);
	}

	/*
		componentDidMount()

		One of the lifecycle methods in react.
	*/
	componentDidMount(){
		this.fetchUrl();
	}

	/*
		fetchUrl()

		This calls the server and gets all comments inserted on the element.
	*/
	fetchUrl(){
		var id = this.props.id;
		let url = 'http://52.9.186.77/get-comments?element_id='+id;
		//fetch url
		fetch(url)
		.then((response) => {
			response.text().then((result) => {
				this.setState({
					nickname:'',
					comment:'',
					result:JSON.parse(result)
				})
			})
		})
		.catch(function(error) {
			// error: do something with error
      console.log(error)
		});
	}

	/*
		handleNicknameInput(e)

		This gets called when user types nickname.
		This refreshes HTML by change state.
	*/
	handleNicknameInput(e){
    this.setState({
			nickname: e.target.value
		})
  }

	/*
		handleCommentInput(e)

		This gets called when user types comment.
		This refreshes HTML by change state.
	*/
  handleCommentInput(e){
    this.setState({
			comment: e.target.value
		})
  }

	/*
		postComment(e)

		This gets called when user clicks post button.
		This stores the comment in database.
	*/
	postComment(e){
		e.preventDefault();
    // validate input
    if(this.state.nickname === '' || this.state.comment === ''){
      alert('Both nickname and comment should be filled!');
      return;
    }

		if(this.state.nickname.length > 15){
			alert('Nickname must be less than equal to 15 characters');
      return;
		}

		// if everything is valid
    let url = 'http://52.9.186.77/comment-upload';

		let object = {
			element_id: this.props.id,
			nickname: this.state.nickname,
			comment: this.state.comment
		};
		let fetchOptions = {
			method : 'POST',
			headers : {
				'Accept': 'application/json',
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify(object)
		};
    // fetch url
		fetch(url, fetchOptions)
		.then((response) => {
			this.fetchUrl();
		})
		.catch(function(error) {
			// error: do something with error
		});
	}

	render(){

		{/*
			Create each comment based on values from the server and attach to the element.
		*/}
		var comments;
		if(this.state.result['result'] !== undefined){
			comments = this.state.result['result'].map(comment => <Comment key={comment.id} id={comment.id} nickname={comment.nickname} comment={comment.comment} created={comment.created} />)
		}

		return(
			<div className='elementPopup'>
				<button onClick={this.props.closePopup}>X</button>
				<div className='elementPopup-inner'>
					<div className='elementPopup-left'>
						<img src={'http://52.9.186.77/get-images?name=' + this.props.imgSrc} alt='element-pic' />
					</div>
					<div className='elementPopup-right'>
						<div className='elementPopup-comment'>
							<div className='title'>
							<b>{this.props.title} </b>
							{this.props.description}
							</div>
							<div className='comments'>
								<ul>
								{/*Attach every comment*/}
									{comments}
								</ul>
							</div>
							<div className='post-comment'>
								<div className='nickname-area'>
									<input type="text" name="id" placeholder='Nickname here...' onChange={(e)=>this.handleNicknameInput(e)} value={this.state.nickname}/>
								</div>

								<div className='comment-area'>
									<textarea placeholder='Add a comment...' onChange={(e)=>this.handleCommentInput(e)} value={this.state.comment}></textarea>
									<button onClick={this.postComment.bind(this)} className='postButton'>Post</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			)
		}
	}

	export default ElementPopup
