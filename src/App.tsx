import Form from './components/form.tsx'
import Ticket from './components/ticket.tsx'
import './index.css'
import { Routes, Route } from 'react-router'

function App() {


  return (
    <>
      <div className="wrapper">
        <div className="bg-layer top-right"></div>
        <div className="lines"></div>
        <div className="bg-layer circle"></div>
        <div className="bg-layer bottom-left"></div>

        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='/ticket' element={<Ticket />} />
        </Routes>
      </div>
    </>
  )
}

export default App
