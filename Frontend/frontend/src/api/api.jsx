import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api'

// Récupère le token stocké dans le localStorage
const getAuthHeader = () => {
    const token = localStorage.getItem('token')
    return token ? { Authorization: `Bearer ${token}` } : {}
}

// ═══════════════════════════════════════
// AUTH
// ═══════════════════════════════════════

export const login = async (loginData) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, loginData)
    return response.data // { token: "eyJ..." }
}

// ═══════════════════════════════════════
// SITES
// ═══════════════════════════════════════

export const getAllSites = async () => {
    const response = await axios.get(`${BASE_URL}/sites`)
    return response.data
}

export const getSiteById = async (id) => {
    const response = await axios.get(`${BASE_URL}/sites/${id}`)
    return response.data
}

export const createSite = async (site) => {
    const response = await axios.post(`${BASE_URL}/sites`, site, {
        headers: getAuthHeader()
    })
    return response.data
}

export const updateSite = async (id, site) => {
    const response = await axios.put(`${BASE_URL}/sites/${id}`, site, {
        headers: getAuthHeader()
    })
    return response.data
}

export const deleteSite = async (id) => {
    await axios.delete(`${BASE_URL}/sites/${id}`, {
        headers: getAuthHeader()
    })
}

// ═══════════════════════════════════════
// SERVICES
// ═══════════════════════════════════════

export const getAllServices = async () => {
    const response = await axios.get(`${BASE_URL}/services`)
    return response.data
}

export const getServiceById = async (id) => {
    const response = await axios.get(`${BASE_URL}/services/${id}`)
    return response.data
}

export const createService = async (service) => {
    const response = await axios.post(`${BASE_URL}/services`, service, {
        headers: getAuthHeader()
    })
    return response.data
}

export const updateService = async (id, service) => {
    const response = await axios.put(`${BASE_URL}/services/${id}`, service, {
        headers: getAuthHeader()
    })
    return response.data
}

export const deleteService = async (id) => {
    await axios.delete(`${BASE_URL}/services/${id}`, {
        headers: getAuthHeader()
    })
}

// ═══════════════════════════════════════
// SALARIÉS
// ═══════════════════════════════════════

export const getAllSalaries = async () => {
    const response = await axios.get(`${BASE_URL}/salaries`)
    return response.data
}

export const getSalarieById = async (id) => {
    const response = await axios.get(`${BASE_URL}/salaries/${id}`)
    return response.data
}

export const rechercheSalaries = async (q) => {
    const response = await axios.get(`${BASE_URL}/salaries/recherche`, {
        params: { q }
    })
    return response.data
}

export const getSalariesBySite = async (siteId) => {
    const response = await axios.get(`${BASE_URL}/salaries/par-site/${siteId}`)
    return response.data
}

export const getSalariesByService = async (serviceId) => {
    const response = await axios.get(`${BASE_URL}/salaries/par-service/${serviceId}`)
    return response.data
}

export const createSalarie = async (salarie) => {
    const response = await axios.post(`${BASE_URL}/salaries`, salarie, {
        headers: getAuthHeader()
    })
    return response.data
}

export const updateSalarie = async (id, salarie) => {
    const response = await axios.put(`${BASE_URL}/salaries/${id}`, salarie, {
        headers: getAuthHeader()
    })
    return response.data
}

export const deleteSalarie = async (id) => {
    await axios.delete(`${BASE_URL}/salaries/${id}`, {
        headers: getAuthHeader()
    })
}