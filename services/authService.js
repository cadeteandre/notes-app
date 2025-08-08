import { ID } from "react-native-appwrite";
import { account } from "./appwrite";

const authService = {
    //Register a new user
    async register(email, password) {
        try {
            const response = await account.create(ID.unique(), email, password);
            return response;
        } catch (error) {
            return { error: error.message || 'Resgister failed. Please try again.' };
        }
    },
    //login a user
    async login(email, password) {
        try {
            const response = await account.createEmailPasswordSession(email, password);
            return response;
        } catch (error) {
            return { error: error.message || 'Login failed. Please check your credentials.' };
        }
    },
    // get logged in user 
    async getUser() {
        try {
            return await account.get();
        } catch (error) {
            return { error: error.message || 'Failed to get user.' };
        }
    },
    //logout a user
    async logout() {
        try {
            await account.deleteSession('current');
        } catch (error) {
            return { error: error.message || 'Failed to logout. Please try again.' };
        }
    }
}

export default authService;