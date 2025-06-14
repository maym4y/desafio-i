import { Card, Avatar, IconButton } from "react-native-paper";
import { Swipeable } from "react-native-gesture-handler";

export default function TaskCards(props) {
  const { _id, name, isDone } = props.task;
  const { deleteT, completeT } = props;
  const checkmark = (isDone) => {
    return (
      <IconButton
        onPress={() => completeT(_id)}
        icon="check"
        size={24}
        mode="contained"
        iconColor={isDone ? "purple" : "darkgrey"}
        containerColor={isDone ? "white" : "grey"}
      />
    );
  };

  const pressDelete = () => {
    return (
      <IconButton
        icon="delete"
        size={30}
        iconClor="red"
        onPress={() => deleteT(_id)}
      />
    );
  };

  return (
    <Card style={{ margin: 8 }}>
      <Card.Title
        title={name}
        left={() => checkmark(isDone)}
        right={() => pressDelete()}
      />
    </Card>
  );
}
