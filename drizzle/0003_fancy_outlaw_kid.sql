CREATE TABLE `galleryPhotos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`photoUrl` text NOT NULL,
	`alt` text NOT NULL,
	`category` varchar(64) NOT NULL DEFAULT 'PPF',
	`carDescription` text,
	`sortOrder` int NOT NULL DEFAULT 0,
	`active` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `galleryPhotos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `siteSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(128) NOT NULL,
	`value` text NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `siteSettings_id` PRIMARY KEY(`id`),
	CONSTRAINT `siteSettings_key_unique` UNIQUE(`key`)
);
