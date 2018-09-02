package com.fsoft.flib.repository;

import com.fsoft.flib.domain.ReactionEntity;
import com.fsoft.flib.domain.ReactionEntityPK;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReactRepository extends JpaRepository<ReactionEntity, ReactionEntityPK> {
    List<ReactionEntity> findAllByBookId(int bookId);
}
