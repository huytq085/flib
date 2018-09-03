package com.fsoft.flib.service;

import com.fsoft.flib.domain.*;
import com.fsoft.flib.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

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

    @Autowired
    public BookServiceImpl(BookRepository bookRepository, ContributeRepository contributeRepository, UserRepository userRepository, AuthorRepository authorRepository, TypeRepository typeRepository, BookTypeRepository bookTypeRepository, TicketDetailRepository ticketDetailRepository) {
        this.bookRepository = bookRepository;
        this.contributeRepository = contributeRepository;
        this.userRepository = userRepository;
        this.authorRepository = authorRepository;
        this.typeRepository = typeRepository;
        this.bookTypeRepository = bookTypeRepository;
        this.ticketDetailRepository = ticketDetailRepository;
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
    public List<AuthorEntity> findAuthorByNameLike(String query) {
        return authorRepository.findByNameLike(query);
    }

    public List<TypeEntity> getTypes() {
        return this.typeRepository.findAll();
    }

    @Override
    public Collection<BookEntity> getBookByIdType(int[] ids) {
        System.out.println("vao get book");
        Set<BookEntity> bookEntities = new HashSet<>();
        List<BookTypeEntity> bookTypeEntities;
        for (int id : ids) {
            bookTypeEntities = bookTypeRepository.findAllByTypeId(id);
            for (BookTypeEntity bookTypeEntity : bookTypeEntities) {
                bookEntities.add(bookTypeEntity.getBookByBookId());
            }
        }
//        for(BookEntity bok:bookEntities){
//            System.out.println(bok.getName());
//        }
        return bookEntities;
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
