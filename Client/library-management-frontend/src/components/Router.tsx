import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookDetail from './screens/book-details/BookDetails';
import Home from './screens/home/Home';
import NotFound from './screens/not-found/NotFound';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/books/:id' element={<BookDetail />}></Route>
                <Route path='*' element={<NotFound />}></Route>
            </Routes>
        </BrowserRouter>
    )
}


export default Router;