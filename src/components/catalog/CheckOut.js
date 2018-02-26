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

import easyAsync from '../helpers/easyAsync'


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
    }

    // this.handleButtonPress = this.handleButtonPress.bind(this)
    this.buttonType = this.buttonType.bind(this)
  }

  handleButtonPress = (type) => {
    easyAsync.setItem(type, y)
  }

  buttonType = (type) => {
    let value = easyAsync.getItem(type)[this.state.item.title]
    let text = "Check Out"

    //if (value != null || value != true) {
    //  text = "Return"
    //}

    return (
      <Button
        raised
        accent
        text={text}
        icon="done"
      />
    );
  }


  render() {
    return(
      <View>

        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => this.props.navigation.goBack()}
          centerElement={this.state.item.title}
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
              {this.buttonType("checkout")}
            </View>

            <View style={styles.button}>
              <Button
                raised
                accent
                text="Reserve"
                icon="playlist-add"
              />
            </View>
          </View>

        </ScrollView>

      </View>
    );
  }
}


export default CheckOut;
