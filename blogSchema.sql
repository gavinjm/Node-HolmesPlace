## Add a foreign key, link blogger to users:email.
use Holmes_Place;

drop table if exists tblBlog;

create table if not exists tblBlog(
   blId integer primary key auto_increment,
   blDate datetime,
   blUser varchar(100) unique,
   blTopic varchar(100),
   blType varchar(100),
   blContent varchar(100)
)engine=innodb;
