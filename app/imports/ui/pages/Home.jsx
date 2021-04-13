import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Home extends React.Component {
  render() {
    const headerStyle = { backgroundColor: 'rgba(2, 71, 49, 0.7)' };
    const columnStyle = { marginTop: '125px', backgroundColor: 'rgba(2, 71, 49, 0.7)' };
    return (
      <div className="uhmanoa-landing-background">

        <div>
          <Header as='h1' style={headerStyle} icon textAlign='center' inverted>
            <Header.Content>WELCOME TO UH-RATINGS</Header.Content>
            <Header.Subheader>Click a link at the top left to get started</Header.Subheader>
          </Header>
        </div>

        <Grid container centered stackable columns={4}>

          <Grid.Column style={columnStyle} textAlign='center'>
            <Icon size='big' name='user' inverted/>
            <Header as={'h3'} inverted>Professors</Header>
            <Header as={'h4'} inverted>See what other UH students have to say about the professors at UH Manoa.</Header>
          </Grid.Column>

          <Grid.Column style={columnStyle} textAlign='center'>
            <Icon size='big' name='star' inverted/>
            <Header as={'h3'} inverted>Course Reviews</Header>
            <Header as={'h4'} inverted>See what other UH students have to say about the courses offered at UH Manoa.</Header>
          </Grid.Column>

          <Grid.Column style={columnStyle} textAlign='center'>
            <Icon size='big' name='users' inverted/>
            <Header as={'h3'} inverted>Community Events</Header>
            <Header as={'h4'} inverted>Find out recent events happening in the UH community.</Header>
          </Grid.Column>

          <Grid.Column style={columnStyle} textAlign='center'>
            <Icon size='big' name='filter' inverted/>
            <Header as={'h3'} inverted>Filter</Header>
            <Header as={'h4'} inverted>Filter courses and professors to find exactly what you&apos;re looking for.</Header>
          </Grid.Column>

        </Grid>
      </div>
    );
  }
}

export default Home;
