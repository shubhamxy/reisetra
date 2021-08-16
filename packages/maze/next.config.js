const removeImports = require("next-remove-imports")();
const domains = String(process.env.NEXT_PUBLIC_IMAGES_DOMAINS || "").split(",");

module.exports = removeImports({
    experimental: { esmExternals: true },
    images: {
        domains,
    },
});
