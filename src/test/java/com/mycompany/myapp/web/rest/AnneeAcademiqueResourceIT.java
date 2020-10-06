package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.Jtest5App;
import com.mycompany.myapp.domain.AnneeAcademique;
import com.mycompany.myapp.repository.AnneeAcademiqueRepository;

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
 * Integration tests for the {@link AnneeAcademiqueResource} REST controller.
 */
@SpringBootTest(classes = Jtest5App.class)
@AutoConfigureMockMvc
@WithMockUser
public class AnneeAcademiqueResourceIT {

    private static final String DEFAULT_INTITULE = "AAAAAAAAAA";
    private static final String UPDATED_INTITULE = "BBBBBBBBBB";

    @Autowired
    private AnneeAcademiqueRepository anneeAcademiqueRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAnneeAcademiqueMockMvc;

    private AnneeAcademique anneeAcademique;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AnneeAcademique createEntity(EntityManager em) {
        AnneeAcademique anneeAcademique = new AnneeAcademique()
            .intitule(DEFAULT_INTITULE);
        return anneeAcademique;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AnneeAcademique createUpdatedEntity(EntityManager em) {
        AnneeAcademique anneeAcademique = new AnneeAcademique()
            .intitule(UPDATED_INTITULE);
        return anneeAcademique;
    }

    @BeforeEach
    public void initTest() {
        anneeAcademique = createEntity(em);
    }

    @Test
    @Transactional
    public void createAnneeAcademique() throws Exception {
        int databaseSizeBeforeCreate = anneeAcademiqueRepository.findAll().size();
        // Create the AnneeAcademique
        restAnneeAcademiqueMockMvc.perform(post("/api/annee-academiques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(anneeAcademique)))
            .andExpect(status().isCreated());

        // Validate the AnneeAcademique in the database
        List<AnneeAcademique> anneeAcademiqueList = anneeAcademiqueRepository.findAll();
        assertThat(anneeAcademiqueList).hasSize(databaseSizeBeforeCreate + 1);
        AnneeAcademique testAnneeAcademique = anneeAcademiqueList.get(anneeAcademiqueList.size() - 1);
        assertThat(testAnneeAcademique.getIntitule()).isEqualTo(DEFAULT_INTITULE);
    }

    @Test
    @Transactional
    public void createAnneeAcademiqueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = anneeAcademiqueRepository.findAll().size();

        // Create the AnneeAcademique with an existing ID
        anneeAcademique.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnneeAcademiqueMockMvc.perform(post("/api/annee-academiques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(anneeAcademique)))
            .andExpect(status().isBadRequest());

        // Validate the AnneeAcademique in the database
        List<AnneeAcademique> anneeAcademiqueList = anneeAcademiqueRepository.findAll();
        assertThat(anneeAcademiqueList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAnneeAcademiques() throws Exception {
        // Initialize the database
        anneeAcademiqueRepository.saveAndFlush(anneeAcademique);

        // Get all the anneeAcademiqueList
        restAnneeAcademiqueMockMvc.perform(get("/api/annee-academiques?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(anneeAcademique.getId().intValue())))
            .andExpect(jsonPath("$.[*].intitule").value(hasItem(DEFAULT_INTITULE)));
    }
    
    @Test
    @Transactional
    public void getAnneeAcademique() throws Exception {
        // Initialize the database
        anneeAcademiqueRepository.saveAndFlush(anneeAcademique);

        // Get the anneeAcademique
        restAnneeAcademiqueMockMvc.perform(get("/api/annee-academiques/{id}", anneeAcademique.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(anneeAcademique.getId().intValue()))
            .andExpect(jsonPath("$.intitule").value(DEFAULT_INTITULE));
    }
    @Test
    @Transactional
    public void getNonExistingAnneeAcademique() throws Exception {
        // Get the anneeAcademique
        restAnneeAcademiqueMockMvc.perform(get("/api/annee-academiques/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAnneeAcademique() throws Exception {
        // Initialize the database
        anneeAcademiqueRepository.saveAndFlush(anneeAcademique);

        int databaseSizeBeforeUpdate = anneeAcademiqueRepository.findAll().size();

        // Update the anneeAcademique
        AnneeAcademique updatedAnneeAcademique = anneeAcademiqueRepository.findById(anneeAcademique.getId()).get();
        // Disconnect from session so that the updates on updatedAnneeAcademique are not directly saved in db
        em.detach(updatedAnneeAcademique);
        updatedAnneeAcademique
            .intitule(UPDATED_INTITULE);

        restAnneeAcademiqueMockMvc.perform(put("/api/annee-academiques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAnneeAcademique)))
            .andExpect(status().isOk());

        // Validate the AnneeAcademique in the database
        List<AnneeAcademique> anneeAcademiqueList = anneeAcademiqueRepository.findAll();
        assertThat(anneeAcademiqueList).hasSize(databaseSizeBeforeUpdate);
        AnneeAcademique testAnneeAcademique = anneeAcademiqueList.get(anneeAcademiqueList.size() - 1);
        assertThat(testAnneeAcademique.getIntitule()).isEqualTo(UPDATED_INTITULE);
    }

    @Test
    @Transactional
    public void updateNonExistingAnneeAcademique() throws Exception {
        int databaseSizeBeforeUpdate = anneeAcademiqueRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnneeAcademiqueMockMvc.perform(put("/api/annee-academiques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(anneeAcademique)))
            .andExpect(status().isBadRequest());

        // Validate the AnneeAcademique in the database
        List<AnneeAcademique> anneeAcademiqueList = anneeAcademiqueRepository.findAll();
        assertThat(anneeAcademiqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAnneeAcademique() throws Exception {
        // Initialize the database
        anneeAcademiqueRepository.saveAndFlush(anneeAcademique);

        int databaseSizeBeforeDelete = anneeAcademiqueRepository.findAll().size();

        // Delete the anneeAcademique
        restAnneeAcademiqueMockMvc.perform(delete("/api/annee-academiques/{id}", anneeAcademique.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AnneeAcademique> anneeAcademiqueList = anneeAcademiqueRepository.findAll();
        assertThat(anneeAcademiqueList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
