package com.fsoft.flib.service;

import com.fsoft.flib.domain.*;
import com.fsoft.flib.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.*;

@Service
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final ContributeRepository contributeRepository;
    private final UserRepository userRepository;
    private final AuthorRepository authorRepository;
    private final TypeRepository typeRepository;
    private final BookTypeRepository bookTypeRepository;
    private final TicketDetailRepository ticketDetailRepository;
    private final ReactRepository reactRepository;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository, ContributeRepository contributeRepository, UserRepository userRepository, AuthorRepository authorRepository, TypeRepository typeRepository, BookTypeRepository bookTypeRepository, TicketDetailRepository ticketDetailRepository, ReactRepository reactRepository) {
        this.bookRepository = bookRepository;
        this.contributeRepository = contributeRepository;
        this.userRepository = userRepository;
        this.authorRepository = authorRepository;
        this.typeRepository = typeRepository;
        this.bookTypeRepository = bookTypeRepository;
        this.ticketDetailRepository = ticketDetailRepository;
        this.reactRepository = reactRepository;
    }


    @Override
    public BookEntity save(BookEntity BookEntity) {
        return null;
    }

    @Override
    public BookEntity update(BookEntity BookEntity) {
        return null;
    }

    @Override
    @Transactional
    public Optional<BookEntity> delete(int bookId) {
        this.bookTypeRepository.deleteAllByBookId(bookId);
        this.contributeRepository.deleteAllByBookId(bookId);
        this.reactRepository.deleteAllByBookId(bookId);
        this.ticketDetailRepository.deleteAllByBookId(bookId);
        Optional<BookEntity> bookEntity = this.bookRepository.findById(bookId);
        this.bookRepository.deleteById(bookId);
        return bookEntity;
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
            List<ContributeEntity> contributes = contributeRepository.findAllByUserIdOrderByDateAddedDesc(user.getId());
            return contributes;
        }
        return Collections.emptyList();
    }

    @Override
    public Page<ContributeEntity> getContributesByEmail(String email, int page, int size) {
        UserEntity user = userRepository.findByEmail(email);
        if (user != null) {
            Page<ContributeEntity> contributes = contributeRepository.findAllByUserIdOrderByDateAddedDesc(user.getId(), PageRequest.of(page, size));
            return contributes;
        }
        return null;
    }

    @Override
    public List<ContributeEntity> getContributesByUserId(int userId) {
        return contributeRepository.findAllByUserIdOrderByDateAddedDesc(userId);
    }

    @Override
    public Page<ContributeEntity> getContributesByUserId(int userId, int page, int size) {
        return contributeRepository.findAllByUserIdOrderByDateAddedDesc(userId, PageRequest.of(page, size));
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
    @Override
    public BookEntity createBook(BookEntity bookEntity) {
        System.out.println(bookEntity.getAuthorByAuthorId().getName());
        AuthorEntity authorEntity = new AuthorEntity();
        authorEntity.setName(bookEntity.getAuthorByAuthorId().getName());
        authorEntity = this.authorRepository.save(authorEntity);
        bookEntity.setAuthorId(authorEntity.getId());
        return bookRepository.save(bookEntity);
    }

    @Override
    public BookEntity updateBook(BookEntity bookEntity) {
        AuthorEntity authorEntity = new AuthorEntity();
        authorEntity.setName(bookEntity.getAuthorByAuthorId().getName());
        authorEntity = this.authorRepository.save(authorEntity);
        bookEntity.setDateAdded(new Timestamp(new Date().getTime()));
        bookEntity.setAuthorId(authorEntity.getId());
        bookEntity.setAuthorByAuthorId(authorEntity);
        return this.bookRepository.save(bookEntity);
    }

    @Override
    public BookTypeEntity createTypeForBook(int bookId, int typeId) {
        BookTypeEntity bookTypeEntity = new BookTypeEntity();
        bookTypeEntity.setBookId(bookId);
        bookTypeEntity.setTypeId(typeId);
        return this.bookTypeRepository.save(bookTypeEntity);
    }
}
