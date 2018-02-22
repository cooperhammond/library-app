import React, { Component } from 'react';

import {
  FlatList, ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import { PropTypes } from 'prop-types';


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

    this.props.catalog.forEach((book, i) => {
      book.key = i + 1;
    });

    this.handlePress.bind(this);

  }

  handlePress = (title) => {
    alert("You pressed " + title);
  }

  render() {
    return(
      <FlatList
        data={this.props.catalog}
        horizontal={true}
        showsHorizontalScrollIndicator={false}

        renderItem={({item}) => {

          var height = this.props.height;
          var width = height / (item.cover.y / item.cover.x);

          return (
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() => this.handlePress(item.title)}
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
