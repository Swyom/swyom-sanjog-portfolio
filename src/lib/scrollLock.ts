// Reference-counted body scroll lock so stacked overlays (preloader, modals,
// mobile menu) never unlock the page while another overlay is still open.
let lockCount = 0;
let previousOverflow = '';
let previousPaddingRight = '';

export const lockScroll = () => {
  if (lockCount === 0) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    previousOverflow = document.body.style.overflow;
    previousPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
  lockCount++;
};

export const unlockScroll = () => {
  if (lockCount === 0) return;
  lockCount--;
  if (lockCount === 0) {
    document.body.style.overflow = previousOverflow;
    document.body.style.paddingRight = previousPaddingRight;
  }
};
