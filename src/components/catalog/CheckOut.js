import React, { Component } from 'react';

import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Image
} from 'react-native';

import { PropTypes } from 'prop-types';

import {
  Toolbar,
  Button
} from 'react-native-material-ui';


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

const propTypes = {


};

const defaultProps = {


}

class CheckOut extends Component {
  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;

    this.state = {
      item: params ? params.item : null,
    }

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
              <Button
                raised
                accent
                text="Check Out"
                icon="done"
              />
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

// CheckOut.propTypes = propTypes;

// CheckOut.defaultProps = defaultProps;

export default CheckOut;
