import { addBook,getAllBooks,getBookById, editBookbyId, deleteBookById } from "./handler.mjs";

export const routes = [
    {
        path : '/books',
        method : 'POST',
        handler : addBook
    },

    {
        path : '/books',
        method : 'GET',
        handler : getAllBooks
    },

    {
        path : '/books/{bookId}',
        method : 'GET',
        handler : getBookById
    },

    {
        path : '/books/{bookId}',
        method : 'PUT',
        handler : editBookbyId
    },

    {
        path : '/books/{bookId}',
        method : 'DELETE',
        handler : deleteBookById
    },
];