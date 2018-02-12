import VectorIcon from 'react-native-vector-icons/MaterialIcons';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    size: PropTypes.number,
    color: PropTypes.string,
};
const defaultProps = {
    size: 30,
    color: null,
    style: null,
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

class NavIcon extends PureComponent {
    render() {
        const {
            name, style, size, color,
        } = this.props;
        const { palette, spacing } = this.context.uiTheme;

        const iconColor = color || palette.secondaryTextColor;
        const iconSize = size || spacing.iconSize;

        return (
            <VectorIcon
                name={name}
                size={iconSize}
                color={iconColor}
                style={style}
            />
        );
    }
}

NavIcon.propTypes = propTypes;
NavIcon.defaultProps = defaultProps;
NavIcon.contextTypes = contextTypes;

export default NavIcon;