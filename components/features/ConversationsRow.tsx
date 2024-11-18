import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Container from "../layout/Container";

type ItemProps = {
  id: string;
  title: string;
  body: string;
};

type ConversationsRowProps = {
  data: ItemProps[];
  extraClassNames?: string; // Optional additional class names
};

const ConversationsRow = ({ data, extraClassNames }: ConversationsRowProps) => {
  const router = useRouter();

  const handlePress = (id: string) => {
    router.push({ pathname: "/chat/conversation", params: { id } });
  };

  return (
    <View className={`flex-row ${extraClassNames || ""}`}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handlePress(item.id)}>
            <Container extraClassNames="ml-4 w-[150px]">
              <Text className="text-lg text-textPrimaryDark font-medium">
                {item.title}
              </Text>
              <Text className="text-sm text-textSecondaryDark font-normal">
                {item.body}
              </Text>
            </Container>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ConversationsRow;
