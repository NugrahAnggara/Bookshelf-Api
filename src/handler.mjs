import { nanoid } from "nanoid"
import {books} from "./books.mjs"

export const addBook = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
    const id = nanoid(16)
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt

    const finished = readPage === pageCount

    const book = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt
    }

    if (name == null) {
        const response = h.response({
            "status": "fail",
            "message": "Gagal menambahkan buku. Mohon isi nama buku"
        })

        response.code(400)
        return response
    } else if (readPage > pageCount) {
        const response = h.response({
            "status": "fail",
            "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        })

        response.code(400);
        return response;
    } else {
        books.push(book)
        const response = h.response({
            "status": "success",
            "message": "Buku berhasil ditambahkan",
            "data": {
                "bookId": id
            }
        })
        response.code(201)
        return response
    }
}

export const getAllBooks = (request, response) => {
    const filterBooks = books.map((book)=>({
        "id" : book.id,
        "name" : book.name,
        "publisher" : book.publisher
    }))

    if (books.length == 0) {
        const responses = response.response({
            "status": "success",
            "data": {
                "books": []
            }
        })
        responses.code(200)
        return responses
    }else{
        const responses = response.response({
            "status": "success",
            "data": {
                "books" : filterBooks
            }
        })
        responses.code(200)
        return responses
    }
}


export const getBookById = (request, h) => {
    const { bookId } = request.params

    const book = books.filter((n) => n.id == bookId)[0]

    if (typeof book !== 'undefined') {
        const response = h.response({
            "status": "success",
            "data": {
                "book": book
            }
        })
        response.code(200)
        return response
    }

    const fail = h.response({
        "status": "fail",
        "message": "Buku tidak ditemukan"
    })

    fail.code(404)
    return fail
}

export const editBookbyId = (request, h) => {
    const { bookId } = request.params
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updateAt = new Date().toDateString

    const index = books.findIndex((book) => book.id == bookId)
    if (index != -1) {
        if (name == null) {
            const erroname = h.response({
                "status": "fail",
                "message": "Gagal memperbarui buku. Mohon isi nama buku"
            })
            erroname.code(400)
            return erroname
        }

        if (readPage > pageCount) {
            const erroPage = h.response({
                "status": "fail",
                "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
            })
            erroPage.code(400)
            return erroPage
        }

        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updateAt
        };

        const response = h.response({
            "status": "success",
            "message": "Buku berhasil diperbarui"
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        "status": "fail",
        "message": "Gagal memperbarui buku. Id tidak ditemukan"
    });
    response.code(404);
    return response;
}


export const deleteBookById = (request, h) => {
    const { bookId } = request.params;
    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil dihapus',
        });
    
        response.code(200);
        return response;
      }
    
      const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      });
    
      response.code(404);
      return response;
}