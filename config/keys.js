import keysProd from "./prod.js";
let keysDev;

let keys;
export default keys =
  process.env.NODE_ENV === "production"
    ? keysProd
    : (await import("./dev.js")).default;
