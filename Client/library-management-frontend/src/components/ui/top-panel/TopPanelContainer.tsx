import { useState } from "react";
import TopPanel from "./TopPanel";

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
    <TopPanel
        toggleAddBookModal={toggleAddBookModal}
        toggleIssueBookModal={toggleIssueBookModal}
        toggleReturnBookModal={toggleReturnBookModal}
        toggleDeleteBookModal={toggleDeleteBookModal}
        />
    );
};

export default TopPanelContainer;