package com.fsoft.flib.repository;

import com.fsoft.flib.domain.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<BookEntity, Integer> {

    @Query("from BookEntity b join b.contributesById c where c.userId = :id")
    List<BookEntity> findAllContributesById(@Param("id") int id);

    @Query("from BookEntity b join b.contributesById c where c.userByUserId.email = :email")
    List<BookEntity> findAllContributesByEmail(@Param("email") String email);


}
