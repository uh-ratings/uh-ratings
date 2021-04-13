import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const rowStyle = { marginTop: '125px', backgroundColor: 'rgba(2, 71, 49, 0.7)'};
    const columnStyle = {};
    return (
      <div className="uhmanoa-landing-background">
        <Grid container centered stackable columns={3}>
          <Grid.Row style={rowStyle}>
            <Grid.Column style={columnStyle} textAlign='center' >
              <Icon size='huge' name='users' inverted/>
              <Header as={'h1'} inverted>Course Review</Header>
              <Header as={'h3'} inverted>Every student can rate and leave a review that helps future students make better decisions about
                what course to take. It can help save time and tuition money.</Header>
            </Grid.Column>

            <Grid.Column style ={columnStyle} textAlign='center'>
              <Icon size='huge' name='file alternate' inverted/>
              <Header as={'h1'} inverted>Professor Review</Header>
              <Header as={'h3'} inverted>Reviews for professors are done a little diferently. Rather than having students
                personally rate each professor, their ratings are reflected off the ratings of their courses.</Header>
            </Grid.Column>

            <Grid.Column style ={columnStyle} textAlign='center'>
              <Icon size='huge' name='calendar check' inverted/>
              <Header as={'h1'} inverted>Community Events</Header>
              <Header as={'h3'} inverted>For both members and people passing by, community event info is available for everyone. It helps
                the community work together and stay close.</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Landing;
