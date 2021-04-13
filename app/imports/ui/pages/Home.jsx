import React from 'react';
import { Grid, Header, Image, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Home extends React.Component {
  render() {
    return (
      <div className="home">

        <div>
          <Header as='h1' icon textAlign='center' inverted>
            <Header.Content>WELCOME TO UH-RATINGS</Header.Content>
            <Header.Subheader>Click a link at the top left to get started</Header.Subheader>
          </Header>
        </div>

        <Grid container centered stackable columns={4}>

          <Grid.Column textAlign='center'>
            <Icon size='big' name='user' inverted/>
            <Header as={'h3'} inverted>Professor Reviews</Header>
            <Header as={'h4'} inverted>See what other UH students have said about the professors at UH Manoa.</Header>
          </Grid.Column>

          <Grid.Column textAlign='center'>
            <Icon size='big' name='star' inverted/>
            <Header as={'h3'} inverted>Course Reviews</Header>
            <Header as={'h4'} inverted>See what other UH students have said about the courses offered at UH Manoa.</Header>
          </Grid.Column>

          <Grid.Column textAlign='center'>
            <Icon size='big' name='users' inverted/>
            <Header as={'h3'} inverted>Community Events</Header>
            <Header as={'h4'} inverted>Find out recent events happening in the UH community.</Header>
          </Grid.Column>

          <Grid.Column textAlign='center'>
            <Icon size='big' name='filter' inverted/>
            <Header as={'h3'} inverted>Filter</Header>
            <Header as={'h4'} inverted>Filter courses and professors to find the one that suits you the best.</Header>
          </Grid.Column>

          <div>
            <Image centered bordered src="https://www.khon2.com/wp-content/uploads/sites/8/2020/10/10-11-uh.jpg?w=876&h=493&crop=1"/>
          </div>

        </Grid>
      </div>
    );
  }
}

export default Home;
