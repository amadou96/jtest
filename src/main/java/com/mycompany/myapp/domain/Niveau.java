package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Niveau.
 */
@Entity
@Table(name = "niveau")
public class Niveau implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "intitule")
    private String intitule;

    @OneToMany(mappedBy = "niveau")
    private Set<Classe> classes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "niveaus", allowSetters = true)
    private Formation formation;

    @ManyToMany
    @JoinTable(name = "niveau_semestre",
               joinColumns = @JoinColumn(name = "niveau_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "semestre_id", referencedColumnName = "id"))
    private Set<Semestre> semestres = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIntitule() {
        return intitule;
    }

    public Niveau intitule(String intitule) {
        this.intitule = intitule;
        return this;
    }

    public void setIntitule(String intitule) {
        this.intitule = intitule;
    }

    public Set<Classe> getClasses() {
        return classes;
    }

    public Niveau classes(Set<Classe> classes) {
        this.classes = classes;
        return this;
    }

    public Niveau addClasses(Classe classe) {
        this.classes.add(classe);
        classe.setNiveau(this);
        return this;
    }

    public Niveau removeClasses(Classe classe) {
        this.classes.remove(classe);
        classe.setNiveau(null);
        return this;
    }

    public void setClasses(Set<Classe> classes) {
        this.classes = classes;
    }

    public Formation getFormation() {
        return formation;
    }

    public Niveau formation(Formation formation) {
        this.formation = formation;
        return this;
    }

    public void setFormation(Formation formation) {
        this.formation = formation;
    }

    public Set<Semestre> getSemestres() {
        return semestres;
    }

    public Niveau semestres(Set<Semestre> semestres) {
        this.semestres = semestres;
        return this;
    }

    public void setSemestres(Set<Semestre> semestres) {
        this.semestres = semestres;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Niveau)) {
            return false;
        }
        return id != null && id.equals(((Niveau) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Niveau{" +
            "id=" + getId() +
            ", intitule='" + getIntitule() + "'" +
            "}";
    }
}
