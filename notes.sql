## Add a foreign key, link blogger to users:email.
use Holmes_Place;

drop table if exists notes;

create table if not exists notes(
   id integer primary key auto_increment,
   date datetime,
   user varchar(100) unique,
   email varchar(100),
   note_type varchar(100),
   content varchar(100)
)engine=innodb;