import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Share,
} from 'react-native';

import { Toolbar } from 'react-native-material-ui';

import {
  CheckOutButton,
  ReturnButton,
  ReserveButton,
  UnreserveButton,
  ShareButton,
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
    };

    this.getUser = this.getUser.bind(this);
    this.updateItemStatus = this.updateItemStatus.bind(this);
    this.handleCheckOut = this.handleCheckOut.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.handleReserve = this.handleReserve.bind(this);
    this.handleUnreserve = this.handleUnreserve.bind(this);
    this.handleShare = this.handleShare.bind(this)

    this.getUser();
    this.updateItemStatus();
  }

  getUser = () => {
    easyAsync.getItem("loggedIn").then((value) => {
      this.setState({user: value});
    });
  };

  updateItemStatus = () => {
    easyAsync.getItem("checkedOut:" + this.state.title).then((value) => {
      this.setState({checkedOut: value});
    });
    easyAsync.getItem("reserved:" + this.state.title).then((value) => {
      this.setState({reserved: value});
    });
  };

  handleCheckOut = () => {
    easyAsync.setItem("checkedOut:" + this.state.title, this.state.user)
    .then(() => this.updateItemStatus());
  };

  handleReturn = () => {
    easyAsync.setItem("checkedOut:" + this.state.title, null)
    .then(() => this.updateItemStatus());
  };

  handleReserve = () => {
    easyAsync.setItem("reserved:" + this.state.title, this.state.user)
    .then(() => this.updateItemStatus());
  };

  handleUnreserve = () => {
    easyAsync.setItem("reserved:" + this.state.title, null)
    .then(() => this.updateItemStatus());
  };
  
  handleShare = () => {
    Share.share({
      message: 'I found the book "' + this.state.title + '" through this library app: https://github.com/kepoorhampond/library-app',
      url: 'https://github.com/kepoorhampond/library-app',
      title: 'Share this book!'
    }, {
      // Android only:
      dialogTitle: 'Share "' + this.state.title + '" by ' + this.state.item.author,
    })
  };


  render() {
    let checkOutButton = <Text>Something went wrong.</Text>;
    if (this.state.checkedOut == this.state.user) {
      // You have the book and can return it.
      checkOutButton = <ReturnButton onPress={this.handleReturn} />;
    } else if (this.state.checkedOut != this.state.user && this.state.checkedOut != null) {
      // Somebody else has the book so you can't check it out/
      checkOutButton = <CheckOutButton disabled onPress={null} />;
    } else {
      // The book is free to check out.
      checkOutButton = <CheckOutButton onPress={this.handleCheckOut} />;
    }

    let reserveButton = <Text>Something went wrong.</Text>;
    if (this.state.reserved == this.state.user) {
      // You have the book reserved and you can unreserve it.
      reserveButton = <UnreserveButton onPress={this.handleUnreserve} />;
    } else if (this.state.reserved != this.state.user && this.state.reserved != null) {
      // Somebody else has the book reserved so you can't.
      reserveButton = <ReserveButton disabled onPress={null} />;
    } else {
      // The book is free to reserve.
      reserveButton = <ReserveButton onPress={this.handleReserve} />;
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
          
          <View style={styles.rowContainer}>
            <View style={styles.button}>
              <ShareButton onPress={this.handleShare} />
            </View>
          </View>

        </ScrollView>

      </View>
    );
  }
}


export default CheckOut;
