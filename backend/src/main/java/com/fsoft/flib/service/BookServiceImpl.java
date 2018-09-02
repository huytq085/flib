package com.fsoft.flib.service;

import com.fsoft.flib.domain.AuthorEntity;
import com.fsoft.flib.domain.BookEntity;
import com.fsoft.flib.domain.ContributeEntity;
import com.fsoft.flib.domain.UserEntity;
import com.fsoft.flib.repository.AuthorRepository;
import com.fsoft.flib.repository.BookRepository;
import com.fsoft.flib.repository.ContributeRepository;
import com.fsoft.flib.repository.UserRepository;
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
    private AuthorRepository authorRepository;
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
    public List<ContributeEntity> getContributesByEmail(String email) {
        UserEntity user = userRepository.findByEmail(email);
        if (user != null) {
            List<ContributeEntity> contributes = contributeRepository.findAllByUserId(user.getId());
            return contributes;
        }
        return Collections.emptyList();
    }

    @Override
    public List<ContributeEntity> getContributesByUserId(int userId) {
        return contributeRepository.findAllByUserId(userId);
    }

    @Override
    public List<BookEntity> findByNameLike(String query, String query1) {
        return this.bookRepository.findByNameLikeOrAuthorByAuthorIdNameLike(query, query1);
    }

    @Override
    public List<AuthorEntity> findAuthorByNameLike(String query) {
        return authorRepository.findByNameLike(query);
    }

    public List<TypeEntity> getTypes() {
        return this.typeRepository.findAll();
    }

    @Override
    public Collection<BookEntity> getBookByIdType(int[] idTypes) {
        System.out.println("vao get book");
        List<BookTypeEntity> bookTypeEntities;
        List<BookEntity> bookEntitiesTemp = new ArrayList<>();
        List<BookEntity> bookEntities = new ArrayList<>();
        for (int idType : idTypes) {
            bookTypeEntities = bookTypeRepository.findAllByTypeId(idType);
            for (BookTypeEntity bookTypeEntity : bookTypeEntities) {
                BookEntity book = bookTypeEntity.getBookByBookId();
                bookEntitiesTemp.add(book);
            }
            if (bookEntities.isEmpty()) {
                bookEntities.addAll(bookEntitiesTemp);
            } else {
                bookEntities = intersection(bookEntities, bookEntitiesTemp);
            }
            bookEntitiesTemp.clear();
        }
        return bookEntities;
    }

    private <T> List<T> intersection(List<T> list1, List<T> list2) {
        List<T> list = new ArrayList<T>();
        for (T t1 : list1) {
            for (T t2 : list2) {
                if (t1.equals(t2)) {
                    list.add(t1);
                }
            }
        }
        return list;
    }
}
