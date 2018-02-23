import React, { Component } from 'react';

import {
  View,
  Text,
  StatusBar
} from 'react-native';

import Container from '../helpers/Container';

import Catalog from '../catalog/Catalog';
import CheckOut from '../catalog/CheckOut';
import Login from '../profile/Login';
import Map from '../map/Map';

import {
  Toolbar,
  BottomNavigation,
  Icon
} from 'react-native-material-ui';

import { StackNavigator } from 'react-navigation';

class ContentRenderer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.state.active[1]}
      </View>
    )
  }
}

class Navigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: ["Browse", <Catalog />],

      buttons: [
        {
          key: "Browse",
          icon: "local-library",
          content: <Catalog 
            navigation={RootStack} 
          />
        },
        {
          key: "Yours",
          icon: "playlist-add-check",
          content: <Text>Checked Out | Reserved</Text>
        },
        {
          key: "Map",
          icon: "map",
          content: <Map />
        },
        {
          key: "Profile",
          icon: "account-circle",
          content: <Login />
        },
      ]
    };

    this.buttons = this.state.buttons.map((button) => {
      return (
        <BottomNavigation.Action
          key={button.key}
          icon={button.icon}
          label={button.key}
          onPress={() => {
            this.setState({active: [button.key, button.content]})
          }}
        />
      )
    })

  };

  render() {
    return (
      <Container>
        <StatusBar hidden={true} />

        <ContentRenderer state={this.state} />

        <BottomNavigation active={this.state.active[0]} >

          {this.buttons}

        </BottomNavigation>
      </Container>
    );
  };
}

const RootStack = StackNavigator(
  {
    NavigatorScreen: {
      screen: Navigator,
    },
    CheckOutScreen: {
      screen: CheckOut,
    },
  },
  {
    initialRouteName: 'NavigatorScreen',
  }
);

export default RootStack;
