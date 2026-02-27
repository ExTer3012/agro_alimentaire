import '../styles/SalarieCard.css'

function SalarieCard({ salarie, onClose }) {
    if (!salarie) return null

    return (
        <div className="card-overlay" onClick={onClose}>
            <div className="salarie-card" onClick={(e) => e.stopPropagation()}>
                <button className="card-close" onClick={onClose}>✕</button>
                <div className="card-header">
                    <div className="card-avatar">
                        {salarie.prenom[0]}{salarie.nom[0]}
                    </div>
                    <div className="card-identity">
                        <h2>{salarie.prenom} {salarie.nom}</h2>
                        <div className="card-badges">
                            <span className="card-service">{salarie.service?.nom ?? '—'}</span>
                            <span className="card-site">{salarie.site?.ville ?? '—'}</span>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="card-info">
                        <span className="info-label">Téléphone fixe</span>
                        <span className="info-value">{salarie.telephoneFixe ?? '—'}</span>
                    </div>
                    <div className="card-info">
                        <span className="info-label">Téléphone portable</span>
                        <span className="info-value">{salarie.telephonePortable ?? '—'}</span>
                    </div>
                    <div className="card-info">
                        <span className="info-label">Email</span>
                        <span className="info-value">
                            {salarie.email
                                ? <a href={`mailto:${salarie.email}`}>{salarie.email}</a>
                                : '—'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalarieCard