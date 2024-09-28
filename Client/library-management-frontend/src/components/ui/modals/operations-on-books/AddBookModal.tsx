import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useBooks } from "../../../../hooks/useBooks";
import useNotification from "../../../../hooks/useNotification";
import { BookData } from "../../../../types/BookProps";
import NotificationBox from "../../notification-box/NotificationBox";
import LanguagesSelectionField from "../../LanguagesSelectionField";

interface AddBookModalProps {
    showModal: boolean;
    toggleModal: () => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ showModal, toggleModal }) => {
    const [bookToAdd, setBookToAdd] = useState<BookData>({} as BookData);
    const { notification, showNotification } = useNotification();
    const { addBook } = useBooks();

    const setSelectedLanguages = (languages: string[]) => {
        setBookToAdd(prev => ({ ...prev, language: languages.join(", ") }));
    };
    const handleSubmit = async () => {
        try {
            const isBookAdded = await addBook(bookToAdd);
            if (isBookAdded) {
                toggleModal();
                setBookToAdd({} as BookData);
            }
            else showNotification("Failed to add book", "Please try again later", 5000);
        } catch {
            showNotification("Failed to add book", "Please try again later", 5000);
        }
    };

    return (
        <>
            <NotificationBox isVisible={notification.isVisible} mainText={notification.mainText} subText={notification.subText} />
            <Modal show={showModal} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <span className="h1 m-0">Add Book</span>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control type="text"
                                placeholder="Title"
                                name="title"
                                value={bookToAdd.title}
                                onChange={e => setBookToAdd(prev => ({
                                    ...prev, title: e.target.value
                                }))}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Author"
                                name="author"
                                value={bookToAdd.author}
                                onChange={e => setBookToAdd(prev => ({
                                    ...prev, author: e.target.value
                                }))}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Description"
                                name="overview"
                                value={bookToAdd.overview}
                                style={{ resize: "none" }}
                                onChange={e => setBookToAdd(prev => ({
                                    ...prev, overview: e.target.value
                                }))}
                            />
                        </Form.Group>
                        <LanguagesSelectionField selectedLanguages={bookToAdd.language ? bookToAdd.language.split(", ") : []}
                                                 setSelectedLanguages={setSelectedLanguages} />
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="number"
                                min={0}
                                placeholder="Сopies In Stock"
                                name="copiesInStock"
                                value={bookToAdd.copiesInStock}
                                onChange={e => setBookToAdd(prev => ({
                                    ...prev, copiesInStock: +e.target.value
                                }))}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="number"
                                min={0} placeholder="Total Copies"
                                name="totalCopies"
                                value={bookToAdd.totalCopies}
                                onChange={e => setBookToAdd(prev => ({
                                    ...prev, totalCopies: +e.target.value
                                }))}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer >
                    <Button className="mx-auto" variant="btn btn-outline-dark" size="lg" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddBookModal;