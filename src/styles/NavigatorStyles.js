import swatch from './ColorSwatch';

const navStyles = {
  icon: {
    width: 26,
    height: 26,
  },

  tabBarOptions: {
    style: {
      backgroundColor: swatch.primary,
    },
    indicatorStyle: {
      backgroundColor: swatch.white,
    },
    inactiveTintColor: swatch.pdark,
    activeTintColor: swatch.white,
  },
};

export default navStyles;
