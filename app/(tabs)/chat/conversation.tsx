import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import ChatTextInput from "@/components/inputs/ChatTextInput";
import { Ionicons } from "@expo/vector-icons";

type Message = {
  chat_id: number;
  role: "user" | "assistant";
  message: string;
};

const initialMessages: Message[] = [
  {
    chat_id: 301,
    role: "user",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi finibus tortor volutpat quam ultrices, eu sollicitudin risus accumsan. Donec convallis bibendum lorem, a faucibus odio.",
  },
  {
    chat_id: 302,
    role: "assistant",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi finibus tortor volutpat quam ultrices, eu sollicitudin risus accumsan. Donec convallis bibendum lorem, a faucibus odio.",
  },
  {
    chat_id: 303,
    role: "user",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi finibus tortor volutpat quam ultrices, eu sollicitudin risus accumsan. Donec convallis bibendum lorem, a faucibus odio.",
  },
  {
    chat_id: 304,
    role: "assistant",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi finibus tortor volutpat quam ultrices, eu sollicitudin risus accumsan. Donec convallis bibendum lorem, a faucibus odio.",
  },
];

export default function Conversation(): JSX.Element {
  const [message, setMessage] = useState<string>(""); // State for input message
  const [messages, setMessages] = useState<Message[]>(initialMessages); // State for all messages

  const handleSend = (): void => {
    if (message.trim()) {
      const newMessage: Message = {
        chat_id: Date.now(), // Use timestamp as unique ID
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
        key={item.chat_id}
        className={`flex-row ${
          isUser ? "justify-end" : "justify-start"
        } items-start my-4`}
      >
        {/* Message */}
        {isUser ? (
          <View className="flex-row items-start max-w-[80%] ml-auto">
            <View className="bg-primary px-4 py-2 rounded-lg rounded-br-none flex-shrink">
              <Text className="text-sm text-darkTextPrimary">
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
              <Text className="text-lg text-textPrimaryDark font-medium">
                Salus
              </Text>
              <Text
                className="text-sm text-textPrimaryDark"
                style={{ flexWrap: "wrap" }}
              >
                {item.message}
              </Text>
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
