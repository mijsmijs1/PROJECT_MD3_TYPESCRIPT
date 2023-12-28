import { PrismaClient, ReceiptStatus } from '@prisma/client'
const prisma = new PrismaClient()
export const receiptModel = {
    addToCart: async (item: any, userId: any) => {
        try {
            let cartExisted = await prisma.receipts.findMany({
                where: {
                    status: ReceiptStatus.shopping,
                    userId: userId
                },
                include: {
                    detail: {
                        include: {
                            product: true
                        }
                    }
                }
            } as any)
            console.log('cartExisted 1222222222222222',cartExisted);
            
            //Khi user chua có receipt
            if (cartExisted.length == 0) {
                let receipt = await prisma.receipts.create({
                    data: {
                        createAt: String(Date.now()),
                        updateAt: String(Date.now()),
                        userId: userId,
                        detail: {
                            create: [
                                {
                                    productId: item.id,
                                    quantity: item.quantity
                                }
                            ]
                        }
                    },
                    include: {
                        detail: {
                            include: {
                                product: true
                            }
                        }
                    }
                }as any)
                // console.log('receipt', receipt);
                return {
                    status: true,
                    message: "add to cart ok (new cart)",
                    data: receipt
                }
            }
            else {
                // khi co gio hang
                let cart = cartExisted[0];
                console.log('cart',cart);
                let existedItem = (cart as any).detail?.find(findItem => findItem.productId === item.id)
                console.log('existedItem', existedItem);
                
                if (existedItem) {
                    await prisma.receipt_details.update({
                        where: {
                            id: existedItem.id
                        },
                        data: {
                            ...existedItem,
                            quantity: existedItem.quantity + item.quantity
                        }
                    })
                } else {
                    await prisma.receipt_details.create({
                        data: {
                            productId: item.id,
                            quantity: item.quantity,
                            receiptId: cart.id
                        }
                    })
                }
                let realCart = await prisma.receipts.findUnique({
                    where: {
                        id: cart.id
                    },
                    include: {
                        detail: {
                            include: {
                                product: true
                            }
                        }
                    }
                })
                return {
                    status: true,
                    message: "add to cart ok ( old cart updated)",
                    data: realCart
                }
            }
        } catch (err) {
            console.log('err', err);
            return {
                status: false,
                message: "add to cart failed",
                data: null
            }
        }

    }
}