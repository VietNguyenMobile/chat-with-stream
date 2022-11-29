import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChatsScreen from "./ChatsScreen";
import ChatRoomScreen from "./ChatRoomScreen";
import ChatContextProvider from "../../constants/ChatContent";

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <ChatContextProvider>
      <Stack.Navigator>
        <Stack.Screen name="Chats" component={ChatsScreen} />
        <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
      </Stack.Navigator>
    </ChatContextProvider>
  );
};
