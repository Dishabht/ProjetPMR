USE pmove;

CREATE TABLE IF NOT EXISTS agent (
  ID_Agent int DEFAULT NULL,
  name varchar(50) DEFAULT NULL,
  surname varchar(50) DEFAULT NULL,
  password varchar(50) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS Agent LIKE agent;

INSERT IGNORE INTO agent (ID_Agent, name, surname, password) VALUES
(999, 'agenttest', 'Test', 'password123'),
(1, 'agent1', 'Test', 'password123');

INSERT IGNORE INTO Agent (ID_Agent, name, surname, password)
SELECT ID_Agent, name, surname, password FROM agent;
