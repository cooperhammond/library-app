import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {
  Toolbar,
  Button,
} from 'react-native-material-ui';

import { TextField } from 'react-native-material-textfield';
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

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      username: '',
      password: '',
      logins: require('../../../assets/data/logins.json'),
    }

    this.loggedIn = this.loggedIn.bind(this)
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }

  loggedIn = () => {
    easyAsync.getItem("loggedIn").then((value) => {
      this.setState({loggedIn: value})
    })
  };

  handleLogout = () => {
    easyAsync.setItem("loggedIn", false)
    this.loggedIn()
  }

  handleLogin = () => {
    let username = this.state.username;
    let password = this.state.password;

    if (this.state.logins[username] == password) {

      easyAsync.setItem("loggedIn", username)
      this.loggedIn()
      alert("Successfully logged in as: " + username)

    } else {
      alert("Incorrect username or password.")
    }
  };

  handleUsername = (text) => {
    this.setState({ username: text })
  };

  handlePassword = (text) => {
    this.setState({ password: text })
  };


  render() {
    if (this.state.loggedIn == false) { // If not logged in

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
      )

      button = <LoginButton onPress={this.handleLogin} />

    } else {

      statusDependentData = (
        <View>

        </View>
      )

      button = <LogoutButton onPress={this.handleLogout} />

    }

    return (
      <View>

        <Toolbar
          centerElement="Login"
        />

        <View style={styles.formContainter}>

          {statusDependentData}


          <View style={styles.button}>
            {button}
          </View>
        </View>
      </View>
    )
  }
};

export default Login;
