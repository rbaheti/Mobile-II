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
import styles from './Styles';

const axios = require('axios');

export default class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
  };

  // This componentDidMount method is just logging success or errors, if any
  // and nothing fancy
  componentDidMount() {
    const myToken = AsyncStorage.getItem('token')
      .then(response => {
        console.log('Token', response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  signInUser = () => {
    const existingUser = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post('https://mobile-server-ii.herokuapp.com/signin', existingUser)
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
        <Text>Sign In</Text>
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
          onPress={() => this.signInUser()}
          title="Sign In"
        />
      </View>
    );
  }
}