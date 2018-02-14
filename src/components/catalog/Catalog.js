import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Toolbar } from 'react-native-material-ui';

class Catalog extends Component {
  constructor(props) {
    super(props);

    this.state = {searchInput: ""};
    
    this.catalog = ["Catcher in The Rye", "Book Thief", "Ready Player One"]
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
        
      </View>
    );
  }
}

export default Catalog;
