import { useRef, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { BookData } from "../../types/BookProps";
import axios from "axios";

interface AddBookModalProps {
    showModal: boolean;
    toggleModal: () => void;
}

const initialBookData: BookData = {
    title: '',
    author: '',
    overview: '',
    language: '',
    copiesInStock: 0,
    totalCopies: 0
};

const AddBookModal: React.FC<AddBookModalProps> = ({ showModal, toggleModal }) => {
    const [bookToAdd, setBookToAdd] = useState<BookData>(initialBookData);

    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = () => {
        console.log(bookToAdd);
        axios.post('https://localhost:7233/api/books', bookToAdd)
            .then(response => {
                toggleModal();
                setBookToAdd(initialBookData);  
            })
            .catch(error => {
                if (error.code === "ERR_NETWORK") {

                }
                console.error('Error fetching books:', error);
            });
    }

    return (
        <Modal show={showModal} onHide={toggleModal}>
            <Modal.Header closeButton>
                <span className="h1 m-0">Add Book</span>
            </Modal.Header>
            <Modal.Body>
                <Form ref={formRef}>
                    <Form.Group className="mb-3">
                        <Form.Control type="text"
                            placeholder="Title"
                            name="title"
                            value={bookToAdd.title}
                            onChange={e => setBookToAdd(prev => ({
                                ...prev, title: e.target.value
                            }))}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Author"
                            name="author"
                            value={bookToAdd.author}
                            onChange={e => setBookToAdd(prev => ({
                                ...prev, author: e.target.value
                            }))}>
                        </Form.Control>
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
                            }))}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Control
                            type="text"
                            placeholder="Language(s)"
                            name="language"
                            value={bookToAdd.language}
                            onChange={e => setBookToAdd(prev => ({
                                ...prev, language: e.target.value
                            }))}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label className="h6">Сopies In Stock</Form.Label>
                        <Form.Control
                            type="number"
                            min={0}
                            placeholder="Сopies In Stock"
                            name="copiesInStock"
                            value={bookToAdd.copiesInStock}
                            onChange={e => setBookToAdd(prev => ({
                                ...prev, copiesInStock: +e.target.value
                            }))}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="h6">Total Copies</Form.Label>
                        <Form.Control type="number"
                            min={0} placeholder="Total Copies"
                            name="totalCopies"
                            value={bookToAdd.totalCopies}
                            onChange={e => setBookToAdd(prev => ({
                                ...prev, totalCopies: +e.target.value
                            }))}>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer >
                <Button className="mx-auto" variant="btn btn-outline-dark" size="lg" onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddBookModal;