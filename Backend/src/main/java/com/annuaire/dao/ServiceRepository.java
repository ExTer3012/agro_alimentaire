package com.annuaire.dao;

import com.annuaire.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    boolean existsByNom(String nom);
}