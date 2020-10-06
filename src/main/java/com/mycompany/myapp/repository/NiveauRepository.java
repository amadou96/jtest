package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Niveau;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Niveau entity.
 */
@Repository
public interface NiveauRepository extends JpaRepository<Niveau, Long> {

    @Query(value = "select distinct niveau from Niveau niveau left join fetch niveau.semestres",
        countQuery = "select count(distinct niveau) from Niveau niveau")
    Page<Niveau> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct niveau from Niveau niveau left join fetch niveau.semestres")
    List<Niveau> findAllWithEagerRelationships();

    @Query("select niveau from Niveau niveau left join fetch niveau.semestres where niveau.id =:id")
    Optional<Niveau> findOneWithEagerRelationships(@Param("id") Long id);
}
