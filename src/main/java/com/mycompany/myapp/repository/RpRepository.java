package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Rp;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Rp entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RpRepository extends JpaRepository<Rp, Long> {
}
