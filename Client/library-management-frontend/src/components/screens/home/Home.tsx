import React, { useEffect, useState } from "react";
import BookList from "./BookList";
import AddBookModal from "../../ui/AddBookModal";
import { Book } from "../../../types/BookProps";
import axios from "axios";
import TopPanel from "../../ui/TopPanel";

const Home: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [books, setBooks] = useState<Book[] | null>(null);
    const [serverError, setServerError] = useState<boolean>(false);

    useEffect(() => {
        axios.get<Book[]>('https://localhost:7233/api/books')
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                if (error.code === "ERR_NETWORK") {
                    setServerError(true);
                }
                console.error('Error fetching books:', error);
            });
    }, []);
    
    const toggleModal = () => setShowModal(!showModal);

    return (
        <>
            {!serverError && books && (
                <TopPanel toggleModal={toggleModal}></TopPanel>
            )}
            <BookList books={books} serverError={serverError} />
            <AddBookModal showModal={showModal} toggleModal={toggleModal}/>
        </>
    )
}

export default Home;