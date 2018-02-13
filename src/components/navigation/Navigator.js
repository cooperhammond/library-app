import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';

import Container from '../helpers/Container';
import NavActionHelper from './NavActionHelper';

import Catalog from '../catalog/Catalog';

import { Toolbar, BottomNavigation, Icon } from 'react-native-material-ui';

const propTypes = {
    /* navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
    }).isRequired, */
};

class ContentRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return(
      <Catalog />
    )
  }

  /* render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={this.props.state.active[1]} size={100} />
        <Text>{this.props.state.active[0]}</Text>
      </View>
    )
  } */
}

class Navigator extends Component {
  constructor(props) {
    super(props);

    this.state = { active: ['Browse', 'local-library'] };
  }

  render() {
    return (
      <Container>
        <StatusBar hidden={true} />

        <ContentRenderer state={this.state} />

        <BottomNavigation active={this.state.active[1]} >
          <NavActionHelper
            name="Browse"
            icon="local-library"
            controller={this}
          />
          <NavActionHelper
            name="Checked Out"
            icon="playlist-add-check"
            controller={this}
          />
          <NavActionHelper
            name="Bookmarks"
            icon="bookmark-border"
            controller={this}
          />
          <NavActionHelper
            name="Profile"
            icon="account-circle"
            controller={this}
          />
        </BottomNavigation>
      </Container>
    );
  }
}

Navigator.propTypes = propTypes;

export default Navigator;
