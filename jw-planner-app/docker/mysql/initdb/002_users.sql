FLUSH PRIVILEGES;
CREATE USER IF NOT EXISTS 'jw'@'%' IDENTIFIED BY 'jw';
GRANT ALL PRIVILEGES ON jwplannerdb.* TO 'jw'@'%';

INSERT INTO `jwplannerdb`.`users`
(`username`,
 `password`,
 `enabled`)
VALUES
('admin',
'$2a$12$aL9RbwD3ZpfVOt.2le3rJ.6MxTrj5TPOW291zlTX7kEGlkEPxWnhG',
 1);

INSERT INTO `jwplannerdb`.`authorities`
(`username`, `authority`)
VALUES
('admin', 'ROLE_ADMIN');
