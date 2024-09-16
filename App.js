import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddTask from './AddTask';
import uuid from 'react-native-uuid';

const App = () => {
  const [tasks, setTasks] = useState([]);

  //Hakee tehtävät storagesta
  const getData = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];
      setTasks(parsedTasks);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //Tallentaa tehtävät storageen
  const saveData = async (updatedTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (e) {
      console.error(e);
    }
  };

//Lisää tehtävän
const addTask = useCallback((taskTitle) => {
  const newTask = {
    id: uuid.v4(),  // UUID-kirjaston avulla luodaan uniikki id
    title: taskTitle,
    completed: false,
  };
  const updatedTasks = [...tasks, newTask];
  saveData(updatedTasks);
}, [tasks]);

// merkitään tehtävä suoritetuksi
const toggleTask = (id) => {
  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveData(updatedTasks);
};

const renderTask = ({ item }) => (
  <Pressable onPress={() => toggleTask(item.id)} style={styles.taskRow}>
    <Text style={[styles.taskText, item.completed && styles.completedTask]}>
      {item.title}
    </Text>
  </Pressable>
);

return (
  <SafeAreaView style={styles.container}>
    <Text style={styles.header}>Tehtävälista</Text>
    <AddTask addTask={addTask} />
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={renderTask}
      style={styles.taskList}
    />
  </SafeAreaView>
);
};

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  taskRow: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  taskText: {
    fontSize: 18,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'grey',
  },
  taskList: {
    marginTop: 20,
  },
});

export default App;