DROP TABLE IF EXISTS Friends;

CREATE TABLE FRIENDS
(
    Fname VARCHAR(255) Primary KEY,
    Email VARCHAR(255) NOT NULL
);

INSERT INTO FRIENDS VALUES('Ross M', 'rostislav.martsenyak@gmail.com');
INSERT INTO FRIENDS VALUES('Mercedes C', 'mcdes@gmail.com');
INSERT INTO FRIENDS VALUES('Ilya B','illb@gmail.com');
INSERT INTO FRIENDS VALUES('Roman K', 'romanthedestroyer@gmail.com');
INSERT INTO FRIENDS VALUES('Varik G', 'varikgrader@gmail.com');