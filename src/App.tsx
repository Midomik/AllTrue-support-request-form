import { Route, Routes } from 'react-router-dom'
import SupportFormPage from './features/supportForm/pages/SupportFormPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<SupportFormPage />} />
      <Route path="/confirmation" element={<div>Confirmation</div>} />
    </Routes>
  )
}

export default App