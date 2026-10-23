import { useEffect, useRef, useState } from "react";
import "./CustomCursor.css";

/* ----------------------------------------------------------------
   Detect a capable device ONCE, before render.
   Only fine-pointer + hover devices (mouse/trackpad) should ever
   see this. Touch-only devices skip entirely.
---------------------------------------------------------------- */
const supportsFinePointer = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(pointer: fine)").matches ?? false;
};

const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
  );
};

/* ----------------------------------------------------------------
   The interactive elements we treat as "pointer" targets.
   One selector string — one query — no per-element listeners.
---------------------------------------------------------------- */
const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  '[role="button"]',
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  "label[for]",
  "summary",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const rafRef = useRef(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  /* --------------------------------------------------------------
     1. Gate the whole thing behind capability + preference checks.
        Re-check on changes so a plugged-in mouse starts working and
        an unplugged one stops, without a reload.
  -------------------------------------------------------------- */
  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const refresh = () => {
      setEnabled(supportsFinePointer() && !prefersReducedMotion());
    };

    refresh();
    media.addEventListener?.("change", refresh);
    motion.addEventListener?.("change", refresh);
    return () => {
      media.removeEventListener?.("change", refresh);
      motion.removeEventListener?.("change", refresh);
    };
  }, []);

  /* --------------------------------------------------------------
     2. Only attach the machinery when enabled.
  -------------------------------------------------------------- */
  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("has-custom-cursor");
      return;
    }

    /* Hide native cursor only when the custom one is active.
       A class on <body> scopes this rule to real use. */
    document.body.classList.add("has-custom-cursor");

    /* ---- Mouse move: capture target; RAF loop interpolates ---- */
    const onMove = (e) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    /* ---- Hover detection via event delegation ----
       One listener on the document handles every element
       present AND future — no MutationObserver needed. */
    const onOver = (e) => {
      const hit = e.target.closest(INTERACTIVE_SELECTOR);
      setIsHovering(!!hit);
    };

    const onDown = () => setIsPressed(true);
    const onUp = () => setIsPressed(false);

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    /* ---- RAF smoothing ----
       Lerp the rendered position toward the target so it
       trails the OS cursor by ~15%. Cancel on unmount. */
    const LERP = 0.15;
    const tick = () => {
      const t = targetRef.current;
      const c = currentRef.current;
      c.x += (t.x - c.x) * LERP;
      c.y += (t.y - c.y) * LERP;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${c.x}px, ${c.y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mousedown", onDown, { passive: true });
    document.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [enabled, isVisible]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className={[
        "cursor",
        isHovering ? "cursor--hover" : "",
        isPressed ? "cursor--pressed" : "",
        isVisible ? "cursor--visible" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <span className="cursor__dot" />
      <span className="cursor__ring" />
    </div>
  );
};

export default CustomCursor;
