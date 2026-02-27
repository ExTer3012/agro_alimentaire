# Annuaire Entreprise - Documentation API

## Informations générales

* **Base URL** : `http://localhost:8080`
* **Format** : JSON
* Les routes en écriture (`POST`, `PUT`, `DELETE`) nécessitent un token JWT dans le header

---

## Authentification

━━━━━━━━━━━━━━━━━━━━━━━━━━

* **Connexion admin** : `POST` `http://localhost:8080/api/auth/login`
    * Json :

```json
{
    "login": "admin",
    "password": "admin1234"
}
```

* Réponse :

```json
{
    "token": "eyJhbGciOiJIUzUxMiJ9..."
}
```

* Le token doit ensuite être envoyé dans le header de chaque requête d'écriture :

```
Authorization: Bearer <token>
```

━━━━━━━━━━━━━━━━━━━━━━━━━━

---

## Sites

━━━━━━━━━━━━━━━━━━━━━━━━━━

* Autorisation écriture : `ADMIN`
* Liste de tous les sites : `GET` `http://localhost:8080/api/sites`
* Site par id : `GET` `http://localhost:8080/api/sites/{id}`
* Créer un site : `POST` `http://localhost:8080/api/sites`
    * Json :

```json
{
    "ville": "Paris"
}
```

* Modifier un site : `PUT` `http://localhost:8080/api/sites/{id}`
    * Json :

```json
{
    "ville": "Lyon"
}
```

* Supprimer un site : `DELETE` `http://localhost:8080/api/sites/{id}`

━━━━━━━━━━━━━━━━━━━━━━━━━━

---

## Services

━━━━━━━━━━━━━━━━━━━━━━━━━━

* Autorisation écriture : `ADMIN`
* Liste de tous les services : `GET` `http://localhost:8080/api/services`
* Service par id : `GET` `http://localhost:8080/api/services/{id}`
* Créer un service : `POST` `http://localhost:8080/api/services`
    * Json :

```json
{
    "nom": "Comptabilité"
}
```

* Modifier un service : `PUT` `http://localhost:8080/api/services/{id}`
    * Json :

```json
{
    "nom": "Informatique"
}
```

* Supprimer un service : `DELETE` `http://localhost:8080/api/services/{id}`

━━━━━━━━━━━━━━━━━━━━━━━━━━

---

## Salariés

━━━━━━━━━━━━━━━━━━━━━━━━━━

* Autorisation écriture : `ADMIN`
* Liste de tous les salariés : `GET` `http://localhost:8080/api/salaries`
* Salarié par id : `GET` `http://localhost:8080/api/salaries/{id}`
* Recherche par nom ou prénom : `GET` `http://localhost:8080/api/salaries/recherche?q={texte}`
* Filtrer par site : `GET` `http://localhost:8080/api/salaries/par-site/{siteId}`
* Filtrer par service : `GET` `http://localhost:8080/api/salaries/par-service/{serviceId}`
* Créer un salarié : `POST` `http://localhost:8080/api/salaries`
    * Json :

```json
{
    "nom": "Dupont",
    "prenom": "Jean",
    "telephoneFixe": "01 23 45 67 89",
    "telephonePortable": "06 11 22 33 44",
    "email": "jean.dupont@agroco.fr",
    "site": { "id": 1 },
    "service": { "id": 4 }
}
```

* Modifier un salarié : `PUT` `http://localhost:8080/api/salaries/{id}`
    * Json :

```json
{
    "nom": "Dupont",
    "prenom": "Jean",
    "telephoneFixe": "01 23 45 67 89",
    "telephonePortable": "06 11 22 33 44",
    "email": "jean.dupont@agroco.fr",
    "site": { "id": 2 },
    "service": { "id": 3 }
}
```

* Supprimer un salarié : `DELETE` `http://localhost:8080/api/salaries/{id}`

━━━━━━━━━━━━━━━━━━━━━━━━━━

---

## Codes de réponse

| Code | Signification |
|------|--------------|
| `200` | Succès |
| `201` | Ressource créée |
| `204` | Suppression réussie |
| `400` | Données invalides |
| `401` | Token manquant ou invalide |
| `404` | Ressource introuvable |
| `409` | Conflit (doublon) |