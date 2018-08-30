package com.fsoft.flib.rest;

import com.fsoft.flib.domain.BookEntity;
import com.fsoft.flib.domain.TypeEntity;
import com.fsoft.flib.service.BookService;
import com.fsoft.flib.util.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
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
    private final String SEARCH_BOOK = BASE_URL + "/search";
    private final String GET_TYPE = BASE_URL + "/types";

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping(path = GET_BOOK_BY_ID)
    public Optional<BookEntity> getBook(@PathVariable int id) {
        return bookService.getOne(id);
    }

    @GetMapping(path = GET_ALL_BOOK)
    public Collection<BookEntity> getBook(@RequestParam(required = false) int[] id) {
        if(id != null && id.length>0){
            System.out.println(JsonUtils.encode(id));
            return bookService.getBookByIdType(id);
        }
        return bookService.getAll();
    }

    @GetMapping(path = GET_PAGE_BOOK)
    public Page<BookEntity> getPageBook(@RequestParam int page, @RequestParam int size) {
        return bookService.getPageBook(page, size);
    }

    @GetMapping(path = SEARCH_BOOK)
    public List<BookEntity> searchBook(@RequestParam String name) {
        return bookService.findByNameLike("%" + name + "%", "%" + name + "%");
    }

    @GetMapping(path = GET_TYPE)
    public List<TypeEntity> getTypes() {
        return bookService.getTypes();
    }

}
