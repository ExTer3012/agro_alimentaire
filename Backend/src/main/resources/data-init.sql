-- Insertion des sites (INSERT IGNORE pour éviter les doublons au redémarrage)
INSERT IGNORE INTO sites (id, ville) VALUES
    (1, 'Paris'),
    (2, 'Nantes'),
    (3, 'Toulouse'),
    (4, 'Nice'),
    (5, 'Lille');

-- Insertion des services
INSERT IGNORE INTO services (id, nom) VALUES
    (1, 'Comptabilité'),
    (2, 'Production'),
    (3, 'Accueil'),
    (4, 'Informatique'),
    (5, 'Commercial'),
    (6, 'Ressources Humaines'),
    (7, 'Direction');

-- Insertion de salariés de test
INSERT IGNORE INTO salaries (id, nom, prenom, telephone_fixe, telephone_portable, email, site_id, service_id) VALUES
    (1,  'Dupont',    'Jean',     '01 23 45 67 89', '06 11 22 33 44', 'jean.dupont@agroco.fr',      1, 7),
    (2,  'Martin',    'Sophie',   '01 23 45 67 90', '06 22 33 44 55', 'sophie.martin@agroco.fr',    1, 1),
    (3,  'Bernard',   'Luc',      '01 23 45 67 91', '06 33 44 55 66', 'luc.bernard@agroco.fr',      1, 4),
    (4,  'Leroy',     'Marie',    '01 23 45 67 92', '06 44 55 66 77', 'marie.leroy@agroco.fr',      1, 3),
    (5,  'Moreau',    'Pierre',   '02 40 11 22 33', '06 55 66 77 88', 'pierre.moreau@agroco.fr',    2, 2),
    (6,  'Simon',     'Claire',   '02 40 11 22 34', '06 66 77 88 99', 'claire.simon@agroco.fr',     2, 2),
    (7,  'Laurent',   'Thomas',   '02 40 11 22 35', '06 77 88 99 00', 'thomas.laurent@agroco.fr',   2, 5),
    (8,  'Michel',    'Isabelle', '02 40 11 22 36', '06 88 99 00 11', 'isabelle.michel@agroco.fr',  2, 3),
    (9,  'Garcia',    'Antoine',  '05 61 11 22 33', '07 11 22 33 44', 'antoine.garcia@agroco.fr',   3, 2),
    (10, 'David',     'Nathalie', '05 61 11 22 34', '07 22 33 44 55', 'nathalie.david@agroco.fr',   3, 2),
    (11, 'Petit',     'François', '05 61 11 22 35', '07 33 44 55 66', 'francois.petit@agroco.fr',   3, 6),
    (12, 'Robert',    'Aurélie',  '04 93 11 22 33', '07 44 55 66 77', 'aurelie.robert@agroco.fr',   4, 2),
    (13, 'Richard',   'Marc',     '04 93 11 22 34', '07 55 66 77 88', 'marc.richard@agroco.fr',     4, 5),
    (14, 'Durand',    'Céline',   '04 93 11 22 35', '07 66 77 88 99', 'celine.durand@agroco.fr',    4, 3),
    (15, 'Lefebvre',  'Nicolas',  '03 20 11 22 33', '06 99 00 11 22', 'nicolas.lefebvre@agroco.fr', 5, 2),
    (16, 'Fontaine',  'Julie',    '03 20 11 22 34', '06 00 11 22 33', 'julie.fontaine@agroco.fr',   5, 1),
    (17, 'Rousseau',  'Éric',     '03 20 11 22 35', '06 12 23 34 45', 'eric.rousseau@agroco.fr',    5, 4);