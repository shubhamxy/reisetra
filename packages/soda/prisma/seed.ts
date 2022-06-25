import { PrismaClient } from '@prisma/client'

// import countries_json = require('../../../../../Downloads/countries.json')
// import states_json = require('../../../../../Downloads/states.json')
// import cities_json = require('../../../../../Downloads/cities.json')
const db = new PrismaClient()

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

  // await db.country.createMany({
  //   data: countries_json.map((item) => ({
  //     code: item.iso2,
  //     name: item.name,
  //     currency: item.currency_name,
  //     currencySymbol: item.currency_symbol,
  //     emoji: item.emojiU,
  //   })),
  // })

  // await db.state.createMany({
  //   data: await Promise.all(
  //     states_json.map(async (item) => {
  //       return {
  //         name: item.name,
  //         code: item.country_code + '_' + item.state_code,
  //         countryCode: item.country_code,
  //         type: item.type,
  //       }
  //     })
  //   ),
  // })
  //
  //   cities_json.filter((item) => item.country_code === 'IN')
  //     .map(async (item) => {
  //       try {
  //         await db.locality.create({
  //           data: {
  //             name: item.name,
  //             code:
  //               (item.country_code || '00') +
  //               '_' +
  //               (item.state_code || '00') +
  //               '_' +
  //               item.id,
  //             stateCode: item.country_code + '_' + item.state_code,
  //             countryCode: item.country_code,
  //             type: null,
  //           },
  //         })
  //       } catch (err) {
  //         console.log(err, item)
  //         throw err
  //       }
  //     })

  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
