## Add a foreign key, link blogger to users:email.
use Holmes_Place;

drop table if exists tblExpense;

create table if not exists tblExpense(
   expId integer primary key auto_increment,
   expDate datetime,
   expDescription varchar(100),
   expAmount varchar(100),
   expPaymentMethod varchar(100)
)engine=innodb;
