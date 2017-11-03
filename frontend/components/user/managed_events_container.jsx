import React from 'react';
import { connect } from 'react-redux';
import { fetchEvents } from '../../actions/event_actions';
import { fetchCategories } from '../../actions/category_actions';
import EventIndex from '../events/event_index';
import { createSave, deleteSave } from '../../actions/save_actions';

const mapStateToProps = (state, ownProps) => {
  
  let categories = state.entities.categories
  let currentUser;
  // if (ownProps.match.params.userId === state.session.currentUser.id){
    currentUser = state.session.currentUser
  // } else {
    // this will be the organizer's data being selected
    // currentUser = state.entities.users[ownProps.match.params.userId]
  // }

  let allEvents = Object.keys(state.entities.events).map((id) => state.entities.events[id])
  let events = allEvents.filter((event) => state.session.currentUser.managed_events.includes(event.id))
  return {
    currentUser,
    events,
    categories
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
    createSave: (id) => dispatch(createSave(id)),
    deleteSave: (id) => dispatch(deleteSave(id)),
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventIndex);