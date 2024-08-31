import { useContext } from "react";
import { BooksContext } from "../context/BooksContext";

export const useBooks = () => {
    const context = useContext(BooksContext);
    if (context === undefined) {
        throw new Error('useBooks must be used withint a BooksProvider');
    }
    return context;
};