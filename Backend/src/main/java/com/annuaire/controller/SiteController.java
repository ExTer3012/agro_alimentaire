package com.annuaire.controller;

import com.annuaire.dao.SiteRepository;
import com.annuaire.model.Site;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sites")
public class SiteController {

    private final SiteRepository siteRepository;

    public SiteController(SiteRepository siteRepository) {
        this.siteRepository = siteRepository;
    }

    // GET /api/sites
    @GetMapping
    public ResponseEntity<List<Site>> getAll() {
        return ResponseEntity.ok(siteRepository.findAll());
    }

    // GET /api/sites/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Site> getById(@PathVariable Long id) {
        return siteRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/sites (admin)
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Site site) {
        if (siteRepository.existsByVille(site.getVille())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("erreur", "Un site avec cette ville existe déjà"));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(siteRepository.save(site));
    }

    // PUT /api/sites/{id} (admin)
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Site siteModifie) {
        return siteRepository.findById(id)
                .map(site -> {
                    site.setVille(siteModifie.getVille());
                    return ResponseEntity.ok(siteRepository.save(site));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/sites/{id} (admin)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!siteRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        siteRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}