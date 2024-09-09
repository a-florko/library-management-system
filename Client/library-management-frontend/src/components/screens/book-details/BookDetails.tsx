import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, Card, CardText, CardTitle, Container } from "react-bootstrap";
import { Book } from "../../../types/BookProps";
import "./BookDetails.css";
import { BookService } from "../../../services/book.service";
import { useServerState } from "../../../context/SeverStateContext";
import ServerDown from "../../ui/ServerDown";
import LoadingSpinner from "../../ui/LoadingSpinner";

const BookDetails: React.FC = () => {
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
    }, [serverDown, id]);

    if (serverDown) return <ServerDown />

    if (loading) return <LoadingSpinner />

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
    }

    return (
        <Container className="vh-100 d-flex align-content-center flex-column justify-content-center flex-wrap container-w">
            <Breadcrumb className="border rounded bg-white h3 p-2">
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }} className="">
                    Home
                </Breadcrumb.Item>
                <Breadcrumb.Item active className="text-dark">Book Details</Breadcrumb.Item>
            </Breadcrumb>
            <Card className="p-3 pb-0">
                <Card.Body>
                    <CardTitle className="">
                        <p className="h1 text-center">«{book.title}»</p>
                    </CardTitle>
                    <CardText className="h4 pb-2 text-center">
                        by {book.author}
                    </CardText>
                    {book.overview.length > 0 && (
                        <CardText>
                            <span className="fw-bold">Description:</span> {book.overview}
                        </CardText>
                    )}
                    <CardText>
                        <span className="fw-bold">Language(s):</span> {book.language}
                    </CardText>
                    <CardText>
                        <span className="fw-bold">Copies In Stock:</span> {book.copiesInStock}
                    </CardText>
                    <CardText>
                        <span className="fw-bold">Total Copies:</span> {book.totalCopies}
                    </CardText>
                </Card.Body>
            </Card>
        </Container>
    )
}

const BookDetailsWrapper: React.FC = () => {
    return (
        <BookDetails />
    )
}

export default BookDetailsWrapper;