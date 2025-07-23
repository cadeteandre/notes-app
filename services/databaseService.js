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
    }
}

export default databaseService;