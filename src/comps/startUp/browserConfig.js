import { hasWindow } from './uAgent';

const checkWebp = async () => {
  const img = new Image();
  img.onload = () => !!(img.height > 0 && img.width > 0);
  img.onerror = () => false;
  img.src = 'data:image/webp;base64, UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';
};

const storageAvailable = (type) => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      e.code === 22
          || e.code === 1014
          || e.name === 'QuotaExceededError'
          || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
          && (storage && storage.length !== 0);
  }
};

const browserConfig = () => {
  let hasLocalStorage = false;
  let hasNavigator = false;
  let isDesktop = true;
  let navLang = false;
  let connectionType = false;
  let saveData = false;
  let hasWebP = false;
  let devicePixelRatio = false;
  let hasVibrate = false;
  let hasTouch = false;
  let themeColor = 'dark';
  // let isMobile = false;

  if (hasWindow()) {
    if ('navigator' in window) {
      hasNavigator = true;
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isDesktop = false;
      }

      console.log('NAVIGATOR', navigator);
      if ('language' in navigator) {
        const fromNav = navigator.language;
        if (fromNav.indexOf('-') !== -1) {
          navLang = fromNav.substring(0, fromNav.indexOf('-'));
        } else {
          navLang = fromNav;
        }
      }
      if ('connection' in navigator) {
        connectionType = navigator.connection.effectiveType;
        saveData = navigator.connection.saveData;
      }
      if ('vibrate' in navigator) {
        hasVibrate = true;
      }
      if (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
        hasTouch = true;
      }
    }
    if ('devicePixelRatio' in window) {
      devicePixelRatio = window.devicePixelRatio;
    }
    if (storageAvailable('localStorage')) {
      hasLocalStorage = true;

      const themeCol = localStorage.getItem('themeColor');
      if (themeCol !== null) {
        themeColor = themeCol;
      } else if ('matchMedia' in window) {
        if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            themeColor = 'dark';
          }
        }
      }
    } else if ('matchMedia' in window) {
      if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          themeColor = 'dark';
        }
      }
    }
  }
  if (checkWebp()) {
    hasWebP = true;
  }
  console.log(window);
  return {
    themeColor,
    client: {
      hasNavigator,
      isDesktop,
      navLang,
      connectionType,
      saveData,
      hasWebP,
      devicePixelRatio,
      hasVibrate,
      hasTouch,
      hasLocalStorage,
    },
  };
};

export default browserConfig;
