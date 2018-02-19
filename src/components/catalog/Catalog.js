import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { Toolbar, ListItem } from 'react-native-material-ui';

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

        <FlatList
          data={this.state.catalog}
          renderItem={({item}) => {
            return (
              <ListItem
                divider={true}
                numberOfLines="dynamic"
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
                onPress={() => {alert("You pressed: " + item.title )}}
              />
            )
          }}
        />

      </View>
    );
  }
}

export default Catalog;
