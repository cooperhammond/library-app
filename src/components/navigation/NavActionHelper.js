import React, { Component } from 'react';
import { BottomNavigation, Icon } from 'react-native-material-ui';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    controller: PropTypes.object.isRequired,
    size: PropTypes.number,
};

const defaultProps = {
  name: null,
  icon: null,
  controller: null,
  size: 30,
}

class NavActionHelper extends Component {
  render() {

    const {
      name, icon, size, controller
    } = this.props

    return (
      <BottomNavigation.Action
        name={name}
        icon={<Icon name={icon} size={size} />}
        onPress={() => controller.setState({
          active: [name, icon]
        })}
      />
    )
  }
}

NavActionHelper.propTypes = propTypes;
NavActionHelper.defaultProps = defaultProps;

export default NavActionHelper;
