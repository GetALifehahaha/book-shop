import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
      <div className='section'>
        <h1 className='section-title'>Book for Sale</h1>

        <div className='form'>
          <input id='book_title' type="text" placeholder='Book Title' className='input'/>
          <input id='release_year' type="number" placeholder='Release Year' className='input'/>
          <button className='button'>Add Book</button>
        </div>
      </div>


      <div className='section'>
        <h1 className='section-title'>List of Books</h1>
      </div>
      

    </>
  )
}

export default App
