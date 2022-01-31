import { PrismaClient, Prisma } from '@prisma/client'
import * as cuid from 'cuid'

const prisma = new PrismaClient()

async function main() {
    console.log(`Start seeding ...`)

    // ;(await prisma.file.findMany({})).forEach(async (file) => {
    //     await prisma.file.update({
    //         where: {
    //             url: file.url,
    //         },
    //         data: {
    //             id: cuid(),
    //             meta: {
    //                 // @ts-ignore
    //                 ...(file && file.meta ? file.meta : {}),
    //                 fileName: file.url.split('/')[
    //                     file.url.split('/').length - 1
    //                 ],
    //                 contentType:
    //                     file.fileType === 'documents'
    //                         ? 'documents/pdf'
    //                         : 'image/jpeg',
    //             },
    //         },
    //     })
    // })

    // ;(await prisma.category.findMany({})).forEach(async (item) => {
    //     await prisma.category.update({
    //         where: {
    //             label: item.label,
    //         },
    //         data: {
    //             id: cuid(),
    //         },
    //     })
    // })

    // ;;(await prisma.tag.findMany({})).forEach(async (item) => {
    //     await prisma.tag.update({
    //         where: {
    //             label: item.label,
    //         },
    //         data: {
    //             id: cuid(),
    //         },
    //     })
    // })

    // ;;;(await prisma.cartItem.findMany({})).forEach(async (item) => {
    //     await prisma.cartItem.update({
    //         where: {
    //             productId_cartId: {
    //                 cartId: item.cartId,
    //                 productId: item.productId,
    //             },
    //         },
    //         data: {
    //             id: cuid(),
    //         },
    //     })
    // })
    // ;;(await prisma.offer.findMany({})).forEach(async (item) => {
    //     await prisma.offer.update({
    //         where: {
    //             label: item.label,
    //         },
    //         data: {
    //             id: cuid(),
    //         },
    //     })
    // })
    // ;(await prisma.company.findMany({})).forEach(async (item) => {
    //     await prisma.company.update({
    //         where: {
    //             name: item.name,
    //         },
    //         data: {
    //             id: cuid(),
    //         },
    //     })
    // })
    // ;(await prisma.cartItem.findMany({})).forEach(async (item) => {
    //     await prisma.cartItem.update({
    //         where: {
    //             productId_cartId: {
    //                 cartId: item.cartId,
    //                 productId: item.productId,
    //             },
    //         },
    //         data: {
    //             id: cuid(),
    //         },
    //     })
    // })

    // console.log(`Seeding finished.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
