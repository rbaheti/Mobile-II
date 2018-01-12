import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
} from 'react-native';

const axios = require('axios');
import styles from './Styles';

export default class TodoList extends React.Component {
  state = {
    tasks: [],
    text: '',
    error: '',
  };

  componentDidMount() {
    console.log('is Mounted');
    const tasks = this.state.tasks;
    const myToken = AsyncStorage.getItem('token');
    myToken
      .then(token => {
        // retrieve the token from "localStorage"
        if (token !== null) {
          axios
            .get('https://mobile-server-ii.herokuapp.com/user', {
              headers: {
                Authorization: token, // attach the token as a header
              },
            })
            .then(response => {
              this.setState(prevState => {
                let { tasks } = prevState;
                return {
                  tasks: response.data.todos,
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

  componentWillUnmount() {
    console.log('is Un Mounted');
    const myToken = AsyncStorage.getItem('token');
    const tasks = this.state.tasks.text;
    // user.todos.setItem('tasks', JSON.stringify(tasks));
    myToken
      .then(token => {
        // retrieve the token from "localStorage"
        if (token !== null) {
          axios
            .post('https://mobile-server-ii.herokuapp.com/user', {
              headers: {
                Authorization: token, // attach the token as a header
              },
              body: {
                text: tasks,
              },
            })
            .then(response => {
              this.setState(prevState => {
                let { tasks } = prevState;
                return {
                  tasks: response.todos,
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

  handleTextChange = text => {
    this.setState({ text });
  };

  addTodo = () => {
    console.log('clicked');
    if (this.state.text === '') {
      this.setState({ error: `No message in text field.` });
      setTimeout(() => {
        this.setState({ error: '' });
      }, 2000);
      return;
    }
    this.setState(prevState => {
      let { text, tasks } = prevState;
      return {
        tasks: tasks.concat({ key: tasks.length, text }),
        text: '',
      };
    });
  };

  deleteTask = index => {
    this.setState(prevState => {
      let tasks = prevState.tasks.slice();
      tasks.splice(index, 1);
      return { tasks };
    });
  };

  render() {
    // console.log(this.state);
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {this.state.tasks.length > 0
            ? 'You have stuff to do!'
            : `You're free to play PUBG`}
        </Text>
        {this.state.error !== '' ? <Text>{this.state.error}</Text> : null}
        <FlatList
          keyExtractor={item => item._id}
          style={styles.list}
          data={this.state.tasks}
          renderItem={({ item, index }) => {
            return (
              <View>
                <View style={styles.listCont}>
                  <Text style={styles.textItem}>{item.text}</Text>
                  <Button onPress={() => this.deleteTask(index)} title="X" />
                </View>
                <View style={styles.hr} />
              </View>
            );
          }}
        />
        <TextInput
          style={styles.inputStyles}
          onSubmitEditing={this.addTodo}
          onChangeText={this.handleTextChange}
          value={this.state.text}
          placeholder="Add Task"
        />
      </View>
    );
  }
}