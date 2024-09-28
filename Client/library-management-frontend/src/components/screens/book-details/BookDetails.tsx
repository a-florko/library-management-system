import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, Card, CardText, Container } from "react-bootstrap";
import { Book } from "../../../types/BookProps";
import "./BookDetails.css";
import { BookService } from "../../../services/book.service";
import { useServerState } from "../../../context/SeverStateContext";
import ServerDown from "../../ui/ServerDown";
import LoadingSpinner from "../../ui/LoadingSpinner";
import TopPanelContainer from "../../ui/top-panel/TopPanelContainer";
import { BooksProvider } from "../../../context/BooksContext";
import { useBooks } from "../../../hooks/useBooks";

const BookDetails: React.FC = () => {
    const { books } = useBooks();
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { serverDown, setServerDown } = useServerState();

    useEffect(() => {
        const fetchBook = async () => {
            setLoading(true);
            if (id) {
                const requestResult = await BookService.getById(id, setServerDown);
                setBook(requestResult);
            }
            setLoading(false);
        };
        fetchBook();
    }, [serverDown, setServerDown, id]);

    if (serverDown) return <ServerDown />;

    if (!books || loading) return <LoadingSpinner />;

    if (!book) {
        return (
            <Container className="vh-100 d-flex flex-column align-content-center justify-content-center flex-wrap">
                <Breadcrumb className="border rounded bg-white h3 p-2 align-self-start">
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }} className="">
                        Home
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active className="text-dark">Book Details</Breadcrumb.Item>
                </Breadcrumb>
                <h1 className="border rounded bg-white p-3 text-danger">
                    There is no such book in our library
                </h1>
            </Container>
        );
    };

    return (
        <div className="vh-100 position-relative">
            <TopPanelContainer />
            <Container className="book-details-container-align">
                <Breadcrumb className="border rounded bg-white h3 p-2 ps-3">
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
                        Home
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active className="text-dark">
                        «{book.title}» by {book.author}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Card className="ps-1">
                    <Card.Body>
                        {book.overview.length > 0 && (
                            <CardText>
                                <span className="h3">Description: </span>
                                <span className="h5">{book.overview}</span>
                            </CardText>
                        )}
                        <CardText>
                            <span className="h3">Language(s): </span>
                            <span className="h4">{book.language}</span>
                        </CardText>
                        <CardText>
                            <span className="h3">Copies In Stock: </span>
                            <span className="h4">{book.copiesInStock}</span>
                        </CardText>
                        <CardText>
                            <span className="h3">Total Copies: </span>
                            <span className="h4">{book.totalCopies}</span>
                        </CardText>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
};

const BookDetailsWrapper: React.FC = () => {
    return (
        <BooksProvider>
            <BookDetails />
        </BooksProvider>
    );
};

export default BookDetailsWrapper;