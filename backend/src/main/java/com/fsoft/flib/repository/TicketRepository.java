package com.fsoft.flib.repository;

import com.fsoft.flib.domain.TicketEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<TicketEntity, Integer> {
    Page<TicketEntity> findAllByOrderByDateAddedDesc(Pageable pageable);
    List<TicketEntity> findAllByUserIdOrderByDateAdded(int userId);

    Page<TicketEntity> findAllByUserIdOrderByDateAdded(int userId, Pageable pageable);

    TicketEntity deleteById(int id);
}
