package com.fsoft.flib.rest;

import com.fsoft.flib.domain.UserEntity;
import com.fsoft.flib.service.JwtService;
import com.fsoft.flib.service.UserService;
import com.fsoft.flib.util.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class AuthController {
    private final String LOGIN_URL = "/login";
    private final String REGISTER_URL = "/register";
    private final String AUTH_URL = "/auth";

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

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
                result = "Wrong email and password";
                httpStatus = HttpStatus.BAD_REQUEST;
            }
        } catch (Exception ex) {
            result = "Server Error";
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result, httpStatus);
    }

    //    -----CREATE NEW USER-----
    @RequestMapping(
            value = REGISTER_URL,
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<String> createNewUser(@RequestBody UserEntity newUser) {
        System.out.println("Create new user");
        System.out.println(JsonUtil.encode(newUser));
        if (userService.save(newUser)) {
            System.out.println("Created");
            System.out.println(JsonUtil.encode(newUser));
            return new ResponseEntity<>("Created!", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("User Existed!", HttpStatus.BAD_REQUEST);
        }
    }



}
