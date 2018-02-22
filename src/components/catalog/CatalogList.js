import React, { Component } from 'react';

import {
  FlatList, ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

class CatalogList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      catalog: this.props.catalog
    };

    this.state.catalog.forEach((book, i) => {
      book.key = i + 1;
    });

  }

  render() {
    return(
      <FlatList
        data={this.state.catalog}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
            
        renderItem={({item}) => {

          var height = 300;
          var width = height / (item.cover.y / item.cover.x);

          return (
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() => alert("You pressed on: " + item.title)}
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

export default CatalogList;