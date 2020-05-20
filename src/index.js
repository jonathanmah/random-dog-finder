import React from 'react';
import ReactDOM from 'react-dom';
  
class App extends React.Component {
  render(){
    return (
      <DogImage />
    );
  };
}

class DogImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: "",
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    fetch("https://random.dog/woof.json")
    .then(response => response.json())
    .then(data => {
        this.setState({url: data.url});
      });
  }
  render(){
    return (
    <div>
      <div>
      <button onclick={this.handleClick()}>Click me</button>
      </div>
      <div>
        <img src = {this.state.url} alt = "new" />
      </div>
    </div> 
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
  