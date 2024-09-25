import { useState } from "react";
import TopPanel from "./TopPanel";
import AddBookModal from "../modals/operations-on-books/AddBookModal";
import DeleteBookModal from "../modals/operations-on-books/DeleteBookModal";
import IssueBookModal from "../modals/operations-on-books/issue-book-modal/IssueBookModal";
import ReturnBookModal from "../modals/operations-on-books/ReturnBookModal";
import UpdateBookModal from "../modals/operations-on-books/UpdateBookModal";

const TopPanelContainer: React.FC = () => {
    const [showAddBookModal, setShowAddBookModal] = useState(false);
    const [showIssueBookModal, setShowIssueBookModal] = useState(false);
    const [showReturnBookModal, setShowReturnBookModal] = useState(false);
    const [showDeleteBookModal, setShowDeleteBookModal] = useState(false);
    const [showUpdateBookModal, setShowUpdateBookModal] = useState(false);

    const toggleAddBookModal = () => setShowAddBookModal(!showAddBookModal);
    const toggleIssueBookModal = () => setShowIssueBookModal(!showIssueBookModal);
    const toggleReturnBookModal = () => setShowReturnBookModal(!showReturnBookModal);
    const toggleDeleteBookModal = () => setShowDeleteBookModal(!showDeleteBookModal);
    const toggleUpdateBookModal = () => setShowUpdateBookModal(!showUpdateBookModal);

    return (
        <>
            <TopPanel
                toggleAddBookModal={toggleAddBookModal}
                toggleIssueBookModal={toggleIssueBookModal}
                toggleReturnBookModal={toggleReturnBookModal}
                toggleDeleteBookModal={toggleDeleteBookModal}
                toggleUpdateBookModal={toggleUpdateBookModal}
            />
            <AddBookModal showModal={showAddBookModal} toggleModal={toggleAddBookModal} />
            <IssueBookModal showModal={showIssueBookModal} toggleModal={toggleIssueBookModal} />
            <ReturnBookModal showModal={showReturnBookModal} toggleModal={toggleReturnBookModal} />
            <DeleteBookModal showModal={showDeleteBookModal} toggleModal={toggleDeleteBookModal} />
            <UpdateBookModal showModal={showUpdateBookModal} toggleModal={toggleUpdateBookModal} />
        </>
    );
};

export default TopPanelContainer;