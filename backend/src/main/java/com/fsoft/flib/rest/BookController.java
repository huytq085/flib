package com.fsoft.flib.rest;

import com.fsoft.flib.domain.AuthorEntity;
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
    private final String SEARCH_BOOK = BASE_URL+ "/search";
    private final String SEARCH_AUTHOR = BASE_URL + "/author/search";

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
    public List<BookEntity> getBook() {
        return bookService.getAll();
    }

    @GetMapping(path = GET_PAGE_BOOK)
    public Page<BookEntity> getPageBook(@RequestParam int page, @RequestParam int size) {
        return bookService.getPageBook(page, size);
    }

    @GetMapping(path=SEARCH_BOOK)
    public List<BookEntity> searchBook( @RequestParam String name){
        return bookService.findByNameLike("%"+name+"%","%"+name+"%" );
    }

    @GetMapping(path=SEARCH_AUTHOR)
    public List<AuthorEntity> searchAuthor(@RequestParam String name){
        return bookService.findAuthorByNameLike("%"+name+"%");
    }
}
