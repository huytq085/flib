package com.fsoft.flib.service;

import com.fsoft.flib.domain.BookEntity;

import java.util.List;

public interface BookService {
    BookEntity save(BookEntity BookEntity);

    BookEntity update(BookEntity BookEntity);

    BookEntity delete(BookEntity BookEntity);

    List<BookEntity> getAll();

    BookEntity getOne(int BookId);
}
