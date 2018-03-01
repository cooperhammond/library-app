import React, { Component } from 'react';

import {
  Text,
  Image,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {
  Toolbar,
  ListItem,
} from 'react-native-material-ui';

import { CheckOut } from '../catalog/CheckOut'

import easyAsync from '../helpers/easyAsync';


const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  }
});


class Library extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      height: 400,
      catalog: require('../../../assets/data/catalog.json'),
      checkedOut: [],
      reserved: [],
    };

    this.getUser = this.getUser.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.updateMyBooks = this.updateMyBooks.bind(this);

    this.getUser();
    this.updateMyBooks();
  }

  getUser = () => {
    easyAsync.getItem("loggedIn").then((value) => {
      this.setState({user: value});
    });
  };

  handlePress = (item) => {
    this.props.navigation.navigate('CheckOutScreen', {
      navigation: this.props.navigation,
      item: item
    });
  };

  updateMyBooks = () => {
    if (this.refs.default) { // Evade a warning
      this.setState({checkedOut: []});
      this.setState({reserved: []});
    }

    for (var i = 0; i < this.state.catalog.length; i++) {
      let item = this.state.catalog[i];

      easyAsync.getItem("checkedOut:" + item.title).then((value) => {
        if (value == this.state.user) {
          this.setState({
            checkedOut: this.state.checkedOut.concat([item])
          });
        }
      });

      easyAsync.getItem("reserved:" + item.title).then((value) => {
        if (value == this.state.user) {
          this.setState({
            reserved: this.state.reserved.concat([item])
          });
        }
      });

    }
  }

  render() {
    return (
      <View ref="default">

        <Toolbar
          centerElement="My Books"
        />

        <Text style={styles.text}>Checked Out</Text>
        <FlatList
          data={this.state.checkedOut}
          renderItem={({item}) => {
            return (
              <ListItem
                divider
                centerElement={item.title}
                onPress={() => this.handlePress(item)}
              />
            );
          }}
        />
        
        <Text style={styles.text}>Reserved</Text>
        <FlatList
          data={this.state.reserved}
          renderItem={({item}) => {
            return (
              <ListItem
                divider
                centerElement={item.title}
                onPress={() => this.handlePress(item)}
              />
            );
          }}
        />
      </View>
    );
  };
}

export default Library;
