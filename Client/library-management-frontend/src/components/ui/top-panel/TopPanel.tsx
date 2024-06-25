import { Navbar } from "react-bootstrap";
import "./TopPanel.css";


interface TopPanelProps {
    toggleModal: () => void;
}

const TopPanel: React.FC<TopPanelProps> = ({ toggleModal }) => {
    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="light" className="d-flex justify-content-around">
            <Navbar.Brand className="text-white ms-1 px-2 pointer-mouse navbar-item">
                <p className="h3">Signed in as: Librarian, Adam Frost</p>
            </Navbar.Brand>
            <Navbar.Text className="text-white me-2 px-2 pointer-mouse navbar-item" onClick={toggleModal}>
                <p className="h4">Add Book</p>
            </Navbar.Text>
        </Navbar>
    )
}

export default TopPanel;