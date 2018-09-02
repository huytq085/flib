package com.fsoft.flib.service;

import com.fsoft.flib.domain.Cart;
import com.fsoft.flib.domain.TicketEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TicketService {
    List<TicketEntity> getAll();
    List<TicketEntity> getAllByUserId(int id);

    List<TicketEntity> getALlByEmail(String email);

    TicketEntity getById(int id);

    TicketEntity save(TicketEntity ticketEntity);
    TicketEntity updateStatus(TicketEntity ticketEntity);

    TicketEntity requestTicket(String email, Cart cart);

    boolean action(int ticketId, int status);

}
