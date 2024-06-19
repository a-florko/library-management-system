import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from 'react-bootstrap';
import { Book } from "../../../types/BookProps";
import LoadingSpinner from "../../ui/LoadingSpinner";

interface BookListProps {
    books: Book[] | null;
    serverError: boolean;
}

const BookList: React.FC<BookListProps> = ({ books, serverError }) => {
    if (serverError) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="d-flex flex-column align-items-center border rounded px-5 py-4 bg-light">
                    <h1 className="text-danger">
                        There was an error with the server :(
                    </h1>
                    <h3 className="pt-3">
                        Try reloading the page or try again later
                    </h3>
                </div>
            </div>
        )
    }

    if (!books) {
        return (
            <LoadingSpinner></LoadingSpinner>
        )
    }

    return (
        <Container className="px-5 pt-5">
            <div className="h1 pb-3 text-center">
                All books
            </div>
            {books.map(book => (
                <Row className="mb-3" key={book.id}>
                    <Col className="col-12" >
                        <div className="border rounded bg-light h3 py-2 ps-3 m-0 text-center">
                            <Link to={`/books/${book.id}`}>{book.title}</Link> by {book.author}
                        </div>
                    </Col>
                </Row>
            ))}
        </Container>
    )
}

export default BookList;
