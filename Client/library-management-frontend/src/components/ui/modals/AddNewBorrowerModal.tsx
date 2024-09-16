import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { BorrowerService } from "../../../services/borrower.service";
import { Borrower } from "../../../types/BorrowerProps";

interface NewBorrowerModalProps {
    showModal: boolean;
    toggleModal: () => void;
};

const initialBorrowerData: Borrower = {
    fullName: '',
    telephone: '',
    email: '',
};

const AddNewBorrowerModal: React.FC<NewBorrowerModalProps> = ({ showModal, toggleModal }) => {
    const [borrower, setBorrower] = useState<Borrower>(initialBorrowerData);

    const resetForm = () => {
        setBorrower(initialBorrowerData);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        BorrowerService.create(borrower);
        toggleModal();
        resetForm();
    };

    const handleModalClose = () => {
        toggleModal();
        resetForm();
    };

    return (
        <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <span className="h1 m-0">Add New Borrower</span>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Full Name"
                            value={borrower.fullName}
                            onChange={e => setBorrower(prev => ({
                                ...prev, fullName: e.target.value
                            }))}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="tel"
                            placeholder="Phone"
                            value={borrower.telephone}
                            onChange={e => setBorrower(prev => ({
                                ...prev, telephone: e.target.value
                            }))}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            value={borrower.email}
                            onChange={e => setBorrower(prev => ({
                                ...prev, email: e.target.value
                            }))}
                            required
                        />
                    </Form.Group>
                    <hr/>
                    <Form.Group className="d-flex align-items-center justify-content-center">
                        <Button className="mx-auto" variant="btn btn-outline-dark" size="lg" type="submit">
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddNewBorrowerModal;