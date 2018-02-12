import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
// import { PropTypes } from 'prop-types';

import Container from './helpers/Container'
import NavIcon from './helpers/NavIcon'

import { Toolbar, BottomNavigation, Icon } from 'react-native-material-ui';

const propTypes = {
    /* navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
    }).isRequired, */
};

class Navigator extends Component {
  constructor(props) {
    super(props);

    this.state = { active: ['account-circle', 'Profile'] };
  }
  componentWillUpdate
  render() {
    return (
      <Container>
        <StatusBar hidden={true} />

        <Toolbar
          centerElement={this.state.active[1]}
        />

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={this.state.active[0]} size={100} />
        </View>

        <BottomNavigation active={this.state.active[0]} >
          <BottomNavigation.Action
            key="local-library"
            icon={<NavIcon name="local-library" />}
            onPress={() => this.setState({
              active: ['local-library', 'Browse']
            })}
          />
          <BottomNavigation.Action
            key="playlist-add-check"
            icon={<NavIcon name="playlist-add-check" />}
            onPress={() => this.setState({
              active: ['playlist-add-check', 'Checked Out']
            })}
          />
          <BottomNavigation.Action
            key="bookmark-border"
            icon={<NavIcon name="bookmark-border" />}
            onPress={() => this.setState({
              active: ['bookmark-border', 'Bookmark']
            })}
          />
          <BottomNavigation.Action
            key="account-circle"
            icon={<NavIcon name="account-circle" />}
            onPress={() => this.setState({
              active: ['account-circle', 'Profile']
            })}
          />
        </BottomNavigation>
      </Container>
    );
  }
}

Navigator.propTypes = propTypes;

export default Navigator;
