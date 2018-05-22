'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  topic: {
    type: String,
    unique: true
  },
  votes: {
    type: Number,
    default: 0
  }
})

TopicSchema.method('vote', (vote, cb) => {
  this.votes += 1;
  this.parent().save(cb);
})

const PollSchema = new Schema({
  title: String,
  createdBy: String,
  topics: [TopicSchema]
  
  // [{
  //   topicid: Number,
  //   name:String, 
  //   votes:Number
  // }]
});

module.exports = mongoose.model('Poll', PollSchema);