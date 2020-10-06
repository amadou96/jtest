package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.Jtest5App;
import com.mycompany.myapp.domain.Nationalite;
import com.mycompany.myapp.repository.NationaliteRepository;
import com.mycompany.myapp.service.NationaliteService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link NationaliteResource} REST controller.
 */
@SpringBootTest(classes = Jtest5App.class)
@AutoConfigureMockMvc
@WithMockUser
public class NationaliteResourceIT {

    private static final String DEFAULT_INTITULE = "AAAAAAAAAA";
    private static final String UPDATED_INTITULE = "BBBBBBBBBB";

    @Autowired
    private NationaliteRepository nationaliteRepository;

    @Autowired
    private NationaliteService nationaliteService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNationaliteMockMvc;

    private Nationalite nationalite;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Nationalite createEntity(EntityManager em) {
        Nationalite nationalite = new Nationalite()
            .intitule(DEFAULT_INTITULE);
        return nationalite;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Nationalite createUpdatedEntity(EntityManager em) {
        Nationalite nationalite = new Nationalite()
            .intitule(UPDATED_INTITULE);
        return nationalite;
    }

    @BeforeEach
    public void initTest() {
        nationalite = createEntity(em);
    }

    @Test
    @Transactional
    public void createNationalite() throws Exception {
        int databaseSizeBeforeCreate = nationaliteRepository.findAll().size();
        // Create the Nationalite
        restNationaliteMockMvc.perform(post("/api/nationalites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nationalite)))
            .andExpect(status().isCreated());

        // Validate the Nationalite in the database
        List<Nationalite> nationaliteList = nationaliteRepository.findAll();
        assertThat(nationaliteList).hasSize(databaseSizeBeforeCreate + 1);
        Nationalite testNationalite = nationaliteList.get(nationaliteList.size() - 1);
        assertThat(testNationalite.getIntitule()).isEqualTo(DEFAULT_INTITULE);
    }

    @Test
    @Transactional
    public void createNationaliteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nationaliteRepository.findAll().size();

        // Create the Nationalite with an existing ID
        nationalite.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNationaliteMockMvc.perform(post("/api/nationalites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nationalite)))
            .andExpect(status().isBadRequest());

        // Validate the Nationalite in the database
        List<Nationalite> nationaliteList = nationaliteRepository.findAll();
        assertThat(nationaliteList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkIntituleIsRequired() throws Exception {
        int databaseSizeBeforeTest = nationaliteRepository.findAll().size();
        // set the field null
        nationalite.setIntitule(null);

        // Create the Nationalite, which fails.


        restNationaliteMockMvc.perform(post("/api/nationalites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nationalite)))
            .andExpect(status().isBadRequest());

        List<Nationalite> nationaliteList = nationaliteRepository.findAll();
        assertThat(nationaliteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNationalites() throws Exception {
        // Initialize the database
        nationaliteRepository.saveAndFlush(nationalite);

        // Get all the nationaliteList
        restNationaliteMockMvc.perform(get("/api/nationalites?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nationalite.getId().intValue())))
            .andExpect(jsonPath("$.[*].intitule").value(hasItem(DEFAULT_INTITULE)));
    }
    
    @Test
    @Transactional
    public void getNationalite() throws Exception {
        // Initialize the database
        nationaliteRepository.saveAndFlush(nationalite);

        // Get the nationalite
        restNationaliteMockMvc.perform(get("/api/nationalites/{id}", nationalite.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(nationalite.getId().intValue()))
            .andExpect(jsonPath("$.intitule").value(DEFAULT_INTITULE));
    }
    @Test
    @Transactional
    public void getNonExistingNationalite() throws Exception {
        // Get the nationalite
        restNationaliteMockMvc.perform(get("/api/nationalites/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNationalite() throws Exception {
        // Initialize the database
        nationaliteService.save(nationalite);

        int databaseSizeBeforeUpdate = nationaliteRepository.findAll().size();

        // Update the nationalite
        Nationalite updatedNationalite = nationaliteRepository.findById(nationalite.getId()).get();
        // Disconnect from session so that the updates on updatedNationalite are not directly saved in db
        em.detach(updatedNationalite);
        updatedNationalite
            .intitule(UPDATED_INTITULE);

        restNationaliteMockMvc.perform(put("/api/nationalites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNationalite)))
            .andExpect(status().isOk());

        // Validate the Nationalite in the database
        List<Nationalite> nationaliteList = nationaliteRepository.findAll();
        assertThat(nationaliteList).hasSize(databaseSizeBeforeUpdate);
        Nationalite testNationalite = nationaliteList.get(nationaliteList.size() - 1);
        assertThat(testNationalite.getIntitule()).isEqualTo(UPDATED_INTITULE);
    }

    @Test
    @Transactional
    public void updateNonExistingNationalite() throws Exception {
        int databaseSizeBeforeUpdate = nationaliteRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNationaliteMockMvc.perform(put("/api/nationalites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nationalite)))
            .andExpect(status().isBadRequest());

        // Validate the Nationalite in the database
        List<Nationalite> nationaliteList = nationaliteRepository.findAll();
        assertThat(nationaliteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNationalite() throws Exception {
        // Initialize the database
        nationaliteService.save(nationalite);

        int databaseSizeBeforeDelete = nationaliteRepository.findAll().size();

        // Delete the nationalite
        restNationaliteMockMvc.perform(delete("/api/nationalites/{id}", nationalite.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Nationalite> nationaliteList = nationaliteRepository.findAll();
        assertThat(nationaliteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
