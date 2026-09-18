CREATE TABLE `promoWaitlist` (
	`id` int AUTO_INCREMENT NOT NULL,
	`promoId` int NOT NULL,
	`name` varchar(128) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(32),
	`vehicle` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `promoWaitlist_id` PRIMARY KEY(`id`)
);
