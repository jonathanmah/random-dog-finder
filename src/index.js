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
      fullyRendered: false,
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
    this.setState({loading:true});
    fetch("https://random.dog/woof.json")
    .then(response => response.json())
    .then(data => {
        this.setState({
          loading: false,
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
      });
  }

  setLoadingFalse = () => {
    this.setState({
        loading: false,
    });
  }

  renderImage(){
    const {url, loading} = this.state;
    return loading ? 
    <div className = "spinner">
      <Spinner animation = "border"/>
    </div>
    : <img style={this.state.fullyRendered ? {} : {display: 'none'}} className = "photo" src = {url} 
      onLoad = {() => this.setState({fullyRendered: true})} onError = {this.handleClick}/>;  
  }

  render(){
    let color = this.headerColor;
    const {headerStyle, start, buttonColor} = this.state;
    return (
    <div>
      <div>
        <h1 style={headerStyle}>Random Dog Finder</h1>
      </div>
      <div>
        {!start && this.renderImage()}
      </div>
      <div style={ 
        {
        position: 'absolute',
        bottom: '30px',
        textAlign: 'center',
        width: '100%'
        }
        }>
        <Button  size = "lg" variant={buttonColor} onClick= {this.handleClick}> FIND RANDOM DOG </Button>{' '}
      </div>
    </div>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
  