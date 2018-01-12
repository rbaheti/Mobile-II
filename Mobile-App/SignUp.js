import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  TouchableHighlight,
  Form,
} from 'react-native';

const axios = require('axios');

import styles from './Styles';

export default class SignUp extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
  };

  componentDidMount() {
    console.log('is Mounted');
    const myToken = AsyncStorage.getItem('token')
      .then(response => {
        console.log('Token', response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  createUser = () => {
    const newUser = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post('https://mobile-server-ii.herokuapp.com/users', newUser)
      .then(res => {
        const token = res.data.token;
        if (token) {
          AsyncStorage.setItem('token', token)
            .then(AsyncRes => {
              // route to Content page
              this.props.navigation.navigate('Content');
            })
            .catch(err => {
              throw new Error(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        <Text style={styles.buttonText}>Email</Text>
        <TextInput
          style={styles.inputStyles}
          onChangeText={this.handleEmailChange}
          placeholder="Email"
        />
        <Text style={styles.buttonText}>Password</Text>
        <TextInput
          style={styles.inputStyles}
          onChangeText={this.handlePasswordChange}
          placeholder="Password"
        />
        <Button
          onPress={() => this.createUser()}
          title="Sign Up"
        />
        <View style={styles.row}>
          <Text style={styles.buttonText}>Chuck Norris just cuzzz!!</Text>
        </View>
      </View>
    );
  }
}