import React, { useEffect, useState } from "react";
import { Book } from "../types/BookProps";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import LoadingSpinner from "./LoadingSpinner";

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[] | null>(null);
    const [serverError, setServerError] = useState<boolean>(false);

    useEffect(() => {
        axios.get<Book[]>('https://localhost:7233/api/books')
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                if (error.code === "ERR_NETWORK") {
                    setServerError(true);
                }
                console.error('Error fetching books:', error);
            });
    }, []);

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
        <Container className="ps-5 pt-5 mw-100">
            <Row>
                <Col className="h1 mt-0">
                    All books
                </Col>
            </Row>
            <Row>
                <Col className="col-4">
                    {books.map(book => (
                        <div key={book.id} className="border rounded bg-light h3 py-2 ps-3 m-0">
                            <Link to={`/books/${book.id}`}>{book.title}</Link> by {book.author}
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    )
}

export default BookList;
