package com.fsoft.flib.rest;

import com.fsoft.flib.domain.AuthorEntity;
import com.fsoft.flib.domain.BookEntity;
import com.fsoft.flib.domain.BookTypeEntity;
import com.fsoft.flib.domain.TypeEntity;
import com.fsoft.flib.service.BookService;
import com.fsoft.flib.service.StorageService;
import com.fsoft.flib.util.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import javax.servlet.annotation.MultipartConfig;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
@MultipartConfig(fileSizeThreshold = 20971520)
public class BookController {
    private final String BASE_URL = "/book";
    final StorageService storageService;
    private final String GET_BOOK_BY_ID = BASE_URL + "/{id}";
    private final String GET_ALL_BOOK = BASE_URL + "/all";
    private final String GET_PAGE_BOOK = BASE_URL + "/page";
    private final String SEARCH_AUTHOR = BASE_URL + "/author/search";
    private final String SEARCH_BOOK = BASE_URL + "/search";
    private final String GET_TYPE = BASE_URL + "/types";
    private final String UPDATE_BOOK = BASE_URL + "/update";
    private final String CREATE_BOOK = BASE_URL + "/create";
    private final String SAVE_IMAGE = BASE_URL + "/saveimage";


    private final BookService bookService;
    private final String CREATE_BOOK_TYPE = BASE_URL + "/{bookId}/{typeId}";
    List<String> files = new ArrayList<String>();


    @Autowired
    public BookController(BookService bookService, StorageService storageService) {
        this.bookService = bookService;
        this.storageService = storageService;
    }

    @GetMapping(path = GET_BOOK_BY_ID)
    public Optional<BookEntity> getBook(@PathVariable int id) {
        return bookService.getOne(id);
    }

    @GetMapping(path = GET_ALL_BOOK)
    public Collection<BookEntity> getBook(@RequestParam(required = false) int[] id) {
        if (id != null && id.length > 0) {
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

    @GetMapping(path = SEARCH_AUTHOR)
    public List<AuthorEntity> searchAuthor(@RequestParam String name) {
        return bookService.findAuthorByNameLike("%" + name + "%");
    }

    @GetMapping(path = GET_TYPE)
    public List<TypeEntity> getTypes() {
        return bookService.getTypes();
    }

    @PostMapping(path = SAVE_IMAGE)
    public ResponseEntity<String> saveImage(@RequestParam("file") MultipartFile file, @RequestParam("name") String name) {
        if (file == null) {
            return null;
        }
        try {
            storageService.store(file, name);
            return new ResponseEntity<>(name + "." + file.getOriginalFilename().split("\\.")[1], HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(name + "." + file.getOriginalFilename().split("\\.")[1], HttpStatus.OK);
        }
    }

    @PostMapping(path = CREATE_BOOK)
    public BookEntity createBook(@RequestBody BookEntity bookEntity) {
        return this.bookService.createBook(bookEntity);
    }

    @GetMapping(path = "/book/getallfiles")
    public ResponseEntity<List<String>> getListFiles(Model model) {
        List<String> fileNames = files
                .stream().map(fileName -> MvcUriComponentsBuilder
                        .fromMethodName(BookController.class, "getFile", fileName).build().toString())
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(fileNames);
    }

    @GetMapping(path = "/book/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storageService.loadFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @PostMapping(path = CREATE_BOOK_TYPE)
    public BookTypeEntity createTypeForBook(@PathVariable int bookId, @PathVariable int typeId) {
        return this.bookService.createTypeForBook(bookId, typeId);
    }

    @PostMapping(path = UPDATE_BOOK)
    public BookEntity updateBook(@RequestBody BookEntity bookEntity) {
        return this.bookService.updateBook(bookEntity);
    }
}
