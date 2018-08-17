package com.fsoft.flib.repository;

import com.fsoft.flib.domain.BookEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface BookRepository extends PagingAndSortingRepository<BookEntity, Integer> {

}
