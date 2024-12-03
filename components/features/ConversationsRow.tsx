import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Container from "../layout/Container";

type ConversationsRowProps = {
  data: ChatConversation[];
  extraClassNames?: string; // Optional additional class names
};

const ConversationsRow = ({ data, extraClassNames }: ConversationsRowProps) => {
  const router = useRouter();

  const handlePress = (conversationId: string) => {
    router.push({ pathname: "/chat/conversation", params: { conversationId } });
  };

  return (
    <View className={`flex-row ${extraClassNames || ""}`}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item) => (
          <TouchableOpacity
            key={item.conversationId}
            onPress={() => handlePress(item.conversationId)}
          >
            <Container extraClassNames="ml-4 w-[200px] min-h-[150px]">
              {/* Title with formatted date */}
              <Text className="text-xl text-textPrimaryDark font-normal mb-2">
                {new Date(item.createdAt).toLocaleDateString()}
              </Text>
              {/* Body with conversation description */}
              <Text className="text-base text-textSecondaryDark font-normal">
                {item.conversationDesc.length > 100
                  ? `${item.conversationDesc.substring(0, 100)}...`
                  : item.conversationDesc}
              </Text>
            </Container>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ConversationsRow;
