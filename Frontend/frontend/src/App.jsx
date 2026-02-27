import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Admin from './pages/Admin'
import LoginModal from './components/LoginModal'
import './styles/App.css'

function App() {
    const [isAdmin, setIsAdmin] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)

    // Raccourci clavier Ctrl + Shift + A pour ouvrir la modale de connexion admin
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'A') {
                if (isAdmin) {
                    // Déjà connecté, on déconnecte
                    handleLogout()
                } else {
                    setShowLoginModal(true)
                }
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isAdmin])

    const handleLoginSuccess = (token) => {
        localStorage.setItem('token', token)
        setIsAdmin(true)
        setShowLoginModal(false)
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsAdmin(false)
    }

    return (
        <div className="app">
            {showLoginModal && (
                <LoginModal
                    onSuccess={handleLoginSuccess}
                    onClose={() => setShowLoginModal(false)}
                />
            )}
            {isAdmin ? (
                <Admin onLogout={handleLogout} />
            ) : (
                <Home />
            )}
        </div>
    )
}

export default App