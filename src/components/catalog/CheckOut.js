import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import {
  Toolbar,
  Button
} from 'react-native-material-ui';

import {
  CheckOutButton,
  ReturnButton,
  ReserveButton,
  UnreserveButton
} from './Buttons'

import easyAsync from '../helpers/easyAsync';


const styles = StyleSheet.create({
  rowContainer: {
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 8,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  }
});


class CheckOut extends Component {
  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;

    this.state = {
      item: params ? params.item : null,
      title: params ? params.item.title : null,
      checkedOut: null,
      reserved: null,
      user: null
    }

    this.getUser = this.getUser.bind(this)
    this.pullItemStatus = this.pullItemStatus.bind(this)
    this.updateItemStatus = this.updateItemStatus.bind(this)
    this.handleCheckOut = this.handleCheckOut.bind(this)
    this.handleReturn = this.handleReturn.bind(this)
    this.handleReserve = this.handleReserve.bind(this)
    this.handleUnreserve = this.handleUnreserve.bind(this)

    this.getUser()
    this.pullItemStatus()
  };

  getUser = () => {
    easyAsync.getItem("loggedIn").then((value) => {
      this.setState({user: value});
    });
  };

  pullItemStatus = () => {
    easyAsync.getItem("checkedOut:" + this.state.title).then((value) => {
      this.setState({checkedOut: value});
    });
    easyAsync.getItem("reserved:" + this.state.title).then((value) => {
      this.setState({reserved: value});
    })
  }

  updateItemStatus = () => {
    easyAsync.setItem("checkedOut:" + this.state.title, this.state.checkedOut)
    easyAsync.setItem("reserved:" + this.state.title, this.state.reserved)
  };

  handleCheckOut = () => {
    this.setState({checkedOut: this.state.user});
    this.updateItemStatus();
  };

  handleReturn = () => {
    this.setState({checkedOut: null});
    this.updateItemStatus();
  };

  handleReserve = () => {
    this.setState({reserved: this.state.user});
    this.updateItemStatus();
  };

  handleUnreserve = () => {
    this.setState({reserved: null});
    this.updateItemStatus();
  };


  render() {
    let checkOutButton = <Text>Something went wrong.</Text>
    if (this.state.checkedOut == this.state.user) {
      // You have the book and can return it.
      checkOutButton = <ReturnButton onPress={this.handleReturn} />
    } else if (this.state.checkedOut != this.state.user && this.state.checkedOut != null) {
      // Somebody else has the book so you can't check it out/
      checkOutButton = <CheckOutButton disabled onPress={null} />
    } else {
      // The book is free to check out.
      checkOutButton = <CheckOutButton onPress={this.handleCheckOut} />
    }

    let reserveButton = <Text>Something went wrong.</Text>
    if (this.state.reserved == this.state.user) {
      // You have the book reserved and you can unreserve it.
      reserveButton = <UnreserveButton onPress={this.handleUnreserve} />
    } else if (this.state.reserved != this.state.user && this.state.reserved != null) {
      // Somebody else has the book reserved so you can't.
      reserveButton = <ReserveButton disabled onPress={null} />
    } else {
      // The book is free to reserve.
      reserveButton = <ReserveButton onPress={this.handleReserve} />
    }

    return(
      <View>

        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => this.props.navigation.goBack()}
          centerElement={this.state.title}
        />

        <ScrollView>

          <Image
            source={{uri: this.state.item.cover.url}}
            resizeMode={'cover'}
            style={{ width: '100%', height: 300 }}
          />

          <Text style={styles.text}>
            <Text style={{fontWeight: 'bold'}}>{this.state.item.title}</Text>
            {' '}by{' '}
            <Text style={{fontStyle: 'italic'}}>{this.state.item.author}</Text>
          </Text>

          <View style={styles.rowContainer}>
            <View style={styles.button}>
              {checkOutButton}
            </View>

            <View style={styles.button}>
              {reserveButton}
            </View>
          </View>

        </ScrollView>

      </View>
    );
  }
}


export default CheckOut;
