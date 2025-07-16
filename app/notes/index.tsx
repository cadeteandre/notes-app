import AddNoteModal from "@/components/AddNoteModal";
import NoteList from "@/components/NoteList";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NotesScreen = () => {

    const [notes, setNotes] = useState([
        {
            id: 1,
            title: "Note 1",
            content: "This is the first note",
        },
        {
            id: 2,
            title: "Note 2",
            content: "This is the second note",
        },
        {
            id: 3,
            title: "Note 3",
            content: "This is the third note",
        },
    ]);

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [newNote, setNewNote] = useState<string>('');

    //add note
    const addNote = () => {
        if(newNote.trim() === '') {
            Alert.alert('Error', 'Please enter a note');
            return;
        }
        setNotes((prevNotes) => [...prevNotes, { id: Date.now(), title: newNote, content: newNote }]);

        setNewNote('');
        setIsModalVisible(false);
    };

    return ( 
        <View style={styles.container}> 
            <Text>Notes</Text>
            <NoteList notes={notes} />
            <TouchableOpacity style={styles.addNoteButton} onPress={() => setIsModalVisible(true)}>
                <Text style={styles.addNoteButtonText}>+ Add Note</Text>
            </TouchableOpacity>

            {/* Modal */}
            <AddNoteModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} newNote={newNote} setNewNote={setNewNote} addNote={addNote} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    addNoteButton: {
        backgroundColor: "#ff8c00",
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    addNoteButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default NotesScreen;