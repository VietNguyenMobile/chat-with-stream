import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import ChatsScreen from "./ChatsScreen";
import ChatRoomScreen from "./ChatRoomScreen";
import ChatContextProvider from "../../constants/ChatContent";
import UsersScreen from "../UsersScreen";
import ModalScreen from "../ModalScreen";

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <ChatContextProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Chats"
          component={ChatsScreen}
          options={({ navigation }) => ({
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate("Users")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome
                  name="users"
                  size={25}
                  color={"dimgray"}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="Users" component={UsersScreen} />
          <Stack.Screen name="Modal" component={ModalScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </ChatContextProvider>
  );
};
