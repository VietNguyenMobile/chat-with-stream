import { View, Text, FlatList } from "react-native";
import { useChatContext } from "../constants/ChatContent";
import users from "../assets/data/users.json";
import UserListItem from "../components/UserListItem";

const UsersScreen = () => {
  const { startDMChatRoom } = useChatContext();
  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <UserListItem user={item} />}
    />
  );
};

export default UsersScreen;
