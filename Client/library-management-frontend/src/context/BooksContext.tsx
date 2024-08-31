import { createContext, useEffect, useState } from "react";
import { Book } from "../types/BookProps";
import { useServerState } from "./SeverStateContext";
import { BookService } from "../services/book.service";
import { IssuedBookDto } from "../types/IssueBookProps";
import { OverdueIssuedBooks } from "../types/OverdueIssuedBookProps";

interface BooksContextProps {
    books: Book[] | undefined;
    issuedBooks: IssuedBookDto[] | undefined;
    overdueIssuedBooks: OverdueIssuedBooks[] | undefined;
    addBook: (newBook: Book) => void;
    issueCopy: (bookId: number) => void;
    returnCopy: (id: number) => void;
    loadIssuedBooks: () => Promise<void>;
    loadOverdueIssuedBooks: () => Promise<void>;
}

export const BooksContext = createContext<BooksContextProps | undefined>(undefined);

export const BooksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [books, setBooks] = useState<Book[] | undefined>(undefined);
    const [issuedBooks, setIssuedBooks] = useState<IssuedBookDto[] | undefined>(undefined)
    const [overdueIssuedBooks, setOverdueIssuedBooks] = useState<OverdueIssuedBooks[] | undefined>(undefined);

    const { setServerDown } = useServerState();

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await BookService.getAll(setServerDown);
            if (response) setBooks(response);
        }
        fetchBooks();
    }, [setServerDown]);

    const addBook = (newBook: Book) => {
        setBooks(prevBooks => [...(prevBooks || []), newBook])
    }

    const issueCopy = (bookId: number) => {
        books!.map(b => b.id === bookId ? { ...b, copiesInStock: b.copiesInStock - 1 } : b)
    };

    const returnCopy = (id: number) => {
        books!.map(b => b.id === id ? { ...b, copiesInStock: b.copiesInStock + 1 } : b)
    }

    const loadIssuedBooks = async () => {
        const requestResult = await BookService.getIssuedBooks(setServerDown);
        if (requestResult !== null) setIssuedBooks(requestResult);
    }

    const loadOverdueIssuedBooks = async () => {
        const requestResult = await BookService.getOverdueIssuedBooks(setServerDown);
        if (requestResult !== null) setOverdueIssuedBooks(requestResult);
    }

    return (
        <BooksContext.Provider value={{
            books, issuedBooks, overdueIssuedBooks,
            addBook, issueCopy, returnCopy,
            loadIssuedBooks, loadOverdueIssuedBooks
        }}>
            {children}
        </BooksContext.Provider>
    );
};