package com.fsoft.flib.service;

import com.fsoft.flib.domain.BookEntity;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface BookService {
    BookEntity save(BookEntity BookEntity);

    BookEntity update(BookEntity BookEntity);

    BookEntity delete(BookEntity BookEntity);

    List<BookEntity> getAll();

    Optional<BookEntity> getOne(int bookId);

    Page<BookEntity> getPageBook(int number, int size);
}
