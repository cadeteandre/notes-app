import AddNoteModal from "@/components/AddNoteModal";
import NoteList from "@/components/NoteList";
import noteService from "@/services/noteService";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

    const addNote = async() => {
        if(newNote.trim() === '') return;

        const response = await noteService.addNote(newNote);

        if(response.error) {
            Alert.alert('Error', response.error);
        } else {
            setNotes((prevNotes) => [...prevNotes, response.data]);
        }

        setNewNote('');
        setIsModalVisible(false);
    };

    const deleteNote = async(id: string) => {
        console.log('deleteNote called with id:', id);
        
        // Para web, deletar diretamente. Para mobile, mostrar confirmação
        if (Platform.OS === 'web') {
            // Confirmar com prompt nativo do browser
            if (confirm('Are you sure you want to delete this note?')) {
                await performDelete(id);
            }
        } else {
            // Usar Alert.alert para mobile
            Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => performDelete(id),
                },
            ]);
        }
    };

    const performDelete = async (id: string) => {
        console.log('Delete button pressed, calling noteService.deleteNote');
        const response = await noteService.deleteNote(id);
        console.log('deleteNote response:', response);
        if(response.error) {
            if (Platform.OS === 'web') {
                alert('Error: ' + response.error);
            } else {
                Alert.alert('Error', response.error);
            }
        } else {
            console.log('Note deleted successfully, updating state');
            setNotes((prevNotes) => prevNotes.filter((note) => note.$id !== id));
        }
    };

    const editNote = async (id: string, newText: string) => {
        if(!newText.trim()) {
            Alert.alert('Error', 'Note cannot be empty');
            return;
        }

        const response: any = await noteService.updateNote(id, newText);
        if(response.error) {
            Alert.alert('Error', response.error);
        } else {
            setNotes((prevNotes) => prevNotes.map((note) => note.$id === id ? { ...note, text: response.data?.text } : note));
        }
    }

    return ( 
        <View style={styles.container}> 
            { isLoading ? (
                <ActivityIndicator size='large' color='#007bff' />
            ) : (
                <>
                { error ? <Text style={styles.errorText}>{error}</Text> : null }
                <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />
                </>
            )}
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
        minHeight: "100%",
        justifyContent: "space-between",
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
    errorText: {
        color: "red",
        textAlign: "center",
        marginBottom: 10,
        fontSize: 16,
    }
});

export default NotesScreen;