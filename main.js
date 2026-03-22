let ytPlayer;
let ytPlayerReady = false;
let pendingVideoId = null;

function initYTPlayer() {
    if (ytPlayer) return; // Prevent double init
    ytPlayer = new YT.Player('ytplayer', {
        height: '240',
        width: '320',
        videoId: '',
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'disablekb': 1,
            'fs': 0,
            'rel': 0,
            'modestbranding': 1,
            'playsinline': 1
        },
        events: {
            'onReady': function (event) {
                ytPlayerReady = true;
                if (pendingVideoId) {
                    ytPlayer.loadVideoById(pendingVideoId);
                    ytPlayer.playVideo();
                    pendingVideoId = null;
                }
            },
            'onStateChange': function (event) {
                if (event.data === YT.PlayerState.ENDED) {
                    ytPlayer.seekTo(0);
                    ytPlayer.playVideo();
                }
            },
            'onError': function (event) {
                // If the selected YouTube video has embedding disabled (Error 101/150)
                console.log("YouTube API Error:", event.data);
                const bg = document.getElementById('bg-music');
                bg.src = "https://cdn.pixabay.com/download/audio/2022/10/25/audio_2471fd6a95.mp3";
                bg.play().catch(e => console.log(e));
            }
        }
    });
}

window.onYouTubeIframeAPIReady = function () {
    initYTPlayer();
};

if (typeof YT !== 'undefined' && YT && YT.Player) {
    initYTPlayer();
}

class MessageGenerator {
    static getGreetings(name) {
        return [
            `Para la increíble ${name},`,
            `Mi querida ${name},`,
            `Hola ${name},`,
            `${name}, quería decirte que...`,
            `Especialmente para ti, ${name},`
        ];
    }

    static getOpeners() {
        return [
            "estas flores amarillas son un recuerdo de",
            "hoy te regalo este detalle para celebrar",
            "quería darte esta sorpresa porque admiro",
            "espero que este pequeño detalle te recuerde",
            "te dedico este momento mágico para agradecer"
        ];
    }

    static getCoreMessages() {
        return [
            "la luz que traes a la vida de los que te rodean.",
            "lo especial e incondicional que es nuestra relación.",
            "tu alegría que siempre logra contagiarme todos los días.",
            "lo mucho que vales y la bondad genuina de tu corazón.",
            "tu fuerza, tu sonrisa y la magia que llevas por dentro."
        ];
    }

    static getClosings() {
        return [
            "¡Feliz día de las flores amarillas!",
            "Nunca dejes de brillar así de hermoso.",
            "¡Que tengas un día tan espectacular como tú!",
            "Con muchísimo cariño, de mi parte.",
            "Guarda siempre esta sonrisa."
        ];
    }

    static getRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    static generate(name) {
        const greeting = this.getRandom(this.getGreetings(name));
        const opener = this.getRandom(this.getOpeners());
        const core = this.getRandom(this.getCoreMessages());
        const closing = this.getRandom(this.getClosings());

        // Remove greeting from being part of the body to fit cleanly on the card (since the title already says "Para ti, Nombre")
        // But the user likes custom text. Let's just generate the main body.
        return `${opener} ${core} ${closing}`;
    }
}

const specificFriends = {
    "danna": { msg: "What's up bro, Feliz Dia da Flor Amarela, Manigga", song: "https://youtu.be/ALRxqOpMewE?si=zRLbh8wxO8Izh30V" },
    "victoria": { msg: "Un dia de estos me acuerda de visitar panamá, la buena jajs", song: "https://youtu.be/XWX_j3b9ZeE?si=MCr_2Rf3pnmgYnRW" },
    "luna": { msg: "Un dia de estos me acuerda de visitar panamá, la buena jajs", song: "https://youtu.be/XWX_j3b9ZeE?si=MCr_2Rf3pnmgYnRW" },
    "erika": { msg: "Quiubo angela, Feliz dia de las flores amarillas, dele gracias a Antigravity por esto jajaj", song: "https://www.youtube.com/watch?v=ow083mzYweE" },
    "akire": { msg: "Quiubo angela, Feliz dia de las flores amarillas, dele gracias a Antigravity por esto jajaj", song: "https://www.youtube.com/watch?v=ow083mzYweE" },
    "aleja": { msg: "Quiubo angela, Feliz dia de las flores amarillas, dele gracias a Antigravity por esto jajaj", song: "https://www.youtube.com/watch?v=ow083mzYweE" },
    "pluton": { msg: "Quiubo angela, Feliz dia de las flores amarillas, dele gracias a Antigravity por esto jajaj", song: "https://www.youtube.com/watch?v=ow083mzYweE" },
    "adriana": { msg: "Adriana, Feliz dia para sumerce mi Ingeniera, muchos éxitos para lo que venga.", song: "https://www.youtube.com/watch?v=81WhM9dOcYI" },
    "maria jose": { msg: "Hola majo, Me avisa para jugar mario kart, mientras disfrute", song: "https://youtu.be/t6YNGmcbqUY?si=o0LjZzhpNMRbVCiq" },
    "majo": { msg: "Hola majo, Me avisa para jugar mario kart, mientras disfrute", song: "https://youtu.be/t6YNGmcbqUY?si=o0LjZzhpNMRbVCiq" },
    "valentina": { msg: "Hola valen, cuando tenga un control jugamos al hollow, mientras le regalo esas flores jajaj estan cheveres no?", song: "https://www.youtube.com/watch?v=cGsAfhE0iYY" },
    "monica": { msg: "Quiubo monica, feliz dia de la flor amarilla o algo asi, igual disfrute de la animación", song: "https://www.youtube.com/watch?v=yADhwRnnGKA" },
    "negra": { msg: "Quiubo negra, feliz dia de la flor amarilla o algo asi, igual disfrute de la animación", song: "https://www.youtube.com/watch?v=yADhwRnnGKA" },
    "juliet": { msg: "HOLAAAAAAAAAAA buenos dias, feliz dia de las flores amarillas aaaaaaaaa", song: "https://youtu.be/rVJ5Io57UBk?si=qQSZSgz11U0jP1ww" },
    "juli": { msg: "HOLAAAAAAAAAAA buenos dias, feliz dia de las flores amarillas aaaaaaaaa", song: "https://youtu.be/rVJ5Io57UBk?si=qQSZSgz11U0jP1ww" },
    "dayana": { msg: "HOLAAAAAAAAAAA buenos dias, feliz dia de las flores amarillas aaaaaaaaa", song: "https://youtu.be/rVJ5Io57UBk?si=qQSZSgz11U0jP1ww" },
    "karen": { msg: "Hola amiga, feliz dia de las flores amarillas, con mi mas sincero agradecimiento le muestro este fondo tan bacano para que lo disfrute amiga", song: "https://www.youtube.com/watch?v=S7gMzYqXIZc" },
    "katherine": { msg: "Hola Kathe, feliz dia de las flores amarillas jajsj", song: "https://www.youtube.com/watch?v=S7gMzYqXIZc" },
    "kathe": { msg: "Hola Kathe, feliz dia de las flores amarillas jajsj", song: "https://www.youtube.com/watch?v=S7gMzYqXIZc" },
    "Mama kathe": { msg: "Hola Kathe, feliz dia de las flores amarillas jajsj", song: "https://www.youtube.com/watch?v=S7gMzYqXIZc" },
    "yelitza": { msg: "Buenas buenas yelitza, como se encuentra el dia de hoy? espero que bien, aqui un detalle pa uste", song: "https://youtu.be/Fkw4OleMP6s?si=11jQhBsAWkYB5cOm" },
    "dimas": { msg: "Hola peruviano, cuando unas retas en el umamusume mi causamigo", song: "https://youtu.be/8sp8DRXgh8c?si=NNoHp6VJ6dsu8JNd" },
    "angie": { msg: "buenas Angie, gracias por su alegría de siempre, se merece lo mejor 🙏🙏🙏", song: "https://www.youtube.com/watch?v=nfmdbKeSh7I" },
    "gina": { msg: "Ginaaa, gracias por su alegría de siempre, se merece lo mejor 🙏🙏🙏", song: "https://www.youtube.com/watch?v=nfmdbKeSh7I" }
};

const maleBrosNames = ["uri", "jaider", "luis", "sebastian", "benja", "solano", "jesus", "german", "anderson", "Miguel", "Camilo", "mapache", "daniel", "omar", "carlos", "sergio", "checho", "victor", "stiven", "steven"];

// ...

document.addEventListener("DOMContentLoaded", () => {
    const landingScreen = document.getElementById("landing-screen");
    const giftScreen = document.getElementById("gift-screen");
    const nameInput = document.getElementById("name-input");
    const revealBtn = document.getElementById("reveal-btn");
    const errorMsg = document.getElementById("error-message");

    const friendNameEl = document.getElementById("friend-name");
    const customMessageEl = document.getElementById("custom-message");
    const bgMusic = document.getElementById("bg-music");

    // Enter key support
    nameInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            revealBtn.click();
        }
    });

    revealBtn.addEventListener("click", () => {
        const name = nameInput.value.trim();
        if (name === "") {
            errorMsg.classList.remove("hidden");
            return;
        }
        errorMsg.classList.add("hidden");

        let finalMessage = "";
        let finalSong = "https://www.youtube.com/watch?v=S7gMzYqXIZc";
        let isBro = false;

        const originalNormalized = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const normalizedKey = originalNormalized.replace(/\s+/g, "");

        if (maleBrosNames.some(bro => new RegExp(`\\b${bro}\\b`).test(originalNormalized))) {
            isBro = true;
            finalMessage = "Papi, feliz dia de las flores amarillas para usted mi rey, que me le vaya bien y cuidese ese cuerpo, lo tqm";
            finalSong = "https://www.youtube.com/watch?v=loduYZcFRtE"; // Some bro/funny default acoustic song
        } else {
            // Find specific female
            let foundSpecific = false;
            for (const key in specificFriends) {
                if (normalizedKey.includes(key)) {
                    finalMessage = specificFriends[key].msg;
                    finalSong = specificFriends[key].song;
                    foundSpecific = true;
                    break;
                }
            }
            if (!foundSpecific) {
                finalMessage = MessageGenerator.generate(name);
            }
        }

        friendNameEl.textContent = name;
        customMessageEl.textContent = finalMessage;

        const isYouTube = finalSong.includes('youtube.com') || finalSong.includes('youtu.be');

        if (isYouTube) {
            bgMusic.pause();
            let videoId = null;
            if (finalSong.includes('v=')) {
                videoId = finalSong.split('v=')[1].split('&')[0];
            } else if (finalSong.includes('youtu.be/')) {
                videoId = finalSong.split('youtu.be/')[1].split('?')[0];
            }
            if (ytPlayerReady && typeof ytPlayer.loadVideoById === 'function') {
                ytPlayer.loadVideoById(videoId);
                ytPlayer.playVideo();
            } else {
                // If API hasn't loaded or isn't ready yet, queue it.
                pendingVideoId = videoId;
            }
        } else {
            if (ytPlayer && typeof ytPlayer.stopVideo === 'function') {
                ytPlayer.stopVideo();
            }
            bgMusic.src = finalSong;
            bgMusic.play().catch(e => console.log("Audio play prevented by browser", e));
        }

        // Switch screens
        landingScreen.classList.remove("active");
        landingScreen.classList.add("hidden");

        giftScreen.classList.remove("hidden");
        giftScreen.classList.add("active");

        // Start flower animation
        initFlowers(isBro);
    });
});

// --- Flower Drawing Logic (Canvas) ---
function initFlowers(showAvocados = false) {
    const canvas = document.getElementById('flower-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouseX = -1000;
    let mouseY = -1000;

    canvas.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    canvas.addEventListener('mouseleave', () => {
        mouseX = -1000;
        mouseY = -1000;
    });

    // Cinematic phases: TRACKING_SEED, CINEMATIC_REVEAL, GROW
    let phase = 'TRACKING_SEED';
    let revealProgress = 0;

    // Camera settings for 3D zoom effect
    let cam = {
        scale: 4, // Extremely close during drop
        x: canvas.width / 2,
        y: -200, // Starts high up matching the seed
        targetX: canvas.width / 2,
        targetY: -200,
        startX: 0,
        startY: 0
    };

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    let seeds = [];
    let flowers = [];
    const numFlowers = 25; // Field size

    // Main seed that falls first
    seeds.push({
        x: canvas.width / 2 + (Math.random() * 10 - 5),
        y: -400, // Very high
        targetY: canvas.height - 30, // Hits ground
        speed: 16, // Falls very fast (cinematic)
        isMain: true,
        z: 1 // foreground
    });

    class Flower {
        constructor(x, y, zDepth) {
            this.x = x;
            this.y = y;
            this.z = zDepth;

            const baseSize = Math.random() * 15 + 25;
            this.size = baseSize * this.z;
            this.maxStemHeight = (canvas.height - (canvas.height * 0.4 * Math.random() + canvas.height * 0.2)) * this.z;

            this.stemHeight = 0;
            this.growthRate = (Math.random() * 1.5 + 1) * this.z;
            this.bloomed = false;
            this.bloomProgress = 0;
            this.swaySpeed = Math.random() * 0.02 + 0.01;
            this.swayOffset = Math.random() * Math.PI * 2;

            this.dots = [];
            for (let j = 0; j < 15; j++) {
                const r = Math.random() * (this.size * 0.2);
                const theta = Math.random() * Math.PI * 2;
                this.dots.push({
                    x: r * Math.cos(theta),
                    y: r * Math.sin(theta)
                });
            }
            this.bendX = 0;
            this.bendVelocity = 0;
        }

        drawStem() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            const sway = Math.sin(Date.now() * this.swaySpeed + this.swayOffset) * 15 * this.z;
            ctx.quadraticCurveTo(
                this.x + sway + this.bendX / 2,
                this.y - this.stemHeight / 2,
                this.x + this.bendX,
                this.y - this.stemHeight
            );
            ctx.strokeStyle = `rgba(46, 125, 50, ${this.z + 0.2})`;
            ctx.lineWidth = 6 * this.z;
            ctx.stroke();
        }

        drawFlower() {
            const currentX = this.x + this.bendX;
            const currentY = this.y - this.stemHeight;

            ctx.save();
            ctx.translate(currentX, currentY);

            const numPetals = 12;
            for (let i = 0; i < numPetals; i++) {
                ctx.rotate((Math.PI * 2) / numPetals);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.quadraticCurveTo(this.size / 2 * this.bloomProgress, -this.size * this.bloomProgress, 0, -this.size * 1.5 * this.bloomProgress);
                ctx.quadraticCurveTo(-this.size / 2 * this.bloomProgress, -this.size * this.bloomProgress, 0, 0);

                const grad = ctx.createLinearGradient(0, 0, 0, -this.size * 1.5);
                grad.addColorStop(0, `rgba(255, 160, 0, ${this.z + 0.1})`);
                grad.addColorStop(1, `rgba(255, 235, 59, ${this.z + 0.1})`);
                ctx.fillStyle = grad;
                ctx.fill();
                ctx.strokeStyle = `rgba(245, 127, 23, ${this.z})`;
                ctx.lineWidth = 1 * this.z;
                ctx.stroke();
            }

            ctx.beginPath();
            ctx.arc(0, 0, (this.size * 0.3) * this.bloomProgress, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(93, 64, 55, ${this.z + 0.2})`;
            ctx.fill();

            if (this.bloomProgress > 0.8) {
                ctx.fillStyle = `rgba(251, 192, 45, ${this.z + 0.2})`;
                for (let dot of this.dots) {
                    ctx.beginPath();
                    ctx.arc(dot.x, dot.y, 1.5 * this.z, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            ctx.restore();
        }

        update() {
            if (this.stemHeight < this.maxStemHeight) {
                this.stemHeight += this.growthRate;
            } else {
                this.bloomed = true;
                if (this.bloomProgress < 1) {
                    this.bloomProgress += 0.02;
                }
            }

            if (cam.scale < 1.1) {
                const flX = this.x + this.bendX;
                const flY = this.y - this.stemHeight;
                const dist = Math.hypot(mouseX - flX, mouseY - flY);

                if (dist < 150 * this.z) {
                    const force = (150 * this.z - dist) / (150 * this.z);
                    const dir = Math.sign(flX - mouseX) || 1;
                    this.bendVelocity += dir * force * 1.5;
                }
            }

            this.bendVelocity -= this.bendX * 0.05;
            this.bendVelocity *= 0.85;
            this.bendX += this.bendVelocity;
        }
    }

    const particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * canvas.width * 2 - (canvas.width / 2),
            y: Math.random() * canvas.height * 2 - (canvas.height / 2),
            z: Math.random() * 0.5 + 0.5,
            r: Math.random() * 3 + 1,
            sy: Math.random() * -1 - 0.5,
            sx: Math.random() * 2 - 1,
            alpha: Math.random() * 0.5 + 0.1
        });
    }

    const avos = [
        { baseX: -100, baseY: -500, x: -100, y: -500, vx: 0, vy: 0 },
        { baseX: 80, baseY: -600, x: 80, y: -600, vx: 0, vy: 0 },
        { baseX: 120, baseY: -450, x: 120, y: -450, vx: 0, vy: 0 },
        { baseX: -50, baseY: -400, x: -50, y: -400, vx: 0, vy: 0 },
        { baseX: 50, baseY: -300, x: 50, y: -300, vx: 0, vy: 0 },
        { baseX: -180, baseY: -420, x: -180, y: -420, vx: 0, vy: 0 }
    ];

    function spawnBackgroundSeeds() {
        let spawned = 0;
        const interval = setInterval(() => {
            if (spawned >= numFlowers) {
                clearInterval(interval);
                return;
            }
            const zDepth = Math.random() * 0.6 + 0.4;

            let sx = Math.random() * canvas.width * 1.2 - (canvas.width * 0.1);
            if (showAvocados && sx > canvas.width / 2 + 100 && sx < canvas.width / 2 + 500) {
                sx = (Math.random() > 0.5) ? (canvas.width / 2 + 50) : (canvas.width / 2 + 550);
            }

            seeds.push({
                x: sx,
                y: -100 - Math.random() * 300,
                targetY: canvas.height - (Math.random() * 100 * zDepth),
                speed: (Math.random() * 6 + 6) * zDepth,
                isMain: false,
                z: zDepth
            });
            spawned++;
        }, 80);
    }

    let allFlowersBloomed = false;
    let impactShake = 0;

    function animate() {
        // Subtle motion blur trail instead of solid clear
        ctx.fillStyle = (phase === 'TRACKING_SEED') ? 'rgba(0, 5, 0, 0.4)' : 'transparent';
        if (phase !== 'TRACKING_SEED') ctx.clearRect(0, 0, canvas.width, canvas.height);
        else ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Camera Action Logic
        if (phase === 'TRACKING_SEED' && seeds.length > 0 && seeds[0].isMain) {
            // Camera tracks the main seed as it falls
            cam.targetY = seeds[0].y + 80;
            cam.targetX = seeds[0].x;
            cam.y += (cam.targetY - cam.y) * 0.15;
            cam.x += (cam.targetX - cam.x) * 0.15;

            // Speed Lines to simulate terminal velocity drop
            ctx.strokeStyle = `rgba(255, 235, 59, 0.1)`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let i = 0; i < 8; i++) {
                let lx = Math.random() * canvas.width;
                ctx.moveTo(lx, 0); ctx.lineTo(lx, canvas.height);
            }
            ctx.stroke();

        } else if (phase === 'CINEMATIC_REVEAL') {
            revealProgress += 0.005; // ~3.5 seconds
            if (revealProgress > 1) {
                revealProgress = 1;
                phase = 'GROW';
            }

            // Eased translation
            let eased = easeInOutCubic(revealProgress);
            cam.scale = 4 - (3 * eased); // from 4x to 1x
            cam.x = cam.startX + ((canvas.width / 2) - cam.startX) * eased;
            cam.y = cam.startY + ((canvas.height / 2) - cam.startY) * eased;
        }

        // Apply Camera Transformation with Impact Screenshake
        ctx.save();
        let shakeX = (Math.random() - 0.5) * impactShake;
        let shakeY = (Math.random() - 0.5) * impactShake;
        impactShake *= 0.9; // Quickly dampens

        ctx.translate(canvas.width / 2 + shakeX, canvas.height / 2 + shakeY);
        ctx.scale(cam.scale, cam.scale);
        ctx.translate(-cam.x, -cam.y);

        // Avocado Tree Logic
        if (showAvocados) {
            ctx.save();
            const treeZ = 0.5;
            ctx.translate(canvas.width / 2 + 300, canvas.height - 20);
            ctx.scale(treeZ, treeZ);

            // Trunk
            ctx.fillStyle = '#5D4037';
            ctx.fillRect(-30, -500, 60, 500);

            // Big Leaves
            ctx.fillStyle = '#2E7D32';
            ctx.beginPath();
            ctx.arc(0, -550, 250, 0, Math.PI * 2);
            ctx.arc(-150, -450, 200, 0, Math.PI * 2);
            ctx.arc(150, -450, 200, 0, Math.PI * 2);
            ctx.arc(0, -350, 200, 0, Math.PI * 2);
            ctx.fill();

            // Interactive Avocados
            avos.forEach(pos => {
                if (cam.scale < 1.1) {
                    const worldX = canvas.width / 2 + 300 + pos.x * treeZ;
                    const worldY = canvas.height - 20 + pos.y * treeZ;
                    const dist = Math.hypot(mouseX - worldX, mouseY - worldY);

                    if (dist < 100) {
                        const force = (100 - dist) / 100;
                        const dirX = Math.sign(worldX - mouseX) || 1;
                        const dirY = Math.sign(worldY - mouseY) || 1;
                        pos.vx += dirX * force * 5;
                        pos.vy += dirY * force * 5;
                    }
                }

                pos.vx += (pos.baseX - pos.x) * 0.1;
                pos.vy += (pos.baseY - pos.y) * 0.1;
                pos.vx *= 0.85;
                pos.vy *= 0.85;
                pos.x += pos.vx;
                pos.y += pos.vy;

                // Outer shell
                ctx.fillStyle = '#1B5E20';
                ctx.beginPath();
                ctx.ellipse(pos.x, pos.y, 25, 35, 0, 0, Math.PI * 2);
                ctx.fill();

                // Pale green inside (fake cut open effect for fun, or just keep it solid, keeping it solid is better)
                // Actually to make it clearly an avocado, a cut-open one is iconic!
                ctx.fillStyle = '#C8E6C9';
                ctx.beginPath();
                ctx.ellipse(pos.x, pos.y + 2, 20, 28, 0, 0, Math.PI * 2);
                ctx.fill();

                // Seed
                ctx.fillStyle = '#4E342E';
                ctx.beginPath();
                ctx.arc(pos.x, pos.y + 10, 12, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.restore();
        }

        // Draw seeds
        for (let i = seeds.length - 1; i >= 0; i--) {
            let s = seeds[i];

            // Draw glowing seed
            ctx.beginPath();
            ctx.arc(s.x, s.y, 4 * s.z, 0, Math.PI * 2);
            ctx.fillStyle = '#FFF59D';
            ctx.shadowBlur = 20 * s.z;
            ctx.shadowColor = '#FFF59D';
            ctx.fill();
            ctx.shadowBlur = 0;

            // Light trail
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(s.x, s.y - 30 * s.z);
            ctx.strokeStyle = 'rgba(255, 235, 59, 0.6)';
            ctx.lineWidth = 3 * s.z;
            ctx.stroke();

            s.y += s.speed;

            if (s.y >= s.targetY) {
                flowers.push(new Flower(s.x, s.targetY, s.z));

                if (s.isMain && phase === 'TRACKING_SEED') {
                    // HUGE IMPACT!
                    impactShake = 30; // Screenshake amount
                    phase = 'CINEMATIC_REVEAL';
                    // Capture start positions for interpolation
                    cam.startX = cam.x;
                    cam.startY = cam.y;

                    // Add an explosion of particles at impact
                    for (let k = 0; k < 20; k++) {
                        particles.push({
                            x: s.x, y: s.targetY, z: 1,
                            r: Math.random() * 4 + 2,
                            sx: Math.random() * 10 - 5,
                            sy: Math.random() * -10,
                            alpha: 1
                        });
                    }

                    spawnBackgroundSeeds();
                }

                seeds.splice(i, 1);
            }
        }

        flowers.sort((a, b) => a.z - b.z);

        let bloomingCount = 0;
        flowers.forEach(flower => {
            flower.update();
            flower.drawStem();
            flower.drawFlower();
            if (flower.bloomProgress > 0.5) bloomingCount++;
        });

        if (phase === 'GROW' && bloomingCount > numFlowers * 0.7 && !allFlowersBloomed) {
            allFlowersBloomed = true;
            document.querySelector('.gift-content').classList.add('show');
        }

        // Particles
        particles.forEach(p => {
            if (cam.scale < 1.1) {
                const dist = Math.hypot(mouseX - p.x, mouseY - p.y);
                if (dist < 100) {
                    const force = (100 - dist) / 100;
                    p.x += (p.x - mouseX) * force * 0.1;
                    p.y += (p.y - mouseY) * force * 0.1;
                }
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * p.z, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 235, 59, ${p.alpha})`;
            ctx.fill();
            p.x += p.sx * p.z;
            p.y += p.sy * p.z;
            p.alpha *= 0.99; // Slowly fade impact particles

            if (p.y < -100) p.y = canvas.height + 100;
            if (p.x < -100) p.x = canvas.width + 100;
            if (p.x > canvas.width + 100) p.x = -100;
        });

        ctx.restore();
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
