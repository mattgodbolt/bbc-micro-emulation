(() => {
    setInterval(() => {
        for (let cursor of document.querySelectorAll("span.cursor")) {
            cursor.classList.toggle("blink");
        }
    }, 600);

    function startTyping(event) {
        const toReveal = [];
        const cursor = document.createElement("span");
        cursor.classList.add("cursor");
        for (let f of event.querySelectorAll(".type-in")) {
            toReveal.push(() => {
                f.appendChild(cursor);
            });
            for (let child of f.children) {
                if (child.tagName === "SPAN") {
                    for (let char of child.textContent) {
                        toReveal.push(() => child.textContent += char);
                    }
                    child.innerText = "";
                } else if (child.tagName === "BR") {
                    child.classList.add("hidden");
                    toReveal.push(() => child.classList.remove("hidden"));
                }
            }
        }
        const next = () => {
            if (!toReveal.length) return;
            toReveal[0]();
            toReveal.shift();
            setTimeout(next, 50 + 120 * Math.random());
        };
        setTimeout(next, 200);
    }

    // Export for ES module compatibility
    export function initializeBlink() {
        Reveal.on("slidechanged", (event) => startTyping(event.currentSlide));
    }

    Reveal.on("slidechanged", (event) => startTyping(event.currentSlide));
})();