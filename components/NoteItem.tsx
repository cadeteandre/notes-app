import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NoteItem = ({ note, onDelete }: { note: any, onDelete: (id: string) => void }) => {
    return ( 
        <View style={styles.noteItem}>
        <Text style={styles.noteTitle}>{note.text}</Text>
        {/* <Text>{note.content}</Text> */}
        <TouchableOpacity onPress={ () => {
            console.log('Delete button pressed for note:', note);
            onDelete(note.$id);
        }}>
            <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>	
    </View>
     );
}
 
export default NoteItem;

const styles = StyleSheet.create({
    noteItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5",
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    delete: {
        color: "red",
        fontSize: 18,
        fontWeight: "bold",
    }
})