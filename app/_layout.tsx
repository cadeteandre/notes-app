import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Stack } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const HeaderLogout = () => {
  const { user, logout } = useAuth();

  return user ? (
    <TouchableOpacity style={styles.logoutButton} onPress={logout}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  ) : null
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#ff8c00" },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
        },
        headerRight: () => <HeaderLogout />,
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
      <Stack.Screen 
        name="auth" 
        options={{ 
          headerTitle: "Login",
        }} 
      />
    </Stack>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: '#ff8c00',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  logoutText: {
    color: '#fff',
  }
})