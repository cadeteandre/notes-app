import { Stack } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#ff8c00" },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
        },
        headerTitleAlign: "center", // Centraliza o título
        contentStyle: {
          paddingHorizontal: 10,
          paddingTop: 10,
          backgroundColor: "#fff",
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Home",
        }} 
      />
      <Stack.Screen 
        name="notes" 
        options={({ navigation }) => ({ 
          headerTitle: "Notes",
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}
            >
              <Text style={{ color: '#fff', fontSize: 16, marginRight: 5 }}>←</Text>
              <Text style={{ color: '#fff', fontSize: 16 }}>Home</Text>
            </TouchableOpacity>
          ),
        })} 
      />
    </Stack>
  );
}
