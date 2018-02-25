import React, { Component } from 'react';

import {
  View,
  Text,
  ScrollView,
} from 'react-native';

import { Toolbar } from 'react-native-material-ui';

import CatalogList from './CatalogList'

class Catalog extends Component {
  constructor(props) {
    super(props);

    this.onSubmitEditing = this.onSubmitEditing.bind(this);
    this.onSubmitEditing = this.filterCatalog.bind(this);

    this.state = {
      searchInput: "",
      catalog: require('../../../assets/data/catalog.json'),
      catalogs: []
    };


    this.state.catalog.forEach((item, i) => {
      item.tags.push("All");
    });


    var tags = [];
    // Get all tags from the catalog
    tags = [].concat.apply([], this.state.catalog.map((item) => item.tags));
    // Remove duplicates
    tags = Array.from(new Set(tags));
    // Set them up for being ordered
    tags = tags.map((tag) => {
      return {[tag]: this.filterCatalog(tag)}
    })
    // Actually sort them
    tags.sort((a, b) => {
      return b[Object.keys(b)[0]].length - a[Object.keys(a)[0]].length
    })
    // Format for display
    for (var i = 0; i < tags.length; i++) {
      this.state.catalogs.push(
        <View key={i}>
          <Text>{Object.keys(tags[i])[0]}</Text>
          <CatalogList
            catalog={tags[i][Object.keys(tags[i])[0]]}
            navigation={this.props.navigation}
          />
        </View>
      )
    }

  }

  onSubmitEditing = () => {
    alert("You searched for: " + this.state.searchInput);
  }

  filterCatalog = (tag) => {
    return this.state.catalog.filter((item) => {
      return item.tags.includes(tag)
    });
  }

  render() {
    return(
      <View style={{
        flex: 1 // Fill the screen minus BottomNavigation bar
       }}>

        <Toolbar
          centerElement="Catalog"
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
            onChangeText: (text) => this.setState({searchInput: text}),
            onSubmitEditing: this.onSubmitEditing,
          }}
        />

        {/* In order to scroll through multiple lists from different tags */}
        <ScrollView>

          {this.state.catalogs}

        </ScrollView>
      </View>
    );
  }
}

export default Catalog;
