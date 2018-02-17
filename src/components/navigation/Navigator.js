import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';

import Container from '../helpers/Container';
import NavActionHelper from './NavActionHelper';

import Catalog from '../catalog/Catalog';
import Login from '../profile/Login'

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
    return (
      <View style={{ flex: 1 }}>
        {this.props.state.active[2]}
      </View>
    )
  }
}

class Navigator extends Component {
  constructor(props) {
    super(props);

    this.state = { active: ['Browse', 'local-library', <Catalog />] };
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
            content={<Catalog />}
          />
          <NavActionHelper
            name="Checked Out"
            icon="playlist-add-check"
            controller={this}
            content={<Text>Checked Out</Text>}
          />
          <NavActionHelper
            name="Bookmarks"
            icon="bookmark-border"
            controller={this}
            content={<Text>Bookmarks</Text>}
          />
          <NavActionHelper
            name="Profile"
            icon="account-circle"
            controller={this}
            content={<Login />}
          />
        </BottomNavigation>
      </Container>
    );
  }
}

Navigator.propTypes = propTypes;

export default Navigator;
