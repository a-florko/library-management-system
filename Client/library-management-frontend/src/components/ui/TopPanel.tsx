import { Navbar } from "react-bootstrap";
import Button from "react-bootstrap/Button"

interface TopPanelProps {
    onAddBook: () => void;
}

const TopPanel: React.FC<TopPanelProps> = ({ onAddBook }) => {
    return (
        <Navbar bg="light" expand="lg">
            <div className="ml-auto d-flex">
                <Button variant="outline-dark" className="mr-2" onClick={onAddBook}>Add Book</Button>
            </div>
        </Navbar>
    )
}

export default TopPanel;