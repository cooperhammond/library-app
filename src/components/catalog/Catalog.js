import React, { Component } from 'react';

import {
  View,
  Text,
  FlatList, ScrollView,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import { Toolbar } from 'react-native-material-ui';

import CatalogList from './CatalogList'


class Catalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: "",
      catalog: require('../../../assets/data/catalog.json')
    };

  }

  render() {
    return(
      <View style={{ flex: 1 }}>
        <Toolbar
          centerElement="Catalog"
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
            onChangeText: (text) => this.setState({searchInput: text}),
            onSubmitEditing: () => alert("You searched for: " + this.state.searchInput)
          }}
        />

        <ScrollView>

          <CatalogList
            catalog={this.state.catalog}
          />

        </ScrollView>
      </View>
    );
  }
}

export default Catalog;
