package com.fsoft.flib.rest;

import com.fsoft.flib.domain.UserEntity;
import com.fsoft.flib.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController {
    private final String BASE_URL = "/users";
    private final String GET_ONE_URL = BASE_URL + "/{id}";

    @Autowired
    private UserService userService;

    /* ---------------- GET ALL USER ------------------------ */
    @RequestMapping(path = BASE_URL, method = RequestMethod.GET)
    public ResponseEntity<List<UserEntity>> getAll() {
        return new ResponseEntity<>(userService.getAll(), HttpStatus.OK);
    }

    /* ---------------- GET ONE USER ------------------------ */
    @RequestMapping(path = GET_ONE_URL, method = RequestMethod.GET)
    public ResponseEntity<Object> getOne(@PathVariable int id) {
        UserEntity user = userService.getOne(id);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NO_CONTENT);
        }
    }

    /* ---------------- DELETE USER ------------------------ */
    @RequestMapping(value = GET_ONE_URL, method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteUserById(@PathVariable int id) {
        if (userService.delete(id)) {
            return new ResponseEntity<>("Deleted!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Not deleted!", HttpStatus.NO_CONTENT);
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
}