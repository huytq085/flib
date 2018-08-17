package com.fsoft.flib.repository;

import com.fsoft.flib.domain.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface BookRepository extends JpaRepository<BookEntity, Integer> {

}
