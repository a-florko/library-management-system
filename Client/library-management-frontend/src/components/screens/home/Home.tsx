import React, { useState } from "react";
import BookList from "./BookList";
import AddBookModal from "../../ui/modals/operations-on-books/AddBookModal";
import TopPanel from "../../ui/top-panel/TopPanel";
import { useServerState } from "../../../context/SeverStateContext";
import ServerDown from "../../ui/ServerDown";
import IssueBookModal from "../../ui/modals/operations-on-books/IssueBookModal";
import { useBooks } from "../../../hooks/useBooks";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { BooksProvider } from "../../../context/BooksContext";
import ReturnBookModal from "../../ui/modals/operations-on-books/ReturnBookModal";
import DeleteBookModal from "../../ui/modals/operations-on-books/DeleteBookModal";

const Home: React.FC = () => {
    const [showAddBookModal, setShowAddBookModal] = useState(false);
    const [showIssueBookModal, setShowIssueBookModal] = useState(false);
    const [showReturnBookModal, setShowReturnBookModal] = useState(false);
    const [showDeleteBookModal, setShowDeleteBookModal] = useState(false);

    const { books } = useBooks();
    const { serverDown } = useServerState();

    const toggleAddBookModal = () => setShowAddBookModal(!showAddBookModal);
    const toggleIssueBookModal = () => setShowIssueBookModal(!showIssueBookModal);
    const toggleReturnBookModal = () => setShowReturnBookModal(!showReturnBookModal);
    const toggleDeleteBookModal = () => setShowDeleteBookModal(!showDeleteBookModal);

    if (serverDown) return <ServerDown />
    if (!books) return <LoadingSpinner />
    return (
        <>
            <TopPanel
                toggleAddBookModal={toggleAddBookModal}
                toggleIssueBookModal={toggleIssueBookModal}
                toggleReturnBookModal={toggleReturnBookModal}
                toggleDeleteBookModal={toggleDeleteBookModal}
            />
            <BookList />
            <AddBookModal showModal={showAddBookModal} toggleModal={toggleAddBookModal} />
            <IssueBookModal showModal={showIssueBookModal} toggleModal={toggleIssueBookModal} />
            <ReturnBookModal showModal={showReturnBookModal} toggleModal={toggleReturnBookModal} />
            <DeleteBookModal showModal={showDeleteBookModal} toggleModal={toggleDeleteBookModal} />
        </>
    )
}

const HomeWrapper: React.FC = () => {
    return (
        <BooksProvider>
            <Home />
        </BooksProvider>
    )
}

export default HomeWrapper;