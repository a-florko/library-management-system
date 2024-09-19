import { useNavigate } from "react-router-dom"
import { useBooks } from "../../../hooks/useBooks";
import { Typeahead } from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';

interface SearchBookWithLinkProps {
    className?: string
}

const SearchBookWithLink:React.FC<SearchBookWithLinkProps> =  ({ className }) => {
    const navigate = useNavigate();
    const { books } = useBooks();

    const handleSelection = (selected: string) => {
        const selectedBook = books!.find(b => b.title === selected);
        if (selectedBook) navigate(`/books/${selectedBook.id}`);
    }

    return (
        <Typeahead
            id="find-book"
            className={className}
            onChange={(selected) => {
                handleSelection(String(selected))
            }
            }
            options={books!.map(book => book.title)}
            placeholder="Find Book"
            inputProps={{
                style: {
                    'fontSize': '1.1rem',
                  }
            }}
        />
    )
}

export default SearchBookWithLink;