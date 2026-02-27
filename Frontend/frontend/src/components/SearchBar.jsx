import '../styles/SearchBar.css'

function SearchBar({ search, onSearchChange, sites, services, selectedSite, selectedService, onSiteChange, onServiceChange }) {
    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-input"
                placeholder="Rechercher un salarié par nom ou prénom..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <div className="filters">
                <select
                    className="filter-select"
                    value={selectedSite}
                    onChange={(e) => onSiteChange(e.target.value)}
                >
                    <option value="">Tous les sites</option>
                    {sites.map((site) => (
                        <option key={site.id} value={site.id}>{site.ville}</option>
                    ))}
                </select>

                <select
                    className="filter-select"
                    value={selectedService}
                    onChange={(e) => onServiceChange(e.target.value)}
                >
                    <option value="">Tous les services</option>
                    {services.map((service) => (
                        <option key={service.id} value={service.id}>{service.nom}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default SearchBar