package com.fsoft.flib.service;

import com.fsoft.flib.domain.BookEntity;
import com.fsoft.flib.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService{
    @Autowired
    private BookRepository bookRepository;

    @Override
    public BookEntity save(BookEntity BookEntity) {
        return null;
    }

    @Override
    public BookEntity update(BookEntity BookEntity) {
        return null;
    }

    @Override
    public BookEntity delete(BookEntity BookEntity) {
        return null;
    }

    @Override
    public List<BookEntity> getAll() {
        return bookRepository.findAll();
    }

    @Override
    public Optional<BookEntity> getOne(int bookId) {
        return bookRepository.findById(bookId);
    }

    @Override
    public Page<BookEntity> getPageBook(int page, int size) {
        return bookRepository.findAll(PageRequest.of(page,size));
    }

    @Override
    public List<BookEntity> getContributesByEmail(String email) {
        return bookRepository.findAllContributesByEmail(email);
    }


}
