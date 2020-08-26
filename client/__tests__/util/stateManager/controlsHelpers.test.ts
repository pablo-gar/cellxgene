/*
test controls helpers
*/
import { subsetAndResetGeneLists } from "../../../src/util/stateManager/controlsHelpers";
import * as globals from "../../../src/globals";

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("controls helpers", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("subsetAndResetGeneLists", () => {
    const geneList: any = [];
    const genRandGene = () => Math.random().toString(36).substring(2, 6);

    // build a unique set of genes
    for (let i = 0; i < 150; i += 1) {
      let randGene = genRandGene();
      while (geneList.includes(randGene)) randGene = genRandGene();
      geneList.push(randGene);
    }
    // insert duplicates
    geneList[0] = "dupl";
    geneList[20] = "dupl";
    const state = {
      userDefinedGenes: geneList.slice(0, 20),
      diffexpGenes: geneList.slice(20),
    };
    const [newUserDefinedGenes, newDiffExpGenes] = subsetAndResetGeneLists(
      state
    );
    const expectedNewUserDefinedGenes = [
      ...geneList.slice(0, 20),
      ...geneList.slice(21),
    ].slice(0, globals.maxGenes);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(globals.maxUserDefinedGenes).toBeLessThan(globals.maxGenes);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(geneList.length).toBeGreaterThan(globals.maxGenes);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(newUserDefinedGenes).toHaveLength(globals.maxGenes);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(newUserDefinedGenes).toStrictEqual(expectedNewUserDefinedGenes);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(newDiffExpGenes).toStrictEqual([]);
  });
});
