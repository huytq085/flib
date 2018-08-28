package com.fsoft.flib.rest;

import com.fsoft.flib.domain.BookEntity;
import com.fsoft.flib.domain.ContributeEntity;
import com.fsoft.flib.domain.UserEntity;
import com.fsoft.flib.service.BookService;
import com.fsoft.flib.service.UserService;
import com.fsoft.flib.util.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

//@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController {
    private final String BASE_URL = "/users";
    private final String GET_ONE_URL = BASE_URL + "/{id}";
    private final String CONTRIBUTE_URL = BASE_URL + "/contribute";

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    /* ---------------- GET ALL USER ------------------------ */
    @RequestMapping(path = BASE_URL, method = RequestMethod.GET)
    public ResponseEntity<List<UserEntity>> getAll() {
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
    public ResponseEntity<Object> updateUserById(@RequestBody UserEntity userEntity, Principal principal) {
        if(userEntity.getEmail().equals(principal.getName())){
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
        System.out.println(JsonUtil.encode(book));
        ContributeEntity contribute = null;
        if (principal != null) {
            contribute = userService.contributeByEmail(principal.getName(), book);
            System.out.println(JsonUtil.encode(contribute));
        } else {
            status = HttpStatus.UNAUTHORIZED;
        }
        return new ResponseEntity<>(contribute, status);
    }
}