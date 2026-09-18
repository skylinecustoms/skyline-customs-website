ALTER TABLE `promos` ADD `price` varchar(32) DEFAULT '2400' NOT NULL;--> statement-breakpoint
ALTER TABLE `promos` ADD `includedServices` text DEFAULT ('[]') NOT NULL;