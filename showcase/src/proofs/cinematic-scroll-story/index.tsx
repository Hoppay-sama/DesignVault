import { useEffect, useRef, type CSSProperties, type RefObject } from "react";
import Lenis from "lenis";
import "./styles.css";

type Scene = {
  id: string;
  index: string;
  place: string;
  copy: string;
  note: string;
  detail: string;
  video: string;
  poster: string;
  far?: string;
  start: number;
};

const scenes: Scene[] = [
  {
    id: "01",
    index: "GLACIER",
    place: "GLACIAL SOURCE",
    copy: "Nobody owns the first kilometer. The ice keeps it.",
    note: "KOVRA / FIELD NOTE 001",
    detail: "Blue hour under permanent weather",
    video: "/kovra/KV-V1.mp4",
    poster: "/kovra/KV-V1-poster.jpg",
    far: "/kovra/KV-S1.jpg",
    start: 0,
  },
  {
    id: "02",
    index: "PINE",
    place: "THE NARROWS",
    copy: "The river narrows until the mountain has to listen.",
    note: "KOVRA / FIELD NOTE 118",
    detail: "Split pine, black water, and a hard white current",
    video: "/kovra/KV-V2.mp4",
    poster: "/kovra/KV-V2-poster.jpg",
    far: "/kovra/KV-S2.jpg",
    start: 0.25,
  },
  {
    id: "03",
    index: "MILL TOWN",
    place: "MILL TOWN",
    copy: "Every wheel in town remembers the shape of the water.",
    note: "KOVRA / FIELD NOTE 224",
    detail: "A working river, measured in timber and light",
    video: "",
    poster: "/kovra/KV-S3.jpg",
    start: 0.5,
  },
  {
    id: "04",
    index: "DELTA",
    place: "DELTA AT NIGHT",
    copy: "At the edge, KOVRA forgets its name and becomes everything.",
    note: "KOVRA / FIELD NOTE 412",
    detail: "Tidal flats, lanterns, and the last clear reflection",
    video: "/kovra/KV-V3.mp4",
    poster: "/kovra/KV-V3-poster.jpg",
    far: "/kovra/KV-S5.jpg",
    start: 0.75,
  },
];

const sights = [
  { id: "01", km: 118, name: "GORGE GATE", copy: "A split in the basalt where the river turns north.", scene: "02" },
  { id: "02", km: 224, name: "BELL BRIDGE", copy: "The old crossing rings once when the thaw arrives.", scene: "03" },
  { id: "03", km: 271, name: "MILL WHEEL", copy: "Oak, iron, and a century of patient rotation.", scene: "03" },
  { id: "04", km: 412, name: "LANTERN QUAY", copy: "The final landing before fresh water meets salt.", scene: "04" },
];

const split = (value: string) => {
  let charIndex = 0;
  return value.split(" ").map((word, wordIndex) => (
    <span className="kovra-word" aria-hidden="true" key={`${value}-w${wordIndex}`}>
      {[...word].map((char) => (
        <span
          className="kovra-char"
          key={`${value}-${charIndex}`}
          style={{ "--char": charIndex++ } as CSSProperties}
        >
          {char}
        </span>
      ))}
    </span>
  ));
};

function useKovraRuntime(ref: RefObject<HTMLElement | null>) {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const pathRef = useRef<SVGPathElement>(null);
  const markerRefs = useRef<Array<SVGGElement | null>>([]);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const reducedRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    let reduced = reducedQuery.matches;
    let mobile = mobileQuery.matches;
    let active = true;
    let inView = true;
    let frame = 0;
    let current = reduced ? 1 : 0;
    let lastScene = -1;
    let loaderStart = performance.now();
    let assetsReady = reduced;
    const passed = sights.map(() => false);
    let lastKm = -1;
    const hudScene = element.querySelector<HTMLElement>("[data-hud-scene]");
    const hudName = element.querySelector<HTMLElement>("[data-hud-name]");
    const hudKm = element.querySelector<HTMLElement>("[data-hud-km]");
    const hudNote = element.querySelector<HTMLElement>("[data-hud-note]");

    reducedRef.current = reduced;
    const setMode = () => {
      reduced = reducedQuery.matches;
      mobile = mobileQuery.matches;
      reducedRef.current = reduced;
      element.dataset.reduced = String(reduced);
      element.dataset.mobile = String(mobile);
      if (reduced) {
        element.style.setProperty("--p", "1");
        element.dataset.state = "terminal";
      } else {
        loaderStart = performance.now();
        element.dataset.state = "loading";
        current = Math.min(current, 0.001);
        start();
      }
    };

    const pauseVideos = () => videoRefs.current.forEach((video) => video?.pause());
    const playScene = (sceneIndex: number) => {
      videoRefs.current.forEach((video, index) => {
        if (!video) return;
        if (index === sceneIndex && !mobile && video.readyState >= 2 && inView) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      });
    };

    const positionSights = () => {
      const path = pathRef.current;
      if (!path) return;
      const length = path.getTotalLength();
      const bounds = element.getBoundingClientRect();
      const copyRects = new Map(scenes.map((scene) => [scene.id, element.querySelector<HTMLElement>(`[data-copy="${scene.id}"]`)?.getBoundingClientRect()]));
      sights.forEach((sight, index) => {
        const point = path.getPointAtLength((sight.km / 412) * length);
        markerRefs.current[index]?.setAttribute("transform", `translate(${point.x} ${point.y})`);
        const card = cardRefs.current[index];
        if (card) {
          const side = point.x > 800 ? "left" : "right";
          card.dataset.side = side;
          const left = (point.x / 1200) * bounds.width;
          card.style.left = `${left}px`;
          card.style.top = `${(point.y / 760) * bounds.height}px`;
          card.style.transform = side === "left" ? "translate(-100%, -50%)" : "translate(0, -50%)";
          const rect = card.getBoundingClientRect();
          const edge = 24;
          if (rect.left < edge) card.style.left = `${left + edge - rect.left}px`;
          if (rect.right > window.innerWidth - edge) card.style.left = `${left - (rect.right - window.innerWidth + edge)}px`;
          let top = rect.top;
          const copyRect = copyRects.get(sight.scene);
          if (copyRect && rect.left < copyRect.right && rect.right > copyRect.left && rect.top < copyRect.bottom && rect.bottom > copyRect.top) {
            top = copyRect.top - rect.height / 2 - edge;
          }
          top = Math.max(edge + rect.height / 2, Math.min(window.innerHeight - edge - rect.height / 2, top));
          card.style.top = `${top - bounds.top}px`;
        }
      });
    };

    const update = (now: number) => {
      if (!active || !inView || reduced) return;
      lenis?.raf(now);
      const distance = element.offsetHeight - window.innerHeight;
      const target = distance > 0
        ? Math.min(1, Math.max(0, -element.getBoundingClientRect().top / distance))
        : 0;
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.0001) current = target;
      element.style.setProperty("--p", current.toFixed(4));

      const sceneIndex = Math.min(3, Math.floor(current / 0.25));
      if (sceneIndex !== lastScene) {
        lastScene = sceneIndex;
        element.dataset.scene = scenes[sceneIndex].id;
        if (element.dataset.state !== "loading") element.dataset.state = "playing";
        element.dataset[`entered${scenes[sceneIndex].id}` as "entered01"] = "true";
        if (hudScene) hudScene.textContent = `${scenes[sceneIndex].id}/04`;
        if (hudName) hudName.textContent = scenes[sceneIndex].index;
        if (hudNote) hudNote.textContent = scenes[sceneIndex].note.replace(/\D/g, "");
        element.dataset.stitch = "true";
        window.setTimeout(() => { if (active) delete element.dataset.stitch; }, 300);
        playScene(sceneIndex);
      }
      if (current >= 0.995) {
        element.dataset.state = "terminal";
      } else if (element.dataset.state === "terminal") {
        element.dataset.state = "playing";
      }
      sights.forEach((sight, index) => {
        if (current >= sight.km / 412) passed[index] = true;
        const marker = markerRefs.current[index];
        marker?.classList.toggle("kovra-marker-lit", passed[index]);
        const card = cardRefs.current[index];
        if (card) card.dataset.active = String(current >= sight.km / 412 && Math.floor(current / 0.25) === Number(sight.scene) - 1);
      });
      const km = current >= 0.995 ? 412 : Math.round(current * 412);
      element.dataset.km = String(km).padStart(3, "0");
      if (km !== lastKm) {
        lastKm = km;
        if (hudKm) hudKm.textContent = String(km).padStart(3, "0");
      }
      frame = requestAnimationFrame(update);
      void now;
    };

    const start = () => {
      if (!frame && !reduced && inView) frame = requestAnimationFrame(update);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      pauseVideos();
    };

    const lenis = reduced ? null : new Lenis({ lerp: 0.12, wheelMultiplier: 1, touchMultiplier: 1.5, autoRaf: false });
    const startWithLenis = () => {
      if (!frame && !reduced && inView) frame = requestAnimationFrame(update);
    };

    const warmAssets = async () => {
      const videos = videoRefs.current.filter(Boolean) as HTMLVideoElement[];
      const videoLoads = videos.map(async (video) => {
        if (video.readyState < 3) await new Promise<void>((resolve) => {
          const done = () => { video.removeEventListener("canplay", done); resolve(); };
          video.addEventListener("canplay", done, { once: true });
          window.setTimeout(resolve, 5500);
        });
        await video.play().catch(() => undefined);
        video.pause();
      });
      const imageLoads = Array.from(element.querySelectorAll<HTMLImageElement>(".kovra-preload"))
        .map((image) => image.decode().catch(() => undefined));
      await Promise.allSettled([...videoLoads, ...imageLoads]);
      assetsReady = true;
    };

    positionSights();
    if (reduced) {
      element.dataset.reduced = "true";
      element.dataset.state = "terminal";
    } else {
      element.dataset.state = "loading";
      void warmAssets();
      startWithLenis();
      window.setTimeout(() => { if (!assetsReady && active) assetsReady = true; }, 6000);
      const loaderTick = window.setInterval(() => {
        if (assetsReady && performance.now() - loaderStart >= 1800) {
          element.dataset.state = "playing";
          element.dataset.loaded = "true";
          window.clearInterval(loaderTick);
        }
      }, 50);
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) startWithLenis(); else stop();
    }, { threshold: 0 });
    observer.observe(element);
    const onVisibility = () => { if (document.hidden) stop(); else startWithLenis(); };
    const onResize = () => { window.setTimeout(() => { lenis?.resize(); positionSights(); }, 150); };
    const onModeChange = () => { stop(); lenis?.destroy(); setMode(); };
    reducedQuery.addEventListener("change", onModeChange);
    mobileQuery.addEventListener("change", onModeChange);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);

    return () => {
      active = false;
      stop();
      lenis?.destroy();
      observer.disconnect();
      reducedQuery.removeEventListener("change", onModeChange);
      mobileQuery.removeEventListener("change", onModeChange);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, [ref]);

  return { videoRefs, pathRef, markerRefs, cardRefs };
}

export function CinematicScrollStoryProof() {
  const wrapperRef = useRef<HTMLElement>(null);
  const runtime = useKovraRuntime(wrapperRef);

  return (
    <main className="kovra" ref={wrapperRef} data-state="loading" data-scene="01" data-km="000">
      <div className="kovra-loader" aria-live="polite">
        <div className="kovra-loader-brackets" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="kovra-loader-lines"><span>KOVRA / FIELD RECORD</span><span>CALIBRATING THREAD</span><span>LOADING FOOTAGE 07/07</span></div>
      </div>

      <div className="kovra-stage">
        <div className="kovra-media-field" aria-hidden="true">
          {scenes.map((scene, index) => (
            <section className={`kovra-scene-stack kovra-scene-${scene.id}`} key={scene.id} data-scene-stack={scene.id}>
              {scene.video && <video ref={(node) => { runtime.videoRefs.current[index] = node; }} className="kovra-base-media kovra-video" muted playsInline loop preload="auto" poster={scene.poster} src={scene.video} />}
              {!scene.video && <img className="kovra-base-media kovra-preload" src={scene.poster} alt="" width="1600" height="1067" loading="eager" />}
              {scene.far && <img className="kovra-far-media kovra-preload" src={scene.far} alt="" width="2400" height="1600" loading="eager" />}
              <div className="kovra-scene-tint" />
              <div className="kovra-scene-veil" />
              <div className="kovra-text-scrim" />
            </section>
          ))}
          <div className="kovra-grain" />
        </div>

        <svg className="kovra-thread" viewBox="0 0 1200 760" preserveAspectRatio="none" aria-hidden="true">
          <defs><filter id="kovra-thread-shadow"><feGaussianBlur stdDeviation="8" /></filter></defs>
          <path className="kovra-thread-shadow" pathLength={1} d="M575 -20 C530 108 690 182 610 292 C522 410 620 462 704 518 C930 568 1080 644 1160 780" />
          <path className="kovra-thread-glow" pathLength={1} d="M575 -20 C530 108 690 182 610 292 C522 410 620 462 704 518 C930 568 1080 644 1160 780" />
          <path ref={runtime.pathRef} className="kovra-thread-line" pathLength={1} d="M575 -20 C530 108 690 182 610 292 C522 410 620 462 704 518 C930 568 1080 644 1160 780" />
          {sights.map((sight, index) => <g className="kovra-marker" ref={(node) => { runtime.markerRefs.current[index] = node; }} key={sight.id}><circle r="8" /><circle r="3" /></g>)}
        </svg>

        <div className="kovra-sight-layer">
          {sights.map((sight, index) => (
            <article className="kovra-sight-card" ref={(node) => { runtime.cardRefs.current[index] = node; }} data-active="false" data-scene-card={sight.scene} data-sight={sight.id} key={sight.id}>
              <span className="kovra-sight-label">SIGHT {sight.id} / KM {sight.km}</span>
              <h2>{sight.name}</h2><p>{sight.copy}</p><i aria-hidden="true" />
            </article>
          ))}
        </div>

        <div className="kovra-scene-copy" aria-live="polite">
          {scenes.map((scene, index) => (
            <article className={`kovra-copy-block kovra-copy-${scene.id}`} data-copy={scene.id} key={scene.id}>
              <p className="kovra-copy-note">{scene.note}</p>
              <h2 aria-label={scene.place}>{split(scene.place)}</h2>
              <p className="kovra-copy-quote">{scene.copy}</p>
              <p className="kovra-copy-detail">{scene.detail}</p>
              <span className="kovra-copy-anchor" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            </article>
          ))}
        </div>

        <h1 className="kovra-wordmark" aria-label="KOVRA"><span aria-hidden="true">{split("KOVRA")}</span></h1>

        <aside className="kovra-hud" aria-label="Kovra field instrument">
          <div className="kovra-brackets" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="kovra-hud-brand"><strong>KOVRA</strong><span>FIELD RECORD / RIVER DESCENT</span></div>
          <div className="kovra-hud-scene"><strong>SCENE <span data-hud-scene>01/04</span> — <span data-hud-name>GLACIER</span></strong><span>KM <b data-hud-km>000</b> / 412</span></div>
          <div className="kovra-hud-flavor">62°24′N / DESCENT 1410 M</div>
          <div className="kovra-hud-bottom"><span className="kovra-hud-cue">SCROLL TO DESCEND<i /></span><span className="kovra-hud-note">FIELD NOTE <b data-hud-note>001</b></span><span className="kovra-hud-terminal">THE RIVER LEAVES EVIDENCE.</span></div>
          <div className="kovra-progress" aria-hidden="true"><span /><i /><i /><i /></div>
          <span className="kovra-hud-thread-label">KOVRA / an unbroken thread</span>
        </aside>
        <div className="kovra-cursor" aria-hidden="true" />
      </div>

      <div className="kovra-reduced-flow">
        {scenes.map((scene) => <section className={`kovra-reduced-scene kovra-reduced-${scene.id}`} key={scene.id}>
          <img src={scene.poster} alt="" width="1600" height="1067" />
          <div className="kovra-reduced-veil" />
          <svg className="kovra-reduced-thread" viewBox="0 0 1200 760" preserveAspectRatio="none" aria-hidden="true"><path d="M575 -20 C530 108 690 182 610 292 C522 410 620 462 704 518 C930 568 1080 644 1160 780" /><path d="M575 -20 C530 108 690 182 610 292 C522 410 620 462 704 518 C930 568 1080 644 1160 780" /></svg>
          <div className="kovra-reduced-copy"><p>{scene.note}</p><h2>{scene.place}</h2><p>{scene.copy}</p><small>{scene.detail}</small>
            <div className="kovra-reduced-sights">{sights.filter((sight) => sight.scene === scene.id).map((sight) => <article key={sight.id}><span>SIGHT {sight.id} / KM {sight.km}</span><strong>{sight.name}</strong><em>{sight.copy}</em></article>)}</div>
          </div>
        </section>)}
      </div>
    </main>
  );
}
