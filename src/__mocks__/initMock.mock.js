const { JSDOM } = require("jsdom");
const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
const { window } = jsdom;
function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target)
  });
}
global.window = window;
global.document = window.document;
global.document.isJest = true;
const sessionStorageMock = {
  getItem: () => "{}",
  setItem: jest.fn(),
  clear: jest.fn()
};
global.sessionStorage = sessionStorageMock;
global.localStorage = sessionStorageMock;
global.navigator = {
  vendorSub: "",
  productSub: "20030107",
  vendor: "Google Inc.",
  maxTouchPoints: 0,
  hardwareConcurrency: 12,
  cookieEnabled: true,
  appCodeName: "Mozilla",
  appName: "Netscape",
  appVersion:
    "5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
  platform: "MacIntel",
  product: "Gecko",
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
  language: "en-GB",
  languages: (3)[("en-GB", "en-US", "en")],
  onLine: true,
  doNotTrack: null
};
global.requestAnimationFrame = function(callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function(id) {
  clearTimeout(id);
};
copyProps(window, global);
