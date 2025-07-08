import PostItImage from "@/assets/images/post-it.png";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={PostItImage} style={styles.image} />
      <Text style={styles.title}>Welcome to Notes App</Text>
      <Text style={styles.subtitle}>Capture your thoughts and ideas anytime, anywhere.</Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push("/notes")} >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius:10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343a40",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#ff8c00",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
