package com.fsoft.flib.rest;

import com.fsoft.flib.domain.BookEntity;
import com.fsoft.flib.domain.ContributeEntity;
import com.fsoft.flib.domain.UserEntity;
import com.fsoft.flib.service.BookService;
import com.fsoft.flib.service.UserService;
import com.fsoft.flib.util.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

//@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController {
    private final String BASE_URL = "/users";
    private final String GET_ONE_URL = BASE_URL + "/{id}";
    private final String GET_ROLES_URL = BASE_URL + "/roles";
    private final String CONTRIBUTE_URL = BASE_URL + "/contribute";
    private final String FAVOURITE_URL = BASE_URL + "/favourite/{id}";

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    /* ---------------- GET ALL USER ------------------------ */
    @RequestMapping(path = BASE_URL, method = RequestMethod.GET)
    public ResponseEntity<List<UserEntity>> getAll(@RequestParam(value = "q", required = false) String query) {
        if (query != null) {
            return new ResponseEntity<>(userService.search(query), HttpStatus.OK);
        }
        return new ResponseEntity<>(userService.getAll(), HttpStatus.OK);
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

        if(userEntity.getEmail().equals(userDetails.getUsername()) || userHasAuthority(userDetails, "ROLE_ADMIN")){
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
    public ResponseEntity<ContributeEntity> contribute(@RequestBody BookEntity book, Principal principal){
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
}