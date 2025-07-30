import { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const NoteItem = ({ note, onDelete, onEdit }: { note: any, onDelete: (id: string) => void, onEdit: (id: string, text: string) => void }) => {
    
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(note.text);
    const inputRef = useRef<TextInput>(null);

    const handleSave = () => {
        if(editedText.trim() === '') return;
        onEdit(note.$id, editedText);
        setIsEditing(false);
    }

    return ( 
        <View style={styles.noteItem}>
            { isEditing ? (
                <TextInput 
                    ref={inputRef}
                    style={styles.input}
                    value={editedText}
                    onChangeText={setEditedText}
                    autoFocus
                    onSubmitEditing={handleSave}
                    returnKeyType="done"
                />
            ) : (
                <Text style={styles.noteTitle}>{note.text}</Text>
                // <Text>{note.content}</Text> 
            )}
            <View style={styles.actions}>
                { isEditing ? (
                     <TouchableOpacity onPress={() => {
                        handleSave();
                        inputRef.current?.blur()
                     }}>
                        <Text style={styles.edit}>Save</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={ () => setIsEditing(true) }>
                        <Text style={styles.edit}>Edit</Text>
                    </TouchableOpacity>	
                )}
                <TouchableOpacity onPress={ () => onDelete(note.$id) }>
                    <Text style={styles.delete}>Delete</Text>
                </TouchableOpacity>	
            </View>
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
    },
    actions: {
        flexDirection: "row",
    },
    edit: {
        fontSize: 18,
        marginRight: 10,
        color: "blue",
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    }
})