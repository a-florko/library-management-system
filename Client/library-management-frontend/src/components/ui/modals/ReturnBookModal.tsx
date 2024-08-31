import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IssuedBookDto } from "../../../types/IssueBookProps";
import { Typeahead } from "react-bootstrap-typeahead";
import { BookService } from "../../../services/book.service";
import { useBooks } from "../../../hooks/useBooks";

interface ReturnBookModalProps {
    showModal: boolean;
    toggleModal: () => void;
}

const ReturnBookModal: React.FC<ReturnBookModalProps> = ({ showModal, toggleModal }) => {
    const [selectedBookTitle, setSelectedBookTitle] = useState<string | undefined>();
    const [issuedBookToReturn, setIssuedBookToReturn] = useState<IssuedBookDto | undefined>(undefined);
    const [overdueReturnDateBy, setOverdueReturnDateBy] = useState<number | null>(null);

    const { loadIssuedBooks, issuedBooks } = useBooks();

    const { returnCopy } = useBooks();

    useEffect(() => {
        if (showModal) {
            loadIssuedBooks()
        }
    }, [showModal, loadIssuedBooks])

    const handleBookTitleSelection = (selected: string) => {
        const result = issuedBooks?.some(ib => (ib.bookTitle === selected));
        if (result) return setSelectedBookTitle(selected);

        setSelectedBookTitle(undefined)
        setIssuedBookToReturn(undefined)
    }

    const handleBorrowerSelection = (borrowerFullName: string) => {
        const result = issuedBooks?.find(ib => ib.bookTitle === selectedBookTitle
            && ib.borrowerFullName === borrowerFullName);

        if (!result) {
            setOverdueReturnDateBy(null);
            setIssuedBookToReturn(undefined)
            return
        }

        setIssuedBookToReturn(result);
        setOverdueReturnDateBy(calculateOvedue(result));
    }

    const calculateOvedue = (issuedBookReturnDto: IssuedBookDto): number | null => {
        const returnBeforeDate = new Date(issuedBookReturnDto.returnBefore);
        const todayDate = new Date()

        returnBeforeDate.setHours(0, 0, 0, 0);
        todayDate.setHours(0, 0, 0, 0);

        const diffTime = todayDate.getTime() - returnBeforeDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays > 0 ? diffDays : null;
    }

    const handleModalHide = () => {
        setSelectedBookTitle(undefined);
        setIssuedBookToReturn(undefined);
        toggleModal()
    }

    const handleBookReturn = () => {
        if (issuedBookToReturn) {
            const returnBookResult = BookService.returnBook(issuedBookToReturn.id)
            returnCopy(issuedBookToReturn.bookId);
        }
        setSelectedBookTitle(undefined);
        setIssuedBookToReturn(undefined);
        toggleModal();
    }

    return (
        <Modal show={showModal} onHide={handleModalHide}>
            <Modal.Header closeButton>
                <span className="h1 m-0">Return Book</span>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className="h6 ms-1">Issued Book Title</Form.Label>
                        <Typeahead
                            id="book-select"
                            onChange={(selected) => {
                                handleBookTitleSelection(String(selected))
                            }
                            }
                            options={[...new Set(issuedBooks?.map(issuedBook => (
                                issuedBook.bookTitle
                            )))]}
                            placeholder="Book To Return"
                        />
                    </Form.Group>
                    {selectedBookTitle && (
                        <Form.Group className="mb-3">
                            <Form.Label className="h6 ms-1">Borrower</Form.Label>
                            <Typeahead
                                id="borrower-select"
                                onChange={selected => {
                                    handleBorrowerSelection(selected.toString())
                                }}
                                options={issuedBooks!
                                    .filter(ib => ib.bookTitle === selectedBookTitle)
                                    .map(ib => ib.borrowerFullName)}
                                placeholder="Borrower"
                            />
                        </Form.Group>
                    )}
                </Form>
                {issuedBookToReturn && (
                    <div className="pt-2">
                        <div className="ps-1 h5">
                            Must be returned by: {issuedBookToReturn.returnBefore}
                            {overdueReturnDateBy && (
                                <p className="text-danger">
                                    Book return is overdue by {overdueReturnDateBy} day(s)
                                </p>
                            )}
                        </div>
                        {issuedBookToReturn.notes.length > 0 && (
                            <div className="pt-1 ps-1">
                                <span className="h5">Notes on issuance: </span>{issuedBookToReturn.notes}
                            </div>
                        )}
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer className="d-flex align-items-center justify-content-center">
                <Button type="button" onClick={handleBookReturn} variant="btn btn-outline-dark" size="lg">
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ReturnBookModal;