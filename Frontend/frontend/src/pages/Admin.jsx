import { useState, useEffect } from 'react'
import {
    getAllSites, createSite, updateSite, deleteSite,
    getAllServices, createService, updateService, deleteService,
    getAllSalaries, createSalarie, updateSalarie, deleteSalarie
} from '../api/api'
import '../styles/Admin.css'

function Admin({ onLogout }) {
    const [activeTab, setActiveTab] = useState('salaries')

    // Données
    const [salaries, setSalaries] = useState([])
    const [sites, setSites] = useState([])
    const [services, setServices] = useState([])

    // Formulaires
    const [editItem, setEditItem] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({})
    const [error, setError] = useState('')

    useEffect(() => {
        fetchAll()
    }, [])

    const fetchAll = async () => {
        try {
            const [s, sv, sl] = await Promise.all([getAllSites(), getAllServices(), getAllSalaries()])
            setSites(s)
            setServices(sv)
            setSalaries(sl)
        } catch (err) {
            console.error(err)
        }
    }

    const openCreate = () => {
        setEditItem(null)
        setFormData(getEmptyForm())
        setError('')
        setShowForm(true)
    }

    const openEdit = (item) => {
        setEditItem(item)
        setFormData(getFlatForm(item))
        setError('')
        setShowForm(true)
    }

    const getEmptyForm = () => {
        if (activeTab === 'sites') return { ville: '' }
        if (activeTab === 'services') return { nom: '' }
        return { nom: '', prenom: '', telephoneFixe: '', telephonePortable: '', email: '', siteId: '', serviceId: '' }
    }

    const getFlatForm = (item) => {
        if (activeTab === 'sites') return { ville: item.ville }
        if (activeTab === 'services') return { nom: item.nom }
        return {
            nom: item.nom,
            prenom: item.prenom,
            telephoneFixe: item.telephoneFixe ?? '',
            telephonePortable: item.telephonePortable ?? '',
            email: item.email ?? '',
            siteId: item.site?.id ?? '',
            serviceId: item.service?.id ?? ''
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            if (activeTab === 'sites') {
                const payload = { ville: formData.ville }
                editItem ? await updateSite(editItem.id, payload) : await createSite(payload)
            } else if (activeTab === 'services') {
                const payload = { nom: formData.nom }
                editItem ? await updateService(editItem.id, payload) : await createService(payload)
            } else {
                const payload = {
                    nom: formData.nom,
                    prenom: formData.prenom,
                    telephoneFixe: formData.telephoneFixe,
                    telephonePortable: formData.telephonePortable,
                    email: formData.email,
                    site: formData.siteId ? { id: parseInt(formData.siteId) } : null,
                    service: formData.serviceId ? { id: parseInt(formData.serviceId) } : null
                }
                editItem ? await updateSalarie(editItem.id, payload) : await createSalarie(payload)
            }
            await fetchAll()
            setShowForm(false)
        } catch (err) {
            setError(err.response?.data?.erreur ?? 'Une erreur est survenue')
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Confirmer la suppression ?')) return
        try {
            if (activeTab === 'sites') await deleteSite(id)
            else if (activeTab === 'services') await deleteService(id)
            else await deleteSalarie(id)
            await fetchAll()
        } catch (err) {
            alert(err.response?.data?.erreur ?? 'Impossible de supprimer cet élément')
        }
    }

    return (
        <div className="admin">
            <header className="admin-header">
                <h1>Administration — <span>Annuaire</span></h1>
                <button className="btn-logout" onClick={onLogout}>Déconnexion</button>
            </header>

            <div className="admin-tabs">
                {['salaries', 'sites', 'services'].map((tab) => (
                    <button
                        key={tab}
                        className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => { setActiveTab(tab); setShowForm(false) }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <div className="admin-content">
                <div className="admin-toolbar">
                    <h2>
                        {activeTab === 'salaries' && `Salariés (${salaries.length})`}
                        {activeTab === 'sites' && `Sites (${sites.length})`}
                        {activeTab === 'services' && `Services (${services.length})`}
                    </h2>
                    <button className="btn-create" onClick={openCreate}>+ Ajouter</button>
                </div>

                {/* Formulaire */}
                {showForm && (
                    <div className="admin-form-box">
                        <h3>{editItem ? 'Modifier' : 'Créer'}</h3>
                        <form onSubmit={handleSubmit} className="admin-form">
                            {activeTab === 'sites' && (
                                <input
                                    type="text"
                                    placeholder="Ville"
                                    value={formData.ville}
                                    onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                                    required
                                />
                            )}
                            {activeTab === 'services' && (
                                <input
                                    type="text"
                                    placeholder="Nom du service"
                                    value={formData.nom}
                                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                    required
                                />
                            )}
                            {activeTab === 'salaries' && (
                                <>
                                    <div className="form-row">
                                        <input type="text" placeholder="Nom *" value={formData.nom}
                                               onChange={(e) => setFormData({ ...formData, nom: e.target.value })} required />
                                        <input type="text" placeholder="Prénom *" value={formData.prenom}
                                               onChange={(e) => setFormData({ ...formData, prenom: e.target.value })} required />
                                    </div>
                                    <div className="form-row">
                                        <input type="text" placeholder="Téléphone fixe" value={formData.telephoneFixe}
                                               onChange={(e) => setFormData({ ...formData, telephoneFixe: e.target.value })} />
                                        <input type="text" placeholder="Téléphone portable" value={formData.telephonePortable}
                                               onChange={(e) => setFormData({ ...formData, telephonePortable: e.target.value })} />
                                    </div>
                                    <input type="email" placeholder="Email" value={formData.email}
                                           onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                    <div className="form-row">
                                        <select value={formData.siteId}
                                                onChange={(e) => setFormData({ ...formData, siteId: e.target.value })}>
                                            <option value="">-- Site --</option>
                                            {sites.map((s) => <option key={s.id} value={s.id}>{s.ville}</option>)}
                                        </select>
                                        <select value={formData.serviceId}
                                                onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}>
                                            <option value="">-- Service --</option>
                                            {services.map((s) => <option key={s.id} value={s.id}>{s.nom}</option>)}
                                        </select>
                                    </div>
                                </>
                            )}
                            {error && <p className="error-message">{error}</p>}
                            <div className="form-actions">
                                <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>Annuler</button>
                                <button type="submit" className="btn-confirm">
                                    {editItem ? 'Modifier' : 'Créer'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Table salariés */}
                {activeTab === 'salaries' && (
                    <table className="admin-table">
                        <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Tél. fixe</th>
                            <th>Tél. portable</th>
                            <th>Email</th>
                            <th>Site</th>
                            <th>Service</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {salaries.map((s) => (
                            <tr key={s.id}>
                                <td>{s.nom}</td>
                                <td>{s.prenom}</td>
                                <td>{s.telephoneFixe ?? '—'}</td>
                                <td>{s.telephonePortable ?? '—'}</td>
                                <td>{s.email ?? '—'}</td>
                                <td>{s.site?.ville ?? '—'}</td>
                                <td>{s.service?.nom ?? '—'}</td>
                                <td className="action-btns">
                                    <button className="btn-edit" onClick={() => openEdit(s)}>Modifier</button>
                                    <button className="btn-delete" onClick={() => handleDelete(s.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

                {/* Table sites */}
                {activeTab === 'sites' && (
                    <table className="admin-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ville</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sites.map((s) => (
                            <tr key={s.id}>
                                <td>{s.id}</td>
                                <td>{s.ville}</td>
                                <td className="action-btns">
                                    <button className="btn-edit" onClick={() => openEdit(s)}>Modifier</button>
                                    <button className="btn-delete" onClick={() => handleDelete(s.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

                {/* Table services */}
                {activeTab === 'services' && (
                    <table className="admin-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {services.map((s) => (
                            <tr key={s.id}>
                                <td>{s.id}</td>
                                <td>{s.nom}</td>
                                <td className="action-btns">
                                    <button className="btn-edit" onClick={() => openEdit(s)}>Modifier</button>
                                    <button className="btn-delete" onClick={() => handleDelete(s.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default Admin