## Add a foreign key, link blogger to users:email.
use Holmes_Place;

drop table if exists tblBlog;

create table if not exists tblBlog(
   blogId integer primary key auto_increment,
   blogDate datetime,
   blogger varchar(100) unique,
   topic varchar(100),
   blog_type varchar(100),
   content varchar(100)
)engine=innodb;