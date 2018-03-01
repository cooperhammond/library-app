import React, { Component } from 'react';

import {
  View,
  StatusBar
} from 'react-native';

import {
  BottomNavigation,
} from 'react-native-material-ui';

import { StackNavigator } from 'react-navigation';

import Container from '../helpers/Container';

import Catalog from '../catalog/Catalog';
import CheckOut from '../catalog/CheckOut';
import Library from '../library/Library';
import Map from '../map/Map';
import Login from '../profile/Login';

import easyAsync from '../helpers/easyAsync';



class ContentRenderer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.state.buttons[this.props.state.active].content}
      </View>
    );
  }
}


class Navigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: "0",

      buttons: [
        {
          key: "0",
          label: "Browse",
          icon: "local-library",
          content: <Catalog
            navigation={this.props.navigation}
          />
        },
        {
          key: "1",
          label: "Yours",
          icon: "playlist-add-check",
          content: <Library
            navigation={this.props.navigation}
          />
        },
        {
          key: "2",
          label: "Map",
          icon: "map",
          content: <Map />
        },
        {
          key: "3",
          label: "Profile",
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
          label={button.label}
          onPress={() => {
            this.setState({active: button.key});
          }}
        />
      );
    });

    easyAsync.getItem("loggedIn").then((value) => {
      if (value == null) {
        easyAsync.setItem("loggedIn", false);
      }
    });

  }

  render() {
    return (
      <Container>
        <StatusBar hidden={true} />

        <ContentRenderer state={this.state} />

        <BottomNavigation active={this.state.active} >

          {this.buttons}

        </BottomNavigation>
      </Container>
    );
  }
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
    navigationOptions: {
      header: null
    }
  },
);

export default RootStack;
