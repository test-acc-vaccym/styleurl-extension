const DEV_CHROME_PORT_PREFIX = "STYLEURL_DEV_PORT/";
const PROD_CHROME_PORT_PREFIX = "STYLEURL_PORT/";

const CHROME_PORT_PREFIX =
  process.env.NODE_ENV === "PRODUCTION"
    ? PROD_CHROME_PORT_PREFIX
    : DEV_CHROME_PORT_PREFIX;

export const portName = tabId => {
  return CHROME_PORT_PREFIX + `tab/${tabId}`;
};

export const MESSAGE_TYPES = {
  get_styles_diff: "get_styles_diff"
};
