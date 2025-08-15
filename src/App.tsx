import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path="/" element={<div>Form</div>} />
      <Route path="/confirmation" element={<div>Confirmation</div>} />
    </Routes>
  )
}

export default App