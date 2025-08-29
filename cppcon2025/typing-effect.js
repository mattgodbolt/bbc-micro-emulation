/*!
 * reveal.js Typing Effect plugin
 */
let currentTimeouts = [];

const Plugin = {

  id: 'typing-effect',

  init: function(reveal) {
    
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

    // Register event handlers
    reveal.on("slidechanged", (event) => {
      // Only run typing effect on actual slide navigation, not initial page load
      if (event.previousSlide) {
        startTyping(event.currentSlide);
      }
    });

  },

  destroy: () => {
    // Clean up any remaining timeouts
    currentTimeouts.forEach(t => clearTimeout(t));
    currentTimeouts = [];
  }

};

export default () => Plugin;