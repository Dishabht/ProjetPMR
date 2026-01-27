-- Compte de test pour connexion ClientMobileClean
-- mail: client.test@pmove.fr / mdp: client123
USE pmove;

INSERT INTO `client` (
  `name`,
  `surname`,
  `num`,
  `mail`,
  `handicap`,
  `civilite`,
  `birth`,
  `password`,
  `contact_mail`,
  `contact_num`,
  `note`
) VALUES (
  'Client',
  'Test',
  751033970,
  'client.test@pmove.fr',
  5,
  2,
  '2005-12-10',
  'client123',
  'client.test@pmove.fr',
  612545539,
  'Compte de test'
);
