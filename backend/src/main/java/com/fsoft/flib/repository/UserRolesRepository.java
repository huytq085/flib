package com.fsoft.flib.repository;

import com.fsoft.flib.domain.UserRoleEntity;
import com.fsoft.flib.domain.UserRoleEntityPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRolesRepository extends JpaRepository<UserRoleEntity, UserRoleEntityPK> {
}