import { Button, Modal } from "react-bootstrap";

interface ConfirmationModalProps {
    show: boolean;
    title: string;
    body: string;
    onCancel: () => void;
    onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmationModalProps> = ({ show, title, body, onCancel, onConfirm }) => {
    return (
        <Modal show={show} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmModal;