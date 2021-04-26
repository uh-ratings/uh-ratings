import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

/** A simple static component to render some text for the landing page. */
class CommunityEvent extends React.Component {

  state = {
    events: [
      {
        start: moment().toDate(),
        end: moment()
          .add(1, 'days')
          .toDate(),
        title: 'Event 1',
      },
      {
        start: moment().toDate(),
        end: moment()
          .add(2, 'days')
          .toDate(),
        title: 'Event 2',
      },
    ],
  };

  render() {
    return (
      <div className="uhmanoa-event-background">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: '1000px' }}
        />
      </div>
    );
  }
}

export default CommunityEvent;
