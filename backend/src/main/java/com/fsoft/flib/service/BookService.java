package com.fsoft.flib.service;

import com.fsoft.flib.domain.Book;
import org.springframework.stereotype.Service;

@Service
public interface BookService {
    Book save(Book book);
}
