package com.annuaire.dao;

import com.annuaire.model.Site;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SiteRepository extends JpaRepository<Site, Long> {
    boolean existsByVille(String ville);
}