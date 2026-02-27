import { useState, useEffect, useCallback } from 'react'
import SearchBar from '../components/SearchBar'
import SalarieList from '../components/SalarieList'
import SalarieCard from '../components/SalarieCard'
import {
    getAllSalaries,
    getAllSites,
    getAllServices,
    rechercheSalaries,
    getSalariesBySite,
    getSalariesByService
} from '../api/api'
import '../styles/Home.css'

function Home() {
    const [salaries, setSalaries] = useState([])
    const [sites, setSites] = useState([])
    const [services, setServices] = useState([])
    const [search, setSearch] = useState('')
    const [selectedSite, setSelectedSite] = useState('')
    const [selectedService, setSelectedService] = useState('')
    const [selectedSalarie, setSelectedSalarie] = useState(null)
    const [loading, setLoading] = useState(true)

    // Chargement initial des listes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sitesData, servicesData, salariesData] = await Promise.all([
                    getAllSites(),
                    getAllServices(),
                    getAllSalaries()
                ])
                setSites(sitesData)
                setServices(servicesData)
                setSalaries(salariesData)
            } catch (err) {
                console.error('Erreur chargement données :', err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    // Mise à jour des résultats selon les filtres
    const fetchFiltered = useCallback(async () => {
        setLoading(true)
        try {
            if (search.trim().length >= 1) {
                const data = await rechercheSalaries(search)
                setSalaries(data)
            } else if (selectedSite) {
                const data = await getSalariesBySite(selectedSite)
                setSalaries(data)
            } else if (selectedService) {
                const data = await getSalariesByService(selectedService)
                setSalaries(data)
            } else {
                const data = await getAllSalaries()
                setSalaries(data)
            }
        } catch (err) {
            console.error('Erreur filtrage :', err)
        } finally {
            setLoading(false)
        }
    }, [search, selectedSite, selectedService])

    useEffect(() => {
        const timer = setTimeout(fetchFiltered, 300)
        return () => clearTimeout(timer)
    }, [fetchFiltered])

    const handleSiteChange = (value) => {
        setSelectedSite(value)
        setSelectedService('')
        setSearch('')
    }

    const handleServiceChange = (value) => {
        setSelectedService(value)
        setSelectedSite('')
        setSearch('')
    }

    const handleSearchChange = (value) => {
        setSearch(value)
        setSelectedSite('')
        setSelectedService('')
    }

    return (
        <div className="home">
            <header className="home-header">
                <h1>Annuaire <span>Entreprise</span></h1>
                <p>Retrouvez les coordonnées de vos collègues</p>
            </header>

            <main className="home-main">
                <SearchBar
                    search={search}
                    onSearchChange={handleSearchChange}
                    sites={sites}
                    services={services}
                    selectedSite={selectedSite}
                    selectedService={selectedService}
                    onSiteChange={handleSiteChange}
                    onServiceChange={handleServiceChange}
                />

                {loading ? (
                    <p className="loading">Chargement...</p>
                ) : (
                    <SalarieList
                        salaries={salaries}
                        onSelect={setSelectedSalarie}
                    />
                )}
            </main>

            {selectedSalarie && (
                <SalarieCard
                    salarie={selectedSalarie}
                    onClose={() => setSelectedSalarie(null)}
                />
            )}
        </div>
    )
}

export default Home