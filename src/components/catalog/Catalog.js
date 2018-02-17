import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet} from 'react-native';
import { Toolbar, ListItem } from 'react-native-material-ui';

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

class Catalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: "",
      catalog: [{key: "Catcher in The Rye"}, {key: "Book Thief"}, {key: "Ready Player One"}]
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

        <FlatList
          data={this.state.catalog}
          renderItem={({item}) => {
            return (
              <ListItem
                divider={true}
                centerElement={{
                  primaryText: item.key
                }}
                onPress={() => {alert("You pressed: " + item.key )}}
              />
            )
          }}
        />

      </View>
    );
  }
}

export default Catalog;
