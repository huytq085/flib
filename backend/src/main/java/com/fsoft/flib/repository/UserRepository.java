package com.fsoft.flib.repository;

import com.fsoft.flib.domain.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    UserEntity findById(int id);

    UserEntity findByEmail(String mail);


    @Query("from UserEntity u where u.email like CONCAT('%',:query,'%') or u.fullName like CONCAT('%',:query,'%') or u.phone like CONCAT('%',:query,'%')")
    List<UserEntity> search(@Param("query") String query);


}