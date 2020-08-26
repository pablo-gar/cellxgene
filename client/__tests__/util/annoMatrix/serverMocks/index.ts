export const baseDataURL = "https://a.fake.url/api/v0.2";

// @ts-expect-error ts-migrate(2339) FIXME: Property 'CELLXGENE' does not exist on type 'Windo... Remove this comment to see the full error message
window.CELLXGENE = {
  API: {
    prefix: baseDataURL,
    version: "v0.2/",
  },
};

export { schema } from "./schema";
export * from "./routes";
