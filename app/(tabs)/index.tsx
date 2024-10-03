import { View, Text, Button } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function Home() {
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}
