import React, { Component } from 'react';


class Poll extends Component {
    componentWillMount() {
        this.setState({topics: this.props.i.topics})
        console.log('state: ' , this.state)
    }

    postVote = (poll,topic) => {
        const topicArr = this.state.topics.map(x => x.topic)
        const topicIndex = topicArr.indexOf(topic.topic)
        
        fetch(`http://localhost:8080/api/v1/polls/${poll._id}/${topic.topic}/vote`, { method: 'post', credentials: 'same-origin' })
        .then(()=>{
            const incrementedTopics = this.state.topics.map( (curTopic,index) => {
                if(topicIndex === index) {
                    curTopic.votes += 1;
                    console.log(curTopic.votes)
                }
                return curTopic 
                
            })
            
            this.setState({topics:incrementedTopics})
        })
    }
    handleNewTopic = (pollId) => {
        console.log(pollId)
    }
    
    render() {
      const i = this.props.i;
      console.log('render')
      return (
          <div className='topic-container container'>
        <div className='flex'>
            <h3 className="title border">{i.title ? i.title : 'no title'} </h3>
            <button className='new-topic-btn' onClick={()=> this.handleNewTopic(i._id)}>create a new topic +</button>
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
