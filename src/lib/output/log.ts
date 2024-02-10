import { bold, green, magenta, red, white, yellow } from "colorette";

// # Credits to the Vercel Team for the original implementation
// # vercel/next.js, MIT License

export const prefixes = {
  error: red(bold("⨯")),
  event: green(bold("✓")),
  info: white(bold(" ")),
  ready: "▲",
  trace: magenta(bold("»")),
  wait: white(bold("○")),
  warn: yellow(bold("⚠")),
} as const;

const LOGGING_METHOD = {
  error: "error",
  log: "log",
  warn: "warn",
} as const;

function prefixedLog(
  prefixType: keyof typeof prefixes,
  ...message: unknown[]
): void {
  if ((message[0] === "" || message[0] === undefined) && message.length === 1) {
    message.shift();
  }

  const consoleMethod: keyof typeof LOGGING_METHOD =
    prefixType in LOGGING_METHOD
      ? LOGGING_METHOD[prefixType as keyof typeof LOGGING_METHOD]
      : "log";

  const prefix = prefixes[prefixType];

  // If there's no message, don't print the prefix but a new line
  if (message.length === 0) {
    console[consoleMethod]("");
  } else {
    // biome-ignore lint/style/useTemplate: <explanation>
    console[consoleMethod](" " + prefix, ...message);
  }
}

export function bootstrap(...message: unknown[]): void {
  console.log(" ", ...message);
}

export function wait(...message: unknown[]): void {
  prefixedLog("wait", ...message);
}

export function error(...message: unknown[]): void {
  prefixedLog("error", ...message);
}

export function warn(...message: unknown[]): void {
  prefixedLog("warn", ...message);
}

export function ready(...message: unknown[]): void {
  prefixedLog("ready", ...message);
}

export function info(...message: unknown[]): void {
  prefixedLog("info", ...message);
}

export function event(...message: unknown[]): void {
  prefixedLog("event", ...message);
}

export function trace(...message: unknown[]): void {
  prefixedLog("trace", ...message);
}

const warnOnceMessages = new Set();

export function warnOnce(...message: unknown[]): void {
  if (warnOnceMessages.has(message[0])) {
    return;
  }

  warnOnceMessages.add(message.join(" "));

  warn(...message);
}
