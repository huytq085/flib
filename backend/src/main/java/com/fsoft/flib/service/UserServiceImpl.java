package com.fsoft.flib.service;

import com.fsoft.flib.domain.*;
import com.fsoft.flib.repository.*;
import com.fsoft.flib.util.Constants;
import com.fsoft.flib.util.ImageUtils;
import com.fsoft.flib.util.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.*;

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
    @Autowired
    private TicketRepository ticketRepository;

    @Override
    public UserEntity save(UserEntity userEntity) {
        if (!isExist(userEntity)) {
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
        if (userEntity != null && userEntity.getPassword() != null && !userEntity.getPassword().equals("")) {
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
    public Page<UserEntity> findUserPaginated(int page, int size) {
        return userRepository.findAll(PageRequest.of(page, size));
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
        ContributeEntity contribute = null;
        if (user != null) {
            contribute  = contributeRepository.findById(new ContributeEntityPK(user.getId(), book.getId())).orElse(null);
            if (contribute != null) {
                calculateBookAmount(book);
            } else {
                contribute = new ContributeEntity();
                contribute.setUserId(user.getId());
//            TODO: auto save author with hibernate
                if (book.getId() == 0) {
                    System.out.println("book id: " + book.getId());
                    System.out.println("author id: " + book.getAuthorByAuthorId().getId());
                    if (book.getAuthorByAuthorId().getId() == 0) {
                        AuthorEntity author = new AuthorEntity();
                        author.setName(book.getAuthorByAuthorId().getName());
                        book.setAuthorId(authorRepository.save(author).getId());
                    } else {
                        book.setAuthorId(book.getAuthorByAuthorId().getId());
                        book.setAuthorByAuthorId(null);
                    }
//            Store cover image to resources folder & get url path
                    setCoverImage(book);

                    book = bookRepository.save(book);
                }
                contribute.setBookId(book.getId());
                return contributeRepository.save(contribute);
            }

        }
        return contribute;
    }

    @Override
    public List<UserEntity> search(String query) {
        return userRepository.search(query);
    }

    @Override
    public Set<BookEntity> getBooksByUserId(int userId) {
        return userRepository.getBooksByUserId(userId);
    }

    @Override
    public Page<BookEntity> getBooksByUserId(int userId, int page, int size) {
        return userRepository.getBooksByUserId(userId, PageRequest.of(page, size));
    }

    @Override
    public Boolean takeBook(int userId, int bookId) {
        userRepository.deleteBookFromTicketDetail(userId, bookId);
        return true;
    }

    @Override
    public Boolean approveContribute(int userId, int bookId, int status) {
        ContributeEntityPK entityPK = new ContributeEntityPK(userId, bookId);
        ContributeEntity contributeEntity = contributeRepository.findById(entityPK).orElse(null);
        if (contributeEntity != null) {
            if (status == 0) {
                contributeRepository.deleteById(entityPK);
                return true;
            }
            contributeEntity.setStatus(status);
            return contributeRepository.save(contributeEntity) != null;
        }
        return false;
    }

    private boolean isExist(UserEntity user) {
        return (userRepository.findByEmail(user.getEmail()) != null);
    }

    private void setCoverImage(BookEntity book) {
        System.out.println(book.getCoverImage());
        if (book.getCoverImage() == null || "".equals(book.getCoverImage())) {
            book.setCoverImage(Constants.DEFAULT_COVER_IMAGE_PATH);
        } else if (!book.getCoverImage().matches("([^\\s]+(\\.(?i)(jpg|png|gif|bmp))$)|^(https?)://.*$")) {
            System.out.println("set ne");
            String coverImagePath = "/cover_img/" + book.getAuthorId() + "_" + new Timestamp(System.currentTimeMillis()).getTime() + ".png";
            String path = Constants.STATIC_IMG_BOOK_PATH + coverImagePath;
            try {
                if (ImageUtils.writeImage(path, book.getCoverImage())) {
                    System.out.println("create file success");
                    book.setCoverImage(Constants.REAL_STATIC_IMG_BOOK_PATH + coverImagePath);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private void calculateBookAmount(BookEntity bookFromClient) {
        BookEntity bookFromDb = bookRepository.getOne(bookFromClient.getId());
        bookFromDb.setAmount(bookFromDb.getAmount() + bookFromClient.getAmount());
        bookRepository.save(bookFromDb);
    }

}