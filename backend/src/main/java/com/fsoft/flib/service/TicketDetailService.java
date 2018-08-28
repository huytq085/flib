package com.fsoft.flib.service;

import com.fsoft.flib.domain.TicketDetailEntity;
import org.springframework.stereotype.Service;

@Service
public interface TicketDetailService {
    TicketDetailEntity save(TicketDetailEntity ticketDetailEntity);
}
