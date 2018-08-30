package com.fsoft.flib.service;

import com.fsoft.flib.domain.AuthorEntity;
import com.fsoft.flib.domain.BookEntity;
import com.fsoft.flib.domain.ContributeEntity;
import com.fsoft.flib.domain.UserEntity;
import com.fsoft.flib.repository.AuthorRepository;
import com.fsoft.flib.repository.BookRepository;
import com.fsoft.flib.repository.ContributeRepository;
import com.fsoft.flib.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private ContributeRepository contributeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthorRepository authorRepository;

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
        return bookRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public List<BookEntity> getContributesByEmail(String email) {
        UserEntity user = userRepository.findByEmail(email);
        List<BookEntity> books = new ArrayList<>();
        if (user != null) {
            List<ContributeEntity> contributes = contributeRepository.findAllByUserId(user.getId());
            for (ContributeEntity contribute : contributes) {
                System.out.println("user id: " + contribute.getBookByBookId().getName());
                books.add(contribute.getBookByBookId());
            }
            return books;
        }
        return Collections.emptyList();
    }

    @Override
    public List<BookEntity> findByNameLike(String query,String query1) {
        return this.bookRepository.findByNameLikeOrAuthorByAuthorIdNameLike(query, query1);
    }

    @Override
    public List<AuthorEntity> findAuthorByNameLike(String query) {
        return authorRepository.findByNameLike(query);
    }


}
