import { ScrollView, View } from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskCards from "../components/cards";
import axios from "axios";

const API_URL = "http://192.168.15.149:3000";

export default function Index() {
  const [texto, setTexto] = useState("");
  const [tarefas, setTarefas] = useState([]);

  const addTasks = async () => {
    try {
      const body = { name: texto, isDone: false };
      const res = await axios.post(`${API_URL}/api/task`, body);
      await AsyncStorage.setItem(
        "tasks",
        JSON.stringify([...tarefas, res.data])
      );
      setTexto("");
      getTasks();
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  };

  const getTasks = async () => {
    const tasks = await axios.get(`${API_URL}/api/task`);
    setTarefas(tasks.data);
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks.data));
  };

  const completeTasks = async (id) => {
    try {
      const tasks = JSON.parse(await AsyncStorage.getItem("tasks"));
      const actualTask = tasks.filter((item) => item._id == id)[0];
      actualTask.isDone = !actualTask.isDone;
      const res = await axios.put(`${API_URL}/api/task/${id}`, actualTask);
      getTasks();
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  };

  const deleteTasks = async (id) => {
    const res = await axios.delete(`${API_URL}/api/task/${id}`);
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <View style={{ flex: 1, paddingBottom: 50 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 40,
          marginTop: 40,
          marginBottom: 35,
          maxHeight: '5%'
        }}
      >
        <TextInput
          style={{ minWidth: "75%" }}
          label="Tarefa..."
          value={texto}
          onChangeText={setTexto}
        />
        <IconButton icon="plus" mode="contained" onPress={addTasks} />
      </View>
      <ScrollView>
        {tarefas.map((item) => {
          return (
            <TaskCards
              key={item._id}
              task={item}
              deleteT={deleteTasks}
              completeT={completeTasks}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
