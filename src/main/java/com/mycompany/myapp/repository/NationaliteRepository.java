package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Nationalite;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Nationalite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NationaliteRepository extends JpaRepository<Nationalite, Long> {
}
