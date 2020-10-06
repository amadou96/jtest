package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Membre;
import com.mycompany.myapp.repository.MembreRepository;
import com.mycompany.myapp.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Membre}.
 */
@Service
@Transactional
public class MembreService {

    private final Logger log = LoggerFactory.getLogger(MembreService.class);

    private final MembreRepository membreRepository;

    private final UserRepository userRepository;

    public MembreService(MembreRepository membreRepository, UserRepository userRepository) {
        this.membreRepository = membreRepository;
        this.userRepository = userRepository;
    }

    /**
     * Save a membre.
     *
     * @param membre the entity to save.
     * @return the persisted entity.
     */
    public Membre save(Membre membre) {
        log.debug("Request to save Membre : {}", membre);
        Long userId = membre.getUser().getId();
        userRepository.findById(userId).ifPresent(membre::user);
        return membreRepository.save(membre);
    }

    /**
     * Get all the membres.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Membre> findAll(Pageable pageable) {
        log.debug("Request to get all Membres");
        return membreRepository.findAll(pageable);
    }


    /**
     * Get one membre by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Membre> findOne(Long id) {
        log.debug("Request to get Membre : {}", id);
        return membreRepository.findById(id);
    }

    /**
     * Delete the membre by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Membre : {}", id);
        membreRepository.deleteById(id);
    }
}
