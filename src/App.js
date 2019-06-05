import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    catFact: ""
  };

  componentDidMount() {
    this.getRandomCatFact();
  }

  getRandomCatFact = () => {
    axios.get("https://cors-anywhere.herokuapp.com/https://cat-fact.herokuapp.com/facts/random").then(response => {
      this.setState({
        catFact: response.data.text
      })
    });
  }

  render() {
    return (
      <div>
        <p> {this.state.catFact} </p>
        <button onClick={this.getRandomCatFact}> Meow! </button>
      </div>
    );
  }
}

export default App;