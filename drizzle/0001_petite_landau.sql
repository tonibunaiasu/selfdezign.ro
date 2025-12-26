CREATE TABLE `blogPosts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`title` varchar(500) NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`author` varchar(255) NOT NULL,
	`image` varchar(500),
	`tags` text,
	`faqs` text,
	`isPublished` enum('true','false') NOT NULL DEFAULT 'false',
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blogPosts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blogPosts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `subscribers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(255),
	`isActive` enum('true','false') NOT NULL DEFAULT 'true',
	`subscribedAt` timestamp NOT NULL DEFAULT (now()),
	`unsubscribedAt` timestamp,
	CONSTRAINT `subscribers_id` PRIMARY KEY(`id`),
	CONSTRAINT `subscribers_email_unique` UNIQUE(`email`)
);
