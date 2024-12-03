import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChatTextInput from "@/components/inputs/ChatTextInput";
import ConversationsRow from "@/components/features/ConversationsRow";
import ProfileHeaderRow from "@/components/layout/ProfileHeaderRow";
import { Ionicons } from "@expo/vector-icons";

// Predefined chat suggestions
const predefinedChats = [
  "How do I gain muscle?",
  "How often should I train",
  "What should I eat?",
  "Should I take creatine?",
  "I want to log a meal",
];

export default function Chat() {
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState<ChatConversation[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const jwt = await supabase.auth
          .getSession()
          .then((res) => res.data.session?.access_token);

        if (!jwt) {
          console.error("No JWT found, user may not be authenticated");
          return;
        }

        console.log(jwt);

        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/chat/conversations`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch conversations: ${response.statusText}`
          );
        }

        const data: ChatConversation[] = await response.json();
        setConversations(data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

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
          <ConversationsRow data={conversations} />
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
