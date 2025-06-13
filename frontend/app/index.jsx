import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useState } from "react";

export default function Index() {
  const [tarefa, setTarefa] = useState("");
  return (
    <View>
      <View>
        <TextInput label="Tarefa..." value={tarefa} onChangeText={setTarefa} />
        <Button incon="plus" mode="contained" onPress={() => console.log(tarefa)} />
      </View>
    </View>
  );
}
