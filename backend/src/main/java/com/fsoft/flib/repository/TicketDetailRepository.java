package com.fsoft.flib.repository;

import com.fsoft.flib.domain.BookEntity;
import com.fsoft.flib.domain.TicketDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketDetailRepository extends JpaRepository<TicketDetailEntity, Integer> {
    List<TicketDetailEntity> findAllByTicketId(int id);
}
