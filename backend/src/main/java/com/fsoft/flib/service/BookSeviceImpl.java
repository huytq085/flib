package com.fsoft.flib.service;

import com.fsoft.flib.domain.Book;
import com.fsoft.flib.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookSeviceImpl implements BookService {

    @Override
    public Book save(Book book) {
        return null;
    }
}
