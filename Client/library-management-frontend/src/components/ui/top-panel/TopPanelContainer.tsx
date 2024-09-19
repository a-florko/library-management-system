import { useState } from "react";
import TopPanel from "./TopPanel";
import AddBookModal from "../modals/operations-on-books/AddBookModal";
import DeleteBookModal from "../modals/operations-on-books/DeleteBookModal";
import IssueBookModal from "../modals/operations-on-books/IssueBookModal";
import ReturnBookModal from "../modals/operations-on-books/ReturnBookModal";

const TopPanelContainer: React.FC = () => {
    const [showAddBookModal, setShowAddBookModal] = useState(false);
    const [showIssueBookModal, setShowIssueBookModal] = useState(false);
    const [showReturnBookModal, setShowReturnBookModal] = useState(false);
    const [showDeleteBookModal, setShowDeleteBookModal] = useState(false);

    const toggleAddBookModal = () => setShowAddBookModal(!showAddBookModal);
    const toggleIssueBookModal = () => setShowIssueBookModal(!showIssueBookModal);
    const toggleReturnBookModal = () => setShowReturnBookModal(!showReturnBookModal);
    const toggleDeleteBookModal = () => setShowDeleteBookModal(!showDeleteBookModal);

    return (
        <>
            <TopPanel
                toggleAddBookModal={toggleAddBookModal}
                toggleIssueBookModal={toggleIssueBookModal}
                toggleReturnBookModal={toggleReturnBookModal}
                toggleDeleteBookModal={toggleDeleteBookModal}
            />
            <AddBookModal showModal={showAddBookModal} toggleModal={toggleAddBookModal} />
            <IssueBookModal showModal={showIssueBookModal} toggleModal={toggleIssueBookModal} />
            <ReturnBookModal showModal={showReturnBookModal} toggleModal={toggleReturnBookModal} />
            <DeleteBookModal showModal={showDeleteBookModal} toggleModal={toggleDeleteBookModal} />
        </>
    );
};

export default TopPanelContainer;