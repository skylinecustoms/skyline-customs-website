CREATE TABLE `promoSlots` (
	`id` int AUTO_INCREMENT NOT NULL,
	`promoId` int NOT NULL,
	`slotNumber` int NOT NULL,
	`customerName` varchar(128) NOT NULL,
	`carDescription` text NOT NULL,
	`photoUrl` text,
	`completedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `promoSlots_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `promos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(128) NOT NULL,
	`title` text NOT NULL,
	`tagline` text NOT NULL,
	`dealDescription` text NOT NULL,
	`totalSlots` int NOT NULL DEFAULT 21,
	`startDate` varchar(32) NOT NULL,
	`endDate` varchar(32) NOT NULL,
	`active` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `promos_id` PRIMARY KEY(`id`),
	CONSTRAINT `promos_slug_unique` UNIQUE(`slug`)
);
