import { FlatList, View } from "react-native";
import NoteItem from "./NoteItem";

const NoteList = ({ notes, onDelete, onEdit }: { notes: any[], onDelete: (id: string) => void, onEdit: (id: string, text: string) => void }) => {
    return ( 
        <View>
            <FlatList
                data={notes}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <NoteItem note={item} onDelete={onDelete} onEdit={onEdit} />
                )}
            />
        </View>
     );
}
 
export default NoteList;