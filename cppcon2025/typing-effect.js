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
        const originalText = child.dataset.originalText || child.textContent;
        if (!child.dataset.originalText) child.dataset.originalText = originalText;
        child.innerText = "";
        child.style.visibility = "visible";
        toReveal.push(() => {
          child.appendChild(cursor);
        });
        
        for (let char of originalText) {
          toReveal.push(() => {
            if (child.firstChild && child.firstChild.nodeType === Node.TEXT_NODE) {
              child.firstChild.textContent += char;
            } else {
              child.insertBefore(document.createTextNode(char), child.firstChild);
            }
          });
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
    currentTimeouts.push(setTimeout(next, 30 + 90 * Math.random()));
  };
  
  currentTimeouts.push(setTimeout(next, 200));
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