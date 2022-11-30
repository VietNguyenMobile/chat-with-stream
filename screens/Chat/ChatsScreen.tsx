import { View, Text } from "react-native";
import React, { useContext } from "react";
import { useChatContext } from "../../constants/ChatContent";
import { ChannelList } from "stream-chat-expo";
import { Channel } from "stream-chat";
import { useNavigation } from "@react-navigation/native";

const ChatsScreen = () => {
  const { currentChannel, setCurrentChannel, chatClient } = useChatContext();

  const navigation = useNavigation();

  const onSelect = (channel: Channel) => {
    // console.log("channel: ", channel);
    setCurrentChannel(channel);
    navigation.navigate("ChatRoom")
  };
  return <ChannelList onSelect={onSelect} />;
};

export default ChatsScreen;
