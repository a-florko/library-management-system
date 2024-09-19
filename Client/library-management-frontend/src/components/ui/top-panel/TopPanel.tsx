import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import styles from "./TopPanel.module.css";
import { useAuth } from "../../../hooks/useAuth";
import SearchBookWithLink from "./SearchBookWithLink";
import AccountDropdown from "../account-dropdown/AccountDropdown";

interface TopPanelProps {
    toggleAddBookModal: () => void;
    toggleIssueBookModal: () => void;
    toggleReturnBookModal: () => void;
    toggleDeleteBookModal: () => void;
}

const TopPanel: React.FC<TopPanelProps> = ({ toggleAddBookModal, toggleIssueBookModal,
                                             toggleReturnBookModal, toggleDeleteBookModal }) => {

    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="light" className="">
            <Container>
                <Navbar.Brand className="ps-4">
                    <AccountDropdown />
                </Navbar.Brand>
                <Navbar.Toggle className="bg-white me-4" />
                <Navbar.Collapse className={`justify-content-end pe-4 ms-3 ${styles['navbar-collapsed']}`}>
                    <Nav className="justify-content-end w-100">
                        <div className={`mt-1 me-2 ${styles['search-field-container']}`}>
                            <SearchBookWithLink />
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle className="dropdown-toggle p-2 text-white" variant="">
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