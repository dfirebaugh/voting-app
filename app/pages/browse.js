import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import Theme from '../components/Theme';
import NavMenu from '../components/NavMenu';
import PollBoard from '../components/PollBoard';

class Browse extends Component {
    constructor(){
        super();
        this.state={
            currentUser:''
        }
    }
    componentDidMount() {
        this.getUser();
        this.getPolls();
    }
    getUser = () => {
        fetch(`http://localhost:8080/api/v1/users/currentUser/`, { credentials: 'same-origin' })
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({ currentUser: responseJson })
          })
          .catch((error) => {
            console.error(error);
        });
    }
    getPolls = () => {
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
        return (
            <Theme>
                <NavMenu />
                <div className="info-text">
                {this.state.currentUser && this.state.polls &&
                    <PollBoard user={this.state.currentUser} polls={this.state.polls} update={() => this.getPolls()}/>
                 }
                </div>

                {/* Styling using styled-jsx. */}
                <style jsx>{`
                    .info-text {
                        padding:15px
                    }`
                }
                </style>
            </Theme>
        );
    }
}

export default Browse;
