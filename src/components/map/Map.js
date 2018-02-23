import React, { Component } from 'react';

import { View } from 'react-native';

import ImageView from 'react-native-image-view';

class Map extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <ImageView
          source={require('../../../assets/img/map.png')}
          isVisible={true}
          imageWidth={1920}
          imageHeight={1080}
        />
      </View>
    )
  }
}

export default Map;
