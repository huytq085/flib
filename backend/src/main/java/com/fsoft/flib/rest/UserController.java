package com.fsoft.flib.rest;

import com.fsoft.flib.domain.UserEntity;
import com.fsoft.flib.service.JwtService;
import com.fsoft.flib.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    private final String BASE_URL = "/users";
    private final String GET_ONE_URL = BASE_URL + "/{id}";
    private final String LOGIN_URL = "/login";

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    //    -----GET ALL USERS----
    @RequestMapping(path = BASE_URL, method = RequestMethod.GET)
    public ResponseEntity<List<UserEntity>> getAll() {
        return new ResponseEntity<>(userService.getAll(), HttpStatus.OK);
    }

    //    -----GET ONE USER----
    @RequestMapping(path = GET_ONE_URL, method = RequestMethod.GET)
    public ResponseEntity<Object> getOne(@PathVariable int id) {
        UserEntity user = userService.getOne(id);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NO_CONTENT);
        }
    }

    //    -----CREATE NEW USER-----
    @RequestMapping(path = BASE_URL, method = RequestMethod.POST)
    public ResponseEntity<String> createNewUser(UserEntity newUser) {
        if (userService.save(newUser)) {
            return new ResponseEntity<>("Created!", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("User Existed!", HttpStatus.BAD_REQUEST);
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
    //------------------------------------------
    @RequestMapping(value = LOGIN_URL, method = RequestMethod.POST)
    public ResponseEntity<String> login(HttpServletRequest request, @RequestBody UserEntity userEntity) {
        String result = "";
        HttpStatus httpStatus = null;
        try {
            if (userService.checkLogin(userEntity)) {
                result = jwtService.generateTokenLogin(userEntity.getEmail());
                httpStatus = HttpStatus.OK;
            } else {
                result = "Wrong userId and password";
                httpStatus = HttpStatus.BAD_REQUEST;git
            }
        } catch (Exception ex) {
            result = "Server Error";
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result, httpStatus);
    }
}
