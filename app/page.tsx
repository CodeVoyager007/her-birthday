"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Head from "next/head";

const BULB_IMAGES = [
  "/img/bulb_red.png",
  "/img/bulb_yellow.png",
  "/img/bulb_green.png",
  "/img/bulb_blue.png",
  "/img/bulb_orange.png",
  "/img/bulb_pink.png",
];

// Balloon images for realism
const REAL_BALLOON_IMAGES = [
  "/img/b1.png",
  "/img/b2.png",
  "/img/b3.png",
  "/img/b4.png",
  "/img/b5.png",
  "/img/b6.png",
  "/img/b7.png",
];

// Use Balloon-Border.png for flying balloons
const FLYING_BALLOON_IMAGE = "/img/Balloon-Border.png";

function useDelayedShow(delayMs: number) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);
  return show;
}

export default function BirthdayShow() {
  const [scene, setScene] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [swing, setSwing] = useState(true);
  // Delayed button show hooks (must be called unconditionally)
  const showBtn2 = useDelayedShow(4000);
  const showBtn3 = useDelayedShow(4000);
  const showBtn4 = useDelayedShow(4000);
  const showBtn5 = useDelayedShow(4000);
  const showBtn6 = useDelayedShow(4000);
  const showBtn7 = useDelayedShow(4000);
  // Balloons aligned and showMemoriesBtn for scene 7 (must be unconditional)
  const [balloonsAligned, setBalloonsAligned] = useState(false);
  const [showMemoriesBtn, setShowMemoriesBtn] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    setSwing(scene === 4);
  }, [scene]);

  useEffect(() => {
    if (scene >= 3 && scene <= 9 && audioRef.current) {
      audioRef.current.play();
    } else if ((scene < 3 || scene > 9) && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [scene]);

  // Balloons aligned effect for scene 7
  useEffect(() => {
    if (scene === 7 && balloonsAligned) {
      const t = setTimeout(() => setShowMemoriesBtn(true), 4000);
      return () => clearTimeout(t);
    } else if (scene !== 7) {
      setShowMemoriesBtn(false);
      setBalloonsAligned(false);
    }
  }, [scene, balloonsAligned]);

  // Scene 1: Black screen with button (show instantly)
  if (scene === 1) {
    return (
      <div className="birthday-blackout">
        <Head>
          <title>Happy Birthday Emaan</title>
        </Head>
        <button className="birthday-btn" onClick={() => setScene(2)}>
          Turn On Lights
        </button>
      </div>
    );
  }

  // Scene 2: Lit room with bulbs and next button (4s delay)
  if (scene === 2) {
    return (
      <div className="birthday-litroom">
        <div className="birthday-bulbs-row">
          {BULB_IMAGES.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`Bulb ${i+1}`}
              width={80}
              height={80}
              className={`birthday-bulb birthday-bulb-glow bulb-${i}`}
              priority
            />
          ))}
        </div>
        {showBtn2 && (
          <button className="birthday-btn delayed-fade" onClick={() => setScene(3)}>
            Turn On Music
          </button>
        )}
      </div>
    );
  }

  // Scene 3: Music plays, bulbs, and &apos;Let&apos;s Decorate&apos; button (4s delay)
  if (scene === 3) {
    return (
      <div className="birthday-litroom">
        <audio ref={audioRef} src="/img/hbd.mp3" loop />
        <div className="birthday-bulbs-row">
          {BULB_IMAGES.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`Bulb ${i+1}`}
              width={80}
              height={80}
              className={`birthday-bulb birthday-bulb-glow bulb-${i}`}
              priority
            />
          ))}
        </div>
        {showBtn3 && (
          <button className="birthday-btn delayed-fade" onClick={() => setScene(4)}>
            Let&apos;s Decorate
          </button>
        )}
      </div>
    );
  }

  // Scene 4: Banner appears (no balloons yet), bulbs, music continues (4s delay)
  if (scene === 4) {
  return (
      <div className="birthday-litroom">
        <audio ref={audioRef} src="/img/hbd.mp3" loop />
        <div className="birthday-bulbs-row">
          {BULB_IMAGES.map((src, i) => (
        <Image
              key={src}
              src={src}
              alt={`Bulb ${i+1}`}
              width={80}
              height={80}
              className={`birthday-bulb birthday-bulb-glow bulb-${i}`}
          priority
        />
          ))}
        </div>
        <div className="birthday-banner">
          <Image
            src="/img/banner.png"
            alt="Birthday Banner"
            width={400}
            height={80}
            className={swing ? "banner-swing" : ""}
            priority
            onAnimationEnd={() => setSwing(false)}
            style={{ maxWidth: '90%', height: 'auto' }}
          />
        </div>
        {showBtn4 && (
          <button className="birthday-btn delayed-fade" onClick={() => setScene(5)}>
            Let&apos;s Fly Balloons
          </button>
        )}
      </div>
    );
  }

  // Scene 5: One large balloon flies up, 7 remain floating softly
  if (scene === 5) {
    // One large balloon flying up using Balloon-Border.png that covers whole screen width
    const flyingBalloon = {
      img: FLYING_BALLOON_IMAGE,
      key: "fly-large",
    };
    // 7 floating balloons (remain on screen)
    const floatingBalloons = Array.from({ length: 7 }, (_, i) => ({
      img: REAL_BALLOON_IMAGES[i % REAL_BALLOON_IMAGES.length],
      key: `float-${i}`,
      left: 10 + i * 12 + "%",
      anim: `balloon-soft-float-${i}`,
    }));
    return (
      <div className="birthday-litroom responsive-birthday">
        <audio ref={audioRef} src="/img/hbd.mp3" loop />
        <div className="birthday-bulbs-row">
          {BULB_IMAGES.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`Bulb ${i+1}`}
              width={80}
              height={80}
              className={`birthday-bulb birthday-bulb-glow bulb-${i}`}
              priority
              style={{ maxWidth: '12vw', minWidth: 40, height: 'auto' }}
            />
          ))}
        </div>
        <div className="birthday-banner">
          <Image
            src="/img/banner.png"
            alt="Birthday Banner"
            width={400}
            height={80}
            style={{ maxWidth: '90vw', height: 'auto' }}
            priority
          />
        </div>
        <div className="balloon-fly-zone">
          <Image
            key={flyingBalloon.key}
            src={flyingBalloon.img}
            alt="Large Balloon"
            width={1200}
            height={800}
            className="balloon-fly"
            style={{
              width: '100vw',
              height: 'auto',
              maxWidth: '100vw',
              position: 'absolute',
              bottom: '-50vh',
              left: '0',
              animationDelay: '0s',
              animationDuration: '4s',
              zIndex: 5,
            }}
            priority
          />
        </div>
        {/* 7 floating balloons */}
        <div className="balloon-float-zone">
          {floatingBalloons.map((b, i) => (
            <Image
              key={b.key}
              src={b.img}
              alt="Balloon"
              width={60}
              height={100}
              className={`balloon-float ${b.anim}`}
              style={{ left: b.left, maxWidth: '10vw', minWidth: 30, height: 'auto' }}
              priority
            />
          ))}
        </div>
        {showBtn5 && (
          <button className="birthday-btn delayed-fade" onClick={() => setScene(6)}>
            Here's your cake
          </button>
        )}
      </div>
    );
  }

  // Scene 6: Realistic, responsive CSS cake with unlit candles, two-tier, balloons around
  if (scene === 6) {
    return (
      <div className="birthday-litroom responsive-birthday">
        <audio ref={audioRef} src="/img/hbd.mp3" loop />
        <div className="birthday-bulbs-row">
          {BULB_IMAGES.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`Bulb ${i+1}`}
              width={80}
              height={80}
              className={`birthday-bulb birthday-bulb-glow bulb-${i}`}
              priority
              style={{ maxWidth: '12vw', minWidth: 40, height: 'auto' }}
            />
          ))}
        </div>
        <div className="birthday-banner">
          <Image
            src="/img/banner.png"
            alt="Birthday Banner"
            width={400}
            height={80}
            style={{ maxWidth: '90vw', height: 'auto' }}
            priority
          />
        </div>
        <div className="css-cake-zone" style={{ position: 'relative', width: '100%', minHeight: 320 }}>
          {/* Balloons around cake, responsive */}
          <Image src={REAL_BALLOON_IMAGES[0]} alt="Balloon" width={50} height={80} style={{ position: 'absolute', left: 0, top: 30, maxWidth: '12vw', minWidth: 30, height: 'auto' }} />
          <Image src={REAL_BALLOON_IMAGES[1]} alt="Balloon" width={50} height={80} style={{ position: 'absolute', right: 0, top: 30, maxWidth: '12vw', minWidth: 30, height: 'auto' }} />
          <Image src={REAL_BALLOON_IMAGES[2]} alt="Balloon" width={40} height={65} style={{ position: 'absolute', left: '20%', top: -40, maxWidth: '10vw', minWidth: 24, height: 'auto' }} />
          <div className="css-cake realistic-cake">
            <div className="cake-tier bottom"></div>
            <div className="cake-frosting bottom"></div>
            <div className="cake-tier top"></div>
            <div className="cake-frosting top"></div>
            <div className="cake-frosting topmost"></div>
            <div className="cake-candles">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="cake-candle">
                  <div className="candle-wick"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {showBtn6 && (
          <button className="birthday-btn delayed-fade" onClick={() => setScene(7)}>
            Light Candles
          </button>
        )}
      </div>
    );
  }

  // Scene 7: Realistic, responsive CSS cake with lit candles, two-tier, balloons around
  if (scene === 7) {
    // Letters for balloons
    const letters = ["H", "B", "D", "M", "A", "A", "N"];
    if (!balloonsAligned) {
      return (
        <div className="birthday-litroom responsive-birthday">
          <audio ref={audioRef} src="/img/hbd.mp3" loop />
          <div className="birthday-bulbs-row">
            {BULB_IMAGES.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={`Bulb ${i+1}`}
                width={80}
                height={80}
                className={`birthday-bulb birthday-bulb-glow bulb-${i}`}
                priority
                style={{ maxWidth: '12vw', minWidth: 40, height: 'auto' }}
              />
            ))}
          </div>
          <div className="birthday-banner">
            <Image
              src="/img/banner.png"
              alt="Birthday Banner"
              width={400}
              height={80}
              style={{ maxWidth: '90vw', height: 'auto' }}
              priority
            />
          </div>
          {/* Balloons still floating around cake */}
          <div className="balloon-float-zone">
            {Array.from({ length: 7 }, (_, i) => (
              <Image
                key={i}
                src={REAL_BALLOON_IMAGES[i % REAL_BALLOON_IMAGES.length]}
                alt="Balloon"
                width={60}
                height={100}
                className={`balloon-float balloon-soft-float-${i}`}
                style={{ left: 10 + i * 12 + "%", maxWidth: '10vw', minWidth: 30, height: 'auto' }}
                priority
              />
            ))}
          </div>
          <div className="css-cake-zone" style={{ position: 'relative', width: '100%', minHeight: 320 }}>
            <Image src={REAL_BALLOON_IMAGES[0]} alt="Balloon" width={50} height={80} style={{ position: 'absolute', left: 0, top: 30, maxWidth: '12vw', minWidth: 30, height: 'auto' }} />
            <Image src={REAL_BALLOON_IMAGES[1]} alt="Balloon" width={50} height={80} style={{ position: 'absolute', right: 0, top: 30, maxWidth: '12vw', minWidth: 30, height: 'auto' }} />
            <Image src={REAL_BALLOON_IMAGES[2]} alt="Balloon" width={40} height={65} style={{ position: 'absolute', left: '20%', top: -40, maxWidth: '10vw', minWidth: 24, height: 'auto' }} />
            <div className="css-cake realistic-cake">
              <div className="cake-tier bottom"></div>
              <div className="cake-frosting bottom"></div>
              <div className="cake-tier top"></div>
              <div className="cake-frosting top"></div>
              <div className="cake-frosting topmost"></div>
              <div className="cake-candles">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="cake-candle">
                    <div className="candle-wick"></div>
                    <div className="candle-flame"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="birthday-btn delayed-fade" onClick={() => setBalloonsAligned(true)}>
            Happy Birthday Maan
          </button>
        </div>
      );
    }
    // Balloons aligned, confetti, show Memories button after 4s
    return (
      <div className="birthday-litroom responsive-birthday" style={{ position: 'relative', overflow: 'hidden' }}>
        <audio ref={audioRef} src="/img/hbd.mp3" loop />
        <div className="birthday-bulbs-row">
          {BULB_IMAGES.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`Bulb ${i+1}`}
              width={80}
              height={80}
              className={`birthday-bulb birthday-bulb-glow bulb-${i}`}
              priority
              style={{ maxWidth: '12vw', minWidth: 40, height: 'auto' }}
            />
          ))}
        </div>
        <div className="birthday-banner">
          <Image
            src="/img/banner.png"
            alt="Birthday Banner"
            width={400}
            height={80}
            style={{ maxWidth: '90vw', height: 'auto' }}
            priority
          />
        </div>
        {/* Balloons aligned in a row with letters */}
        <div className="balloon-align-row" style={{ display: 'flex', justifyContent: 'center', gap: '2vw', marginTop: 120, marginBottom: 0, zIndex: 10, position: 'relative' }}>
          {letters.map((letter, i) => (
            <div key={i} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'all 1s cubic-bezier(.4,2,.6,1)' }}>
              <Image
                src={REAL_BALLOON_IMAGES[i % REAL_BALLOON_IMAGES.length]}
                alt={`Balloon ${letter}`}
                width={60}
                height={100}
                style={{ maxWidth: '10vw', minWidth: 30, height: 'auto', transition: 'all 1s cubic-bezier(.4,2,.6,1)' }}
                priority
              />
              <span style={{
                position: 'absolute',
                top: '38%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '2rem',
                textShadow: '2px 2px 8px #000, 0 0 8px #fff',
                letterSpacing: '0.1em',
                userSelect: 'none',
                zIndex: 11,
              }}>{letter}</span>
            </div>
          ))}
        </div>
        <div className="css-cake-zone" style={{ position: 'relative', width: '100%', minHeight: 320, zIndex: 10 }}>
          <Image src={REAL_BALLOON_IMAGES[0]} alt="Balloon" width={50} height={80} style={{ position: 'absolute', left: 0, top: 30, maxWidth: '12vw', minWidth: 30, height: 'auto' }} />
          <Image src={REAL_BALLOON_IMAGES[1]} alt="Balloon" width={50} height={80} style={{ position: 'absolute', right: 0, top: 30, maxWidth: '12vw', minWidth: 30, height: 'auto' }} />
          <Image src={REAL_BALLOON_IMAGES[2]} alt="Balloon" width={40} height={65} style={{ position: 'absolute', left: '20%', top: -40, maxWidth: '10vw', minWidth: 24, height: 'auto' }} />
          <div className="css-cake realistic-cake">
            <div className="cake-tier bottom"></div>
            <div className="cake-frosting bottom"></div>
            <div className="cake-tier top"></div>
            <div className="cake-frosting top"></div>
            <div className="cake-frosting topmost"></div>
            <div className="cake-candles">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="cake-candle">
                  <div className="candle-wick"></div>
                  <div className="candle-flame"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Confetti overlay using react-confetti */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 100 }}>
          <Confetti width={width} height={height} numberOfPieces={350} gravity={0.25} recycle={true} style={{ pointerEvents: 'none' }} />
        </div>
        {showMemoriesBtn && (
          <button className="birthday-btn delayed-fade" style={{ zIndex: 20, position: 'relative' }} onClick={() => setScene(9)}>
            Memories
          </button>
        )}
      </div>
    );
  }

  // Scene 8: Happy Birthday Maan - Balloons align above cake, each with a letter, confetti, button to Memories
  if (scene === 8) {
    // Letters for balloons
    const letters = ["H", "B", "D", "M", "A", "A", "N"];
    // Use the same 7 real balloon images
    return (
      <div className="birthday-litroom responsive-birthday">
        <audio ref={audioRef} src="/img/hbd.mp3" loop />
        <div className="birthday-bulbs-row">
          {BULB_IMAGES.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`Bulb ${i+1}`}
              width={80}
              height={80}
              className={`birthday-bulb birthday-bulb-glow bulb-${i}`}
              priority
              style={{ maxWidth: '12vw', minWidth: 40, height: 'auto' }}
            />
          ))}
        </div>
        <div className="birthday-banner">
          <Image
            src="/img/banner.png"
            alt="Birthday Banner"
            width={400}
            height={80}
            style={{ maxWidth: '90vw', height: 'auto' }}
            priority
          />
        </div>
        {/* Balloons aligned above cake with letters */}
        <div className="balloon-align-row" style={{ display: 'flex', justifyContent: 'center', gap: '2vw', marginTop: 120, marginBottom: 0 }}>
          {letters.map((letter, i) => (
            <div key={i} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Image
                src={REAL_BALLOON_IMAGES[i % REAL_BALLOON_IMAGES.length]}
                alt={`Balloon ${letter}`}
                width={60}
                height={100}
                style={{ maxWidth: '10vw', minWidth: 30, height: 'auto' }}
                priority
              />
              <span style={{
                position: 'absolute',
                top: '38%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '2rem',
                textShadow: '2px 2px 8px #000, 0 0 8px #fff',
                letterSpacing: '0.1em',
                userSelect: 'none',
              }}>{letter}</span>
            </div>
          ))}
        </div>
        <div className="css-cake-zone" style={{ position: 'relative', width: '100%', minHeight: 320 }}>
          <Image src={REAL_BALLOON_IMAGES[0]} alt="Balloon" width={50} height={80} style={{ position: 'absolute', left: 0, top: 30, maxWidth: '12vw', minWidth: 30, height: 'auto' }} />
          <Image src={REAL_BALLOON_IMAGES[1]} alt="Balloon" width={50} height={80} style={{ position: 'absolute', right: 0, top: 30, maxWidth: '12vw', minWidth: 30, height: 'auto' }} />
          <Image src={REAL_BALLOON_IMAGES[2]} alt="Balloon" width={40} height={65} style={{ position: 'absolute', left: '20%', top: -40, maxWidth: '10vw', minWidth: 24, height: 'auto' }} />
          <div className="css-cake realistic-cake">
            <div className="cake-tier bottom"></div>
            <div className="cake-frosting bottom"></div>
            <div className="cake-tier top"></div>
            <div className="cake-frosting top"></div>
            <div className="cake-frosting topmost"></div>
            <div className="cake-candles">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="cake-candle">
                  <div className="candle-wick"></div>
                  <div className="candle-flame"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Confetti overlay */}
        <div className="confetti-overlay"></div>
        {showBtn7 && (
          <button className="birthday-btn delayed-fade" onClick={() => setScene(9)}>
            Memories
          </button>
        )}
      </div>
    );
  }

  // Scene 9: Memories slideshow with wishes
  const memories = [
    { src: "/img/eman1.jpg", wish: "Happy birthday mubarak ho meri rooh ki humraaz 👭💗💫 Tera hona meri life ka sabse bada sukoon hai 🕊️🌸 Tu har waqt mere sath hoti hai — khushi mein bhi 😄, rona dhona mein bhi 😭🫶 Tere bina meri zindagi adhoori hoti 💔 Dua hai Allah tujhe hamesha khush rakhe 💝🧿" },
    { src: "/img/eman2.webp", wish: "Emaan, tujhe yaad hai hum bachpan mein kaise birthdays ke liye excited hote thay? 🎈🥹🧁 Tu har waqt mera saath thi 🧸 Meri har choti khushi ka hissa thi 🎀 Aaj tera din hai, aur meri dua hai ke tu har mod par chamakti rahe ✨ Happy birthday meri soul sister 💘👑" },
    { src: "/img/eman3.webp", wish: "Tu meri zindagi ka woh hissa hai jo kabhi khatam nahi ho sakta ♾️💫 Har dard mein tera shoulder tha 🤧🫂 Har khushi mein teri muskurahat thi 😍💐 Tera janam mere liye blessing hai 🙏 Allah kare tu hamesha khilti rahe 🌷🌟" },
    { src: "/img/eman4.jpg", wish: "Janam din ka matlab sirf cake nahi hota 🎂🍭 Mere liye iska matlab hai tu — meri jaan, meri bestie 💞 Tere bina zindagi bland hoti 😶‍🌫️ Aaj tu paida hui thi, isliye duniya mein sweetness aayi 🍓🎀" },
    { src: "/img/eman5.jpg", wish: "Tu meri zindagi ki woh kahani hai jo kabhi khatam nahi hoti 📖💫 Har chapter mein tu meri hero hai 🦸‍♀️ Tere bina yeh novel incomplete hoti 📚 Tera birthday meri life ka sabse special chapter hai 🎉💖" },
    { src: "/img/eman6.jpg", wish: "Emaan, agar dosti ek rishta hota toh main tujhe behan bana leti 👯‍♀️💖 Tu woh insaan hai jiske sath har cheez meaningful hoti ✨ Har moment yaadgar ban jaata hai 📸 Happy birthday meri rooh ki chain, meri healing energy 🕊️💗" },
    { src: "/img/eman7.jpg", wish: "Har saal tu aur bhi zyada pyari hoti ja rahi hai 🥹🌹 Main sochti hoon ke meri bestie itni perfect kyun hai 😩💕 Teri smile 😄, tera nature 🌼, tera pyaar 💗 — sab kuch priceless hai 💎 Janam din mubarak ho meri diamond wali queen 👑✨" },
    { src: "/img/eman8.jpg", wish: "Tu woh roshni hai jo meri zindagi mein kabhi dim nahi hoti 💡🌈 Tera har lafz comfort deta hai 🤍 Aaj ke din main dua karti hoon ke tu duniya ki har khushi paaye 😇 Happy birthday meri sunshine 🌞🌸" },
    { src: "/img/eman9.jpg", wish: "Zindagi ek novel hai 📚 aur tu uska sabse favourite chapter hai 💞 Main thankful hoon ke mera best part tu hai 🫶 Har birthday pe tujhe celebrate karna mujhe alive feel karwata hai 🎉 Tujh jaisi dost milna naseeb ki baat hai 🍀💖" },
    { src: "/img/eman10.jpg", wish: "Tu meri zindagi ki woh party hai jo kabhi khatam nahi hoti 🎊💃 Teri energy sab kuch light up kar deti hai ✨ Tera birthday sabse special hai kyunke tu duniya ki jaan hai 🌍💓" },
    { src: "/img/eman11.jpg", wish: "Tu meri zindagi ka woh gift hai jo Allah ne mujhe diya 🎁🙏 Tera hona meri life mein sabse bada blessing hai 💝 Har roz main thankful hoon ke tu meri dost hai 🥺 Tera birthday meri life ka sabse special day hai 🌟💖" },
    { src: "/img/eman12.jpg", wish: "Tere bina meri zindagi black & white hoti 🎞️ Tu meri rainbow hai 🌈💖 Har rang mein tu basi hai 😍 Tere birthday pe mere dil se dua nikalti hai — kabhi udaasi tujhe chhoo bhi na paaye 🧿🕊️" },
    { src: "/img/eman13.jpg", wish: "Cake meetha ho sakta hai 🎂, lekin tu meri zindagi ka asli sweetness hai 🍭💞 Teri har baat mein warmth hai 🔥 Har smile mein magic hai ✨ Tu deserve karti hai duniya ki sari khushiyan 🎁 Happy birthday meri mithaas wali bestie 💘" },
    { src: "/img/eman14.jpg", wish: "Tere bina meri zindagi ek boring ride hoti 😂🛞 Tu woh pagalpan hai jo mujhe complete banata hai 🤪💫 Tera birthday meri life ka sabse exciting day hota hai 🎢💥" },
    { src: "/img/eman15.jpg", wish: "Tu meri woh dua hai jo bina maange qubool ho gayi 🥹🙏 Tera hona meri zindagi mein calmness laya hai 🌸 Tere birthday pe dua hai ke Allah tujhe duniya ki har khushi de 💐💖" },
    { src: "/img/eman16.jpg", wish: "Aaj tera birthday hai 🎂 lekin gift mujhe mila tha — TU 💘 Main har roz thankful hoon Allah ka ke tu meri zindagi ka hissa bani 🥺 Tujhse better dost toh imagine bhi nahi ki ja sakti 💌💋" },
    { src: "/img/eman17.jpg", wish: "Tu meri zindagi ka woh star hai jo kabhi bujhta nahi ⭐💫 Tera chamakna meri life ko roshni se bhar deta hai 🌟 Tere birthday pe dua hai ke tu hamesha chamakti rahe aur meri life ko ujala banati rahe ✨💖" },
    { src: "/img/eman18.jpg", wish: "Aur sun meri princess 👑 Aaj ke din sirf khushi, cake, aur tu 🧁🎉 Tera birthday ek reminder hai ke duniya mein ab bhi pyaar zinda hai kyunke tu zinda hai 💖🌟 Happy Birthday meri Emaan, meri jaan, mera maan 💘♾️" },
  ];

  function MemoriesSlider() {
    const [idx, setIdx] = useState(0);
    const [showEnvelope, setShowEnvelope] = useState(false);
    const [showLetter, setShowLetter] = useState(false);

    // Show envelope after all memories are viewed
    useEffect(() => {
      if (idx === memories.length - 1) {
        const timer = setTimeout(() => setShowEnvelope(true), 3000);
        return () => clearTimeout(timer);
      }
    }, [idx]);

    return (
      <div className="memories-slider responsive-birthday" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f7e7ce 60%, #e8f4fd 100%)', padding: '32px 0' }}>
        <Head>
          <title>Happy Birthday Emaan</title>
        </Head>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', color: '#4a90e2', fontWeight: 900, marginBottom: 32, letterSpacing: '0.04em', textShadow: '0 2px 12px #fff, 0 0 8px #4a90e2', textAlign: 'center', padding: '0 20px' }}>Wishes for you Maan</h1>
        <div style={{ maxWidth: 'min(500px, 95vw)', width: '95vw', margin: '0 auto', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.95)', borderRadius: 24, boxShadow: '0 8px 40px #4a90e255, 0 2px 8px #0001', border: '3px solid #b8d4f0', padding: 'clamp(1rem, 3vw, 2rem) clamp(0.75rem, 2vw, 1.5rem)', marginBottom: 24 }}>
          <Image src={memories[idx].src} alt={`Memory ${idx+1}`} width={500} height={400} style={{ width: '100%', maxHeight: 'min(400px, 50vh)', minHeight: 'min(300px, 40vh)', objectFit: 'cover', borderRadius: 16, boxShadow: '0 4px 32px #b8d4f0' }} priority />
          <div style={{ marginTop: 24, fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', color: '#2c3e50', textAlign: 'center', background: '#f8f9fa', borderRadius: 12, padding: 'clamp(0.8rem, 2vw, 1.2rem) clamp(0.75rem, 2vw, 1.5rem)', boxShadow: '0 2px 8px #b8d4f0', fontWeight: 500, letterSpacing: '0.01em', lineHeight: '1.6' }}>{memories[idx].wish}</div>
          <div style={{ marginTop: 32, display: 'flex', gap: 'clamp(16px, 3vw, 24px)', justifyContent: 'center', width: '100%', flexWrap: 'wrap' }}>
            <button className="birthday-btn" style={{ opacity: idx === 0 ? 0.5 : 1, fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', minWidth: 'min(100px, 25vw)', background: '#4a90e2', color: '#fff', boxShadow: '0 2px 12px #4a90e255' }} disabled={idx === 0} onClick={() => setIdx(idx-1)}>&larr; Prev</button>
            <button className="birthday-btn" style={{ opacity: idx === memories.length-1 ? 0.5 : 1, fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', minWidth: 'min(100px, 25vw)', background: '#4a90e2', color: '#fff', boxShadow: '0 2px 12px #4a90e255' }} disabled={idx === memories.length-1} onClick={() => setIdx(idx+1)}>Next &rarr;</button>
          </div>
          <div style={{ marginTop: 18, color: '#7f8c8d', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', fontWeight: 600 }}>{idx+1} / {memories.length}</div>
          
          {/* Envelope emoji */}
          {showEnvelope && !showLetter && (
            <div style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
              cursor: 'pointer',
              animation: 'bounce 2s infinite'
            }} onClick={() => setShowLetter(true)}>
              <div style={{
                fontSize: '120px',
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
                transition: 'transform 0.3s ease'
              }}>
                💌
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-40px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: '#e74c3c',
                fontWeight: 'bold',
                fontSize: '16px',
                textAlign: 'center',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                whiteSpace: 'nowrap'
              }}>
                Click me! 💌
              </div>
            </div>
          )}

          {/* Letter modal */}
          {showLetter && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1001,
              padding: '20px'
            }}>
              <div style={{
                background: '#fff',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                borderRadius: '16px',
                maxWidth: 'min(500px, 90vw)',
                maxHeight: 'min(600px, 80vh)',
                overflow: 'auto',
                position: 'relative',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                border: '3px solid #e74c3c'
              }}>
                <button 
                  onClick={() => setShowLetter(false)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '15px',
                    background: '#e74c3c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✕
                </button>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <h2 style={{ color: '#e74c3c', fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '10px' }}>💌 A Special Letter 💌</h2>
                  <div style={{ 
                    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', 
                    lineHeight: '1.8', 
                    color: '#2c3e50',
                    textAlign: 'left'
                  }}>
                    <p style={{ marginBottom: '15px' }}>
                      <strong>Dear Emaan,</strong>
                    </p>
                    <p style={{ marginBottom: '15px' }}>
                      On your 17th birthday, I wanted to take a moment to tell you how much you mean to me. You&apos;re not just my best friend, you&apos;re my soul sister, my partner in crime, and my biggest supporter.
                    </p>
                    <p style={{ marginBottom: '15px' }}>
                      Every moment we&apos;ve shared together has been a blessing. From our late-night talks to our crazy adventures, you&apos;ve made my life so much more beautiful and meaningful.
                    </p>
                    <p style={{ marginBottom: '15px' }}>
                      You have the most beautiful heart, the kindest soul, and the most amazing personality. You deserve all the happiness, love, and success in the world.
                    </p>
                    <p style={{ marginBottom: '15px' }}>
                      Thank you for being you, for accepting me as I am, and for being the most incredible friend anyone could ask for. I&apos;m so grateful to have you in my life.
                    </p>
                    <p style={{ marginBottom: '15px' }}>
                      Happy 17th Birthday, my beautiful Emaan! May this year bring you endless joy, love, and all your heart&apos;s desires. I love you so much! 💖
                    </p>
                    <p style={{ textAlign: 'right', marginTop: '20px' }}>
                      <strong>With all my love,</strong><br />
                      <strong style={{ color: '#e74c3c' }}>Your Bestie Ayesha Mughal</strong> 💕
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {idx === memories.length - 1 && !showEnvelope && (
            <button 
              className="birthday-btn" 
              style={{ 
                marginTop: 24, 
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', 
                minWidth: 'min(140px, 35vw)', 
                background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)', 
                color: '#fff', 
                boxShadow: '0 4px 16px #ff6b6b55',
                border: 'none',
                borderRadius: '12px',
                padding: 'clamp(10px, 2.5vw, 12px) clamp(20px, 4vw, 24px)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }} 
              onClick={() => setScene(1)}
            >
              🎉 Restart Show 🎉
            </button>
          )}
        </div>
      </div>
    );
  }

  if (scene === 9) {
    return <MemoriesSlider />;
  }

  // Placeholder for next scenes
  return <div />;
}
