package com.fsoft.flib.service;

import com.fsoft.flib.domain.TicketEntity;
import com.fsoft.flib.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class TicketServiceImpl implements TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    @Override
    public List<TicketEntity> getAllByUserId(int id) {
        return ticketRepository.findAllByUserId(id);
    }

    @Override
    public List<TicketEntity> getALlByEmail(String email) {
        return Collections.emptyList();
    }
}
