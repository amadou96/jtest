package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.AnneeAcademique;
import com.mycompany.myapp.repository.AnneeAcademiqueRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.AnneeAcademique}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AnneeAcademiqueResource {

    private final Logger log = LoggerFactory.getLogger(AnneeAcademiqueResource.class);

    private static final String ENTITY_NAME = "anneeAcademique";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AnneeAcademiqueRepository anneeAcademiqueRepository;

    public AnneeAcademiqueResource(AnneeAcademiqueRepository anneeAcademiqueRepository) {
        this.anneeAcademiqueRepository = anneeAcademiqueRepository;
    }

    /**
     * {@code POST  /annee-academiques} : Create a new anneeAcademique.
     *
     * @param anneeAcademique the anneeAcademique to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new anneeAcademique, or with status {@code 400 (Bad Request)} if the anneeAcademique has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/annee-academiques")
    public ResponseEntity<AnneeAcademique> createAnneeAcademique(@RequestBody AnneeAcademique anneeAcademique) throws URISyntaxException {
        log.debug("REST request to save AnneeAcademique : {}", anneeAcademique);
        if (anneeAcademique.getId() != null) {
            throw new BadRequestAlertException("A new anneeAcademique cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AnneeAcademique result = anneeAcademiqueRepository.save(anneeAcademique);
        return ResponseEntity.created(new URI("/api/annee-academiques/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /annee-academiques} : Updates an existing anneeAcademique.
     *
     * @param anneeAcademique the anneeAcademique to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated anneeAcademique,
     * or with status {@code 400 (Bad Request)} if the anneeAcademique is not valid,
     * or with status {@code 500 (Internal Server Error)} if the anneeAcademique couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/annee-academiques")
    public ResponseEntity<AnneeAcademique> updateAnneeAcademique(@RequestBody AnneeAcademique anneeAcademique) throws URISyntaxException {
        log.debug("REST request to update AnneeAcademique : {}", anneeAcademique);
        if (anneeAcademique.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AnneeAcademique result = anneeAcademiqueRepository.save(anneeAcademique);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, anneeAcademique.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /annee-academiques} : get all the anneeAcademiques.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of anneeAcademiques in body.
     */
    @GetMapping("/annee-academiques")
    public List<AnneeAcademique> getAllAnneeAcademiques() {
        log.debug("REST request to get all AnneeAcademiques");
        return anneeAcademiqueRepository.findAll();
    }

    /**
     * {@code GET  /annee-academiques/:id} : get the "id" anneeAcademique.
     *
     * @param id the id of the anneeAcademique to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the anneeAcademique, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/annee-academiques/{id}")
    public ResponseEntity<AnneeAcademique> getAnneeAcademique(@PathVariable Long id) {
        log.debug("REST request to get AnneeAcademique : {}", id);
        Optional<AnneeAcademique> anneeAcademique = anneeAcademiqueRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(anneeAcademique);
    }

    /**
     * {@code DELETE  /annee-academiques/:id} : delete the "id" anneeAcademique.
     *
     * @param id the id of the anneeAcademique to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/annee-academiques/{id}")
    public ResponseEntity<Void> deleteAnneeAcademique(@PathVariable Long id) {
        log.debug("REST request to delete AnneeAcademique : {}", id);
        anneeAcademiqueRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
