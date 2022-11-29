import { View, Text } from "react-native";
import React, { useContext } from "react";
import { useChatContext } from "../../constants/ChatContent";

const ChatsScreen = () => {
  const { username } = useChatContext();
  return (
    <View>
      <Text>ChatsScreen: {username}</Text>
    </View>
  );
};

export default ChatsScreen;
