import { createContext, useEffect, useState } from "react";
import { Book, BookData, BookUpdateDto } from "../types/BookProps";
import { useServerState } from "./SeverStateContext";
import { BookService } from "../services/book.service";
import { IssuedBookDto } from "../types/IssueBookProps";
import { OverdueIssuedBooks } from "../types/OverdueIssuedBookProps";

interface BooksContextProps {
    books: Book[] | undefined;
    issuedBooks: IssuedBookDto[] | undefined;
    overdueIssuedBooks: OverdueIssuedBooks[] | undefined;
    addBook: (newBook: BookData) => Promise<boolean>;
    issueCopy: (bookId: number) => void;
    returnCopy: (id: number) => void;
    loadIssuedBooks: () => Promise<void>;
    loadOverdueIssuedBooks: () => Promise<void>;
    deleteBook: (id: number) => Promise<boolean>;
    calculateOverdue: (issuedBookReturnDto: IssuedBookDto) => number | null;
    updateBook: (bookId: number, newBookData: BookUpdateDto) => Promise<boolean>;
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

    const addBook = async (newBook: BookData): Promise<boolean> => {
        const addedBook = await BookService.create(newBook);
        if (addedBook) {
            setBooks(prevBooks => [...(prevBooks || []), addedBook]);
            return true;
        }
        return false;
    };

    const issueCopy = (bookId: number) => {
        books!.map(b => b.id === bookId ? { ...b, copiesInStock: b.copiesInStock - 1 } : b);
    };

    const returnCopy = async (id: number) => {
        BookService.returnBook(id)
        books!.map(b => b.id === id ? { ...b, copiesInStock: b.copiesInStock + 1 } : b);
    };

    const loadIssuedBooks = async () => {
        const requestResult = await BookService.getIssuedBooks(setServerDown);
        if (requestResult !== null) setIssuedBooks(requestResult);
    };

    const loadOverdueIssuedBooks = async () => {
        const requestResult = await BookService.getOverdueIssuedBooks(setServerDown);
        if (requestResult !== null) setOverdueIssuedBooks(requestResult);
    };

    const deleteBook = async (id: number): Promise<boolean> => {
        const isOperationSuccessful = await BookService.deleteById(id, setServerDown);
        if (!isOperationSuccessful) return false;
        setBooks(prevBooks => prevBooks!.filter(b => b.id !== id));
        return true;
    };

    const calculateOverdue = (issuedBookReturnDto: IssuedBookDto): number | null => {
        const returnBeforeDate = new Date(issuedBookReturnDto.returnBefore);
        const todayDate = new Date()

        returnBeforeDate.setHours(0, 0, 0, 0);
        todayDate.setHours(0, 0, 0, 0);

        const diffTime = todayDate.getTime() - returnBeforeDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays > 0 ? diffDays : null;
    };

    const updateBook = async (bookId: number, newBookData: BookUpdateDto): Promise<boolean> => {
        const updatedBook = await BookService.update(bookId, newBookData, setServerDown);
        if (updatedBook) {
            setBooks(prevBooks => prevBooks!.map(b => b.id === bookId ? updatedBook : b));
            return true;
        }
        return false;
    };

    return (
        <BooksContext.Provider value={{
            books, issuedBooks, overdueIssuedBooks,
            addBook, issueCopy, returnCopy,
            loadIssuedBooks, loadOverdueIssuedBooks, deleteBook,
            calculateOverdue, updateBook
        }}>
            {children}
        </BooksContext.Provider>
    );
};