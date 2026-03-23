import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateFlashcards from './pages/CreateFlashcards'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create-flashcards' element={<CreateFlashcards />} />
    </Routes>
  )
}

export default App;
