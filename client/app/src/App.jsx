import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [bookTitle, setBookTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);
  const [updateBookTitle, setUpdateBookTitle] = useState("");

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try{
      const response = await fetch("http://127.0.0.1:8000/api/books/")
      const data = await response.json()

      setBooks(data)
    } catch (err) {
      console.log(err)
    }
  }

  const addBooks = async () => {
   
    const bookData = {
      book_title: bookTitle,
      release_year: releaseYear,
    };

    try{
      const response = await fetch("http://127.0.0.1:8000/api/books/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookData),
      });

      const data = await response.json()

      setBooks(b => [data, ...b])
    } catch (err) {
      console.log(err)
    }
  }

  const updateBook = async (id, release_year) => {
    const bookData = {
      book_title: updateBookTitle,
      release_year
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/book_detail/${id}`, {
        
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData)
      })

      const data = await response.json()

      setBooks((b) => 
        b.map((book) => {
          if (book.id === id) {
            return data;
          } else {
            return book;
          }
        })
      )
    } catch (err) {
      console.log(err)
    }
  }

  const deleteBook = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/books/book_detail/${id}`, {
        method: "DELETE",
      });
      
      setBooks((b) => 
        b.filter(b => b.id !== id)
      )
    } catch (err) {
      console.log(err)
    }
  }

  const handleSetBookTitle = (event) => {
    setBookTitle(event.target.value)
  }

  const handleSetReleaseYear = (event) => {
    setReleaseYear(event.target.value)
  }

  const handleUpdateBookTitle = (event) => {
    setUpdateBookTitle(event.target.value)
  }



  return (
    <>
      <div className='w-[50vw] p-4 bg-gray-200 rounded-2xl m-auto mt-10 flex flex-col'>
        <h2 className='font-bold text-center'>Book Shop</h2>
        <div className='w-[80%] flex flex-col justify-center items-center m-auto mt-5 gap-2'>
          <input type='text' placeholder='Enter book title' className='bg-white px-8 py-1 rounded-sm' onChange={handleSetBookTitle}/>
          <input type='number' placeholder='Enter release year' className='bg-white px-8 py-1 rounded-sm' onChange={handleSetReleaseYear}/>
          <button className='bg-blue-400 px-6 py-2 rounded-2xl mt-4 font-bolder text-white cursor-pointer' onClick={addBooks}>Add Book</button>
        </div>
      </div>

      <div className='w-[50vw] p-4 bg-gray-100 rounded-2xl m-auto mt-10 mb-20 flex flex-col'>
        <h3 className='font-bold text-center'>Book List</h3>
        {books.map((book) => 
          <div key={book.id} className='flex flex-col justify-between px-4 py-1 my-1'>
            <div className='flex justify-between px-4 py-1 my-1'>
              <h2 className='font-semibold'>{book.book_title} - {book.release_year}</h2>
              <div>
                <button 
                  className='py-[.25rem] px-4 bg-red-400 rounded-xl 
                            font-semibold text-white cursor-pointer duration-200 
                            ease-out hover:px-5'
                  onClick={() => deleteBook(book.id)}
                  >Delete</button>
              </div>
            </div>
            <div className='flex justify-between px-4 py-1'>
              <input type="text" placeholder='Set New Title' className='bg-white basis-3/5 px-2 rounded-md' onChange={handleUpdateBookTitle}/>
              <div>
                <button className='py-[.25rem] px-4 bg-blue-400 rounded-xl font-semibold text-white cursor-pointer duration-200 ease-out hover:px-5' onClick={() => updateBook(book.id, book.release_year)}>Update</button>
              </div>
            </div>
          </div>
          )}
      </div>
    </>
  )
}

export default App
