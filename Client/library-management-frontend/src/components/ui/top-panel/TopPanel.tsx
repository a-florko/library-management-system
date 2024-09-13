import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import styles from "./TopPanel.module.css";
import { useAuth } from "../../../hooks/useAuth";

interface TopPanelProps {
    toggleAddBookModal: () => void;
    toggleIssueBookModal: () => void;
    toggleReturnBookModal: () => void;
    toggleDeleteBookModal: () => void;
}

const TopPanel: React.FC<TopPanelProps> = ({ toggleAddBookModal, toggleIssueBookModal,
                                            toggleReturnBookModal, toggleDeleteBookModal }) => {
    const { fullName, logOut } = useAuth();

    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="light" className="">
            <Container>
                <Navbar.Brand className={`text-white ms-3 px-2 pointer-mouse me-auto ${styles['navbar-item']}`}>
                    <span className="h3">Signed in as: Librarian, {fullName}</span>
                </Navbar.Brand>
                <Navbar.Toggle className="bg-white me-3" />
                <Navbar.Collapse className={`justify-content-end pe-4 ms-3 ${styles['navbar-collapsed']}`}>
                    <Nav className="justify-content-end">
                        <Dropdown>
                            <Dropdown.Toggle className={`${styles['dropdown-toggle']} me-3 p-2 text-white`} variant="">
                                <span className="h4">Manage Books</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className={styles['show']}>
                                <Dropdown.Item className={`h5 mb-1 ${styles['dropdown-item']}`} onClick={toggleAddBookModal}>
                                    Add Book
                                </Dropdown.Item>
                                <Dropdown.Item className={`h5 mb-1 ${styles['dropdown-item']}`} onClick={toggleIssueBookModal}>
                                    Issue Book
                                </Dropdown.Item>
                                <Dropdown.Item className={`h5 mb-1 ${styles['dropdown-item']}`} onClick={toggleReturnBookModal}>
                                    Return Book
                                </Dropdown.Item>
                                <Dropdown.Item className={`h5 mb-1 ${styles['dropdown-item']}`} onClick={toggleDeleteBookModal}>
                                    Delete Book
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className={`mt-2 ${styles['log-out']}`}>
                            <span className={`text-white pointer-mouse h4 p-2 ${styles['navbar-item']} ${styles['log-out-span']}`} onClick={logOut}>
                                Log Out
                            </span>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default TopPanel;