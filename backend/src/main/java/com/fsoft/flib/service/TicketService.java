package com.fsoft.flib.service;

import com.fsoft.flib.domain.TicketEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TicketService {
    List<TicketEntity> getAllByUserId(int id);

    List<TicketEntity> getALlByEmail(String email);
}
