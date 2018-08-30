package com.fsoft.flib.service;

import com.fsoft.flib.domain.*;
import com.fsoft.flib.repository.*;
import com.fsoft.flib.util.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BookServiceImpl<main> implements BookService {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private ContributeRepository contributeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TypeRepository typeRepository;
    @Autowired
    private BookTypeRepository bookTypeRepository;


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
    public List<BookEntity> findByNameLike(String query, String query1) {
        return this.bookRepository.findByNameLikeOrAuthorByAuthorIdNameLike(query, query1);
    }

    @Override
    public List<TypeEntity> getTypes() {
        return this.typeRepository.findAll();
    }

    @Override
    public Collection<BookEntity> getBookByIdType(int[] ids) {
        System.out.println("vao get book");
        Set<BookEntity> bookEntities= new HashSet<>();
        List<BookTypeEntity> bookTypeEntities;
        for (int id : ids) {
            bookTypeEntities = bookTypeRepository.findAllByTypeId(id);
            for (BookTypeEntity bookTypeEntity : bookTypeEntities) {
                bookEntities.add(bookTypeEntity.getBookByBookId());
            }
        }
        for(BookEntity bok:bookEntities){
            System.out.println(bok.getName());
        }
        return bookEntities;
    }
}
