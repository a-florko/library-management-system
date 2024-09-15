import { useNavigate } from "react-router-dom"
import { useBooks } from "../../../hooks/useBooks";
import { Typeahead } from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';

const SearchBookWithLink = () => {
    const navigate = useNavigate();
    const { books } = useBooks();

    const handleSelection = (selected: string) => {
        const selectedBook = books!.find(b => b.title === selected);
        if (selectedBook) navigate(`/books/${selectedBook.id}`);
    }

    return (
        <Typeahead
            id="find-book"
            onChange={(selected) => {
                handleSelection(String(selected))
            }
            }
            options={books!.map(book => book.title)}
            placeholder="Find Book"
        />
    )
}

export default SearchBookWithLink;