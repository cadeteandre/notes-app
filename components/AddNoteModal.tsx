import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const AddNoteModal = ({ isModalVisible, setIsModalVisible, newNote, setNewNote, addNote }: { isModalVisible: boolean, setIsModalVisible: (isModalVisible: boolean) => void, newNote: string, setNewNote: (newNote: string) => void, addNote: () => void }) => {
    return ( 
        <Modal 
            visible={isModalVisible} 
            animationType="slide"
            transparent
            onRequestClose={() => setIsModalVisible(false)}
            >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add a new Note</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter your note'
                        value={newNote}
                        onChangeText={setNewNote}
                    />
                    <View style={styles.modalButtons}>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveButton} onPress={addNote}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
     );
}
 
export default AddNoteModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 15,
      },
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      cancelButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
      },
      cancelButtonText: {
        fontSize: 16,
        color: '#333',
      },
      saveButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
      },
      saveButtonText: {
        fontSize: 16,
        color: '#fff',
      },
})