CREATE TABLE `blogPageContent` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(500),
	`description` text,
	`image` varchar(500),
	`language` varchar(10) NOT NULL DEFAULT 'ro',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blogPageContent_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mediaItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(500) NOT NULL,
	`description` text,
	`image` varchar(500),
	`link` varchar(500),
	`type` varchar(50),
	`order` int DEFAULT 0,
	`language` varchar(10) NOT NULL DEFAULT 'ro',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `mediaItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mediaPageContent` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(500),
	`description` text,
	`image` varchar(500),
	`language` varchar(10) NOT NULL DEFAULT 'ro',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `mediaPageContent_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`title` varchar(500) NOT NULL,
	`description` text,
	`content` text,
	`image` varchar(500),
	`category` varchar(255),
	`order` int DEFAULT 0,
	`language` varchar(10) NOT NULL DEFAULT 'ro',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`),
	CONSTRAINT `projects_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `projectsPageContent` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(500),
	`description` text,
	`image` varchar(500),
	`language` varchar(10) NOT NULL DEFAULT 'ro',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projectsPageContent_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `teamPageContent` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(500),
	`description` text,
	`image` varchar(500),
	`language` varchar(10) NOT NULL DEFAULT 'ro',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `teamPageContent_id` PRIMARY KEY(`id`)
);
