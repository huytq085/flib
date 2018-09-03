package com.fsoft.flib.service;

import com.fsoft.flib.domain.*;
import com.fsoft.flib.repository.TicketRepository;
import com.fsoft.flib.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
public class TicketServiceImpl implements TicketService {
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TicketDetailService ticketDetailService;

    @Override
    public List<TicketEntity> getAll() {
        return this.ticketRepository.findAll();
    }

    @Override
    public List<TicketEntity> getAllByUserId(int id) {
        return ticketRepository.findAllByUserId(id);
    }

    @Override
    public List<TicketEntity> getALlByEmail(String email) {
        return Collections.emptyList();
    }

    @Override
    public TicketEntity getById(int id) {
        return ticketRepository.getOne(id);
    }

    @Override
    public TicketEntity save(TicketEntity ticket) {
        return ticketRepository.save(ticket);
    }

    @Override
    public TicketEntity updateStatus(int id) {
        TicketEntity ticketEntity= ticketRepository.getOne(id);
        if(ticketEntity.getStatus()== 0){
            ticketEntity.setStatus(1);
            ticketRepository.save(ticketEntity);
            return ticketEntity;
        }
        return ticketEntity;
    }


    @Override
    public TicketEntity requestTicket(String email, Cart cart) {
        UserEntity user = userRepository.findByEmail(email);
        if (user != null) {
            TicketEntity ticketEntity = new TicketEntity();
            ticketEntity.setUserId(user.getId());
            ticketEntity.setDateAdded(new Timestamp(new Date().getTime()));
            TicketEntity savedTicket = ticketRepository.save(ticketEntity);
            for (CartItem i : cart.cartItems) {
                TicketDetailEntity ticketDetailEntity = new TicketDetailEntity();
                ticketDetailEntity.setTicketId(savedTicket.getId());
                ticketDetailEntity.setBookId(i.book.getId());
                ticketDetailEntity.setAmount(i.amount);
                ticketDetailService.save(ticketDetailEntity);
            }
            return ticketEntity;
        }
        return null;
    }

//    @Override
//    public TicketEntity requestTicket(String email, String[] bookIDs) {
//        UserEntity user = userRepository.findByEmail(email);
//        if (user != null) {
//            TicketEntity ticketEntity = new TicketEntity();
//            ticketEntity.setUserByUserId(user);
//            TicketEntity savedTicket = ticketRepository.save(ticketEntity);
//            for(String s: bookIDs){
//                TicketDetailEntity ticketDetailEntity = new TicketDetailEntity();
////                ticketDetailEntity.set
//            }
//        }
//        return null;
//    }
}
