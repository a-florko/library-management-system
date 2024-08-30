import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import styles from "./TopPanel.module.css";
import { useAuth } from "../../../hooks/useAuth";

interface TopPanelProps {
    toggleAddBookModal: () => void;
    toggleIssueBookModal: () => void;
    toggleReturnBookModal: () => void;
}

const TopPanel: React.FC<TopPanelProps> = ({ toggleAddBookModal, toggleIssueBookModal, toggleReturnBookModal }) => {
    const { fullName, logOut } = useAuth();

    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="light">
            <Container>
                <Navbar.Brand className={`text-white ms-3 px-2 pointer-mouse ${styles['navbar-item']}`}>
                    <span className="h3">Signed in as: Librarian, {fullName}</span>
                </Navbar.Brand>
                <Nav className="ms-auto me-4">
                    <Dropdown>
                        <Dropdown.Toggle className={`${styles['dropdown-toggle']} me-3 py-2`}>
                            <span className="h4">Manage Books</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item className="h5" onClick={toggleAddBookModal}>
                                Add Book
                            </Dropdown.Item>
                            <Dropdown.Item className="h5" onClick={toggleIssueBookModal}>
                                Issue Book
                            </Dropdown.Item>
                            <Dropdown.Item className="h5" onClick={toggleReturnBookModal}>
                                Return Book
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Navbar.Text className={`text-white px-2 pointer-mouse ${styles['navbar-item']}`} onClick={logOut}>
                        <span className="h4">Log Out</span>
                    </Navbar.Text>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default TopPanel;