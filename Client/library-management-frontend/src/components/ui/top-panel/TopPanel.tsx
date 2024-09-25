import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import styles from "./TopPanel.module.css";
import SearchBookWithLink from "./SearchBookWithLink";
import AccountDropdown from "../AccountDropdown";

interface TopPanelProps {
    toggleAddBookModal: () => void;
    toggleIssueBookModal: () => void;
    toggleReturnBookModal: () => void;
    toggleDeleteBookModal: () => void;
    toggleUpdateBookModal: () => void;
}

const TopPanel: React.FC<TopPanelProps> = ({ toggleAddBookModal, toggleIssueBookModal,
                                             toggleReturnBookModal, toggleDeleteBookModal,
                                             toggleUpdateBookModal }) => {

    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="light">
            <Container>
                <Navbar.Brand>
                    <AccountDropdown />
                </Navbar.Brand>
                <Navbar.Toggle className="bg-white"/>
                <Navbar.Collapse className={styles['navbar-collapsed']}>
                    <Nav className="justify-content-end w-100">
                        <div className={`me-3 ${styles['search-field-container']}`}>
                            <SearchBookWithLink className="h-100"/>
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle className="dropdown-toggle text-white" variant="">
                                <span className="h4">Manage Books</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className={styles['show']}>
                                <Dropdown.Item className='h5 mb-1' onClick={toggleAddBookModal}>
                                    Add Book
                                </Dropdown.Item>
                                <Dropdown.Item className='h5 mb-1' onClick={toggleIssueBookModal}>
                                    Issue Book
                                </Dropdown.Item>
                                <Dropdown.Item className='h5 mb-1' onClick={toggleReturnBookModal}>
                                    Return Book
                                </Dropdown.Item>
                                <Dropdown.Item className='h5 mb-1' onClick={toggleUpdateBookModal}>
                                    Update Book
                                </Dropdown.Item>
                                <Dropdown.Item className='h5 mb-1' onClick={toggleDeleteBookModal}>
                                    Delete Book
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default TopPanel;