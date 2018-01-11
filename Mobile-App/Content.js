import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  Form,
  ScrollView,
} from 'react-native';

const axios = require('axios');

import styles from './Styles';

export default class SignUp extends React.Component {
  state = {
    tasks: [],
    error: '',
  };
  ///www@www.com
  componentDidMount() {
    console.log('is Mounted');
    const myToken = AsyncStorage.getItem('token');
    myToken
      .then(token => {
        // retrieve the token from "localStorage"
        if (token !== null) {
          axios
            .get('https://mobile-server-ii.herokuapp.com/users', {
              headers: {
                Authorization: token, // attach the token as a header
              },
            })
            .then(response => {
              this.setState(prevState => {
                let { tasks } = prevState;
                return {
                  tasks: response.data,
                };
              });
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(err => {
        console.log('On did Mount', err);
      });
  }

  render() {
    return (
      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={styles.main}
        style={styles.scrollView}
      >
        <View style={styles.container}>
          <View>
            <Text>USERSSSSSSSS</Text>
            {this.state.error !== '' ? <Text>{this.state.error}</Text> : null}
            <FlatList
              style={styles.list}
              data={this.state.tasks}
              renderItem={({ item, index }) => {
                return (
                  <View key={item._id}>
                    <View style={styles.listCont}>
                      <Text style={styles.textItem}>{item.email}</Text>
                      <Button
                        onPress={() => this.deleteTask(index)}
                        title="X"
                      />
                    </View>
                    <View style={styles.hr} />
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}