import { View, Text, ScrollView } from "react-native";
import Container from "./Container";

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
  return (
    <View className={`flex-row ${extraClassNames || ""}`}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item) => (
          <Container key={item.id} extraClassNames="ml-4 w-[150px]">
            <Text className="text-lg text-textPrimaryDark font-medium">
              {item.title}
            </Text>
            <Text className="text-sm text-textSecondaryDark font-normal">
              {item.body}
            </Text>
          </Container>
        ))}
      </ScrollView>
    </View>
  );
};

export default ConversationsRow;
