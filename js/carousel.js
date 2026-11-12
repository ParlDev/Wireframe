console.log("carousel.js loaded");

const track = document.getElementById("carousel-track");
const viewport = track.parentElement;
const dotsBox = document.getElementById("carousel-dots");

const AUTOPLAY_MS = 5000;   // time between slides; set to 0 to turn autoplay off

const originals = Array.from(track.children);
const count = originals.length;

// --- Looping trick: put a copy of all slides before and after the real ones.
// When you reach a copy, we silently jump back to the real slide.
function makeClone(slide) {
  const clone = slide.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  clone.querySelector("a").tabIndex = -1;
  return clone;
}
originals.forEach((s) => track.appendChild(makeClone(s)));
originals.slice().reverse().forEach((s) => track.prepend(makeClone(s)));

let position = count;       // index in the full list; "count" = first real slide

// --- Dots
const dots = originals.map((_, i) => {
  const dot = document.createElement("button");
  dot.className = "dot";
  dot.type = "button";
  dot.setAttribute("role", "tab");
  dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
  dot.addEventListener("click", () => goTo(count + i));
  dotsBox.appendChild(dot);
  return dot;
});

// --- Move the track so the current slide is centered
function update(animate = true) {
  const slides = Array.from(track.children);
  const slide = slides[position];
  const offset = (viewport.clientWidth - slide.offsetWidth) / 2 - slide.offsetLeft;

  track.style.transition = animate ? "" : "none";
  track.style.transform = `translateX(${offset}px)`;

  slides.forEach((s, i) => s.classList.toggle("is-active", i === position));

  const activeDot = (position - count + count * 2) % count;
  dots.forEach((d, i) => d.setAttribute("aria-selected", i === activeDot));
}

function goTo(index) {
  position = index;
  update(true);
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    jumpBackIfOnClone();
  }
}

// After sliding onto a copy, jump (with no animation) to the matching real slide
function jumpBackIfOnClone() {
  if (position >= count * 2) position -= count;
  else if (position < count) position += count;
  else return;
  update(false);
  track.offsetWidth;        // forces the browser to apply the jump before animating again
}

track.addEventListener("transitionend", (e) => {
  if (e.target === track) jumpBackIfOnClone();
});

// Clicking a side slide centers it instead of opening its link
track.addEventListener("click", (e) => {
  const slide = e.target.closest(".slide");
  if (slide && !slide.classList.contains("is-active")) {
    e.preventDefault();
    goTo(Array.from(track.children).indexOf(slide));
  }
});

window.addEventListener("resize", () => update(false));

// --- Autoplay (pauses while the mouse is over the carousel)
let timer;
function startAutoplay() {
  if (!AUTOPLAY_MS) return;
  stopAutoplay();
  timer = setInterval(() => goTo(position + 1), AUTOPLAY_MS);
}
function stopAutoplay() {
  clearInterval(timer);
}
viewport.addEventListener("mouseenter", stopAutoplay);
viewport.addEventListener("mouseleave", startAutoplay);
dotsBox.addEventListener("mouseenter", stopAutoplay);
dotsBox.addEventListener("mouseleave", startAutoplay);

update(false);
startAutoplay();