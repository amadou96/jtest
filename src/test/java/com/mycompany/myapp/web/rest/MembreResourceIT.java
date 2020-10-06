package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.Jtest5App;
import com.mycompany.myapp.domain.Membre;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.domain.Departement;
import com.mycompany.myapp.repository.MembreRepository;
import com.mycompany.myapp.service.MembreService;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MembreResource} REST controller.
 */
@SpringBootTest(classes = Jtest5App.class)
@AutoConfigureMockMvc
@WithMockUser
public class MembreResourceIT {

    private static final String DEFAULT_MATRICULE = "AAAAAAAAAA";
    private static final String UPDATED_MATRICULE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_NAISSANCE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_NAISSANCE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_LIEU_NAISSANCE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LIEU_NAISSANCE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private MembreRepository membreRepository;

    @Autowired
    private MembreService membreService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMembreMockMvc;

    private Membre membre;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Membre createEntity(EntityManager em) {
        Membre membre = new Membre()
            .matricule(DEFAULT_MATRICULE)
            .dateNaissance(DEFAULT_DATE_NAISSANCE)
            .lieuNaissance(DEFAULT_LIEU_NAISSANCE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        membre.setUser(user);
        // Add required entity
        Departement departement;
        if (TestUtil.findAll(em, Departement.class).isEmpty()) {
            departement = DepartementResourceIT.createEntity(em);
            em.persist(departement);
            em.flush();
        } else {
            departement = TestUtil.findAll(em, Departement.class).get(0);
        }
        membre.setDepartement(departement);
        return membre;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Membre createUpdatedEntity(EntityManager em) {
        Membre membre = new Membre()
            .matricule(UPDATED_MATRICULE)
            .dateNaissance(UPDATED_DATE_NAISSANCE)
            .lieuNaissance(UPDATED_LIEU_NAISSANCE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        membre.setUser(user);
        // Add required entity
        Departement departement;
        if (TestUtil.findAll(em, Departement.class).isEmpty()) {
            departement = DepartementResourceIT.createUpdatedEntity(em);
            em.persist(departement);
            em.flush();
        } else {
            departement = TestUtil.findAll(em, Departement.class).get(0);
        }
        membre.setDepartement(departement);
        return membre;
    }

    @BeforeEach
    public void initTest() {
        membre = createEntity(em);
    }

    @Test
    @Transactional
    public void createMembre() throws Exception {
        int databaseSizeBeforeCreate = membreRepository.findAll().size();
        // Create the Membre
        restMembreMockMvc.perform(post("/api/membres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(membre)))
            .andExpect(status().isCreated());

        // Validate the Membre in the database
        List<Membre> membreList = membreRepository.findAll();
        assertThat(membreList).hasSize(databaseSizeBeforeCreate + 1);
        Membre testMembre = membreList.get(membreList.size() - 1);
        assertThat(testMembre.getMatricule()).isEqualTo(DEFAULT_MATRICULE);
        assertThat(testMembre.getDateNaissance()).isEqualTo(DEFAULT_DATE_NAISSANCE);
        assertThat(testMembre.getLieuNaissance()).isEqualTo(DEFAULT_LIEU_NAISSANCE);

        // Validate the id for MapsId, the ids must be same
        assertThat(testMembre.getId()).isEqualTo(testMembre.getUser().getId());
    }

    @Test
    @Transactional
    public void createMembreWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = membreRepository.findAll().size();

        // Create the Membre with an existing ID
        membre.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMembreMockMvc.perform(post("/api/membres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(membre)))
            .andExpect(status().isBadRequest());

        // Validate the Membre in the database
        List<Membre> membreList = membreRepository.findAll();
        assertThat(membreList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void updateMembreMapsIdAssociationWithNewId() throws Exception {
        // Initialize the database
        membreService.save(membre);
        int databaseSizeBeforeCreate = membreRepository.findAll().size();

        // Add a new parent entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();

        // Load the membre
        Membre updatedMembre = membreRepository.findById(membre.getId()).get();
        // Disconnect from session so that the updates on updatedMembre are not directly saved in db
        em.detach(updatedMembre);

        // Update the User with new association value
        updatedMembre.setUser(user);

        // Update the entity
        restMembreMockMvc.perform(put("/api/membres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMembre)))
            .andExpect(status().isOk());

        // Validate the Membre in the database
        List<Membre> membreList = membreRepository.findAll();
        assertThat(membreList).hasSize(databaseSizeBeforeCreate);
        Membre testMembre = membreList.get(membreList.size() - 1);

        // Validate the id for MapsId, the ids must be same
        // Uncomment the following line for assertion. However, please note that there is a known issue and uncommenting will fail the test.
        // Please look at https://github.com/jhipster/generator-jhipster/issues/9100. You can modify this test as necessary.
        // assertThat(testMembre.getId()).isEqualTo(testMembre.getUser().getId());
    }

    @Test
    @Transactional
    public void checkMatriculeIsRequired() throws Exception {
        int databaseSizeBeforeTest = membreRepository.findAll().size();
        // set the field null
        membre.setMatricule(null);

        // Create the Membre, which fails.


        restMembreMockMvc.perform(post("/api/membres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(membre)))
            .andExpect(status().isBadRequest());

        List<Membre> membreList = membreRepository.findAll();
        assertThat(membreList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMembres() throws Exception {
        // Initialize the database
        membreRepository.saveAndFlush(membre);

        // Get all the membreList
        restMembreMockMvc.perform(get("/api/membres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(membre.getId().intValue())))
            .andExpect(jsonPath("$.[*].matricule").value(hasItem(DEFAULT_MATRICULE)))
            .andExpect(jsonPath("$.[*].dateNaissance").value(hasItem(DEFAULT_DATE_NAISSANCE.toString())))
            .andExpect(jsonPath("$.[*].lieuNaissance").value(hasItem(DEFAULT_LIEU_NAISSANCE.toString())));
    }
    
    @Test
    @Transactional
    public void getMembre() throws Exception {
        // Initialize the database
        membreRepository.saveAndFlush(membre);

        // Get the membre
        restMembreMockMvc.perform(get("/api/membres/{id}", membre.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(membre.getId().intValue()))
            .andExpect(jsonPath("$.matricule").value(DEFAULT_MATRICULE))
            .andExpect(jsonPath("$.dateNaissance").value(DEFAULT_DATE_NAISSANCE.toString()))
            .andExpect(jsonPath("$.lieuNaissance").value(DEFAULT_LIEU_NAISSANCE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingMembre() throws Exception {
        // Get the membre
        restMembreMockMvc.perform(get("/api/membres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMembre() throws Exception {
        // Initialize the database
        membreService.save(membre);

        int databaseSizeBeforeUpdate = membreRepository.findAll().size();

        // Update the membre
        Membre updatedMembre = membreRepository.findById(membre.getId()).get();
        // Disconnect from session so that the updates on updatedMembre are not directly saved in db
        em.detach(updatedMembre);
        updatedMembre
            .matricule(UPDATED_MATRICULE)
            .dateNaissance(UPDATED_DATE_NAISSANCE)
            .lieuNaissance(UPDATED_LIEU_NAISSANCE);

        restMembreMockMvc.perform(put("/api/membres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMembre)))
            .andExpect(status().isOk());

        // Validate the Membre in the database
        List<Membre> membreList = membreRepository.findAll();
        assertThat(membreList).hasSize(databaseSizeBeforeUpdate);
        Membre testMembre = membreList.get(membreList.size() - 1);
        assertThat(testMembre.getMatricule()).isEqualTo(UPDATED_MATRICULE);
        assertThat(testMembre.getDateNaissance()).isEqualTo(UPDATED_DATE_NAISSANCE);
        assertThat(testMembre.getLieuNaissance()).isEqualTo(UPDATED_LIEU_NAISSANCE);
    }

    @Test
    @Transactional
    public void updateNonExistingMembre() throws Exception {
        int databaseSizeBeforeUpdate = membreRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMembreMockMvc.perform(put("/api/membres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(membre)))
            .andExpect(status().isBadRequest());

        // Validate the Membre in the database
        List<Membre> membreList = membreRepository.findAll();
        assertThat(membreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMembre() throws Exception {
        // Initialize the database
        membreService.save(membre);

        int databaseSizeBeforeDelete = membreRepository.findAll().size();

        // Delete the membre
        restMembreMockMvc.perform(delete("/api/membres/{id}", membre.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Membre> membreList = membreRepository.findAll();
        assertThat(membreList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
