package com.fsoft.flib.repository;

import com.fsoft.flib.domain.BookEntity;
import com.fsoft.flib.domain.ContributeEntity;
import com.fsoft.flib.domain.ContributeEntityPK;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContributeRepository extends JpaRepository<ContributeEntity, ContributeEntityPK> {
    List<ContributeEntity> findAllByUserIdOrderByDateAddedDesc(int userId);

    Page<ContributeEntity> findAllByUserIdOrderByDateAddedDesc(int userId, Pageable pageable);

}
