package com.annuaire.dao;

import com.annuaire.model.Salarie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalarieRepository extends JpaRepository<Salarie, Long> {
    List<Salarie> findByNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(String nom, String prenom);
    List<Salarie> findBySiteId(Long siteId);
    List<Salarie> findByServiceId(Long serviceId);
}