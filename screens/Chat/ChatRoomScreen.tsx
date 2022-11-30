import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useChatContext } from "../../constants/ChatContent";
import { Channel, MessageList, MessageInput } from "stream-chat-expo";
import { useNavigation } from "@react-navigation/native";

const ChatRoomScreen = () => {
  const { currentChannel, setCurrentChannel, chatClient } = useChatContext();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: currentChannel?.data?.name || "Channel" });
  }, [currentChannel]);

  return (
    <Channel channel={currentChannel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

export default ChatRoomScreen;
