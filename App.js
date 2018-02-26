import React, { Component } from 'react';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import Navigator from './src/components/navigation/Navigator';
import { Font } from 'expo';

/* uiTheme keys:
spacing: {} // can be used to change the spacing of components.
fontFamily: {} // can be used to change the default font family.
palette: {  // can be used to change the color of components.
    primaryColor: blue500,
    accentColor: red500,
    ...
}
typography: {} // can be used to change the typography of components
// you can change style of every each component
avatar: {}
button: {}
toolbar: {}
*/

const uiTheme = {
  palette: {
      primaryColor: COLOR.blue500,
      accentColor: COLOR.green500,
  },
  toolbar: {
      container: {
          height: 50,
      },
  },
};

class App extends React.Component {
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Navigator />
      </ThemeProvider>
    );
  }
}

export default App;
