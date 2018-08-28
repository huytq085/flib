package com.fsoft.flib.service;

import com.fsoft.flib.domain.TicketDetailEntity;
import com.fsoft.flib.repository.TicketDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TicketDetailServiceImpl implements TicketDetailService {
    @Autowired
    TicketDetailRepository ticketDetailRepository;

    @Override
    public TicketDetailEntity save(TicketDetailEntity ticketDetailEntity) {
        return ticketDetailRepository.save(ticketDetailEntity);
    }
}
