import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class CommunityEvent extends React.Component {
  render() {
    const headerStyle = { paddingTop: '25px', paddingBottom: '25px', paddingLeft: '100px', paddingRight: '100px', backgroundColor: 'rgba(2, 71, 49, 0.7)' };
    const columnStyle = { backgroundColor: 'rgba(2, 71, 49, 0.7)' };
    return (
      <div className="uhmanoa-event-background">

        <Grid container centered stackable columns={4}>

          <Grid.Row>
            <Header as='h1' style={headerStyle} icon textAlign='center' inverted>
              <Header.Content>Community Events</Header.Content>
              <Header.Subheader>Find out what&apos;s happening in your community</Header.Subheader>
            </Header>
          </Grid.Row>

          <Grid celled style={columnStyle}>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header as='h3' icon textAlign='left' inverted>
                  <Header.Content>Event 1</Header.Content>
                  <Header.Subheader>Date</Header.Subheader>
                  <Header.Subheader>Insert image here</Header.Subheader>
                </Header>
              </Grid.Column>
              <Grid.Column width={13}>
                <Header as='h3' icon textAlign='left' inverted>
                  <Header.Subheader>Insert Description Here</Header.Subheader>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid celled style={columnStyle}>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header as='h3' icon textAlign='left' inverted>
                  <Header.Content>Event 2</Header.Content>
                  <Header.Subheader>Date</Header.Subheader>
                  <Header.Subheader>Insert image here</Header.Subheader>
                </Header>
              </Grid.Column>
              <Grid.Column width={13}>
                <Header as='h3' icon textAlign='left' inverted>
                  <Header.Subheader>Insert Description Here</Header.Subheader>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid celled style={columnStyle}>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header as='h3' icon textAlign='left' inverted>
                  <Header.Content>Event 3</Header.Content>
                  <Header.Subheader>Date</Header.Subheader>
                  <Header.Subheader>Insert image here</Header.Subheader>
                </Header>
              </Grid.Column>
              <Grid.Column width={13}>
                <Header as='h3' icon textAlign='left' inverted>
                  <Header.Subheader>Insert Description Here</Header.Subheader>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid celled style={columnStyle}>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header as='h3' icon textAlign='left' inverted>
                  <Header.Content>Event 4</Header.Content>
                  <Header.Subheader>Date</Header.Subheader>
                  <Header.Subheader>Insert image here</Header.Subheader>
                </Header>
              </Grid.Column>
              <Grid.Column width={13}>
                <Header as='h3' icon textAlign='left' inverted>
                  <Header.Subheader>Insert Description Here</Header.Subheader>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid celled style={columnStyle}>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header as='h3' icon textAlign='left' inverted>
                  <Header.Content>Event 5</Header.Content>
                  <Header.Subheader>Date</Header.Subheader>
                  <Header.Subheader>Insert image here</Header.Subheader>
                </Header>
              </Grid.Column>
              <Grid.Column width={13}>
                <Header as='h3' icon textAlign='left' inverted>
                  <Header.Subheader>Insert Description Here</Header.Subheader>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>

        </Grid>
      </div>
    );
  }
}

export default CommunityEvent;
