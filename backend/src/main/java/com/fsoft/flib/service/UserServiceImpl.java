package com.fsoft.flib.service;

import com.fsoft.flib.domain.*;
import com.fsoft.flib.repository.*;
import com.fsoft.flib.util.Constants;
import com.fsoft.flib.util.ImageUtils;
import com.fsoft.flib.util.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRolesRepository userRolesRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private ContributeRepository contributeRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private AuthorRepository authorRepository;

    @Override
    public UserEntity save(UserEntity userEntity) {
        if (!isExist(userEntity)){
            userEntity.setPassword(passwordEncoder.encode(userEntity.getPassword()));
            if (userRepository.save(userEntity) != null) {
                int idUser = userRepository.findByEmail(userEntity.getEmail()).getId();
                int idRole_Member = roleRepository.findByName("ROLE_MEMBER").getId();
                userRolesRepository.save(new UserRoleEntity(idUser, idRole_Member));
//            TODO: save and get id automatically
                userRepository.saveAndFlush(userEntity);
                return userRepository.findByEmail(userEntity.getEmail());
            }
        }

        return null;
    }

    @Override
    public boolean update(UserEntity userEntity) {
        //getpassword từ id của userEntity userEntity không chứa password)
        if (userEntity != null && userEntity.getPassword() != null && !userEntity.getPassword().equals("")){
            userEntity.setPassword(passwordEncoder.encode(userEntity.getPassword()));
        } else {
            UserEntity userFromDb = userRepository.findByEmail(userEntity.getEmail());
            if (userFromDb != null) {
                userEntity.setPassword(userFromDb.getPassword());
            }
        }
        return userRepository.save(userEntity) != null;
    }

    @Override
    public boolean delete(int id) {
        UserEntity userEntity = userRepository.findById(id);
        userRepository.delete(userEntity);
        if (userRepository.findById(id) == null) {
            return true;
        }
        return false;
    }

    @Override
    public List<UserEntity> getAll() {
        return userRepository.findAll();
    }

    @Override
    public UserEntity getOne(int userId) {
        return userRepository.findById(userId);
    }

    //    return true if user exist in db
    @Override
    public boolean checkLogin(UserEntity userLogin) {
        UserEntity userReg = userRepository.findByEmail(userLogin.getEmail());
        if (userReg != null) {
            if (passwordEncoder.matches(userLogin.getPassword(), userReg.getPassword())) {
                return true;
            }
            return false;
        }
        return false;
    }

    @Override
    public List<GrantedAuthority> getAuthorities(UserEntity userEntity) {
        List<String> roleNames = userRolesRepository.getRoleNameByEmail(userEntity.getEmail());
        List<GrantedAuthority> grantList = new ArrayList<>();
        if (roleNames != null) {
            for (String role : roleNames) {
                // ROLE_USER, ROLE_ADMIN,..
                GrantedAuthority authority = new SimpleGrantedAuthority(role);
                grantList.add(authority);
            }
        }
        return grantList;
    }

    @Override
    public UserEntity getByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public ContributeEntity contributeByEmail(String email, BookEntity book) {
        UserEntity user = userRepository.findByEmail(email);
        if (user != null) {
            ContributeEntity contribute = new ContributeEntity();
            contribute.setUserId(user.getId());
//            TODO: auto save author with hibernate
            AuthorEntity author = new AuthorEntity();
            author.setName(book.getAuthorByAuthorId().getName());
            book.setAuthorId(authorRepository.save(author).getId());
//            Store cover image to resources folder & get url path
            String coverImagePath = "/cover_img/" + book.getAuthorId() + "_" + new Timestamp(System.currentTimeMillis()).getTime() + ".png";
            String path = Constants.STATIC_IMG_BOOK_PATH + coverImagePath;
            try {
                if (ImageUtils.writeImage(path, book.getCoverImage())){
                    System.out.println("create file success");
                    book.setCoverImage(Constants.REAL_STATIC_IMG_BOOK_PATH + coverImagePath);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            book = bookRepository.save(book);
            contribute.setBookId(book.getId());
            return contributeRepository.save(contribute);
        }
        return null;
    }

    @Override
    public List<UserEntity> search(String query) {
        return userRepository.search(query);
    }

    private boolean isExist(UserEntity user) {
        return (userRepository.findByEmail(user.getEmail()) != null);
    }

}