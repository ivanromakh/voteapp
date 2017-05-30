import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Polls } from '../../api/polls/polls';
import { Questions } from '../../api/questions/questions';

import Voting from './Voting/Voting';


export default createContainer(({ pollId }) => {
  const subsHandler = Meteor.subscribe('polls.view', pollId);

  return {
    loading: !subsHandler.ready(),
    onUnmount: subsHandler.stop,
    poll: Polls.findOne({ _id: pollId }),
    questions: Questions.find({ pollId }).fetch(),
  };
}, Voting);
