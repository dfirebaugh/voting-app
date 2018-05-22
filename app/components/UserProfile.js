import React, { Component } from 'react';
// import {Link} from 'react-router-dom';


class UserProfile extends Component {
  componentDidMount(){
      this.getProfile()
  }
  getProfile(){
    return fetch(`http://localhost:8080/api/v1/user/`, { credentials: 'same-origin' })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ userProfile: responseJson })
        })
        .catch((error) => {
            console.error(error);
        });
  }
  render() {
    return (
      <div className='container jumbotron' >
      <p>
          displayName: {this.state && this.state.userProfile.github.displayName}
      </p>
      <p>
      username: {this.state && this.state.userProfile.github.username}
      </p>
      <p>
          id: {this.state && this.state.userProfile.github.id}
      </p>
      <p>
          publicRepos: {this.state && this.state.userProfile.github.publicRepos}
      </p>
        <style jsx>{`
              `
        }
        </style>

      </div>
    );
  }
}

export default UserProfile;
