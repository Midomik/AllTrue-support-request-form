import { Route, Routes } from 'react-router-dom'
import SupportFormPage from './features/supportForm/pages/SupportFormPage'
import ConfirmationPage from './features/supportForm/pages/ConfirmationPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<SupportFormPage />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
    </Routes>
  )
}

export default App