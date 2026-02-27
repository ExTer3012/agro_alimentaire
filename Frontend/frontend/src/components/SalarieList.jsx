import '../styles/SalarieList.css'

function SalarieList({ salaries, onSelect }) {
    if (salaries.length === 0) {
        return <p className="no-results">Aucun salarié trouvé.</p>
    }

    return (
        <div className="salarie-list">
            {salaries.map((salarie) => (
                <div
                    key={salarie.id}
                    className="salarie-item"
                    onClick={() => onSelect(salarie)}
                >
                    <div className="salarie-avatar">
                        {salarie.prenom[0]}{salarie.nom[0]}
                    </div>
                    <div className="salarie-info">
                        <span className="salarie-name">{salarie.prenom} {salarie.nom}</span>
                        <span className="salarie-meta">
                            {salarie.service?.nom ?? '—'} · {salarie.site?.ville ?? '—'}
                        </span>
                    </div>
                    <div className="salarie-contact">
                        {salarie.telephoneFixe && <span>{salarie.telephoneFixe}</span>}
                        {salarie.telephonePortable && <span>{salarie.telephonePortable}</span>}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SalarieList