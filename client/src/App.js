import React, { Component } from 'react';
import Main from './components/Main'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      res: ''
    }
  }

  callAPI(){
    fetch('http://localhost:9000/server')
    .then(res => res.text())
    .then(res => this.setState({
      res: res
    }))
    .catch(err => err);
  }

  componentDidMount(){
  {/*this.callAPI()*/}
  }
  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;
