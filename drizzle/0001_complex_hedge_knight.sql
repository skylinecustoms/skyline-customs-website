CREATE TABLE `blogPosts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`title` text NOT NULL,
	`excerpt` text NOT NULL,
	`date` varchar(64) NOT NULL,
	`readTime` varchar(32) NOT NULL,
	`category` varchar(128) NOT NULL,
	`heroImage` text NOT NULL,
	`heroImageAlt` text NOT NULL,
	`content` text NOT NULL,
	`status` enum('published','draft') NOT NULL DEFAULT 'published',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blogPosts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blogPosts_slug_unique` UNIQUE(`slug`)
);
