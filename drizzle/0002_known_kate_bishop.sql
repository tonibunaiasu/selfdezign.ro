CREATE TABLE `aboutContent` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(500),
	`description` text,
	`image` varchar(500),
	`language` varchar(10) NOT NULL DEFAULT 'ro',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `aboutContent_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contactContent` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(500),
	`description` text,
	`email` varchar(320),
	`phone` varchar(20),
	`address1` text,
	`address2` text,
	`language` varchar(10) NOT NULL DEFAULT 'ro',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contactContent_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contentHistory` (
	`id` int AUTO_INCREMENT NOT NULL,
	`page` varchar(255) NOT NULL,
	`contentType` varchar(255) NOT NULL,
	`contentId` int,
	`previousData` text,
	`newData` text,
	`changedBy` int,
	`changeDescription` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contentHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `footerContent` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyName` varchar(255),
	`companyDescription` text,
	`email` varchar(320),
	`phone` varchar(20),
	`address` text,
	`socialFacebook` varchar(500),
	`socialInstagram` varchar(500),
	`socialLinkedin` varchar(500),
	`language` varchar(10) NOT NULL DEFAULT 'ro',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `footerContent_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `homeContent` (
	`id` int AUTO_INCREMENT NOT NULL,
	`heroTitle` text,
	`heroSubtitle` text,
	`heroImage` varchar(500),
	`featuredProjectId` varchar(255),
	`testimonialsSectionTitle` varchar(500),
	`language` varchar(10) NOT NULL DEFAULT 'ro',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `homeContent_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `seoMetadata` (
	`id` int AUTO_INCREMENT NOT NULL,
	`page` varchar(255) NOT NULL,
	`title` varchar(500),
	`description` text,
	`keywords` text,
	`ogImage` varchar(500),
	`language` varchar(10) NOT NULL DEFAULT 'ro',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `seoMetadata_id` PRIMARY KEY(`id`),
	CONSTRAINT `seoMetadata_page_unique` UNIQUE(`page`)
);
--> statement-breakpoint
CREATE TABLE `teamMembers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`role` varchar(255),
	`description` text,
	`image` varchar(500),
	`email` varchar(320),
	`phone` varchar(20),
	`order` int DEFAULT 0,
	`language` varchar(10) NOT NULL DEFAULT 'ro',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `teamMembers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `valuesContent` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(500),
	`description` text,
	`language` varchar(10) NOT NULL DEFAULT 'ro',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `valuesContent_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `visionContent` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(500),
	`description` text,
	`language` varchar(10) NOT NULL DEFAULT 'ro',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `visionContent_id` PRIMARY KEY(`id`)
);
