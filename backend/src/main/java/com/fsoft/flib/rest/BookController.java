package com.fsoft.flib.rest;

import com.fsoft.flib.domain.BookEntity;
import com.fsoft.flib.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/book")
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    //    @RequestMapping(
//            value = "/{id}",
//            method = RequestMethod.GET,
//            produces = MediaType.APPLICATION_JSON_VALUE
//    )
    @GetMapping(path = "/{id}")
    public Optional<BookEntity> getBook(@PathVariable int id) {
        System.out.println(id);
        return this.bookRepository.findById(id);
    }
//    @GetMapping(path = "/all")
//    public Optional<BookEntity> getAllBook() {
////        System.out.println(id);
//        return this.bookRepository.findAll(new )
//    }

}
