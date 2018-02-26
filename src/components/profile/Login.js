import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';

import {
  Toolbar,
  Button,
} from 'react-native-material-ui';

import { TextField } from 'react-native-material-textfield';
import Mailer from 'react-native-mail';
import easyAsync from '../helpers/easyAsync';


const styles = StyleSheet.create({
  formContainter: {
    margin: 30,
    justifyContent: 'center',
  },
  button: {
    marginVertical: 15,
    marginHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  }
});


const LoginButton = (props) => {
  return (
    <Button
      raised
      accent
      text="Login"
      icon="exit-to-app"
      onPress={props.onPress}
    />
  );
}

const LogoutButton = (props) => {
  return (
    <Button
      raised
      accent
      text="Logout"
      icon="exit-to-app"
      onPress={props.onPress}
    />
  );
}

const ShareBug = (props) => {
  return (
    <Button
      raised
      accent
      text="Found a Bug? Press me!"
      icon="contact-mail"
      onPress={props.onPress}
    />
  );
}

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      username: '',
      password: '',
      logins: require('../../../assets/data/logins.json'),
    };

    this.loggedIn = this.loggedIn.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleBug = this.handleBug.bind(this)

    this.loggedIn();
  }

  loggedIn = () => {
    easyAsync.getItem("loggedIn").then((value) => {
      this.setState({loggedIn: value});
    });
  };

  handleLogout = () => {
    easyAsync.setItem("loggedIn", false);
    this.loggedIn();
  };

  handleLogin = () => {
    let username = this.state.username;
    let password = this.state.password;

    if (this.state.logins[username] == password) {

      easyAsync.setItem("loggedIn", username);
      this.loggedIn();
      alert("Successfully logged in as: " + username);

    } else {
      alert("Incorrect username or password.");
    }
  };

  handleUsername = (text) => {
    this.setState({ username: text });
  };

  handlePassword = (text) => {
    this.setState({ password: text });
  };
  
  handleBug = () => {
    Mailer.mail({
      subject: 'need help',
      recipients: ['support@example.com'],
      ccRecipients: ['supportCC@example.com'],
      bccRecipients: ['supportBCC@example.com'],
      body: '<b>A Bold Body</b>',
      isHTML: true,
      attachment: {
        path: '',  // The absolute path of the file from which to read data.
        type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf
        name: '',   // Optional: Custom filename for attachment
      }
    }, (error, event) => {
      Alert.alert(
        error,
        event,
        [
          {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
          {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
        ],
        { cancelable: true }
      )
    });
  }


  render() {
    
    let label = "Profile";

    let statusDependentData = (
      <View>
        <ShareBug onPress={this.handleBug} />
      </View>
    );

    let button = <LogoutButton onPress={this.handleLogout} />;
    
    if (this.state.loggedIn == false) { // If not logged in

      label = "Login";

      statusDependentData = (
        <View>
          <TextField
            label='Username'
            autofocus={true}
            keyboardType="email-address"
            onChangeText={this.handleUsername}
            onSubmitEditing={(event) => this.refs.Password.focus()}
          />
          <TextField
            ref='Password'
            label='Password'
            secureTextEntry={true}
            onChangeText={this.handlePassword}
            onSubmitEditing={this.handleLogin}
          />
        </View>
      );

      button = <LoginButton onPress={this.handleLogin} />;
    }

    return (
      <View>

        <Toolbar
          centerElement={label}
        />

        <View style={styles.formContainter}>

          {statusDependentData}


          <View style={styles.button}>
            {button}
          </View>
        </View>
      </View>
    );
  }
}

export default Login;
