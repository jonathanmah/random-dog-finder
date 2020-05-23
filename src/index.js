import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
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
      loading: false,
      url: "",
      buttonColor: "primary",
      start: true,
      headerStyle: {
        textAlign: 'center',
        color: 'black',
        marginTop: '30px',
        marginBottom: '60px'
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
          loading: true,
          url: data.url,
          buttonColor: this.variantArr[Math.floor(Math.random() * this.variantArr.length)],
          start: false,
          headerStyle : {
            textAlign: 'center',
            color : this.colorArr[Math.floor(Math.random() * this.colorArr.length)],
            marginTop: '30px',
            marginBottom: '60px'
          },
        });
        if(! (<img src = {this.state.url}/>)){
          this.handleClick();
        }
      });
  }

  setLoadingFalse = () => {
    this.setState({
        loading: false,
        url: this.state.url,
        buttonColor: this.state.buttonColor,
        start: this.state.start,
        headerStyle : this.state.headerStyle
    });
  }

  renderImage(){
    let img = <img className = "photo" src = {this.state.url} onLoad = {this.setLoadingFalse} onError = {this.handleClick} />
    return this.state.loading ? <Spinner animation = "border"/> : img;
  }

  render(){
    let color = this.headerColor;
    return (
    <div>
      <div>
        <h1 style = {this.state.headerStyle}>Random Dog Finder</h1>
      </div>
      <div>
        {!this.state.start && this.renderImage()}
      </div>
      <div style = { 
        {
        position: 'absolute',
        bottom: '30px',
        textAlign: 'center',
        width: '100%'
        }
        }
      >
        <Button  size = "lg" variant={this.state.buttonColor} onClick= {this.handleClick}> FIND RANDOM DOG </Button>{' '}
      </div>
    </div> 
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
  