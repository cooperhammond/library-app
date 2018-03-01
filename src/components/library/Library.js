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
    fontSize: 20,
    margin: 10,
  }
});

class BookList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.catalog.length > 0) {
      return (
        <View>
          <Text style={styles.text}>{this.props.text}</Text>
          <FlatList
            data={this.props.catalog}
            renderItem={({item}) => {
              return (
                <ListItem
                  divider
                  centerElement={item.title}
                  onPress={() => this.props.onPress(item)}
                />
              );
            }}
          />
        </View>
      );
    } else {
      return(<View></View>)
    }
  }
}

class Library extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: false,
      height: 400,
      catalog: require('../../../assets/data/catalog.json'),
      checkedOut: [],
      reserved: [],
    };

    this.getUser = this.getUser.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.updateMyBooks = this.updateMyBooks.bind(this);
    this.renderer = this.renderer.bind(this);

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
  };

  renderer = () => {
    if (this.state.user != false) {
      if (this.state.checkedOut.length > 0 || this.state.reserved.length > 0) {
        return (
          <View>
            <BookList
              catalog={this.state.checkedOut}
              text="Checked Out"
              onPress={this.handlePress}
            />
            <BookList
              catalog={this.state.reserved}
              text="Reserved"
              onPress={this.handlePress}
            />
          </View>
        );
      } else {
        return(
          <Text style={{
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
          }}>
            (You don't have any books checked out or reserved!)
          </Text>
        );
      }
    } else {
      return (
        <Text style={{
          fontSize: 20,
          textAlign: 'center',
          margin: 10,
        }}>
          (You're not logged in! You don't have any books!)
        </Text>
      );
    }
  };

  render() {
    return (
      <View ref="default">

        <Toolbar
          leftElement={
            <Image
              style={{
                height: 35,
                width: 35
              }}
              source={require('../../../assets/img/miskatonic.png')}
            />
          }
          centerElement="My Books"
        />

        {this.renderer()}

      </View>
    );
  };
}

export default Library;
