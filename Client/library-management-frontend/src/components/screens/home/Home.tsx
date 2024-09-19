import React from "react";
import BookList from "./BookList";
import { useServerState } from "../../../context/SeverStateContext";
import ServerDown from "../../ui/ServerDown";
import { useBooks } from "../../../hooks/useBooks";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { BooksProvider } from "../../../context/BooksContext";
import TopPanelContainer from "../../ui/top-panel/TopPanelContainer";

const Home: React.FC = () => {
    const { books } = useBooks();
    const { serverDown } = useServerState();

    if (serverDown) return <ServerDown />
    if (!books) return <LoadingSpinner />
    return (
        <>
            <TopPanelContainer />
            <BookList />
        </>
    )
}

const HomeWrapper: React.FC = () => {
    return (
        <BooksProvider>
            <Home />
        </BooksProvider>
    )
}

export default HomeWrapper;