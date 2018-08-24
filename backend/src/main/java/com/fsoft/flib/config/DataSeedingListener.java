package com.fsoft.flib.config;

import com.fsoft.flib.domain.RoleEntity;
import com.fsoft.flib.domain.UserEntity;
import com.fsoft.flib.domain.UserRoleEntity;
import com.fsoft.flib.repository.*;
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

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private TicketDetailRepository ticketDetailRepository;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent arg0) {
        // Roles
        System.out.println("onApplicationEvent");
        if (roleRepository.findByName("ROLE_ADMIN") == null) {
            System.out.println("create role admin");
            roleRepository.save(new RoleEntity("ROLE_ADMIN"));
        }

        if (roleRepository.findByName("ROLE_MEMBER") == null) {
            System.out.println("create role member");
            roleRepository.save(new RoleEntity("ROLE_MEMBER"));
        }

        // Admin account
        UserEntity admin = userRepository.findByEmail("admin@gmail.com");
        if (admin == null) {
            admin = new UserEntity();
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
        UserEntity member = userRepository.findByEmail("member@gmail.com");
        if (member == null) {
            member = new UserEntity();
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

//        Create author

//        List<AuthorEntity> authors = authorRepository.findAll();
//        if (authors.size() < 3) {
//            System.out.println("Set authors");
//            String[] authorNames = {"Các Mác", "Lê Nin", "Hồ Chí Minh"};
//            for (int i = 0; i < authorNames.length; i++) {
//                System.out.println("Set author: " + authorNames[i]);
//                AuthorEntity authorEntity = new AuthorEntity();
//                authorEntity.setName(authorNames[i]);
//                authorEntity = authorRepository.save(authorEntity);
//                authors.add(authorEntity);
//            }
//        }
//
//
//        List<BookEntity> books = bookRepository.findAll();
//        if (books.size() < 3) {
//            System.out.println("Set books");
//            String[] bookNames = {"Tư tưởng chủ tịch Hồ Chí Mình", "Giáo trình chủ nghĩa Mác - Lênin", "Pháp luật đại cương"};
//            // Create book & ticket
//            BookEntity bookEntity = new BookEntity();
//            for (int i = 0; i < bookNames.length; i++) {
//                System.out.println("Set sach: " + bookNames[i]);
//                bookEntity.setName(bookNames[i]);
//                bookEntity.setAuthorId(authors.get(i).getId());
//                bookEntity.setAmount(5);
//                bookEntity.setCoverImage("http://localhost:8080/images/cover_image_default.jpg");
//                bookEntity.setDateAdded(new Timestamp(System.currentTimeMillis()));
//                bookEntity.setDatePublished(new Timestamp(System.currentTimeMillis()));
//                bookEntity = bookRepository.save(bookEntity);
//                books.add(bookEntity);
//            }
//        }
//
//        if (member != null) {
//            System.out.println("co member");
//            List<TicketEntity> tickets = ticketRepository.findAllByUserId(member.getId());
//            if (tickets.size() < 3) {
//
//                TicketEntity ticketEntity = new TicketEntity();
//                for (int i = 0; i < 5; i++) {
//                    ticketEntity.setUserId(member.getId());
//                    ticketEntity.setDateAdded("");
//                    ticketEntity = ticketRepository.save(ticketEntity);
//                    List<TicketDetailEntity> ticketDetails = new ArrayList<>();
//                    for (int j = 0; j < i; j++) {
//                        System.out.println("Set ticket detail: " + i);
//                        TicketDetailEntity ticketDetail = new TicketDetailEntity();
//                        ticketDetail.setAmount(i + 1);
//                        System.out.println(books.get(i).getId());
//                        ticketDetail.setBookId(books.get(i).getId());
//                        ticketDetail.setTicketId(ticketEntity.getId());
//                        ticketDetail = ticketDetailRepository.save(ticketDetail);
//                        ticketDetails.add(ticketDetail);
//                    }
//                }
//            }
//        }

    }
}
