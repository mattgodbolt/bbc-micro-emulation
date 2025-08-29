import Reveal from "./reveal.js/dist/reveal.esm.js";

let currentTimeouts = [];

function startTyping(slide) {
  currentTimeouts.forEach(t => clearTimeout(t));
  currentTimeouts = [];
  slide.querySelectorAll('.cursor').forEach(c => c.remove());
  
  const toReveal = [];
  const cursor = document.createElement("span");
  cursor.classList.add("cursor");
  
  for (let f of slide.querySelectorAll(".type-in")) {
    toReveal.push(() => {
      f.appendChild(cursor);
    });
    for (let child of f.children) {
      if (child.tagName === "SPAN") {
        // Store original text if not already stored
        let originalText;
        if (!child.dataset.originalText) {
          originalText = child.textContent;
          child.dataset.originalText = originalText;
        } else {
          originalText = child.dataset.originalText;
        }
        child.innerText = "";
        child.style.visibility = "visible";
        for (let char of originalText) {
          toReveal.push(() => (child.textContent += char));
        }
      } else if (child.tagName === "BR") {
        child.classList.add("hidden");
        toReveal.push(() => child.classList.remove("hidden"));
      }
    }
  }
  
  const next = () => {
    const toRun = toReveal.shift();
    if (!toRun) return;
    toRun();
    const timeout = setTimeout(next, 30 + 90 * Math.random());
    currentTimeouts.push(timeout);
  };
  
  const initialTimeout = setTimeout(next, 200);
  currentTimeouts.push(initialTimeout);
}

export function initializeTypingEffect() {
  Reveal.on("slidechanged", (event) => startTyping(event.currentSlide));
  Reveal.on("ready", () => {
    const currentSlide = Reveal.getCurrentSlide();
    if (currentSlide?.querySelector('.type-in')) {
      startTyping(currentSlide);
    }
  });
}