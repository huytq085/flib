package com.fsoft.flib.rest;

import com.fsoft.flib.domain.BookEntity;
import com.fsoft.flib.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class BookController {
    private final String BASE_URL = "/book";
    private final String GET_BOOK_BY_ID = BASE_URL + "/{id}";
    private final String GET_ALL_BOOK = BASE_URL + "/all";
    private final String GET_PAGE_BOOK = BASE_URL + "/page";

    @Autowired
    private BookService bookService;

    //    @RequestMapping(
//            value = "/{id}",
//            method = RequestMethod.GET,
//            produces = MediaType.APPLICATION_JSON_VALUE
//    )
    @GetMapping(path = GET_BOOK_BY_ID)
    public Optional<BookEntity> getBook(@PathVariable int id) {
        System.out.println(id);
        return bookService.getOne(id);
    }

    //    @GetMapping(path = "/all")
//    public Optional<BookEntity> getAllBook() {
//        System.out.println(id);
//        return this.bookRepository.findAll(new)
//    }
    @GetMapping(path = GET_ALL_BOOK)
    public List<BookEntity> getBook() {
        return bookService.getAll();
    }

    @GetMapping(path = GET_PAGE_BOOK)
    public Page<BookEntity> getPageBook(@RequestParam int page, @RequestParam int size) {
        return bookService.getPageBook(page, size);
    }
}
