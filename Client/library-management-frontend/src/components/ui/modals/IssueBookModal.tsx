import { Modal, Button, Form } from "react-bootstrap";
import NotificationBox from "../notification-box/NotificationBox";
import useNotification from "../../../hooks/useNotification";
import { BookService } from "../../../services/book.service";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { IssueBookData } from "../../../types/IssueBookProps";
import { useBooks } from "../../../context/BooksContext";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from "react-bootstrap-typeahead";

interface IssueBookModalProps {
    showModal: boolean;
    onBookIssue: (bookTitle: string) => void;
    toggleModal: () => void;
}

const initialIssueBookData: IssueBookData = {
    bookTitle: "",
    fullReaderName: "",
    issuedBy: "",
    issueDate: "",
    returnBefore: "",
    notes: "",
};

const IssueBookModal: React.FC<IssueBookModalProps> = ({ showModal, onBookIssue, toggleModal }) => {
    const [issueBookData, setIssueBookData] = useState<IssueBookData>(initialIssueBookData);
    const { visible, mainText, subText, showNotification } = useNotification();
    const { fullName } = useAuth();
    const { books } = useBooks();
    const [selectedBookValidation, setBookSelectionValidation] = useState<boolean>(true);

    const handleIssue = async (e: React.FormEvent) => {
        e.preventDefault();

        const isBookSelected = books.some(e => e.title === issueBookData.bookTitle);
        setBookSelectionValidation(isBookSelected);

        if (!isBookSelected) return;

        try {
            setIssueBookData(prev => ({ ...prev, issuedBy: fullName }));
            const resultIssuingBook = await BookService.issue(issueBookData);
            if (resultIssuingBook) {
                toggleModal();
                onBookIssue(issueBookData.bookTitle);
                setIssueBookData(initialIssueBookData);
            }
            else showNotification("Failed to issue book", "Please try again later", 5000)
        } catch {
            showNotification("Failed to issue book", "Please try again later", 5000)
        }
    }

    return (
        <>
            <NotificationBox visible={visible} mainText={mainText} subText={subText} />
            <Modal show={showModal} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <span className="h1 m-0">Issue Book</span>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleIssue}>
                        <Form.Group className="mb-3">
                            <Typeahead
                                id="book-select"
                                onChange={(selected) => {
                                    setIssueBookData(prev => ({
                                        ...prev, bookTitle: String(selected)
                                    }))
                                }}  
                                options={books.map(book => (
                                    book.title
                                ))}
                                placeholder="Book"
                                isInvalid={!selectedBookValidation}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                required
                                type="text"
                                placeholder="Full Reader Name"
                                name="fullReaderName"
                                value={issueBookData.fullReaderName}
                                onChange={e => setIssueBookData(prev => ({
                                    ...prev, fullReaderName: e.target.value
                                }))}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="h6 ms-1">Issue Date</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                name="issueDate"
                                value={issueBookData.issueDate}
                                onChange={e => setIssueBookData(prev => ({
                                    ...prev, issueDate: e.target.value
                                }))}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="h6 ms-1">Return Before</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                name="returnBefore"
                                value={issueBookData.returnBefore}
                                onChange={e => setIssueBookData(prev => ({
                                    ...prev, returnBefore: e.target.value
                                }))}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Notes (if necessary)"
                                name="notes"
                                value={issueBookData.notes}
                                style={{ resize: "none" }}
                                onChange={e => setIssueBookData(prev => ({
                                    ...prev, overview: e.target.value
                                }))}>
                            </Form.Control>
                        </Form.Group>
                        <hr className="mx-0 px-0" />
                        <Form.Group className="mb-3 d-flex align-items-center justify-content-center">
                            <Button type="submit" variant="btn btn-outline-dark" size="lg">
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default IssueBookModal;