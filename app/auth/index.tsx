import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const AuthScreen = () => {

    const { login, register } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState<boolean | string>(false);

    const handleAuth = async () => {
        setError(false);
        
        if (!email.trim() || !password.trim()) {
            setError('Please fill in all fields');
            return;
        }

        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setError('Please enter a valid email address');
            return;
        }

        // Validação de senha para registro
        if (isRegistering) {
            if (password.length < 8) {
                setError('Password must be at least 8 characters long');
                return;
            }
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }
        }

        let response;

        try {
            if(isRegistering) {
              response = await register(email.trim(), password);
            } else {
              response = await login(email.trim(), password);
            }

            if(response?.error) {
              setError(response.error);
              return;
            }

            router.replace('/notes');
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
            console.error('Auth error:', error);
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.header}>{isRegistering ? 'Sign Up' : 'Login'}</Text>

            {error ? <Text style={styles.error}>{ error }</Text> : null}

            <TextInput 
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#aaa"
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput 
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#aaa"
                secureTextEntry={true}
            />

            {isRegistering && (
                <TextInput 
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholderTextColor="#aaa"
                    secureTextEntry={true}
                />
            )}

            <TouchableOpacity style={styles.button} onPress={handleAuth}>
                <Text style={styles.buttonText}>{isRegistering ? 'Sign Up' : 'Login'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
                <Text style={styles.switchText}>{isRegistering ? 'Already have an account? Login' : "Don't have an account? Sign Up"}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#f8f9fa',
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    input: {
      width: '100%',
      padding: 12,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      marginBottom: 12,
      backgroundColor: '#fff',
      fontSize: 16,
    },
    button: {
      backgroundColor: '#007bff',
      paddingVertical: 12,
      borderRadius: 8,
      width: '100%',
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    switchText: {
      marginTop: 10,
      color: '#007bff',
      fontSize: 16,
    },
    error: {
      color: 'red',
      marginBottom: 10,
      fontSize: 16,
    },
  });

export default AuthScreen;