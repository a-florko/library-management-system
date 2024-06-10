import React from "react";
import BookList from "./BookList";
import TopPanel from "../../ui/TopPanel";

const handleAddBook = () => {
    console.log("Clicked on add book")
}

const Home: React.FC = () => {
    return (
        <div>
            <TopPanel
                onAddBook={handleAddBook}
            />
            <BookList />
        </div>
    )
}

export default Home;