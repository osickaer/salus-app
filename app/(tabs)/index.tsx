import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChatTextInput from "@/components/inputs/ChatTextInput";
import ConversationsRow from "@/components/features/ConversationsRow";
import ProfileHeaderRow from "@/components/layout/ProfileHeaderRow";
import { Ionicons } from "@expo/vector-icons";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    body: "Example of a body text from Supabase",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    body: "Example of a body text from Supabase",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    body: "Example of a body text from Supabase",
  },
];

// Predefined chat suggestions
const predefinedChats = [
  "How do I gain muscle?",
  "How often should I train",
  "What should I eat?",
  "Should I take creatine?",
  "I want to log a meal",
];

type ItemProps = { title: string };

const Item = ({ title }: ItemProps) => (
  <View className="bg-darkContainer p-2 mx-4 my-2">
    <Text className="text-base">{title}</Text>
  </View>
);

export default function Chat() {
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState("");

  const handleSend = () => {
    console.log("Message sent:", message); // Log the message or perform any action
    setMessage(""); // Clear the input after sending the message
  };

  const handlePredefinedChatPress = (text: string) => {
    setMessage(text); // Prefill the chat input with the selected predefined chat
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Use "padding" for iOS and "height" for Android
      className="flex-1 bg-darkBackground"
    >
      <View
        className="flex-1 bg-darkBackground"
        style={{ paddingTop: insets.top }}
      >
        <ScrollView className="flex-grow">
          <ProfileHeaderRow />
          {/* Header row for scroll view */}
          <View className="flex-row justify-between items-center mx-5 mb-2">
            <Text className="text-textPrimaryDark text-2xl font-semibold">
              Recent Chats
            </Text>
            <Text className="text-medium text-lg underline text-textSecondaryDark">
              View all
            </Text>
          </View>
          {/* Horizontal ScrollView */}
          <ConversationsRow data={DATA} />
          {/* Predefined Chats List */}
          <View className="mx-4 my-6">
            {/* Title for Suggested Topics */}
            <Text className="text-textPrimaryDark text-2xl font-semibold mb-4">
              Suggested Topics
            </Text>

            {/* Suggested Chat Items */}
            {predefinedChats.map((chat, index) => (
              <TouchableOpacity
                key={index}
                className="bg-darkContainer p-4 rounded-lg flex-row items-center justify-between mb-3 shadow-lg"
                onPress={() => handlePredefinedChatPress(chat)}
              >
                <Text className="text-base font-medium text-textPrimaryDark">
                  {chat}
                </Text>

                {/* Optional icon or arrow */}
                <View className="ml-2">
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color="white"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {/* Sign Out Button */}
          <TouchableOpacity
            onPress={signOut}
            className="bg-primary mx-4 p-3 rounded-full"
          >
            <Text className="text-textLight text-center">Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Chat Input fixed at the bottom */}
        <View className="px-4 mb-4 mt-2">
          <ChatTextInput
            value={message} // The current message state
            onChangeText={setMessage} // Update the message state as the user types
            placeholder="Type your message..."
            onSend={handleSend} // Function to handle sending the message
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
