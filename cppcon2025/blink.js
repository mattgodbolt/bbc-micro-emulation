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
                const originalText = child.textContent;
                child.innerText = "";
                child.style.visibility = "visible";
                for (let char of originalText) {
                    toReveal.push(() => child.textContent += char);
                }
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

export function initializeBlink() {
    Reveal.on("ready", (event) => startTyping(event.currentSlide));
    Reveal.on("slidechanged", (event) => startTyping(event.currentSlide));
}