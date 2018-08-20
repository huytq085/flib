package com.fsoft.flib.config;

import com.fsoft.flib.domain.RoleEntity;
import com.fsoft.flib.domain.UserEntity;
import com.fsoft.flib.domain.UserRoleEntity;
import com.fsoft.flib.repository.RoleRepository;
import com.fsoft.flib.repository.UserRepository;
import com.fsoft.flib.repository.UserRolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeedingListener implements ApplicationListener<ContextRefreshedEvent> {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRolesRepository userRolesRepository;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent arg0) {
        // Roles
        if (roleRepository.findByName("ROLE_ADMIN") == null) {
            roleRepository.save(new RoleEntity("ROLE_ADMIN"));
        }

        if (roleRepository.findByName("ROLE_MEMBER") == null) {
            roleRepository.save(new RoleEntity("ROLE_MEMBER"));
        }

        // Admin account
        if (userRepository.findByEmail("admin@gmail.com") == null) {
            UserEntity admin = new UserEntity();
            admin.setEmail("admin@gmail.com");
            admin.setPassword(passwordEncoder.encode("123456"));
            admin.setAddress("AdminHouse");
            admin.setFullName("Nguyen Minh Tam");
            admin.setGender("nam");
            admin.setIdentityCard("123456789");
            userRepository.save(admin);
            ///////////////////
            UserEntity adminAdded = userRepository.findByEmail("admin@gmail.com");
            if (adminAdded != null) {
                UserRoleEntity adminRole = new UserRoleEntity(adminAdded.getId(), roleRepository.findByName("ROLE_ADMIN").getId());
                UserRoleEntity memberRole = new UserRoleEntity(adminAdded.getId(), roleRepository.findByName("ROLE_MEMBER").getId());
                userRolesRepository.save(adminRole);
                userRolesRepository.save(memberRole);
            }
        }

        // Member account
        if (userRepository.findByEmail("member@gmail.com") == null) {
            UserEntity member = new UserEntity();
            member.setEmail("member@gmail.com");
            member.setPassword(passwordEncoder.encode("123456"));
            member.setAddress("MemberHouse");
            member.setFullName("Nguyen Minh Tam");
            member.setGender("nam");
            member.setIdentityCard("123456789");
            userRepository.save(member);
            ////////////
            UserEntity memberAdded = userRepository.findByEmail("member@gmail.com");
            if (memberAdded != null) {
                UserRoleEntity memberRole = new UserRoleEntity(memberAdded.getId(), roleRepository.findByName("ROLE_MEMBER").getId());
                userRolesRepository.save(memberRole);
            }
        }
    }
}
