package com.annuaire.controller;

import com.annuaire.dao.SalarieRepository;
import com.annuaire.dao.ServiceRepository;
import com.annuaire.dao.SiteRepository;
import com.annuaire.model.Salarie;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/salaries")
public class SalarieController {

    private final SalarieRepository salarieRepository;
    private final SiteRepository siteRepository;
    private final ServiceRepository serviceRepository;

    public SalarieController(SalarieRepository salarieRepository,
                             SiteRepository siteRepository,
                             ServiceRepository serviceRepository) {
        this.salarieRepository = salarieRepository;
        this.siteRepository = siteRepository;
        this.serviceRepository = serviceRepository;
    }

    // GET /api/salaries
    @GetMapping
    public ResponseEntity<List<Salarie>> getAll() {
        return ResponseEntity.ok(salarieRepository.findAll());
    }

    // GET /api/salaries/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Salarie> getById(@PathVariable Long id) {
        return salarieRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET /api/salaries/recherche?q=dupont
    @GetMapping("/recherche")
    public ResponseEntity<List<Salarie>> recherche(@RequestParam String q) {
        return ResponseEntity.ok(
                salarieRepository.findByNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(q, q)
        );
    }

    // GET /api/salaries/par-site/{siteId}
    @GetMapping("/par-site/{siteId}")
    public ResponseEntity<List<Salarie>> parSite(@PathVariable Long siteId) {
        return ResponseEntity.ok(salarieRepository.findBySiteId(siteId));
    }

    // GET /api/salaries/par-service/{serviceId}
    @GetMapping("/par-service/{serviceId}")
    public ResponseEntity<List<Salarie>> parService(@PathVariable Long serviceId) {
        return ResponseEntity.ok(salarieRepository.findByServiceId(serviceId));
    }

    // POST /api/salaries (admin)
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Salarie salarie) {
        if (salarie.getSite() != null && salarie.getSite().getId() != null) {
            if (!siteRepository.existsById(salarie.getSite().getId())) {
                return ResponseEntity.badRequest()
                        .body(Map.of("erreur", "Site introuvable"));
            }
        }
        if (salarie.getService() != null && salarie.getService().getId() != null) {
            if (!serviceRepository.existsById(salarie.getService().getId())) {
                return ResponseEntity.badRequest()
                        .body(Map.of("erreur", "Service introuvable"));
            }
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(salarieRepository.save(salarie));
    }

    // PUT /api/salaries/{id} (admin)
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Salarie salarieModifie) {
        return salarieRepository.findById(id)
                .map(salarie -> {
                    salarie.setNom(salarieModifie.getNom());
                    salarie.setPrenom(salarieModifie.getPrenom());
                    salarie.setTelephoneFixe(salarieModifie.getTelephoneFixe());
                    salarie.setTelephonePortable(salarieModifie.getTelephonePortable());
                    salarie.setEmail(salarieModifie.getEmail());
                    salarie.setSite(salarieModifie.getSite());
                    salarie.setService(salarieModifie.getService());
                    return ResponseEntity.ok((Object) salarieRepository.save(salarie));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/salaries/{id} (admin)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!salarieRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        salarieRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}