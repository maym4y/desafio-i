import { Text, TextInput, View } from "react-native";
import { useState } from "react";

export default function Index() {
  const [tarefa, setTarefa] = useState("");
  return (
    <View>
      <View>
        <TextInput placeholder="Digite uma tarefa" />
        <Pressable>
          <Text>+</Text>
        </Pressable>
      </View>
    </View>
  );
}
