ALTER TABLE `promos` ADD `archivedSlug` varchar(128);--> statement-breakpoint
ALTER TABLE `promos` ADD `isArchived` int DEFAULT 0 NOT NULL;