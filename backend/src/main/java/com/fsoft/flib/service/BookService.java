package com.fsoft.flib.service;

import com.fsoft.flib.domain.AuthorEntity;
import com.fsoft.flib.domain.BookEntity;
import com.fsoft.flib.domain.ContributeEntity;
import com.fsoft.flib.domain.BookTypeEntity;
import com.fsoft.flib.domain.TypeEntity;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public interface BookService {
    BookEntity save(BookEntity BookEntity);

    BookEntity update(BookEntity BookEntity);

    Optional<BookEntity> delete(int bookId);

    List<BookEntity> getAll();

    Optional<BookEntity> getOne(int bookId);

    Page<BookEntity> getPageBook(int number, int size);

    List<ContributeEntity> getContributesByEmail(String email);

    Page<ContributeEntity> getContributesByEmail(String email, int page, int size);

    List<ContributeEntity> getContributesByUserId(int userId);

    Page<ContributeEntity> getContributesByUserId(int userId, int page, int size);

    List<BookEntity> findByNameLike(String query, String query1);

    List<AuthorEntity> findAuthorByNameLike(String query);

    List<TypeEntity> getTypes ();

    Collection<BookEntity> getBookByIdType(int[] id);

    BookEntity createBook(BookEntity bookEntity);

    BookEntity updateBook(BookEntity bookEntity);

    BookTypeEntity createTypeForBook(int bookId, int typeId);


}
