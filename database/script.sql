create table author
(
  id   int auto_increment
    primary key,
  name varchar(255) charset utf8 not null
);

create table book
(
  id             int auto_increment
    primary key,
  name           varchar(255) charset utf8          not null,
  author_id      int                                not null,
  rating         double default '5'                 not null,
  date_added     datetime default CURRENT_TIMESTAMP not null,
  date_published datetime                           not null,
  amount         int                                not null,
  constraint book_author_id_fk
  foreign key (author_id) references author (id)
);

create table role
(
  id   int         not null
    primary key,
  name varchar(45) not null
);

create table type
(
  id   int auto_increment
    primary key,
  name varchar(255) charset utf8 not null,
  constraint type_name_uindex
  unique (name)
);

create table book_type
(
  book_id int not null,
  type_id int not null,
  primary key (book_id, type_id),
  constraint book_type_book_id_fk
  foreign key (book_id) references book (id),
  constraint book_type_type_id_fk
  foreign key (type_id) references type (id)
);

create table user
(
  id            int auto_increment
    primary key,
  email         varchar(45)               not null,
  password      varchar(100)              not null,
  full_name     varchar(100) charset utf8 not null,
  address       varchar(100) charset utf8 not null,
  gender        varchar(10)               not null,
  identity_card varchar(12)               not null,
  constraint email_UNIQUE
  unique (email)
);

create table contribute
(
  user_id    int                                not null,
  book_id    int                                not null,
  date_added datetime default CURRENT_TIMESTAMP not null,
  status     tinyint(1) default '0'             not null,
  primary key (user_id, book_id),
  constraint fk_user_has_book_book1
  foreign key (book_id) references book (id),
  constraint fk_user_has_book_user1
  foreign key (user_id) references user (id)
);

create index fk_user_has_book_book1_idx
  on contribute (book_id);

create index fk_user_has_book_user1_idx
  on contribute (user_id);

create table reaction
(
  book_id      int                                not null,
  user_id      int                                not null,
  comment      longtext                           not null,
  rating       double default '2.5'               not null,
  date_added   datetime default CURRENT_TIMESTAMP not null,
  date_updated datetime default CURRENT_TIMESTAMP not null,
  primary key (book_id, user_id),
  constraint fk_book_has_user_book1
  foreign key (book_id) references book (id),
  constraint fk_book_has_user_user1
  foreign key (user_id) references user (id)
);

create index fk_book_has_user_book1_idx
  on reaction (book_id);

create index fk_book_has_user_user1_idx
  on reaction (user_id);

create table ticket
(
  id         int auto_increment
    primary key,
  date_added varchar(45) not null,
  user_id    int         not null,
  constraint fk_ticket_user1
  foreign key (user_id) references user (id)
);

create index fk_ticket_user1_idx
  on ticket (user_id);

create table ticket_detail
(
  book_id   int             not null,
  ticket_id int             not null,
  amount    int default '1' not null,
  primary key (book_id, ticket_id),
  constraint fk_book_has_ticket_book1
  foreign key (book_id) references book (id),
  constraint fk_book_has_ticket_ticket1
  foreign key (ticket_id) references ticket (id)
);

create index fk_book_has_ticket_book1_idx
  on ticket_detail (book_id);

create index fk_book_has_ticket_ticket1_idx
  on ticket_detail (ticket_id);

create table user_role
(
  user_id int not null,
  role_id int not null,
  primary key (user_id, role_id),
  constraint fk_user_has_role_role1
  foreign key (role_id) references role (id),
  constraint fk_user_has_role_user1
  foreign key (user_id) references user (id)
);

create index fk_user_has_role_role1_idx
  on user_role (role_id);

create index fk_user_has_role_user1_idx
  on user_role (user_id);


