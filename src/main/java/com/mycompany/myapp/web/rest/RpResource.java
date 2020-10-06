package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Rp;
import com.mycompany.myapp.repository.RpRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Rp}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RpResource {

    private final Logger log = LoggerFactory.getLogger(RpResource.class);

    private static final String ENTITY_NAME = "rp";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RpRepository rpRepository;

    public RpResource(RpRepository rpRepository) {
        this.rpRepository = rpRepository;
    }

    /**
     * {@code POST  /rps} : Create a new rp.
     *
     * @param rp the rp to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rp, or with status {@code 400 (Bad Request)} if the rp has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/rps")
    public ResponseEntity<Rp> createRp(@Valid @RequestBody Rp rp) throws URISyntaxException {
        log.debug("REST request to save Rp : {}", rp);
        if (rp.getId() != null) {
            throw new BadRequestAlertException("A new rp cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Rp result = rpRepository.save(rp);
        return ResponseEntity.created(new URI("/api/rps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /rps} : Updates an existing rp.
     *
     * @param rp the rp to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rp,
     * or with status {@code 400 (Bad Request)} if the rp is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rp couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/rps")
    public ResponseEntity<Rp> updateRp(@Valid @RequestBody Rp rp) throws URISyntaxException {
        log.debug("REST request to update Rp : {}", rp);
        if (rp.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Rp result = rpRepository.save(rp);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, rp.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /rps} : get all the rps.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rps in body.
     */
    @GetMapping("/rps")
    public List<Rp> getAllRps() {
        log.debug("REST request to get all Rps");
        return rpRepository.findAll();
    }

    /**
     * {@code GET  /rps/:id} : get the "id" rp.
     *
     * @param id the id of the rp to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rp, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/rps/{id}")
    public ResponseEntity<Rp> getRp(@PathVariable Long id) {
        log.debug("REST request to get Rp : {}", id);
        Optional<Rp> rp = rpRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rp);
    }

    /**
     * {@code DELETE  /rps/:id} : delete the "id" rp.
     *
     * @param id the id of the rp to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/rps/{id}")
    public ResponseEntity<Void> deleteRp(@PathVariable Long id) {
        log.debug("REST request to delete Rp : {}", id);
        rpRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
