import React, { useState } from "react";
import BookList from "./BookList";
import AddBookModal from "../../ui/modals/AddBookModal";
import TopPanel from "../../ui/top-panel/TopPanel";
import { useServerState } from "../../../context/SeverStateContext";
import ServerDown from "../../ui/ServerDown";
import IssueBookModal from "../../ui/modals/IssueBookModal";
import { useBooks } from "../../../hooks/useBooks";
import ReturnBookModal from "../../ui/modals/ReturnBookModal";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { BooksProvider } from "../../../context/BooksContext";

const Home: React.FC = () => {
    const [showAddBookModal, setShowAddBookModal] = useState(false);
    const [showIssueBookModal, setShowsetIssueBookModal] = useState(false);
    const [showReturnBookModal, setShowsetReturnBookModal] = useState(false);

    const { books } = useBooks();
    const { serverDown } = useServerState();

    const handleBookIssue = (bookId: number) => {
        if (books) books.map(b => b.id === bookId ? { ...b, copiesInStock: b.copiesInStock - 1 } : b)
    };

    const toggleAddBookModal = () => setShowAddBookModal(!showAddBookModal);
    const toggleIssueBookModal = () => setShowsetIssueBookModal(!showIssueBookModal);
    const toggleReturnBookModal = () => setShowsetReturnBookModal(!showReturnBookModal);

    if (serverDown) return <ServerDown />
    if (!books) return <LoadingSpinner />
    return (
        <>
            <TopPanel
                toggleAddBookModal={toggleAddBookModal}
                toggleIssueBookModal={toggleIssueBookModal}
                toggleReturnBookModal={toggleReturnBookModal}
            />
            <BookList />
            <AddBookModal showModal={showAddBookModal} toggleModal={toggleAddBookModal} />
            <IssueBookModal showModal={showIssueBookModal} onBookIssue={handleBookIssue} toggleModal={toggleIssueBookModal} />
            <ReturnBookModal showModal={showReturnBookModal} toggleModal={toggleReturnBookModal} />
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