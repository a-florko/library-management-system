import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Dropdown, Row } from 'react-bootstrap';
import styles from "./BookList.module.css";
import { useBooks } from "../../../hooks/useBooks";
import LoadingSpinner from "../../ui/LoadingSpinner";

const booksTypes = [
    { type: 'all', label: 'All Books' },
    { type: 'overdueBooks', label: 'Overdue Books' }
];

const BookList: React.FC = () => {
    const [booksTypeToShow, setBooksTypeToShow] = useState<string>('all');

    const { books, overdueIssuedBooks, loadOverdueIssuedBooks } = useBooks();

    const changeBooksTypeToShow = (newType: string) => {
        setBooksTypeToShow(newType);
        if (newType === 'overdueBooks') {
            loadOverdueIssuedBooks();
        }
    }

    return (
        <Container className="px-5 pt-3">
            <Dropdown className="text-center">
                <Dropdown.Toggle className={`${styles['dropdown-toggle']} mb-3 ps-3`} variant="">
                    <span className="h1 text-dark">{booksTypes.find(bt => bt.type === booksTypeToShow)?.label}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="pb-0">
                    {booksTypes
                        .filter(bt => bt.type !== booksTypeToShow)
                        .map(bt => (
                            <Dropdown.Item
                                key={bt.type}
                                className={`${styles['dropdown-item']} h4`}
                                onClick={() => changeBooksTypeToShow(bt.type)}
                            >
                                {bt.label}
                            </Dropdown.Item>
                        ))}
                </Dropdown.Menu>
            </Dropdown>
            {booksTypeToShow === 'all' && (
                books!.length > 0 ? (
                    books!.map(book => (
                        <Row className="mb-3" key={book.id}>
                            <Col className="col-12 border rounded bg-light h3 py-2 ps-3 m-0 text-center">
                                <Link to={`/books/${book.id}`}>{book.title}</Link> by {book.author}
                            </Col>
                        </Row>
                    ))
                ) : (
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="d-flex flex-column align-items-center border rounded bg-light py-3 px-2 w-75 text-center">
                            <h1>No books have been added to the library yet</h1>
                        </div>
                    </div>
                )
            )}
            {booksTypeToShow === 'overdueBooks' && (
                overdueIssuedBooks !== undefined ? (
                    overdueIssuedBooks.length > 0 ? (
                        overdueIssuedBooks!.map(oib => (
                            <Row className="mb-3" key={oib.id}>
                                <Col className="col-12 border rounded bg-light py-2 m-0 text-center">
                                    <div className="h3 pb-0 text-danger">
                                        "{oib.bookTitle}" to {oib.borrowerFullName} — overdue by {oib.overdue} day(s)
                                    </div>
                                    <div className="h4">Borrower phone and email: {oib.borrowerTelephone}; {oib.borrowerEmail}</div>
                                </Col>
                            </Row>
                        ))
                    ) : (
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="d-flex flex-column align-items-center border rounded bg-light py-3 px-2 w-75 text-center">
                                <h1 className="text-success">No issued books with an overdue return date</h1>
                            </div>
                        </div>
                    )
                ) : (
                    <LoadingSpinner></LoadingSpinner>
                )
            )}
        </Container >
    )
}

export default BookList;