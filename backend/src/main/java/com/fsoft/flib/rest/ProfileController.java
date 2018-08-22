package com.fsoft.flib.rest;

import com.fsoft.flib.domain.BookEntity;
import com.fsoft.flib.domain.UserEntity;
import com.fsoft.flib.service.BookService;
import com.fsoft.flib.service.UserService;
import com.fsoft.flib.util.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.print.attribute.standard.Media;
import java.awt.*;
import java.security.Principal;

@RestController
@RequestMapping("/api")
public class ProfileController {
    private final String BASE_URL = "/profile";
    private final String INFO_URL = BASE_URL + "/info";
    private final String CONTRIBUTE_URL = BASE_URL + "/contributes";
    private final String FAVOURITE_URL = BASE_URL + "/favourites";
    private final String ORDER_URL = BASE_URL + "/orders";

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    @RequestMapping(
            value = INFO_URL,
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public UserEntity getInfo(Principal principal){
        String email = principal.getName();
        return userService.getByEmail(email);
    }

//    @RequestMapping(
//            value = INFO_URL,
//            method = RequestMethod.GET,
//            produces = MediaType.APPLICATION_JSON_VALUE
//    )
//    public List<BookEntity> getContribute(Principal principal){
//        String email = principal.getName();
//        return bookService.getContributesByEmail(email);
//    }


}
