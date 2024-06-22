import axios from "axios";
import { Book } from "../types/BookProps";

export const BookService = {
    async getAll(setServerDown: (error: boolean) => void): Promise<Book[] | null> {
        try {
            const response = await axios.get<Book[]>('https://localhost:7233/api/books')
            return response.data;
        } catch (error: any) {
            if (error.code === "ERR_NETWORK") {
                setServerDown(true);
            }
            console.error('Error fetching books:', error);
            return null;
        };
    },

    async getById(id: number, setBookIsInLibrary: (error: boolean) => void): Promise<Book | null> {
        try {
            const response = await axios.get<Book>(`https://localhost:7233/api/books/${id}`)
            setBookIsInLibrary(true);
            return response.data;
        } catch (error: any) {
            if (error.response.status === 404) setBookIsInLibrary(false);
            else console.error('Error fetching book:', error);
            return null;
        }
    }
}