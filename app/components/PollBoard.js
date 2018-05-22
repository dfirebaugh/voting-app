import React, { Component } from 'react';
import Poll from './Poll';

const polls = (arr) => {
    return arr.map( (i,index) => {
        return <Poll i={i} />
    })
}
class PollBoard extends Component {
    componentDidMount(){
        this.getBounties();
    }
    getBounties = () => {
        fetch(`http://localhost:8080/api/v1/polls/`, { credentials: 'same-origin' })
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({ polls: responseJson })
          })
          .catch((error) => {
            console.error(error);
          });
      }
  render() {
      this.state && console.log(this.state.polls)
    return (
      <div className=' jumbotron container' >
      {this.state ? polls(this.state.polls) : <h2> no polls have been created -- create one </h2>}
      
        <style jsx>{`
        .container {
            padding-left:15px
            background: darkgrey;
            // border:red 1px solid;
        }
        

      `
        }
        </style>

      </div>
    );
  }
}

export default PollBoard;
