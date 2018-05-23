import React, { Component } from 'react';
import Poll from './Poll';

const polls = (arr, fn) => arr.map((i, index) => <Poll i={i} update={fn} />);

class PollBoard extends Component {
    constructor() {
        super();
        this.state = {
            toggleNewPoll: false,
            inputValue: '',
            toggle:false
        };
    }
    handleInputChange = (e) => {
      this.setState({inputValue: e.target.value})
    }
    handleNewPoll = () => {

      let bodyData = JSON.stringify({
        title: this.state.inputValue, 
        createdBy: this.props.user.userName
      })

      console.log(bodyData)
      fetch(`http://localhost:8080/api/v1/polls/`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          "Content-type": "application/json"
        },
        body: bodyData
      })
      .then(()=>{
        this.setState({inputValue: '', toggleNewPoll:false})
        this.props.update()
      })
    }
    runUpdate = () => {
      this.props.update()
      this.setState({toggle: !this.state.toggle})
    }
    render() {
      const newPoll = (
            <div>
                <input type="text" value={this.state.inputValue} placeholder="title" onChange={(e) => this.handleInputChange(e)} />
                <button onClick={()=> this.handleNewPoll()}> Submit Poll</button>
            </div>);
            
        return (
            <div className=" jumbotron container" >
                <button onClick={() => this.setState({ toggleNewPoll: !this.state.toggleNewPoll })}> New Poll </button>
                { this.state && this.state.toggleNewPoll && newPoll}

                { this.props.polls.length > 0 ? polls(this.props.polls, () => this.runUpdate()) : <h2> no polls have been created -- create one </h2>}

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
