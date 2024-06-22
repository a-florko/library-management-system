import React, { useEffect, useState } from "react";
import BookList from "./BookList";
import AddBookModal from "../../ui/AddBookModal";
import { Book } from "../../../types/BookProps";
import TopPanel from "../../ui/TopPanel";
import { BookService } from "../../../services/book.service";
import { useGlobalState } from "../../../context/GlobalStateContext";
import ServerDown from "../../ui/ServerDown";

const Home: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [books, setBooks] = useState<Book[] | null>(null);
    const { serverDown, setServerDown } = useGlobalState();

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await BookService.getAll(setServerDown);
            setBooks(response);
        }
        fetchBooks();
    }, [setServerDown]);

    const toggleModal = () => setShowModal(!showModal);

    if (serverDown) return <ServerDown />

    return (
        <>
            {books && (
                <TopPanel toggleModal={toggleModal}></TopPanel>
            )}
            <BookList books={books} />
            <AddBookModal showModal={showModal} toggleModal={toggleModal} />
        </>
    )
}

export default Home;