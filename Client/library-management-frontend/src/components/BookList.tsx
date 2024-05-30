import React, { useEffect, useState } from "react";
import { Book } from "../types/BookProps";
import axios from 'axios';
import { Link } from "react-router-dom";

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        axios.get<Book[]>('https://localhost:7233/api/books')
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }, []);

    return (
        <div>
            <h1>
                List of Books
            </h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <Link to={`/books/${book.id}`}>{book.title}</Link> by {book.author}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BookList;
