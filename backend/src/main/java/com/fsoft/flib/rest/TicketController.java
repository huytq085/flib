package com.fsoft.flib.rest;

import com.fsoft.flib.domain.BookEntity;
import com.fsoft.flib.domain.Cart;
import com.fsoft.flib.domain.TicketDetailEntity;
import com.fsoft.flib.domain.TicketEntity;
import com.fsoft.flib.repository.TicketRepository;
import com.fsoft.flib.service.BookService;
import com.fsoft.flib.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collection;
import java.util.List;


//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class TicketController {
    private final String BASE_URL = "/ticket";
    //    private final String GET_BOOK_BY_ID = BASE_URL + "/{id}";
//    private final String GET_ALL_BOOK = BASE_URL + "/all";
//    private final String GET_PAGE_BOOK = BASE_URL + "/page";
    private final String POST_NEW_TICKET = BASE_URL + "/create";
    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    //    @GetMapping(path = GET_BOOK_BY_ID)
//    public Optional<BookEntity> getBook(@PathVariable int id) {
//        return bookService.getOne(id);
//    }
//
//    Lay tat ca
    @GetMapping(path = BASE_URL)
    public Collection<TicketEntity> getTickets() {
        return ticketService.getAll();
    }

    @RequestMapping(path = BASE_URL+"/{id}", method = RequestMethod.GET)
    public ResponseEntity<TicketEntity> getOneTicket(@PathVariable int id){
        TicketEntity ticketEntity=ticketService.getById(id);
        if(ticketEntity != null){
            return new ResponseEntity<>(ticketEntity,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(path = BASE_URL,
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TicketEntity> update(@RequestBody int idTicket){
        System.out.println("Server: Hello! I'm ticket "+idTicket);
        TicketEntity ticketEntity=ticketService.updateStatus(idTicket);
        if(ticketEntity != null){
            return new ResponseEntity<>(ticketEntity,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(path = BASE_URL,
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TicketEntity> delete(@RequestBody int idTicket){
        System.out.println("Server: Hello! I'm ticket "+idTicket);
        TicketEntity ticketEntity=ticketService.delete(idTicket);
        if(ticketEntity != null){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
//
//    @GetMapping(path = GET_PAGE_BOOK)
//    public Page<BookEntity> getPageBook(@RequestParam int page, @RequestParam int size) {
//        return bookService.getPageBook(page, size);
//    }
    @PostMapping(path = POST_NEW_TICKET)
    public ResponseEntity<TicketEntity> createTicket(@RequestBody Cart cart, Principal principal) {
        HttpStatus status = HttpStatus.OK;
        TicketEntity ticket = null;
        if (principal != null) {
            ticket = ticketService.requestTicket(principal.getName(), cart);
        } else {
            status = HttpStatus.UNAUTHORIZED;
        }
        return new ResponseEntity<>(ticket, status);
    }

//    @GetMapping(path = "/ticket/get")
//    public ResponseEntity<TicketEntity> getBook() {
//        return ResponseEntity.ok() ticketRepository.findById(3);
//    }
}