import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native";
import ChatTextInput from "@/components/inputs/ChatTextInput";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";

type Message = {
  chatId: string;
  role: "user" | "assistant";
  message: string;
};

export default function Conversation(): JSX.Element {
  const { conversationId } = useLocalSearchParams(); // Extract conversationId from route params
  const [message, setMessage] = useState<string>(""); // State for input message
  const [messages, setMessages] = useState<Message[]>([]); // State for all messages

  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId) {
        Alert.alert("Error", "Conversation ID is missing.");
        return;
      }

      try {
        const jwt = await supabase.auth
          .getSession()
          .then((res) => res.data.session?.access_token);

        if (!jwt) {
          console.error("No JWT found, user may not be authenticated");
          return;
        }
        const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/chat/conversations/${conversationId}/chatMessages`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch messages: ${response.statusText}`);
        }

        const data = await response.json();
        const formattedMessages = data.map((msg: any) => ({
          chatId: msg.chatId,
          role: msg.role,
          message: msg.message,
        }));

        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        Alert.alert("Error", "Failed to load chat messages.");
      }
    };

    fetchMessages();
  }, [conversationId]);

  const handleSend = (): void => {
    if (message.trim()) {
      const newMessage: Message = {
        chatId: Date.now().toString(), // Use timestamp as unique ID
        role: "user",
        message,
      };
      setMessages((prev) => [...prev, newMessage]);
      setMessage(""); // Clear the input after sending the message
    }
  };

  const renderMessageBubble = (item: Message): JSX.Element => {
    const isUser = item.role === "user";
    return (
      <View
        key={item.chatId}
        className={`flex-row ${
          isUser ? "justify-end" : "justify-start"
        } items-start my-4`}
      >
        {/* Message */}
        {isUser ? (
          <View className="flex-row items-start max-w-[80%] ml-auto">
            <View className="bg-[#ba8c08] px-4 py-2 rounded-lg rounded-br-none flex-shrink">
              <Text className="text-base text-textPrimaryDark font-normal">
                {item.message}
              </Text>
            </View>
          </View>
        ) : (
          <View className="flex-row items-start flex-1">
            <Image
              source={require("@/assets/images/salus-transparent.png")}
              style={{
                width: 32,
                height: 32,
                marginRight: 8,
              }}
            />
            <View className="flex-1">
              <Markdown
                style={{
                  body: { fontSize: 16, color: "#f5f5f5", lineHeight: 24 }, // Adjust text size and color
                  link: { color: "#1E90FF" }, // Optional: style links
                }}
                // className="text-base text-textPrimaryDark"
                // style={{ flexWrap: "wrap" }}
              >
                {item.message}
              </Markdown>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Use "padding" for iOS and "height" for Android
      keyboardVerticalOffset={90} // Adjust for header height
      className="flex-1 bg-darkBackground"
    >
      <View className="flex-1 bg-darkBackground">
        {/* Messages */}
        <ScrollView className="p-4 flex-grow">
          {messages.map(renderMessageBubble)}
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
