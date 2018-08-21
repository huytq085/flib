package com.fsoft.flib.repository;

import com.fsoft.flib.domain.UserRoleEntity;
import com.fsoft.flib.domain.UserRoleEntityPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRolesRepository extends JpaRepository<UserRoleEntity, UserRoleEntityPK> {
    @Query("select ur.roleByRoleId.name from UserRoleEntity ur where ur.userByUserId.email = :email")
    List<String> getRoleNameByEmail(@Param("email") String email);
}