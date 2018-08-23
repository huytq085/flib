package com.fsoft.flib.repository;

import com.fsoft.flib.domain.TicketDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketDetailRepository extends JpaRepository<TicketDetailEntity, Integer> {
}
