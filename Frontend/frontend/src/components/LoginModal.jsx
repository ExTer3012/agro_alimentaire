import { useState } from 'react'
import { login } from '../api/api'
import '../styles/LoginModal.css'

function LoginModal({ onSuccess, onClose }) {
    const [credentials, setCredentials] = useState({ login: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const data = await login(credentials)
            onSuccess(data.token)
        } catch (err) {
            setError('Login ou mot de passe incorrect')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <h2>Accès Administrateur</h2>
                <p>Espace réservé à la gestion de l'annuaire</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Login</label>
                        <input
                            type="text"
                            value={credentials.login}
                            onChange={(e) => setCredentials({ ...credentials, login: e.target.value })}
                            placeholder="Login"
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <label>Mot de passe</label>
                        <input
                            type="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            placeholder="Mot de passe"
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Annuler</button>
                        <button type="submit" className="btn-confirm" disabled={loading}>
                            {loading ? 'Connexion...' : 'Se connecter'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginModal