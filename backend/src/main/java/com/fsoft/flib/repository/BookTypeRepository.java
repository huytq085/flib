package com.fsoft.flib.repository;

import com.fsoft.flib.domain.BookTypeEntity;
import com.fsoft.flib.domain.BookTypeEntityPK;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookTypeRepository extends JpaRepository<BookTypeEntity,BookTypeEntityPK> {
    List<BookTypeEntity> findAllByTypeId(int id);
}
