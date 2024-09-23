import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useBooks } from "../../../../hooks/useBooks";
import { BookUpdateDto } from "../../../../types/BookProps";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from "react-bootstrap-typeahead";
import { useConfirm } from "../../../../hooks/useConfirm";
import useNotification from "../../../../hooks/useNotification";
import NotificationBox from "../../notification-box/NotificationBox";

type UpdateBookModalProps = {
    showModal: boolean,
    toggleModal: () => void
};

const UpdateBookModal: React.FC<UpdateBookModalProps> = ({ showModal, toggleModal }) => {
    const { books, updateBook } = useBooks();

    const { confirm, ConfirmationDialog } = useConfirm();
    const { notification, showNotification } = useNotification();

    const [bookToUpdateId, setBookToUpdateId] = useState<number>();
    const [bookUpdate, setBookUpdate] = useState<BookUpdateDto>({} as BookUpdateDto);

    const [bookSelectionValidation, setBookSelectionValidation] = useState<boolean>();
    const isCopiesInStockInvalid = bookUpdate.copiesInStock > bookUpdate.totalCopies;

    const handleBookSelection = (title: string) => {
        const result = books!.find(b => (b.title === title));
        if (result) {
            setBookSelectionValidation(true);
            setBookToUpdateId(result.id);
            setBookUpdate({
                author: result.author,
                overview: result.overview,
                language: result.language,
                copiesInStock: result.copiesInStock,
                totalCopies: result.totalCopies
            });
        }
        else setBookSelectionValidation(false);
    };

    const handleClose = () => {
        toggleModal();
        setBookUpdate({} as BookUpdateDto);
        setBookSelectionValidation(false);
    }

    const handleUpdate = async () => {
        if (!bookSelectionValidation || isCopiesInStockInvalid) return;

        if(!hasChanges()) {
            return showNotification("Book not updated", "No changes were made to the book", 3000);
        }
        
        toggleModal();
        const bookTitle = books!.find(b => b.id === bookToUpdateId)!.title;
        const confirmResult = await confirm("Confirm Update",
            `Do you really want to update "${bookTitle}"?`);
        if (!confirmResult) {
            setBookUpdate({} as BookUpdateDto);
            return setBookSelectionValidation(false);
        }

        const isBookUpdated = await updateBook(bookToUpdateId!, bookUpdate!);
        if (!isBookUpdated) showNotification("Failed to update book", "Please try again later", 5000);
    };

    const hasChanges = (): boolean => {
        const initialBook = books?.find((book) => book.id === bookToUpdateId);
        if (!initialBook) return false;

        return (
            initialBook.author !== bookUpdate.author ||
            initialBook.language !== bookUpdate.language ||
            initialBook.overview !== bookUpdate.overview ||
            initialBook.copiesInStock !== bookUpdate.copiesInStock ||
            initialBook.totalCopies !== bookUpdate.totalCopies
        );
    };

    return (
        <>
            <NotificationBox isVisible={notification.isVisible} mainText={notification.mainText} subText={notification.subText} />
            <ConfirmationDialog />
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <span className="h1 m-0">Update Book</span>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="h5 ms-1">Book To Change</Form.Label>
                            <Typeahead
                                id="book-selection"
                                labelKey="title"
                                onChange={(selected) => {
                                    handleBookSelection(String(selected));
                                }}
                                options={books?.map((b) => b.title) || []}
                                placeholder="Select Book"
                            />
                        </Form.Group>
                        {bookSelectionValidation && bookUpdate && (
                            <>
                                <h4 className="text-center mt-4 pt-2 mb-0">Book Data To Update</h4>
                                <Form.Group className="mb-3">
                                    <Form.Label className="h5 ms-1">Author</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Author"
                                        value={bookUpdate.author}
                                        onChange={e => setBookUpdate(prev => ({
                                            ...prev, author: e.target.value
                                        }))}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="h5 ms-1">Copies In Stock</Form.Label>
                                    <Form.Control
                                        min={0}
                                        type="number"
                                        placeholder="Copies In Stock"
                                        value={bookUpdate.copiesInStock}
                                        onChange={e => setBookUpdate(prev => ({
                                            ...prev, copiesInStock: parseInt(e.target.value)
                                        }))}
                                        isInvalid={isCopiesInStockInvalid}
                                    />
                                    {isCopiesInStockInvalid && (
                                        <Form.Text className="text-danger">
                                            <span className="h6 ps-1">Cannot be more than Total Copies</span>
                                        </Form.Text>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="h5 ms-1">Total Copies</Form.Label>
                                    <Form.Control
                                        min={0}
                                        type="number"
                                        placeholder="Total Copies"
                                        value={bookUpdate.totalCopies}
                                        onChange={e => setBookUpdate(prev => ({
                                            ...prev, totalCopies: parseInt(e.target.value)
                                        }))}
                                    />
                                </Form.Group>
                            </>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer className="d-flex align-items-center justify-content-center">
                    <Button type="button" onClick={handleUpdate} variant="btn btn-outline-dark" size="lg">
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UpdateBookModal;