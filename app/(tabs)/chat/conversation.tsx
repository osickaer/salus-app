import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ChatTextInput from "@/components/inputs/ChatTextInput";

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
        } items-center my-2`}
      >
        {/* Icon */}
        {!isUser && (
          <Ionicons
            name="chatbubbles-outline"
            size={24}
            color="#c99708"
            className="mr-2"
          />
        )}

        {/* Message Bubble */}
        <View
          className={`${
            isUser ? "bg-primary ml-auto" : "bg-secondary mr-auto"
          } px-4 py-2 rounded-lg max-w-[80%]`}
        >
          <Text
            className={`text-sm ${
              isUser ? "text-darkTextPrimary" : "text-lightTextPrimary"
            }`}
          >
            {item.message}
          </Text>
        </View>

        {/* Icon for User */}
        {isUser && (
          <Ionicons
            name="person-circle-outline"
            size={24}
            color="#b22b2b"
            className="ml-2"
          />
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
        <ScrollView className="flex-grow">
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
