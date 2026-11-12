const WWR_NAMES = [
  // Gaming and dev flavored
  "Wii Wheel Racing",
  "Warp Zone Rewind",
  "Wacky Wii Remakes",
  "Wireframe, Write, Repeat",
  "Whatever Works, Ruins",
  "Wasteland Warriors Reloaded",
  "Wandering Wizard RPG",
  "Wrong Way Respawn",
  "Wireless Wii Remote",
  "Windows Won't Run",
  "Well, Whoops, Recompile",
  "Welcome Wanderer, Reboot",
  "World Without Rules",
  "Warp Whistle Required",
  "Wumpus Wrangling Revisited",

  // Silly
  "Wombats Wearing Raincoats",
  "Wobbly Waffle Robot",
  "Wizards Who Rollerblade",
  "Weasel Wrestling Radio",
  "Whisk Wisely, Rookie",
  "Walrus With Reservations",
  "Wandering Wi-Fi Router",
  "Why Would Ross?",
  "Wet Wool Reunion",
  "Wiggly Worm Rodeo",
  "Wizard Wardrobe Rental",
  "Waffle Wizard Reborn",
  "Whales Without Radios",
  "Wacky Wombat Racing",
  "Wandering Walnut Rescue",
  "Whispering Wind Records",
  "Wrinkly Wizard Robes",
  "Wolves Waiting Respectfully",
  "Woodchucks Who Research",
  "Weird Wednesday Radio",
  "Wheelbarrow Wizard Ranch",
  "Waddling Walrus Rally",
  "Worms With Résumés",
  "Waffles, Waffles, Repeat",
  "Wise Walrus Recommends",
  "Wobbling Wheel Repair",
  "Wild Waffle Rampage",
  "Windy Weather Report",
  "Whoever Wrote Reddit",
  "Wizards Wanted, Remote",

  // Deadpan official-sounding
  "Weekly Wonders Registry",
  "Wide-Ranging Wastebasket Review",
  "Wholly Weird Records",
  "Wildly Wasteful Redundancy",
  "Widely Whispered Rumors",
  "Warranty Waived, Regrettably",
  "Whereabouts Withheld, Respectfully",
  "Waiting Room Revival",
  "Wholesale Wire Rope",
  "Wrongly Worded Request",
  "Wasted Weekend Report",
  "Wherever, Whenever, Really",
  "Wait, What? Really?",
  "Who Wrote This, Roger?",
];

// ---- Logic: pick one on each page load ----
const target = document.getElementById("wwr-expansion");

if (target && WWR_NAMES.length > 0) {
  const lastIndex = Number(sessionStorage.getItem("wwrLast"));
  let index;

  // Never show the same one twice in a row
  do {
    index = Math.floor(Math.random() * WWR_NAMES.length);
  } while (index === lastIndex && WWR_NAMES.length > 1);

  sessionStorage.setItem("wwrLast", index);
  target.textContent = WWR_NAMES[index];
}