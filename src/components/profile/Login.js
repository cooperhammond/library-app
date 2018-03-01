import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image
} from 'react-native';

import {
  Toolbar,
  Button,
} from 'react-native-material-ui';

import { TextField } from 'react-native-material-textfield';
import Communications from 'react-native-communications';

import {
  LoginButton,
  LogoutButton,
  ShareBug,
} from './Buttons'
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
    fontSize: 16,
    textAlign: 'center',
  }
});


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
    Communications.email(
      ['kepoorh@gmail.com'], // to
      null, // cc
      null, // bcc
      "Bug Report", // Subject
      // Body
      "Hey, I want to report a bug! \n\n <Psst, enter your bug here!>"
    )
  };


  render() {

    let label = "Profile";

    let statusDependentData = <Text style={styles.text}>You're logged in as {this.state.loggedIn}</Text>

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
          leftElement={
            <Image
              style={{
                height: 35,
                width: 35
              }}
              source={require('../../../assets/img/miskatonic.png')}
            />
          }
          centerElement={label}
        />

        <View style={styles.formContainter}>

          {statusDependentData}

          <View style={styles.button}>
            {button}
          </View>

          <View style={styles.button}>
            <ShareBug onPress={this.handleBug} />
          </View>

        </View>
      </View>
    );
  }
}

export default Login;
