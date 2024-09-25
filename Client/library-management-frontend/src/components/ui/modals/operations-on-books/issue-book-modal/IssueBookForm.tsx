import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useBooks } from "../../../../../hooks/useBooks";
import { IssueBookData } from "../../../../../types/IssueBookProps";
import { BorrowerSelection } from "./BorrowerSelection";

interface IssueBookFormProps {
    issueBookData: IssueBookData;
    setIssueBookData: React.Dispatch<React.SetStateAction<IssueBookData>>;
    toggleAddNewBorrowerModal: () => void;
    setBorrowerId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const IssueBookForm: React.FC<IssueBookFormProps> = ({
    issueBookData,
    setIssueBookData,
    toggleAddNewBorrowerModal,
    setBorrowerId,
}) => {
    const { books } = useBooks();
    const [bookSelectionValidation, setBookSelectionValidation] = useState<boolean>(true);

    const handleBookSelection = (selectedBook: string) => {
        const result = books!.find(b => (b.title === selectedBook));
        if (result === undefined) return setBookSelectionValidation(false);
        setIssueBookData(prev => ({
            ...prev,
            bookId: result.id
        }))
        return setBookSelectionValidation(true);
    }

    return (
        <>
            <Form>
                <Form.Group className="mb-3">
                    <Typeahead
                        id="book-select"
                        onChange={(selected) => { handleBookSelection(String(selected)) }}
                        options={books!.filter(book => book.copiesInStock > 0).map(book => book.title)}
                        placeholder="Book"
                        isInvalid={!bookSelectionValidation}
                    />
                </Form.Group>
                <BorrowerSelection toggleAddNewBorrowerModal={toggleAddNewBorrowerModal} setBorrowerId={setBorrowerId} />
                <Form.Group className="mb-3">
                    <Form.Label className="h5 ms-1">Issue Date</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        name="issueDate"
                        value={issueBookData.issueDate || ""}
                        onChange={e => setIssueBookData(prev => ({
                            ...prev, issueDate: e.target.value
                        }))}
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label className="h5 ms-1">Return Before</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        name="returnBefore"
                        value={issueBookData.returnBefore || ""}
                        onChange={e => setIssueBookData(prev => ({
                            ...prev, returnBefore: e.target.value
                        }))}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Notes (if necessary)"
                        name="notes"
                        value={issueBookData.notes}
                        style={{ resize: "none" }}
                        onChange={e => setIssueBookData(prev => ({
                            ...prev, notes: e.target.value
                        }))}
                    />
                </Form.Group>
            </Form>
        </>
    );
};

export default IssueBookForm;