import { StyleSheet, Text, View } from "react-native";

const NotesScreen = () => {
    return ( 
        <View style={styles.container}> 
            <Text>Notes</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default NotesScreen;