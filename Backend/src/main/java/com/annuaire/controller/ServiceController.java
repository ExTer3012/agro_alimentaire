package com.annuaire.controller;

import com.annuaire.dao.ServiceRepository;
import com.annuaire.model.Service;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceRepository serviceRepository;

    public ServiceController(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    // GET /api/services
    @GetMapping
    public ResponseEntity<List<Service>> getAll() {
        return ResponseEntity.ok(serviceRepository.findAll());
    }

    // GET /api/services/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Service> getById(@PathVariable Long id) {
        return serviceRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/services (admin)
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Service service) {
        if (serviceRepository.existsByNom(service.getNom())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("erreur", "Un service avec ce nom existe déjà"));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(serviceRepository.save(service));
    }

    // PUT /api/services/{id} (admin)
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Service serviceModifie) {
        return serviceRepository.findById(id)
                .map(service -> {
                    service.setNom(serviceModifie.getNom());
                    return ResponseEntity.ok(serviceRepository.save(service));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/services/{id} (admin)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!serviceRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        serviceRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}