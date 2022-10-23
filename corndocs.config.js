const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: true,
  googleAnalytics: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY,
  project: {
    name: "ShastraOS",
    url: "https://www.shastraos.co",
    github: {
      repo: "https://github.com/shastra-os/",
      usesMain: false,
    },
  },
  color: colors.violet,
};
