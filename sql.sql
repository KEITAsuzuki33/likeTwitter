| tweet | CREATE TABLE `tweet` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `tweet` text,
  `created_time` datetime NOT NULL,
  `tweet_id` int(11) NOT NULL,
  KEY `id` (`user_id`),
  CONSTRAINT `tweet_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |

| user  | CREATE TABLE `user` (
  `name` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 |

| follow | CREATE TABLE `follow` (
  `follow_user_id` int(11) DEFAULT NULL,
  `followed_user_id` int(11) DEFAULT NULL,
  UNIQUE KEY `follow_user_id` (`follow_user_id`,`followed_user_id`),
  KEY `followed_user_id` (`followed_user_id`),
  CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`follow_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`followed_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
