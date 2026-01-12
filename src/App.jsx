import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="d-flex justify-content-center">
        <button className='btn btn-outline-primary' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
