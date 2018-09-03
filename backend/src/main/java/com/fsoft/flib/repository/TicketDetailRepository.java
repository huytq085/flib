package com.fsoft.flib.repository;

import com.fsoft.flib.domain.TicketDetailEntity;
import com.fsoft.flib.domain.TicketDetailEntityPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketDetailRepository extends JpaRepository<TicketDetailEntity, TicketDetailEntityPK> {
    List<TicketDetailEntity> findAllByTicketId(int id);

    List<TicketDetailEntity> deleteAllByBookId(int bookId);
}
