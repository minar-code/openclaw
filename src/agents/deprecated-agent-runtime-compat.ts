import {
  OPENCLAW_AGENT_RUNTIME_ID,
  normalizeEmbeddedAgentRuntime,
  type EmbeddedAgentRuntime,
} from "./agent-runtime-id.js";

const DEPRECATED_PI_AGENT_RUNTIME_ID = "pi";

/** @deprecated Compatibility for shipped config/session/env values that used the old Pi runtime id. */
export function normalizeDeprecatedAgentRuntimeId(raw: string | undefined): EmbeddedAgentRuntime {
  const runtime = normalizeEmbeddedAgentRuntime(raw);
  return runtime === DEPRECATED_PI_AGENT_RUNTIME_ID ? OPENCLAW_AGENT_RUNTIME_ID : runtime;
}

/** @deprecated Compatibility for shipped config/session/env values that used the old Pi runtime id. */
export function normalizeOptionalDeprecatedAgentRuntimeId(
  raw: unknown,
): EmbeddedAgentRuntime | undefined {
  if (typeof raw !== "string") {
    return undefined;
  }
  const value = raw.trim().toLowerCase();
  return value ? normalizeDeprecatedAgentRuntimeId(value) : undefined;
}

export function resolveEmbeddedAgentRuntime(
  env: NodeJS.ProcessEnv = process.env,
): EmbeddedAgentRuntime {
  return (
    normalizeOptionalDeprecatedAgentRuntimeId(env.OPENCLAW_AGENT_RUNTIME) ??
    OPENCLAW_AGENT_RUNTIME_ID
  );
}
