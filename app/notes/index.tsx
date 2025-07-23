import AddNoteModal from "@/components/AddNoteModal";
import NoteList from "@/components/NoteList";
import noteService from "@/services/noteService";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NotesScreen = () => {

    const [notes, setNotes] = useState<any[]>([]);

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [newNote, setNewNote] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        setIsLoading(true);
        const response = await noteService.getNotes();

        if(response.error) {
            setError(response.error);
            Alert.alert('Error', response.error);
        } else if (Array.isArray(response.data)) {
            setNotes(response.data);
            setError(null)
        }
        setIsLoading(false);
    };

    const addNote = () => {
        // TODO: Implement add note functionality
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