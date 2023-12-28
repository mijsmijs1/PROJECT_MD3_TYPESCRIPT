-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` CHAR(255) NOT NULL,
    `email` CHAR(255) NOT NULL,
    `password` CHAR(255) NOT NULL,
    `emailConfirm` BOOLEAN NOT NULL DEFAULT false,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `role` ENUM('member', 'admin') NOT NULL DEFAULT 'member',
    `createAt` VARCHAR(191) NOT NULL,
    `updateAt` VARCHAR(191) NOT NULL,
    `avatar` TEXT NOT NULL,

    UNIQUE INDEX `users_userName_key`(`userName`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_ip_list` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ip` CHAR(255) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `userId` INTEGER NOT NULL,
    `createAt` VARCHAR(191) NOT NULL,
    `deviceName` VARCHAR(191) NOT NULL,
    `usersId` INTEGER NULL,

    INDEX `user_ip_list_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` CHAR(255) NOT NULL,
    `provineId` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `usersId` INTEGER NULL,

    UNIQUE INDEX `address_title_key`(`title`),
    INDEX `address_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` CHAR(255) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `categories_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` CHAR(255) NOT NULL,
    `price` INTEGER NOT NULL,
    `desc` LONGTEXT NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `avatar` CHAR(255) NOT NULL,
    `categoryId` INTEGER NOT NULL,

    UNIQUE INDEX `products_name_key`(`name`),
    INDEX `products_categoryId_fkey`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pictures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` CHAR(255) NOT NULL,
    `productId` INTEGER NOT NULL,

    INDEX `pictures_productId_fkey`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `receipts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `total` INTEGER NOT NULL DEFAULT 0,
    `createAt` VARCHAR(191) NOT NULL,
    `updateAt` VARCHAR(191) NOT NULL,
    `paid` BOOLEAN NOT NULL DEFAULT false,
    `paidAt` VARCHAR(191) NULL,
    `payMethod` ENUM('zalo_pay', 'cash') NULL DEFAULT 'cash',
    `userId` INTEGER NOT NULL,
    `status` ENUM('shopping', 'pending', 'accepted', 'shipping', 'done') NOT NULL DEFAULT 'shopping',
    `pending` VARCHAR(191) NULL,
    `acceptAt` VARCHAR(191) NULL,
    `shippingAt` VARCHAR(191) NULL,
    `doneAt` VARCHAR(191) NULL,
    `usersId` INTEGER NULL,

    INDEX `receipts_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `receipt_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `receiptId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `note` VARCHAR(191) NOT NULL DEFAULT '',

    INDEX `receipt_details_productId_fkey`(`productId`),
    INDEX `receipt_details_receiptId_fkey`(`receiptId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_ip_list` ADD CONSTRAINT `user_ip_list_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pictures` ADD CONSTRAINT `pictures_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `receipts` ADD CONSTRAINT `receipts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `receipt_details` ADD CONSTRAINT `receipt_details_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `receipt_details` ADD CONSTRAINT `receipt_details_receiptId_fkey` FOREIGN KEY (`receiptId`) REFERENCES `receipts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
