import React, { Component } from 'react';

import {
  FlatList, ScrollView,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

import { PropTypes } from 'prop-types';

import { Dialog, DialogDefaultActions } from 'react-native-material-ui';


const propTypes = {
  catalog: PropTypes.array.isRequired,
  height: PropTypes.number,
};

const defaultProps = {
  catalog: null,
  height: 300,
}

class CatalogList extends Component {
  constructor(props) {
    super(props);

    // For FlatList, every item needs a key so that it can be memory efficient
    this.props.catalog.forEach((item, i) => {
      item.key = i + 1;
    });

    this.handlePress = this.handlePress.bind(this);

  }

  handlePress = (item) => {
    this.props.navigation.navigate('CheckOutScreen', {
      navigation: this.props.navigation,
      item: item
    })
  }

  render() {
    return(
      <FlatList
        data={this.props.catalog}
        horizontal={true}
        showsHorizontalScrollIndicator={false}

        renderItem={({item}) => {

          // Retain aspect ration and scale the image to the defined height
          var height = this.props.height;
          var width = height / (item.cover.y / item.cover.x);

          return (
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() => this.handlePress(item)}
            >

              <Image
                source={{uri: item.cover.url}}
                style={{
                  height: height,
                  width: width,
                }}
              />

            </TouchableOpacity>
          );
        }}
      />
    );
  }
}

CatalogList.propTypes = propTypes;

CatalogList.defaultProps = defaultProps;

export default CatalogList;