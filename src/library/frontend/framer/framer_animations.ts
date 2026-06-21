export const FLY_UP = {
  initial: { opacity: 1, y: "50px", zIndex:-1 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1 },
}

export const FLY_UP_WITH_FADE = {
  initial: { opacity: 0, y: "50px", zIndex:-1 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1 },
}

export const DROP_IN = {
  initial: { opacity: 0, y: "-50px", zIndex:-1 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1 },
}

export const FADE_IN = {
  initial: { opacity: 0, zIndex: 1 },
  animate: { opacity: 1, zIndex: 1 },
  transition: { duration: 1 },
};

export const DROP_IN_WITH_FADE = {
  initial: { opacity: 0, y: "-50px", zIndex:-1 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1 },
}

export const DROP_IN_WITH_FADE_DELAYED = {
  initial: { opacity: 0, y: "-50px", zIndex: -1 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay: 1 },
};

export const SLIDE_RIGHT_TO_LEFT_PAGE = {
  initial: { x: '100%' },
  animate: { x: 0, transition: { duration: 0.2 } },
  exit: { x: '100%', transition: { duration: 0.2 } },
};

export const SLIDE_IN_RIGHT_TO_LEFT_WITH_FADE = {
  initial: { opacity: 0, x: "250px", zIndex: -1 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 1 },
};

export const TWIST_IN_WITH_FADE = {
  initial: {
    rotate: 0,
    zIndex: -1,
    opacity: 0
  },
  animate: {
    rotate: [45, 0],
    opacity:1,
  },
  transition: {
    duration: 1,
    ease: "easeInOut",
  },
};
