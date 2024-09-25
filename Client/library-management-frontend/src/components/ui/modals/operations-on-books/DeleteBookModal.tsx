import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from "react-bootstrap-typeahead";
import { useBooks } from "../../../../hooks/useBooks";
import useNotification from "../../../../hooks/useNotification";
import NotificationBox from "../../notification-box/NotificationBox";
import { useConfirm } from "../../../../hooks/useConfirm";

interface DeleteBookModalProps {
    showModal: boolean;
    toggleModal: () => void;
}

const DeleteBookModal: React.FC<DeleteBookModalProps> = ({ showModal, toggleModal }) => {
    const { books, deleteBook } = useBooks();

    const [bookToDeleteId, setBookToDeleteId] = useState<number>();
    const [bookSelectionValidation, setBookSelectionValidation] = useState<boolean>(true);

    const { notification, showNotification } = useNotification();
    const { confirm, ConfirmationDialog } = useConfirm();

    const handleBookSelection = (title: string) => {
        const result = books!.find(b => (b.title === title));
        if (result) {
            setBookSelectionValidation(true)
            setBookToDeleteId(result.id)
        }
        else setBookSelectionValidation(false);
    }

    const handleDelete = async () => {
        if (!bookSelectionValidation) return

        toggleModal();

        const bookTitle = books!.find(b => b.id === bookToDeleteId)!.title;
        
        const confirmResult = await confirm("Confirm Delete",
            `Do you really want to delete "${bookTitle}"?`);
        
        if (!confirmResult) return;

        const isBookDeleted = await deleteBook(bookToDeleteId!);

        if (!isBookDeleted) showNotification("Failed to delete book", "Please try again later", 5000);

        toggleModal()
    }

    return (
        <>
            <NotificationBox isVisible={notification.isVisible} mainText={notification.mainText} subText={notification.subText} />
            <ConfirmationDialog />
            <Modal show={showModal} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <span className="h1 m-0">Delete Book</span>
                </Modal.Header>
                <Modal.Body className="pb-0">
                    <Form>
                        <Form.Group className="mb-3">
                            <Typeahead
                                id="book-select"
                                onChange={(selected) => {
                                    handleBookSelection(String(selected))
                                }
                                }
                                options={books!.map(book => (
                                    book.title
                                ))}
                                placeholder="Book To Delete"
                                isInvalid={!bookSelectionValidation}
                            />
                            {!bookSelectionValidation &&
                                <p className="text-danger h6 ps-1 pt-1">Select an existing book to delete</p>
                            }
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Form.Group className="d-flex align-items-center justify-content-center">
                        <Button type="button" onClick={handleDelete} variant="btn border-danger btn-danger" size="lg">
                            Delete
                        </Button>
                    </Form.Group>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteBookModal;