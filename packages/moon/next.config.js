const domains = String(process.env.NEXT_PUBLIC_IMAGES_DOMAINS || '').split(',')
module.exports = {
    images: {
        domains,
    },
}
