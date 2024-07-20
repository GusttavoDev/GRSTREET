-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" INTEGER NOT NULL,
    "profile_img" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "cep" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "payment_method" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductPurchase" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "sub_category" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ProductPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PurchaseToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductPurchaseToPurchase" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_PurchaseToUser_AB_unique" ON "_PurchaseToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PurchaseToUser_B_index" ON "_PurchaseToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductPurchaseToPurchase_AB_unique" ON "_ProductPurchaseToPurchase"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductPurchaseToPurchase_B_index" ON "_ProductPurchaseToPurchase"("B");

-- AddForeignKey
ALTER TABLE "_PurchaseToUser" ADD CONSTRAINT "_PurchaseToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PurchaseToUser" ADD CONSTRAINT "_PurchaseToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductPurchaseToPurchase" ADD CONSTRAINT "_ProductPurchaseToPurchase_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductPurchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductPurchaseToPurchase" ADD CONSTRAINT "_ProductPurchaseToPurchase_B_fkey" FOREIGN KEY ("B") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
