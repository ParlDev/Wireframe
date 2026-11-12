const LOGO_FOLDER = "/images/Logo/";

const seasonalLogos = {
  9: "logo_Halloween.png",    // October
  11: "logo_Christmas.png",   // December
};

// Set to a month number (0-11) to test, or leave as null to use today's date
const TEST_MONTH = null;

const month = TEST_MONTH ?? new Date().getMonth();
const file = seasonalLogos[month];

if (file) {
  const logo = document.querySelector(".brand-logo");
  if (logo) logo.src = LOGO_FOLDER + file;
}