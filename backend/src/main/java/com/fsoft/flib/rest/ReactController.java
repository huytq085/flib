package com.fsoft.flib.rest;

import com.fsoft.flib.domain.ReactionEntity;
import com.fsoft.flib.service.ReactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class ReactController {
    private final String BASE_URL = "/react";
    private final String CREATE_REACT = BASE_URL + "/create";
    private final String GET_BY_BOOK_ID= BASE_URL + "/book";


    private ReactService reactService;

    @Autowired
    public ReactController(ReactService reactService) {
        this.reactService = reactService;
    }


    @PostMapping(path = CREATE_REACT)
    public ReactionEntity create(@RequestBody ReactionEntity reactionEntity, Principal principal) {
        if (principal != null) {
            return this.reactService.create(reactionEntity, principal);
        } else {
            return null;
        }
    }

    @GetMapping(path = GET_BY_BOOK_ID)
    public List<ReactionEntity> getPageBook(@RequestParam(value = "id") int bookIds) {
        return reactService.getReactsByBookId(bookIds);
    }
}