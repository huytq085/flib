package com.fsoft.flib.repository;

import com.fsoft.flib.domain.TicketEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<TicketEntity, Integer> {
    List<TicketEntity> findAllByUserId(int userId);
}
