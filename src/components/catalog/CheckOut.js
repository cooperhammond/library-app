import React, { Component } from 'react';

import { 
  Text,
  ScrollView,
  View
} from 'react-native';

import { PropTypes } from 'prop-types';

import { 
  Dialog, 
  DialogDefaultActions,
  Toolbar,
} from 'react-native-material-ui';


const propTypes = {

    
};

const defaultProps = {


}

class CheckOut extends Component {
  constructor(props) {
    super(props);

    

  }


  render() {
    return(
      <View>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => this.props.navigation.goBack()}
          centerElement={this.props.item.title}
        />
        <ScrollView>
        <Dialog>
          <Dialog.Title><Text>Hello world</Text></Dialog.Title>
          <Dialog.Content>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <DialogDefaultActions
               actions={['Check Out', 'Reserve']}
               onActionPress={() => {}}
            />
          </Dialog.Actions>
        </Dialog>
        </ScrollView>
      </View>
    );
  }
}

// CheckOut.propTypes = propTypes;

// CheckOut.defaultProps = defaultProps;

export default CheckOut;
