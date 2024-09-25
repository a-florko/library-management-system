import axios from "axios";
import { Book, BookData, BookUpdateDto } from "../types/BookProps";
import { IssueBookData, IssuedBookDto } from "../types/IssueBookProps";
import { OverdueIssuedBooks } from "../types/OverdueIssuedBookProps";

const API_URL = `${process.env.REACT_APP_API_URL}/books`;

export const BookService = {
    async getAll(setServerDown: (error: boolean) => void): Promise<Book[] | null> {
        try {
            const response = await axios.get<Book[]>(API_URL)
            return response.data;
        } catch (error: any) {
            if (error.code === "ERR_NETWORK") {
                setServerDown(true);
            }
            console.error('Error fetching books:', error);
            return null;
        };
    },

    async getById(id: string, setServerDown: (error: boolean) => void): Promise<Book | null> {
        try {
            const response = await axios.get<Book>(`${API_URL}/${id}`)
            return response.data;
        } catch (error: any) {
            if (error.code === "ERR_NETWORK") setServerDown(true);
            else if (error.response.status === 404) return null;
            else console.error('Error fetching book:', error);
            return null;
        }
    },

    async getIssuedBooks(setServerDown: (error: boolean) => void): Promise<IssuedBookDto[] | null> {
        try {
            const response = await axios.get<IssuedBookDto[]>(`${API_URL}/issued`);
            return response.data; 
        } catch (error: any) {
            if (error.code === "ERR_NETWORK") {
                setServerDown(true);
            }
            console.error('Error fetching issued books:', error);
            return null;
        }
    },

    async getOverdueIssuedBooks(setServerDown: (error: boolean) => void): Promise<OverdueIssuedBooks[] | null> {
        try {
            const response = await axios.get<OverdueIssuedBooks[]>(`${API_URL}/issued/overdue`);
            return response.data; 
        } catch (error: any) {
            if (error.code === "ERR_NETWORK") {
                setServerDown(true);
            }
            console.error('Error fetching issued books:', error);
            return null;
        }
    },

    async create(bookToAdd: BookData): Promise<Book | null> {
        try {
            const response = await axios.post(API_URL, bookToAdd);
            return response.data;
        } catch (error: any) {
            console.error('Error adding book:', error);
            return null;
        };
    },

    async issue(issueBookData: IssueBookData): Promise<true | false> {
        try {
            const response = await axios.post(`${API_URL}/issue-book`, issueBookData);
            if (response.status === 200) return true
            else return false;
        } catch (error: any) {
            console.error('Error adding book:', error.message);
            return false;
        };
    },

    async returnBook(id: number): Promise<true | false> {
        try {
            const response = await axios.delete(`${API_URL}/return-book/${id}`);
            return response.status === 200 ? true : false;
        } catch (error: any) {
            console.error('Error when returning a book:', error.message)
            return false;
        };
    },

    async deleteById(id: number, setServerDown: (error: boolean) => void): Promise<true | false> {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error: any) {
            if (error.code === "ERR_NETWORK") {
                setServerDown(true);
            }
            console.error('Error deleting book:', error.message);
            return false;
        };
    },

    async update(id: number, bookData: BookUpdateDto, setServerDown: (error: boolean) => void): Promise<Book | null> {
        try {
            const response = await axios.put(`${API_URL}/${id}`, bookData);
            return response.data;
        } catch (error: any) {
            if (error.code === "ERR_NETWORK") {
                setServerDown(true);
            }
            console.error('Error updating book:', error.message);
            return null;
        };
    }
}