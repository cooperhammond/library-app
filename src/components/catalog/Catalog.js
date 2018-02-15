import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Toolbar, ListItem } from 'react-native-material-ui';

class Catalog extends Component {
  constructor(props) {
    super(props);

    this.state = {searchInput: ""};

    this.catalog = [{key: "Catcher in The Rye"}, {key: "Book Thief"}, {key: "Ready Player One"}];
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
          data={this.catalog}
          renderItem={(name) => {
            alert(name)
            return (
              <ListItem
                divider={true}
                key={name}
                centerElement={name}
              />
            )}
          }
        />
      </View>
    );
  }
}

export default Catalog;
