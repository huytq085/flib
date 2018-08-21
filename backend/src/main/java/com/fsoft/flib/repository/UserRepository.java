package com.fsoft.flib.repository;

import com.fsoft.flib.domain.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    UserEntity findById(int id);

    UserEntity findByEmail(String mail);
}