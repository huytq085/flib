package com.fsoft.flib.rest;

import com.fsoft.flib.domain.Cart;
import com.fsoft.flib.domain.TicketEntity;
import com.fsoft.flib.repository.TicketRepository;
import com.fsoft.flib.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collection;

@RestController
//@CrossOrigin(origins = "http://localhost:4200")
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
    @GetMapping(path = BASE_URL)
    public Collection<TicketEntity> getTickets() {
        return ticketService.getAll();
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