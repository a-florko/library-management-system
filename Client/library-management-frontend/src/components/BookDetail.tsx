import React, { useEffect, useState } from "react";
import { Book } from "../types/BookProps";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const BookDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [bookIsInLibrary, setBookIsInLibrary] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        axios.get<Book>(`https://localhost:7233/api/books/${id}`)
            .then(response => {
                setBook(response.data);
            })
            .catch(error => {
                if (error.response.status === 404) 
                { 
                    setBookIsInLibrary(false);
                }
                else console.error('Error fetching book:', error);
                
            });
    }, []);
    
    if (bookIsInLibrary === false) {
        return (
            <div>
                <h1>
                    There is no such book in our library.
                </h1>
                <h2><Link to={'/'}>Back to the list of books</Link></h2>
            </div>
        );
    }

    if (!book) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    return <h1> Book id: {id} {book?.title} </h1>
}

export default BookDetail;