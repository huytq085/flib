package com.fsoft.flib.rest;

import com.fsoft.flib.domain.BookEntity;
import com.fsoft.flib.domain.TicketEntity;
import com.fsoft.flib.domain.UserEntity;
import com.fsoft.flib.service.BookService;
import com.fsoft.flib.service.TicketService;
import com.fsoft.flib.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ProfileController {
    private final String BASE_URL = "/profile";
    private final String INFO_URL = BASE_URL + "/info";
    private final String CONTRIBUTE_URL = BASE_URL + "/contributes";
    private final String FAVOURITE_URL = BASE_URL + "/favourites";
    private final String TICKET_URL = BASE_URL + "/tickets";

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
    public UserEntity getInfo(Principal principal){
        String email = principal.getName();
        return userService.getByEmail(email);
    }

    @RequestMapping(
            value = CONTRIBUTE_URL,
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public List<BookEntity> getContributes(Principal principal){
        String email = principal.getName();
        return bookService.getContributesByEmail(email);
    }

    @RequestMapping(
            value = TICKET_URL,
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public List<TicketEntity> getTickets(Principal principal){
        String email = principal.getName();
        UserEntity userEntity = userService.getByEmail(email);
        return ticketService.getAllByUserId(userEntity.getId());
    }


}
