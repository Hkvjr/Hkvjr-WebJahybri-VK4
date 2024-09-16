import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddTask = ({ addTask }) => {
    const [taskTitle, setTaskTitle] = useState('');

    const handleAddTask = () => {
        if (taskTitle.trim()) {
          addTask(taskTitle);
          setTaskTitle(''); // Tyhjennetään TextInput lisäyksen jälkeen
        }
      };
      return (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Lisää tehtävä"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
          <Button title="Tallenna" onPress={handleAddTask} />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        flex: 1,
        marginRight: 10,
      },
    });
    
    export default AddTask;