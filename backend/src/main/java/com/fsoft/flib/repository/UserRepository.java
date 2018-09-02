package com.fsoft.flib.repository;

import com.fsoft.flib.domain.BookEntity;
import com.fsoft.flib.domain.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    UserEntity findById(int id);

    UserEntity findByEmail(String mail);

    @Query("from UserEntity u where u.email like CONCAT('%',:query,'%') or u.fullName like CONCAT('%',:query,'%') or u.phone like CONCAT('%',:query,'%')")
    List<UserEntity> search(@Param("query") String query);

    @Query("from BookEntity b join TicketDetailEntity td on b.id = td.bookId join TicketEntity t on t.id = td.ticketId where t.userId = :userId and t.status = 1")
    Set<BookEntity> getBooksByUserId(@Param("userId") int userId);

    @Transactional
    @Modifying
    @Query("delete from TicketDetailEntity where bookId = :bookId and ticketId in (select t.id from TicketEntity t where t.userId = :userId)")
    void deleteBookFromTicketDetail(@Param("userId") int userId, @Param("bookId") int bookId);



}