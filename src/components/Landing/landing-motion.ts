import { inView } from "motion";
import { animate } from "motion/mini";

const MOTION_EASE = [0.16, 1, 0.3, 1] as const;
const DESKTOP_PLANE_OFFSETS = [
  "translate3d(-16px, 18px, 0) scale(0.95)",
  "translate3d(8px, -12px, 0) scale(0.9)",
  "translate3d(18px, 16px, 0) scale(0.94)",
];

function animateCompactProjectFigure(figure: HTMLElement) {
  const path = figure.querySelector<SVGPathElement>("[data-compact-path]");
  const plane = figure.querySelector<SVGPathElement>("[data-compact-plane]");
  const nodes = figure.querySelectorAll<SVGCircleElement>(
    "[data-compact-node]",
  );
  const stages = figure.querySelectorAll<HTMLElement>("li");

  if (plane) {
    animate(
      plane,
      {
        opacity: [0, 0.38],
        transform: ["scaleX(0.72)", "scaleX(1)"],
      },
      { duration: 0.62, delay: 0.12, ease: MOTION_EASE },
    );
  }

  if (path) {
    animate(
      path,
      { opacity: [0.2, 1], strokeDashoffset: [1, 0] },
      { duration: 0.78, delay: 0.18, ease: MOTION_EASE },
    );
  }

  nodes.forEach((node, index) => {
    animate(
      node,
      { opacity: [0, 1], transform: ["scale(0.35)", "scale(1)"] },
      {
        duration: 0.34,
        delay: 0.38 + index * 0.1,
        ease: MOTION_EASE,
      },
    );
  });

  stages.forEach((stage, index) => {
    animate(
      stage,
      {
        opacity: [0, 1],
        transform: ["translateY(6px)", "translateY(0)"],
      },
      {
        duration: 0.32,
        delay: 0.48 + index * 0.08,
        ease: MOTION_EASE,
      },
    );
  });
}

function animateDesktopProjectFigure(figure: HTMLElement) {
  const paths = figure.querySelectorAll<SVGPathElement>("[data-project-path]");
  const planes = figure.querySelectorAll<HTMLElement>("[data-project-plane]");
  const stages = figure.querySelectorAll<HTMLElement>("[data-project-stage]");
  const axis = figure.querySelector<HTMLElement>("[data-project-axis]");
  const meta = figure.querySelector<HTMLElement>(
    ".manual-project-figure__meta",
  );

  paths.forEach((path, index) => {
    const finalOpacity = index === 0 ? 0.62 : 0.28;

    animate(
      path,
      { opacity: [0.1, finalOpacity], strokeDashoffset: [1, 0] },
      {
        duration: 0.72,
        delay: 0.08 + index * 0.12,
        ease: MOTION_EASE,
      },
    );
  });

  planes.forEach((plane, index) => {
    animate(
      plane,
      {
        opacity: [0, 1],
        transform: [
          DESKTOP_PLANE_OFFSETS[index],
          "translate3d(0, 0, 0) scale(1)",
        ],
      },
      {
        duration: 0.62,
        delay: 0.18 + index * 0.09,
        ease: MOTION_EASE,
      },
    );
  });

  stages.forEach((stage, index) => {
    animate(
      stage,
      {
        opacity: [0, 1],
        transform: ["translateY(10px)", "translateY(0)"],
      },
      {
        duration: 0.36,
        delay: 0.5 + index * 0.09,
        ease: MOTION_EASE,
      },
    );
  });

  if (axis) {
    animate(
      axis,
      { transform: ["scaleX(0)", "scaleX(1)"] },
      { duration: 0.5, delay: 0.42, ease: MOTION_EASE },
    );
  }

  if (meta) {
    animate(
      meta,
      { opacity: [0, 1], transform: ["translateY(-6px)", "translateY(0)"] },
      { duration: 0.38, delay: 0.34, ease: MOTION_EASE },
    );
  }
}

function animateProjectFigure() {
  const compactFigure = document.querySelector<HTMLElement>(
    "[data-project-compact]",
  );

  if (window.matchMedia("(max-width: 600px)").matches && compactFigure) {
    animateCompactProjectFigure(compactFigure);
    return;
  }

  const desktopFigure = document.querySelector<HTMLElement>(
    "[data-project-figure]",
  );

  if (desktopFigure) animateDesktopProjectFigure(desktopFigure);
}

function setupTeamFlow() {
  const teamFlow = document.querySelector<HTMLElement>("[data-team-flow]");
  if (!teamFlow) return;

  inView(
    teamFlow,
    () => {
      const nodes = teamFlow.querySelectorAll<HTMLElement>("[data-team-node]");

      nodes.forEach((node, index) => {
        animate(
          node,
          {
            opacity: [0.25, 1],
            transform: ["translateY(7px)", "translateY(0)"],
          },
          {
            duration: 0.36,
            delay: index * 0.16,
            ease: MOTION_EASE,
          },
        );
      });
    },
    { amount: 0.45 },
  );
}

function setupCapabilitiesList() {
  const capabilitiesList = document.querySelector<HTMLElement>(
    "[data-capabilities-list]",
  );
  if (!capabilitiesList) return;

  inView(
    capabilitiesList,
    () => {
      const capabilities =
        capabilitiesList.querySelectorAll<HTMLElement>("[data-capability]");

      capabilities.forEach((capability, index) => {
        animate(
          capability,
          {
            clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
            opacity: [0.3, 1],
            transform: ["translateX(-8px)", "translateX(0)"],
          },
          {
            duration: 0.42,
            delay: index * 0.07,
            ease: MOTION_EASE,
          },
        );
      });
    },
    { amount: 0.2, margin: "0px 0px -10% 0px" },
  );
}

function setupChapterState(reduceMotion: boolean) {
  const manualState = document.querySelector<HTMLElement>(
    "[data-manual-state]",
  );
  const manualChapters = Array.from(
    document.querySelectorAll<HTMLElement>("[data-manual-chapter]"),
  );

  if (
    !manualState ||
    manualChapters.length === 0 ||
    !("IntersectionObserver" in window)
  ) {
    return;
  }

  const chapterObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      const nextState = (visibleEntry?.target as HTMLElement | undefined)
        ?.dataset.manualChapter;

      if (!nextState || manualState.textContent === nextState) return;

      manualState.textContent = nextState;

      if (!reduceMotion) {
        animate(
          manualState,
          {
            opacity: [0.45, 1],
            transform: ["translateY(5px)", "translateY(0)"],
          },
          { duration: 0.22, ease: MOTION_EASE },
        );
      }
    },
    { threshold: [0.25, 0.5, 0.75] },
  );

  manualChapters.forEach((chapter) => chapterObserver.observe(chapter));
}

export function initLandingMotion() {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!reduceMotion) {
    animateProjectFigure();
    setupTeamFlow();
    setupCapabilitiesList();
  }

  setupChapterState(reduceMotion);
}
