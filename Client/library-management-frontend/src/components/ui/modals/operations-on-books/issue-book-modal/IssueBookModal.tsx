import { Modal, Button, ModalFooter } from "react-bootstrap";
import NotificationBox from "../../../notification-box/NotificationBox";
import useNotification from "../../../../../hooks/useNotification";
import { BookService } from "../../../../../services/book.service";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../../hooks/useAuth";
import { IssueBookData } from "../../../../../types/IssueBookProps";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useBooks } from "../../../../../hooks/useBooks";
import AddNewBorrowerModal from "../../AddNewBorrowerModal";
import { ModalToShowType } from "./modal-to-show-types.enum";
import IssueBookForm from "./IssueBookForm";

interface IssueBookModalProps {
    showModal: boolean;
    toggleModal: () => void;
}


const IssueBookModal: React.FC<IssueBookModalProps> = ({ showModal, toggleModal }) => {
    const { id } = useAuth();
    const { issueCopy } = useBooks();
    const [issueBookData, setIssueBookData] = useState<IssueBookData>({} as IssueBookData);
    const [selectedBorrowerId, setSelectedBorrowerId] = useState<number | undefined>(undefined);
    const [shouldSubmit, setShouldSubmit] = useState<boolean>(false);
    const { notification, showNotification } = useNotification();

    const [showNewBorrowerModal, setShowNewBorrowerModal] = useState(false);

    const [modalToShow, setModalToShow] = useState<ModalToShowType>(ModalToShowType.ISSUE_BOOK);

    const toggleAddNewBorrowerModal = () => {
        setShowNewBorrowerModal(!showNewBorrowerModal);
        setModalToShow(modalToShow === ModalToShowType.ADD_NEW_BORROWER
            ? ModalToShowType.ISSUE_BOOK
            : ModalToShowType.ADD_NEW_BORROWER);
    };

    useEffect(() => {
        const issueBook = async () => {
            if (shouldSubmit) {
                try {
                    const resultIssuingBook = await BookService.issue(issueBookData);
                    if (resultIssuingBook) {
                        toggleModal();
                        issueCopy(issueBookData.bookId);
                        setIssueBookData({} as IssueBookData);
                    } else {
                        showNotification("Failed to issue book", "Please try again later", 5000);
                    }
                } catch {
                    showNotification("Failed to issue book", "Please try again later", 5000);
                } finally {
                    setShouldSubmit(false);
                }
            }
        };

        issueBook();
    }, [shouldSubmit, issueBookData, toggleModal, issueCopy, showNotification]);

    const handleIssue = () => {
        if (!selectedBorrowerId) return;

        setIssueBookData(prev => ({ ...prev, borrowerId: selectedBorrowerId }));
        setIssueBookData(prev => ({ ...prev, issuedById: +id }));
        setShouldSubmit(true);
    };

    return (
        <>
            <NotificationBox isVisible={notification.isVisible} mainText={notification.mainText} subText={notification.subText} />
            <AddNewBorrowerModal showModal={showNewBorrowerModal && modalToShow === ModalToShowType.ADD_NEW_BORROWER}
                                toggleModal={toggleAddNewBorrowerModal} />
            <Modal show={showModal && modalToShow === ModalToShowType.ISSUE_BOOK} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <span className="h1 m-0">Issue Book</span>
                </Modal.Header>
                <Modal.Body>
                    <IssueBookForm issueBookData={issueBookData}
                                   setIssueBookData={setIssueBookData}
                                   toggleAddNewBorrowerModal={toggleAddNewBorrowerModal}
                                   setBorrowerId={setSelectedBorrowerId}/>
                </Modal.Body>
                <ModalFooter className="d-flex align-items-center justify-content-center">
                    <Button type="button" onClick={handleIssue} variant="btn btn-outline-dark" size="lg">
                        Submit
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default IssueBookModal;