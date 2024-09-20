const milkyway = require("@blazeui/theme-milkyway")

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...milkyway,
  content: [
    "./imports/ui/**/*.{js,jsx,ts,tsx,html}",
    './client/*.{js,html}',
    '.meteor/local/build/programs/web*/**/*.js',
    './node_modules/@fortawesome/fontawesome-free/css/all.css',
  ]
}
