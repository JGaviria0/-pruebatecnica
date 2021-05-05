CREAT DATABASE databaseTasks;

USE DATABASE databaseTasks;

CREATE TABLE tasks(
    id INT(11) NOT NULL,
    title VARCHAR(100) NOT NULL,
    priorityLevel INT(5) NOT NULL,
    hashtag VARCHAR(20) NOT NULL,
    personInCharge VARCHAR(100) NOT NULL,
    createdAt timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE tasks
  ADD PRIMARY KEY (id);

ALTER TABLE tasks
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

ALTER TABLE tasks
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

ALTER TABLE tasks 
  ADD finalizada int(2) NOT NULL DEFAULT 1 ;
