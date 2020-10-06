package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.Jtest5App;
import com.mycompany.myapp.domain.Rp;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.repository.RpRepository;

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
 * Integration tests for the {@link RpResource} REST controller.
 */
@SpringBootTest(classes = Jtest5App.class)
@AutoConfigureMockMvc
@WithMockUser
public class RpResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_MATRICULE = "AAAAAAAAAA";
    private static final String UPDATED_MATRICULE = "BBBBBBBBBB";

    @Autowired
    private RpRepository rpRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRpMockMvc;

    private Rp rp;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rp createEntity(EntityManager em) {
        Rp rp = new Rp()
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .matricule(DEFAULT_MATRICULE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        rp.setUser(user);
        return rp;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rp createUpdatedEntity(EntityManager em) {
        Rp rp = new Rp()
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .matricule(UPDATED_MATRICULE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        rp.setUser(user);
        return rp;
    }

    @BeforeEach
    public void initTest() {
        rp = createEntity(em);
    }

    @Test
    @Transactional
    public void createRp() throws Exception {
        int databaseSizeBeforeCreate = rpRepository.findAll().size();
        // Create the Rp
        restRpMockMvc.perform(post("/api/rps")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rp)))
            .andExpect(status().isCreated());

        // Validate the Rp in the database
        List<Rp> rpList = rpRepository.findAll();
        assertThat(rpList).hasSize(databaseSizeBeforeCreate + 1);
        Rp testRp = rpList.get(rpList.size() - 1);
        assertThat(testRp.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testRp.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testRp.getMatricule()).isEqualTo(DEFAULT_MATRICULE);
    }

    @Test
    @Transactional
    public void createRpWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rpRepository.findAll().size();

        // Create the Rp with an existing ID
        rp.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRpMockMvc.perform(post("/api/rps")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rp)))
            .andExpect(status().isBadRequest());

        // Validate the Rp in the database
        List<Rp> rpList = rpRepository.findAll();
        assertThat(rpList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkMatriculeIsRequired() throws Exception {
        int databaseSizeBeforeTest = rpRepository.findAll().size();
        // set the field null
        rp.setMatricule(null);

        // Create the Rp, which fails.


        restRpMockMvc.perform(post("/api/rps")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rp)))
            .andExpect(status().isBadRequest());

        List<Rp> rpList = rpRepository.findAll();
        assertThat(rpList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRps() throws Exception {
        // Initialize the database
        rpRepository.saveAndFlush(rp);

        // Get all the rpList
        restRpMockMvc.perform(get("/api/rps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rp.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM)))
            .andExpect(jsonPath("$.[*].matricule").value(hasItem(DEFAULT_MATRICULE)));
    }
    
    @Test
    @Transactional
    public void getRp() throws Exception {
        // Initialize the database
        rpRepository.saveAndFlush(rp);

        // Get the rp
        restRpMockMvc.perform(get("/api/rps/{id}", rp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(rp.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM))
            .andExpect(jsonPath("$.matricule").value(DEFAULT_MATRICULE));
    }
    @Test
    @Transactional
    public void getNonExistingRp() throws Exception {
        // Get the rp
        restRpMockMvc.perform(get("/api/rps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRp() throws Exception {
        // Initialize the database
        rpRepository.saveAndFlush(rp);

        int databaseSizeBeforeUpdate = rpRepository.findAll().size();

        // Update the rp
        Rp updatedRp = rpRepository.findById(rp.getId()).get();
        // Disconnect from session so that the updates on updatedRp are not directly saved in db
        em.detach(updatedRp);
        updatedRp
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .matricule(UPDATED_MATRICULE);

        restRpMockMvc.perform(put("/api/rps")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRp)))
            .andExpect(status().isOk());

        // Validate the Rp in the database
        List<Rp> rpList = rpRepository.findAll();
        assertThat(rpList).hasSize(databaseSizeBeforeUpdate);
        Rp testRp = rpList.get(rpList.size() - 1);
        assertThat(testRp.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testRp.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testRp.getMatricule()).isEqualTo(UPDATED_MATRICULE);
    }

    @Test
    @Transactional
    public void updateNonExistingRp() throws Exception {
        int databaseSizeBeforeUpdate = rpRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRpMockMvc.perform(put("/api/rps")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rp)))
            .andExpect(status().isBadRequest());

        // Validate the Rp in the database
        List<Rp> rpList = rpRepository.findAll();
        assertThat(rpList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRp() throws Exception {
        // Initialize the database
        rpRepository.saveAndFlush(rp);

        int databaseSizeBeforeDelete = rpRepository.findAll().size();

        // Delete the rp
        restRpMockMvc.perform(delete("/api/rps/{id}", rp.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Rp> rpList = rpRepository.findAll();
        assertThat(rpList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
