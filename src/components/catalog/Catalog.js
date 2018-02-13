import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Toolbar } from 'react-native-material-ui';

class Catalog extends Component {
  constructor(props) {
    super(props);

    this.state = {state: "wow"};
  }

  render() {
    return(
      <View style={{ flex: 1 }}>
        <Toolbar
          centerElement="Catalog"
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
            onSubmitEditing: (s) => {alert("You searched for: " + this)}
          }}
        />
        <Text>{this.state.state}</Text>
      </View>
    )
  }
}

export default Catalog;
