import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import CreateFlashcards from './pages/CreateFlashcards'
import MyDecks from './pages/MyDecks'
import DeckDetail from './pages/DeckDetail'
import './App.css'

function App() {
  return (
    <BrowserRouter>
     <AuthProvider>
      <AppRouter />
     </AuthProvider>
    </BrowserRouter>
  );
}

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/my-decks' element={<MyDecks />} />
      <Route path='/decks/:deckId' element={<DeckDetail />} />
      <Route path='/create-flashcards' element={<CreateFlashcards />} />
    </Routes>
  )
}

export default App;
