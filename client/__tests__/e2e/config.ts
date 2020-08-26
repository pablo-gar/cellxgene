// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module '../../../environment.default.j... Remove this comment to see the full error message
import * as ENV_DEFAULT from "../../../environment.default.json";

export const jestEnv = process.env.JEST_ENV || ENV_DEFAULT.JEST_ENV;
export const appUrlBase =
  process.env.CXG_URL_BASE || `http://localhost:${ENV_DEFAULT.CXG_CLIENT_PORT}`;
export const DATASET = "pbmc3k";
export const isDev = jestEnv === ENV_DEFAULT.DEV;
export const isDebug = jestEnv === ENV_DEFAULT.DEBUG;
