import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import loginStyles from '../../styles/ProfileStyles';
import { material } from 'react-native-typography';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleEmail = (text) => {
    this.setState({ email: text })
  };

  handlePassword = (text) => {
    this.setState({ password: text })
  };

  login = (email, pass) => {
    alert('email: ' + email + ' password: ' + pass)
  };

  render() {
    return (
      <View style = {loginStyles.container}>
        <Text style={material.display1}>Login</Text>

        <TextInput
          style = {loginStyles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Email"
          placeholderTextColor = {loginStyles.placeholderTextColor}
          autoCapitalize = "none"
          onChangeText = {this.handleEmail}
          keyboardType = "email-address"
        />

        <TextInput
          style = {loginStyles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Password"
          placeholderTextColor = {loginStyles.placeholderTextColor}
          autoCapitalize = "none"
          onChangeText = {this.handlePassword}
          secureTextEntry = {true}
        />

        <TouchableOpacity
          style={loginStyles.submitButton}
          onPress={() => this.login(this.state.email, this.state.password)}
        >
          <Text style={material.buttonWhite}> Submit </Text>
        </TouchableOpacity>
      </View>
    )
  }
};

export default Login;
