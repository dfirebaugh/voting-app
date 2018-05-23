import React, { Component } from 'react';


class Poll extends Component {
    constructor(){
        super();
        this.state = { inputValue: ''}
    }
    componentWillMount() {
        this.setState({topics: this.props.i.topics})
    }

    postVote = (poll,topic) => {
        const topicArr = this.state.topics.map(x => x.topic)
        const topicIndex = topicArr.indexOf(topic.topic)
        
        fetch(`/api/v1/polls/${poll._id}/${topic.topic}/vote`, { method: 'post', credentials: 'same-origin' })
        .then(()=>{
            const incrementedTopics = this.state.topics.map( (curTopic,index) => {
                if(topicIndex === index) {
                    curTopic.votes += 1;
                }
                return curTopic 
                
            })
            
            this.setState({topics:incrementedTopics})
        })
    }
    handleNewTopic = (pollId) => {

        fetch(`/api/v1/polls/${this.props.i._id}/${this.state.inputValue}/new`, {
            method: 'POST',
            credentials: 'same-origin'
      })
      .then(()=>{
        this.setState({inputValue: '', toggleNewPoll:false})
        window.location.reload()
      })

    }
    handleInputChange = (e) => {
        this.setState({inputValue: e.target.value})
        
      }
    deletePoll = (pollId) => {
        
        fetch(`/api/v1/polls/${pollId}/`, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: {
                "Content-type": "application/json"
              },
            body: JSON.stringify({ _id: pollId })
      }
    )
      .then(response => response.json())
      .then(()=> {
        window.location.reload()
      })
    }
    
    render() {
      const i = this.props.i;
      return (
          <div className='topic-container container'>
        <div className='flex'>
            <h3 className="title border">{i.title ? i.title : 'no title'} </h3>
            <button className='new-topic-btn' onClick={()=>this.setState({toggleVisibleTopic:!this.state.toggleVisibleTopic})}>create a new topic +</button>
            <button className='btn-danger' onClick={() => this.deletePoll(i._id)}> DELETE</button>
            {this.state.toggleVisibleTopic &&
                <div >
                    <input type="text" 
                        value={this.state.inputValue} 
                        placeholder="title" 
                        onChange={(e) => this.handleInputChange(e)} />

                    <button onClick={()=>this.handleNewTopic(i._id)}>Add Topic</button>
                </div>
            }
        </div>
            <ul className='topic-list '>
                { i.topics.map( (x, index )=> 
                (
                    <div key={x+index} className='topic'> 
                        <li className='vote-container' key={index+x.topic}>
                            <button className="col-md-2 border" onClick={() => this.postVote(i,x)}> vote! </button> 
                            
                            <div className='col-md-6 border'> {x.topic} </div>
                            <div className='col-md-6 border'> {x.votes} </div> 
                        </li> 
                    </div>
                )
                )
                }
                    
                <img className='test-image' src='http://2.bp.blogspot.com/-Z91ERKuYPM8/U8zkv7Ac9eI/AAAAAAAAWkA/MyXgCSw8jIE/s1600/Chuck+Norris+can+delete+the+Recycling+Bin.jpg' />
            </ul>
            <style jsx>{`
                .vote-container{
                    display:flex;
                    // border:red 1px solid;
                    // text-align:center;
                    width: 100%;
                }
                flex{
                    display:flexbox;
                }
                .title{
                    width:10em;
                }
                .new-topic-btn{
                    // background:darkgrey;
                    // color:white;
                    // border:2px black solid;
                    margin-bottom:15px;
                    padding:5px;
                    height:4em;
                    width:12em;
                    // padding-top:10px;
                }
                .topic-list{
                    list-style-type:none;
                    text-align:center;
                    margin-top:15px;
                    width: 100%;
                } 
                .topic{
                    text-align:center;
                    // border:red 1px solid;
                    // width:80%;
                }
                .topic-container{
                    display:flex;
                    text-align:center;
                    background:lightgrey
                    // border:red 1px solid;
                    // width:80%;
                }
                .border{
                    // border:red solid 1px;
                }
                .test-image{
                    width:235px;
                    height:auto;
                }
                `
                }
            </style>
        </div>
    );
  }
}

export default Poll;
