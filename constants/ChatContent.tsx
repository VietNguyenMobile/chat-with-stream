import React, { createContext, useContext, useEffect, useState } from "react";
import { StreamChat, Channel } from "stream-chat";
import { ActivityIndicator } from "react-native";
import { useUserData } from "@nhost/react";
import { OverlayProvider, Chat } from "stream-chat-expo";
import { useNavigation } from "@react-navigation/native";

type ChatContextType = {
  currentChannel?: Channel;
};

export const ChatContext = createContext<ChatContextType>({
  currentChannel: undefined,
});

const userGlobal = {
  id: "vietnguyenmobile",
  name: "Viet Nguyen",
  image:
    "https://kenh14cdn.com/203336854389633024/2022/1/20/photo-1-1642665502226377918129.jpg",
};

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
  // const user = useUserData();
  // component
  const [chatClient, setChatClient] = useState<StreamChat>();
  const [currentChannel, setCurrentChannel] = useState<Channel>();
  const navigation = useNavigation();

  useEffect(() => {
    const initChat = async () => {
      // console.log("user: ", user);
      // if (!user) {
      //   return;
      // }
      const client = StreamChat.getInstance("yaeryqqnvw9t");

      // get information about the authenticated
      // console.log("client: ", client);

      // connect the user to stream chat
      await client.connectUser(userGlobal, client.devToken(userGlobal.id));
      setChatClient(client);

      const globalChannel = client.channel("livestream", "global", {
        name: "viet nguyen test",
      });

      // console.log("globalChannel: ", globalChannel);

      await globalChannel.watch();
    };
    initChat();
  }, []);

  useEffect(() => {
    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, []);

  const startDMChatRoom = async (chatWithUser) => {
    if (!chatClient) {
      return;
    }
    console.log("Starting a chatroom with user ", chatWithUser.id);
    const newChannel = chatClient.channel("messaging", {
      // members: [userGlobal.id, chatWithUser.id],
      members: [chatClient.userID, chatWithUser.id],
    });

    await newChannel.watch();
    setCurrentChannel(newChannel);
    navigation.goBack();
    navigation.replace("ChatRoom");
  };

  const joinEventChatRoom = async (event) => {
    if (!chatClient) {
      return;
    }
    const channelId = `room-${event.id}`;
    const eventChannel = chatClient.channel("livestream", channelId, {
      name: event.name,
    });

    await eventChannel.watch({ watchers: { limit: 100 } });
    setCurrentChannel(eventChannel);

    navigation.navigate("Root", {
      screen: "Chat",
    });
    navigation.navigate("Root", {
      screen: "Chat",
      params: { screen: "ChatRoom" },
    });
  };

  if (!chatClient) {
    return <ActivityIndicator size={"large"} color="blue" />;
  }

  const value = {
    currentChannel,
    setCurrentChannel,
    chatClient,
    startDMChatRoom,
    joinEventChatRoom,
  };
  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
      </Chat>
    </OverlayProvider>
  );
};

export const useChatContext = () => useContext(ChatContext);

export default ChatContextProvider;
