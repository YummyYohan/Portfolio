// rgb.js
export function initRGBBorder({
    gradientId,
    speedInputId,
    schemeInputId,
    centerX = 900,
    centerY = 700
}) {
    const gradient = document.getElementById(gradientId);
    if (!gradient) {
        console.error("RGB gradient not found");
        return;
    }

    const stops = gradient.querySelectorAll("stop");
    const speedInput = document.getElementById(speedInputId);
    const schemeInput = document.getElementById(schemeInputId);

    let angle = 0;
    let lastTime = performance.now();

    const schemes = [
        // 0 — Cyan → Blue → Violet (clean, modern, safe default)
        [
            [90, 180, 200],
            [80, 130, 210],
            [140, 100, 220],
            [90, 180, 200]
        ],

        // 1 — Teal → Indigo (slightly warmer, elegant)
        [
            [90, 160, 170],
            [90, 120, 190],
            [150, 100, 200],
            [90, 160, 170]
        ],

        // 2 — Blue → Lavender (very polished, portfolio-friendly)
        [
            [100, 130, 210],
            [130, 120, 220],
            [180, 140, 230],
            [100, 130, 210]
        ],

        // 3 — Aqua → Soft Purple (subtle glow, not loud)
        [
            [80, 170, 190],
            [100, 140, 210],
            [170, 120, 220],
            [80, 170, 190]
        ],

        // 4 — Cool Cyan → Grey Purple (matches #654489 nicely)
        [
            [85, 165, 185],
            [105, 135, 195],
            [130, 105, 170],
            [85, 165, 185]
        ],

        // 5 — Night Blue → Muted Lilac (very calm, premium)
        [
            [70, 120, 180],
            [100, 120, 200],
            [160, 130, 210],
            [70, 120, 180]
        ],

        // 6 — Ember → Violet (burnt red, not neon)
        [
            [180, 80, 90],   // muted red
            [200, 110, 80],  // soft orange
            [160, 100, 180], // purple bridge
            [180, 80, 90]
        ],

        // 7 — Sunset → Night (orange → magenta → violet)
        [
            [200, 120, 80],  // sunset orange
            [190, 90, 120],  // rose
            [140, 90, 190],  // violet
            [200, 120, 80]
        ],

        // 8 — Crimson → Blue-Purple (strong but controlled)
        [
            [170, 70, 100],  // crimson
            [150, 90, 150],  // purple-red
            [110, 110, 200], // cool blue
            [170, 70, 100]
        ],

        // 9 — Copper → Plum (very classy, low saturation)
        [
            [180, 110, 90],  // copper
            [150, 100, 120], // dusty rose
            [120, 100, 160], // plum
            [180, 110, 90]
        ],

        // 10 — Warm Ember → Cool Indigo (best contrast)
        [
            [190, 100, 70],  // ember orange
            [160, 90, 120],  // warm purple
            [110, 100, 190], // indigo
            [190, 100, 70]
        ]

    ];



    const lerp = (a, b, t) => a + (b - a) * t;

    function mixColor(c1, c2, t) {
        return c1.map((v, i) => Math.round(lerp(v, c2[i], t)));
    }

    function updateColors() {
        const value = parseFloat(schemeInput.value);
        const base = Math.floor(value);
        const t = value - base;

        const schemeA = schemes[base];
        const schemeB = schemes[Math.min(base + 1, schemes.length - 1)];

        stops.forEach((stop, i) => {
            const rgb = mixColor(schemeA[i], schemeB[i], t);
            stop.setAttribute("stop-color", `rgb(${rgb.join(",")})`);
        });
    }

    function animate(now) {
        const delta = (now - lastTime) / 1000;
        lastTime = now;

        angle += delta * speedInput.value * 30;

        gradient.setAttribute(
            "gradientTransform",
            `rotate(${angle} ${centerX} ${centerY})`
        );

        updateColors();
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}
