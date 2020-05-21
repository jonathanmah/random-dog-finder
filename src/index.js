import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class App extends React.Component {
  render(){
    return (
          <DogImage />
    );
  };
}

class DogImage extends React.Component {
  variantArr =  [
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "info",
    "light",
    "dark",
    "link"
  ];
  colorArr = [
    'black',
    'red',
    'green',
    'blue',
    'lightblue',
    'orange',
    'purple',
    'gold'
  ]

  constructor(props) {
    super(props);
    this.state = {
      url: "",
      buttonColor: "primary",
      start: true,
      headerStyle: {
        transform: 'translate(35%, 80%)',
        color: 'black',
      }
    }

    this.handleClick = this.handleClick
    .bind(this);
  }

  handleClick = () => {
    fetch("https://random.dog/woof.json")
    .then(response => response.json())
    .then(data => {
        this.setState({
          url: data.url,
          buttonColor: this.variantArr[Math.floor(Math.random() * this.variantArr.length)],
          start: false,
          headerStyle : {
            transform: 'translate(35%, 80%)',
            color : this.colorArr[Math.floor(Math.random() * this.colorArr.length)]
          },
        });
        if(! (<img src = {this.state.url}/>)){
          this.handleClick();
        }
      });
  }

  renderImage(){
    return <img className = "photo" src = {this.state.url} onError = {this.handleClick} />
  }
  render(){
    let color = this.headerColor;
    return (
    <div>
      <div>
        <h1 style = {
          this.state.headerStyle
          }>
          Random Dog Generator</h1>
      </div>
      <div style = { //800
        {transform: 'translate(800px, 800px)'}
      }>
      <Button  size = "lg" variant={this.state.buttonColor} onClick= {this.handleClick}> FIND RANDOM DOG </Button>{' '}
      </div>
      <div style = {
        {
          transform: 'translate(525px,30px)'
        }
      }>
        {!this.state.start && this.renderImage()}
      </div>
    </div> 
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
  