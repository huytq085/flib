package com.fsoft.flib.rest;

import com.fsoft.flib.domain.BookEntity;
import com.fsoft.flib.domain.TicketDetailEntity;
import com.fsoft.flib.domain.TicketEntity;
import com.fsoft.flib.domain.UserEntity;
import com.fsoft.flib.service.BookService;
import com.fsoft.flib.service.TicketService;
import com.fsoft.flib.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ProfileController {
    private final String BASE_URL = "/profile";
    private final String INFO_URL = BASE_URL + "/info";
    private final String CONTRIBUTE_URL = BASE_URL + "/contributes";
    private final String FAVOURITE_URL = BASE_URL + "/favourites";
    private final String TICKET_URL = BASE_URL + "/tickets";
    private final String TICKET_DETAIL_URL = BASE_URL + "/tickets/{id}";

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    @Autowired
    private TicketService ticketService;

    @RequestMapping(
            value = INFO_URL,
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<UserEntity> getInfo(Principal principal){
        HttpStatus status = HttpStatus.OK;
        UserEntity user = null;
        if (principal != null) {
            user = userService.getByEmail(principal.getName());
        } else {
            status = HttpStatus.UNAUTHORIZED;
        }

        return new ResponseEntity<>(user, status);
    }

    @RequestMapping(
            value = CONTRIBUTE_URL,
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<List<BookEntity>> getContributes(Principal principal){
        HttpStatus status = HttpStatus.OK;
        List<BookEntity> books = Collections.emptyList();
        if (principal != null) {
            books = bookService.getContributesByEmail(principal.getName());
        } else {
            status = HttpStatus.UNAUTHORIZED;
        }
//        System.out.println(JsonUtils.encode(books));

        return new ResponseEntity<>(books, status);
    }

    @RequestMapping(
            value = TICKET_URL,
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<List<TicketEntity>> getTickets(Principal principal){
        HttpStatus status = HttpStatus.OK;
        List<TicketEntity> tickets = Collections.emptyList();
        if (principal != null) {
            UserEntity userEntity = userService.getByEmail(principal.getName());
            tickets = ticketService.getAllByUserId(userEntity.getId());
        } else {
            status = HttpStatus.UNAUTHORIZED;
        }

        return new ResponseEntity<>(tickets, status);
    }

    @RequestMapping(
            value = TICKET_DETAIL_URL,
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<TicketEntity> getTicket(Principal principal, @PathVariable int id){
        HttpStatus status = HttpStatus.OK;
        TicketEntity ticket = null;
        System.out.println("id: " + id);
        if (principal != null) {
            System.out.println("prin != null");
            ticket = ticketService.getById(id);
            for (TicketDetailEntity detail: ticket.getTicketDetailsById()){
                System.out.println("book id: " + detail.getBookId());
                detail.setBookByBookId(bookService.getOne(detail.getBookId()).orElse(null));
            }
        } else {
            status = HttpStatus.UNAUTHORIZED;
        }

        return new ResponseEntity<>(ticket, status);
    }






}
