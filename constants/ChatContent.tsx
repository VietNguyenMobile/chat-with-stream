import React, { createContext, useContext, useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { useUserData } from "@nhost/react";

export const ChatContext = createContext({});

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
  // const user = useUserData();
  // component
  const [chatClient, setChatClient] = useState<StreamChat>();

  useEffect(() => {
    const initChat = async () => {
      // console.log("user: ", user);
      // if (!user) {
      //   return;
      // }
      const client = StreamChat.getInstance("yaeryqqnvw9t");

      // get information about the authenticated
      console.log("client: ", client);

      // connect the user to stream chat
      await client.connectUser(
        {
          id: "vietnguyenmobile",
          name: "Viet Nguyen",
          image:
            "https://variety.com/wp-content/uploads/2022/02/Screen-Shot-2022-05-09-at-10.04.13-AM.png",
        },
        client.devToken("vietnguyenmobile")
      );
      setChatClient(client);

      const globalChannel = client.channel("livestream", "global", {
        name: "viet nguyen test",
      });

      console.log("globalChannel: ", globalChannel);

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

  const value = { username: "Test username" };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => useContext(ChatContext);

export default ChatContextProvider;
