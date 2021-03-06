package com.fsoft.flib.rest;

import com.fsoft.flib.domain.BookEntity;
import com.fsoft.flib.domain.ContributeEntity;
import com.fsoft.flib.domain.TicketEntity;
import com.fsoft.flib.domain.UserEntity;
import com.fsoft.flib.service.BookService;
import com.fsoft.flib.service.TicketService;
import com.fsoft.flib.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.Set;

//@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController {
    private final String ROLE_ADMIN = "ROLE_ADMIN";
    private final String BASE_URL = "/users";
    private final String GET_ONE_URL = BASE_URL + "/{id}";
    private final String GET_ROLES_URL = BASE_URL + "/roles";
    private final String CONTRIBUTE_URL = BASE_URL + "/contribute";
    private final String FAVOURITE_URL = BASE_URL + "/favourite/{id}";
    private final String GET_USER_TICKETS_URL = BASE_URL + "/{userId}/tickets";
    private final String USERS_TICKET_ID_URL = BASE_URL + "/tickets/{ticketId}";
    private final String GET_USER_BOOKS_URL = BASE_URL + "/{userId}/books";
    private final String USER_BOOKS_ID_URL = BASE_URL + "/{userId}/books/{bookId}";
    private final String GET_USER_CONTRIBUTES_URL = BASE_URL + "/{userId}/contributes";
    private final String USERS_CONTRIBUTES_ID_URL = BASE_URL + "/{userId}/contributes/{bookId}";

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    @Autowired
    private TicketService ticketService;

    /* ---------------- GET ALL USER ------------------------ */
    @RequestMapping(path = BASE_URL, method = RequestMethod.GET)
    public ResponseEntity<List<UserEntity>> getAll(@RequestParam(value = "q", required = false) String query) {
        if (query != null) {
            return new ResponseEntity<>(userService.search(query), HttpStatus.OK);
        }
        return new ResponseEntity<>(userService.getAll(), HttpStatus.OK);
    }

    @RequestMapping(path = BASE_URL, method = RequestMethod.GET, params = {"size", "page"})
    public ResponseEntity<Page<UserEntity>> findUserPaginated(@RequestParam("page") int page, @RequestParam("size") int size) {
        return new ResponseEntity<>(userService.findUserPaginated(page, size), HttpStatus.OK);
    }



    /* ---------------- GET ONE USER ------------------------ */
    @RequestMapping(path = GET_ONE_URL, method = RequestMethod.GET)
    public ResponseEntity<UserEntity> getOne(@PathVariable int id) {
        UserEntity user = userService.getOne(id);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(path = FAVOURITE_URL, method = RequestMethod.GET)
    public Boolean favourite(Principal principal) {
        return true;

    }

    @RequestMapping(path = GET_ROLES_URL, method = RequestMethod.GET)
    public ResponseEntity<Object> getRoles(Authentication authentication) {
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return new ResponseEntity<>(userDetails.getAuthorities(), HttpStatus.OK);
        }

        return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
    }


    /* ---------------- DELETE USER ------------------------ */
    @RequestMapping(value = GET_ONE_URL, method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteUserById(@PathVariable int id) {
        if (userService.delete(id)) {
            return new ResponseEntity<>("Deleted!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

    }

    /* ---------------- UPDATE USER ------------------------ */
    @RequestMapping(value = BASE_URL, method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> updateUserById(@RequestBody UserEntity userEntity, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        if (userEntity.getEmail().equals(userDetails.getUsername()) || userHasAuthority(userDetails, "ROLE_ADMIN")) {
            if (userService.update(userEntity)) {
                return new ResponseEntity<>("Updated!", HttpStatus.OK);
            }
            return new ResponseEntity<>("User not existed!", HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>("Not updated!", HttpStatus.NO_CONTENT);
    }

    @RequestMapping(
            value = CONTRIBUTE_URL,
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ContributeEntity> contribute(@RequestBody BookEntity book, Principal principal) {
        HttpStatus status = HttpStatus.OK;
        System.out.println("vao contribute ne");
        ContributeEntity contribute = null;
        if (principal != null) {
            contribute = userService.contributeByEmail(principal.getName(), book);
        } else {
            status = HttpStatus.UNAUTHORIZED;
        }
        return new ResponseEntity<>(contribute, status);
    }

    public boolean userHasAuthority(UserDetails userDetails, String role) {
        for (GrantedAuthority grantedAuthority : userDetails.getAuthorities()) {
            if (role.equals(grantedAuthority.getAuthority())) {
                return true;
            }
        }
        return false;
    }

    @RequestMapping(
            value = GET_USER_TICKETS_URL,
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<List<TicketEntity>> getTicketsByUserId(@PathVariable int userId, Authentication authentication) {
        HttpStatus status = HttpStatus.OK;
        List<TicketEntity> tickets = Collections.emptyList();
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            if (userHasAuthority(userDetails, ROLE_ADMIN)) {
                tickets = ticketService.getAllByUserId(userId);
            } else {
                status = HttpStatus.UNAUTHORIZED;
            }
        }
        return new ResponseEntity<>(tickets, status);
    }

    @RequestMapping(
            value = GET_USER_TICKETS_URL,
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE,
            params = {"page", "size"}
    )
    public ResponseEntity<Page<TicketEntity>> getTicketsByUserId(@PathVariable int userId, Authentication authentication, @RequestParam Integer page, @RequestParam Integer size) {
        HttpStatus status = HttpStatus.OK;
        Page<TicketEntity> tickets = null;
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            if (userHasAuthority(userDetails, ROLE_ADMIN)) {
                if (page != null && size != null) {
                    tickets = ticketService.getAllByUserId(userId, page, size);
                }
            } else {
                status = HttpStatus.UNAUTHORIZED;
            }
        }
        return new ResponseEntity<>(tickets, status);
    }

    @RequestMapping(
            value = USERS_TICKET_ID_URL,
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Boolean> approveTicket(@PathVariable int ticketId, Authentication authentication, @RequestParam(required = false) int status) {
        HttpStatus httpStatus = HttpStatus.OK;
        boolean ok = false;
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            if (userHasAuthority(userDetails, ROLE_ADMIN)) {
                if (ticketService.setStatus(ticketId, status)) {
                    httpStatus = HttpStatus.OK;
                    ok = true;
                } else {
                    httpStatus = HttpStatus.NO_CONTENT;
                }
            } else {
                httpStatus = HttpStatus.UNAUTHORIZED;
            }
        }
        return new ResponseEntity<>(ok, httpStatus);
    }

    @RequestMapping(
            value = GET_USER_BOOKS_URL,
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Set<BookEntity>> getBooksByUserId(@PathVariable int userId, Authentication authentication) {
        HttpStatus status = HttpStatus.OK;
        Set<BookEntity> books = Collections.EMPTY_SET;
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            if (userHasAuthority(userDetails, ROLE_ADMIN)) {
                books = userService.getBooksByUserId(userId);
            } else {
                status = HttpStatus.UNAUTHORIZED;
            }
        }
        return new ResponseEntity<>(books, status);
    }

    @RequestMapping(
            value = GET_USER_BOOKS_URL,
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE,
            params = {"page", "size"}
    )
    public ResponseEntity<Page<BookEntity>> getBooksByUserId(@PathVariable int userId, Authentication authentication, @RequestParam Integer page, @RequestParam Integer size) {
        HttpStatus status = HttpStatus.OK;
        Page<BookEntity> books = null;
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            if (userHasAuthority(userDetails, ROLE_ADMIN)) {
                books = userService.getBooksByUserId(userId, page, size);
            } else {
                status = HttpStatus.UNAUTHORIZED;
            }
        }
        return new ResponseEntity<>(books, status);
    }

    @RequestMapping(
            value = USER_BOOKS_ID_URL,
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Boolean> takeBook(@PathVariable int userId, @PathVariable int bookId, Authentication authentication) {
        HttpStatus httpStatus = HttpStatus.OK;
        boolean ok = false;
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            if (userHasAuthority(userDetails, ROLE_ADMIN)) {
                if (userService.takeBook(userId, bookId)) {
                    httpStatus = HttpStatus.OK;
                    ok = true;
                } else {
                    httpStatus = HttpStatus.NO_CONTENT;
                }
            } else {
                httpStatus = HttpStatus.UNAUTHORIZED;
            }
        }
        return new ResponseEntity<>(ok, httpStatus);
    }

    @RequestMapping(
            value = GET_USER_CONTRIBUTES_URL,
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<List<ContributeEntity>> getContributesByUserId(@PathVariable int userId, Authentication authentication) {
        HttpStatus status = HttpStatus.OK;
        List<ContributeEntity> conributes = Collections.emptyList();
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            if (userHasAuthority(userDetails, ROLE_ADMIN)) {
                conributes = bookService.getContributesByUserId(userId);
            } else {
                status = HttpStatus.UNAUTHORIZED;
            }
        }
        return new ResponseEntity<>(conributes, status);
    }

    @RequestMapping(
            value = GET_USER_CONTRIBUTES_URL,
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE,
            params = {"page","size"}
    )
    public ResponseEntity<Page<ContributeEntity>> getContributesByUserId(@PathVariable int userId, Authentication authentication, @RequestParam Integer page, @RequestParam Integer size) {
        HttpStatus status = HttpStatus.OK;
        Page<ContributeEntity> contributes = null;
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            if (userHasAuthority(userDetails, ROLE_ADMIN)) {
                contributes = bookService.getContributesByUserId(userId, page, size);
            } else {
                status = HttpStatus.UNAUTHORIZED;
            }
        }
        return new ResponseEntity<>(contributes, status);
    }

    @RequestMapping(
            value = USERS_CONTRIBUTES_ID_URL,
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Boolean> approveContribute(@PathVariable int userId, @PathVariable int bookId, Authentication authentication, @RequestParam(required = false) int status) {
        HttpStatus httpStatus = HttpStatus.OK;
        boolean ok = false;
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            if (userHasAuthority(userDetails, ROLE_ADMIN)) {
                if (userService.approveContribute(userId, bookId, status)) {
                    httpStatus = HttpStatus.OK;
                    ok = true;
                } else {
                    httpStatus = HttpStatus.NO_CONTENT;
                }
            } else {
                httpStatus = HttpStatus.UNAUTHORIZED;
            }
        }
        return new ResponseEntity<>(ok, httpStatus);
    }

}