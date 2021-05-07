import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px', color: 'white' };
    return (
      <footer>
        <div style={divStyle} className="ui center aligned container">
          <hr/>
          <Grid container columns={3}>
            <Grid.Column>
              <a href="https://github.com/uh-ratings"> <h3> Contact Us </h3></a><br/>
              UH-Ratings team and members: <br/>
              <a href="https://chowc89.github.io/"> Clement </a> <br/>
              <a href="https://hangbozhang.github.io/"> Hangbo </a> <br/>
              <a href="https://nicoelee123.github.io/"> Nicholas </a> <br/>
              <a href="https://rabitz808.github.io/"> Rafael </a> <br/>
              <a href="https://taylorwwong.github.io/"> Taylor </a> <br/>
            </Grid.Column>
            <Grid.Column>
              <Image size='small' src='images/UHratings.png' spaced='left'/>
            </Grid.Column>
            <Grid.Column>
              <a href="https://github.com/uh-ratings/uh-ratings"> <h3>Source Code</h3> </a><br/>
              Application built using the help of UH ICS meteor template <br/>
            </Grid.Column>
          </Grid>
        </div>
      </footer>
    );
  }
}

export default Footer;
