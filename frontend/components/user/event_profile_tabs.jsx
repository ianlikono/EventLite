import React from 'react';
import SavedEventsContainer from './saved_events_container';
import UpcomingEventsContainer from './upcoming_events_container';
import PastEventsContainer from './past_events_container';

const tabNames = ['Upcoming Events','Saved Events', 'Past Events']
const panes = [UpcomingEventsContainer,SavedEventsContainer, PastEventsContainer]


class EventProfileTabs extends React.Component{
  constructor(props){
    super(props);
    this.state = { tabsIndex:  0};
  }


  clickHandler(e) {
    var idx = e.target.getAttribute("idx");
    idx = parseInt(idx);
    this.setState({tabsIndex: idx});
  }



  render(){

    const tabs = tabNames.map( (name, idx) => {
      if (idx === this.state.tabsIndex) {
        return <div key={idx} className="active tab">
          <h1  idx={idx} >{name}</h1>
          <div className='active-border'></div>
        </div>
      } else {
        return <h1 className='non-active tab' idx={idx} key={idx} onClick={this.clickHandler.bind(this)}>{name}</h1>;
      }
    });

    const Component = panes[this.state.tabsIndex];
    return (
      <div className='event-indicies'>
        <div className='tabs-container'>
          <ul className='tabs'>
            {tabs}
          </ul>
          <div className='content-container'>
            <div className='content'><Component/></div>

          </div>
        </div>

      </div>
    );
  }
}

export default EventProfileTabs;
