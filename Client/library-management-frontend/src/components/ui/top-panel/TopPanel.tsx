import { Container, Nav, Navbar } from "react-bootstrap";
import "./TopPanel.css";
import { useAuth } from "../../../hooks/useAuth";

interface TopPanelProps {
    toggleAddBookModal: () => void;
    toggleIssueBookModal: () => void;
}

const TopPanel: React.FC<TopPanelProps> = ({ toggleAddBookModal, toggleIssueBookModal }) => {
    const { fullName, logOut } = useAuth();

    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="light">
            <Container>
                <Navbar.Brand className="text-white ms-4 px-2 pointer-mouse navbar-item">
                    <span className="h3">Signed in as: Librarian, {fullName}</span>
                </Navbar.Brand>
                <Nav className="ms-auto me-4">
                    <Navbar.Text className="text-white px-2 me-4 pointer-mouse navbar-item" onClick={toggleAddBookModal}>
                        <span className="h4">Add Book</span>
                    </Navbar.Text>
                    <Navbar.Text className="text-white px-2 me-4 pointer-mouse navbar-item" onClick={toggleIssueBookModal}>
                        <span className="h4">Issue Book</span>
                    </Navbar.Text>
                    <Navbar.Text className="text-white px-2 pointer-mouse navbar-item" onClick={logOut}>
                        <span className="h4">Log Out</span>
                    </Navbar.Text>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default TopPanel;