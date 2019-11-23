CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(24) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` (`id`, `name`, `email`, `phone`) VALUES
(1, 'Jazz Doe', 'jazz@doe.com', '56973317'),
(2, 'Jane Doe', 'jane@doe.com', '40378541'),
(3, 'Rusty Terry', 'rusty@terry.com', '34614899'),
(4, 'Peers Sera', 'peers@sera.com', '13014383'),
(5, 'Jaslyn Keely', 'jaslyn@keely.com', '52154191'),
(6, 'Richard Breann', 'richard@breann.com', '58765281'),
(7, 'Imogene Thad', 'imogene@thad.com', '11753471'),
(8, 'Tillie Sharalyn', 'tillie@sharalyn.com', '33989432'),
(9, 'Drake Adelaide', 'drake@adelaide.com', '56539890'),
(10, 'Coby Kelleigh', 'coby@kelleigh.com', '83788228'),
(11, 'Frank Doe', 'frank@doe.com', '87074336'),
(12, 'John Doe', 'john@doe.com', '55163490'),
(13, 'Jan Doe', 'jan@doe.com', '45310572'),
(14, 'Joe Doe', 'joe@doe.com', '48938630'),
(15, 'Joanne Doe', 'joanne@doe.com', '44101677'),
(16, 'Johan Doe', 'johan@doe.com', '28278966'),
(17, 'Charles Doe', 'charles@doe.com', '45800899'),
(18, 'Charlie Doe', 'charlie@doe.com', '32644564'),
(19, 'Apple Doe', 'apple@doe.com', '76438908'),
(20, 'Orange Doe', 'orange@doe.com', '47648224');

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `name` (`name`);

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;