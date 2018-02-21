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


class Catalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: "",
      catalog: require('../../../assets/data/catalog.json')
    };

    this.state.catalog.forEach((book, i) => {
      book.key = i + 1;
    });

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
          <FlatList
            data={this.state.catalog}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {

              var height = 300
              var width = height / (item.cover.y / item.cover.x)

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
              )
            }}
          />

        </ScrollView>
      </View>
    );
  }
}

export default Catalog;


/*

<FlatList
  data={this.state.catalog}
  horizontal={true}
  renderItem={({item}) => {
    return (
      <ListItem
        divider={true}
        numberOfLines="dynamic"
        onPress={() => {alert("You pressed: " + item.title )}}
        centerElement={

          <View>
            <Image
              source={{uri: item.cover.url}}
              style={{
                width: item.cover.x,
                height: item.cover.y
              }}
            />
            <Text>{item.title}</Text>
          </View>

        }
      />
    )
  }}
/>
*/
