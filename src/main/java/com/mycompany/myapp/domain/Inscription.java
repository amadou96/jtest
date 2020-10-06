package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Inscription.
 */
@Entity
@Table(name = "inscription")
public class Inscription implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "date_inscription")
    private LocalDate dateInscription;

    @OneToOne
    @JoinColumn(unique = true)
    private Niveau niveauIns;

    @ManyToOne
    @JsonIgnoreProperties(value = "inscriptions", allowSetters = true)
    private AnneeAcademique anneeAcademique;

    @ManyToOne
    @JsonIgnoreProperties(value = "inscriptions", allowSetters = true)
    private Etudiant etudiant;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "inscriptions", allowSetters = true)
    private Classe classe;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateInscription() {
        return dateInscription;
    }

    public Inscription dateInscription(LocalDate dateInscription) {
        this.dateInscription = dateInscription;
        return this;
    }

    public void setDateInscription(LocalDate dateInscription) {
        this.dateInscription = dateInscription;
    }

    public Niveau getNiveauIns() {
        return niveauIns;
    }

    public Inscription niveauIns(Niveau niveau) {
        this.niveauIns = niveau;
        return this;
    }

    public void setNiveauIns(Niveau niveau) {
        this.niveauIns = niveau;
    }

    public AnneeAcademique getAnneeAcademique() {
        return anneeAcademique;
    }

    public Inscription anneeAcademique(AnneeAcademique anneeAcademique) {
        this.anneeAcademique = anneeAcademique;
        return this;
    }

    public void setAnneeAcademique(AnneeAcademique anneeAcademique) {
        this.anneeAcademique = anneeAcademique;
    }

    public Etudiant getEtudiant() {
        return etudiant;
    }

    public Inscription etudiant(Etudiant etudiant) {
        this.etudiant = etudiant;
        return this;
    }

    public void setEtudiant(Etudiant etudiant) {
        this.etudiant = etudiant;
    }

    public Classe getClasse() {
        return classe;
    }

    public Inscription classe(Classe classe) {
        this.classe = classe;
        return this;
    }

    public void setClasse(Classe classe) {
        this.classe = classe;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Inscription)) {
            return false;
        }
        return id != null && id.equals(((Inscription) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Inscription{" +
            "id=" + getId() +
            ", dateInscription='" + getDateInscription() + "'" +
            "}";
    }
}
