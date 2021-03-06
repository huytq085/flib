package com.fsoft.flib.service;

import com.fsoft.flib.domain.Cart;
import com.fsoft.flib.domain.TicketEntity;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TicketService {
    List<TicketEntity> getAll();

    List<TicketEntity> getAllByUserId(int id);

    Page<TicketEntity> getAllByUserId(int id, int page, int size);

    List<TicketEntity> getALlByEmail(String email);

    TicketEntity getById(int id);

    TicketEntity save(TicketEntity ticketEntity);

    TicketEntity updateStatus(int id);

    TicketEntity requestTicket(String email, Cart cart);

    boolean setStatus(int ticketId, int status);

    boolean delete(int id);

    Page<TicketEntity> findTicketPaninated(int page, int size);


}
