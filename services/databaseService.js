import { database } from "./appwrite";

const databaseService = {
    // List Documents
    async listDocuments(dbId,colId) {
        try {
            const response = await database.listDocuments(dbId, colId);
            return response.documents || [];
        } catch (error) {
            console.log('Error fetching documents', error);
            return { error: error.message };
        }
    },
    //Create Document
    async createDocument(dbId, colId, data, id = null) {
        try {
            return await database.createDocument(dbId, colId, id || undefined, data);
        } catch(error) {
            console.error('Error creating document', error);
            return {
                error: error.message,
            }
        }
    },
    //Update Document
    async updateDocument(dbId, colId, id, data) {
        try {
            return await database.updateDocument(dbId, colId, id, data);
        } catch (error) {
            console.error('Error updating document', error.message);
            return {
                error: error.message,
            }
        }
    },
    //Delete Document
    async deleteDocument(dbId, colId, id) {
        console.log('deleteDocument called with:', { dbId, colId, id });
        try{
            const result = await database.deleteDocument(dbId, colId, id);
            console.log('deleteDocument success:', result);
            return { success: true };
        } catch (error) {
            console.error('Error deleting document', error);
            return {
                error: error.message,
            }
        }
    }
}

export default databaseService;