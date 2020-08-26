/*
Tests included in this file are specific to annotation features
*/
import { appUrlBase, DATASET } from "./config";
import { datasets } from "./data";

import {
  clickOn,
  goToPage,
  waitByClass,
  waitByID,
  getTestId,
  getTestClass,
  getAllByClass,
} from "./puppeteerUtils";

import {
  assertCategoryDoesNotExist,
  calcDragCoordinates,
  createCategory,
  createLabel,
  deleteCategory,
  deleteLabel,
  drag,
  expandCategory,
  renameCategory,
  renameLabel,
  subset,
  duplicateCategory,
} from "./cellxgeneActions";

const data = datasets[DATASET];

const perTestCategoryName = "TEST-CATEGORY";
const perTestLabelName = "TEST-LABEL";

async function setup(config: any) {
  await goToPage(appUrlBase);

  // setup the test fixtures
  await createCategory(perTestCategoryName);
  await createLabel(perTestCategoryName, perTestLabelName);

  if (config.withSubset) {
    await subset({ x1: 0.1, y1: 0.1, x2: 0.8, y2: 0.8 });
  }

  await waitByClass("autosave-complete");
}

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe.each([
  { withSubset: true, tag: "subset" },
  { withSubset: false, tag: "whole" },
])("annotations", (config: any) => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("create a category", async () => {
    await setup(config);

    const categoryName = `category-created-${config.tag}`;

    await assertCategoryDoesNotExist(categoryName);

    await createCategory(categoryName);

    await assertCategoryExists(categoryName);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("delete a category", async () => {
    await setup(config);

    await deleteCategory(perTestCategoryName);
    await assertCategoryDoesNotExist(perTestCategoryName);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("rename a category", async () => {
    await setup(config);

    const newCategoryName = `NEW-${config.tag}`;

    await renameCategory(perTestCategoryName, newCategoryName);
    await assertCategoryDoesNotExist(perTestCategoryName);
    await assertCategoryExists(newCategoryName);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("create a label", async () => {
    await setup(config);

    const labelName = `new-label-${config.tag}`;

    await assertLabelDoesNotExist(perTestCategoryName, labelName);

    await createLabel(perTestCategoryName, labelName);

    await assertLabelExists(perTestCategoryName, labelName);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("delete a label", async () => {
    await setup(config);

    await deleteLabel(perTestCategoryName, perTestLabelName);
    await assertLabelDoesNotExist(perTestCategoryName, perTestLabelName);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("rename a label", async () => {
    await setup(config);

    const newLabelName = "my-cool-new-label";

    await assertLabelDoesNotExist(perTestCategoryName, newLabelName);
    await renameLabel(perTestCategoryName, perTestLabelName, newLabelName);
    await assertLabelDoesNotExist(perTestCategoryName, perTestLabelName);
    await assertLabelExists(perTestCategoryName, newLabelName);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("check cell count for a label loaded from file", async () => {
    await setup(config);

    const duplicateCategoryName = "duplicate";
    await duplicateCategory(duplicateCategoryName);

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    const firstCategoryExpandIcon = await expect(page).toMatchElement(
      getTestClass("category-expand")
    );

    await firstCategoryExpandIcon.click();

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    const expectedCategoryRow = await expect(page).toMatchElement(
      getTestClass("categorical-row")
    );
    const expectedLabelName = await getInnerText(
      expectedCategoryRow,
      "categorical-value"
    );
    const expectedLabelCount = await getInnerText(
      expectedCategoryRow,
      "categorical-value-count"
    );

    await expandCategory(duplicateCategoryName);

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    const expectedCategory = await expect(page).toMatchElement(
      getTestClass("category")
    );

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    const actualCategoryRow = await expect(expectedCategory).toMatchElement(
      getTestClass("categorical-row")
    );
    const actualLabelName = await getInnerText(
      actualCategoryRow,
      "categorical-value"
    );
    const actualLabelCount = await getInnerText(
      actualCategoryRow,
      "categorical-value-count"
    );

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(actualLabelName).toBe(expectedLabelName);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(actualLabelCount).toBe(expectedLabelCount);

    async function getInnerText(element: any, className: any) {
      return element.$eval(getTestClass(className), (node: any) => node?.innerText);
    }
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("assign cells to a label", async () => {
    await setup(config);

    await expandCategory(perTestCategoryName);

    const lassoSelection = await calcDragCoordinates(
      "layout-graph",
      data.categoryLabel.lasso["coordinates-as-percent"]
    );

    await drag("layout-graph", lassoSelection.start, lassoSelection.end, true);
    await waitByID("lasso-element", { visible: true });
    await clickOn(`${perTestCategoryName}:${perTestLabelName}:see-actions`);
    await clickOn(
      `${perTestCategoryName}:${perTestLabelName}:add-current-selection-to-this-label`
    );

    const result = await waitByID(
      `categorical-value-count-${perTestCategoryName}-${perTestLabelName}`
    );

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(await result.evaluate((node: any) => node.innerText)).toBe(
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      data.categoryLabel.newCount.bySubsetConfig[config.withSubset]
    );
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("undo/redo category creation", async () => {
    await setup(config);

    const categoryName = `category-created-undo-${config.tag}`;

    await assertCategoryDoesNotExist(categoryName);
    await createCategory(categoryName);
    await assertCategoryExists(categoryName);
    await clickOn("undo");
    await assertCategoryDoesNotExist(categoryName);
    await clickOn("redo");
    await assertCategoryExists(categoryName);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("undo/redo category deletion", async () => {
    await setup(config);

    const categoryName = `category-deleted-undo-${config.tag}`;

    await createCategory(categoryName);
    await assertCategoryExists(categoryName);
    await deleteCategory(categoryName);
    await assertCategoryDoesNotExist(categoryName);
    await clickOn("undo");
    await assertCategoryExists(categoryName);
    await clickOn("redo");
    await assertCategoryDoesNotExist(categoryName);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("undo/redo category rename", async () => {
    await setup(config);

    const newCategoryName = `category-renamed-undo-${config.tag}`;

    await assertCategoryDoesNotExist(newCategoryName);
    await renameCategory(perTestCategoryName, newCategoryName);
    await assertCategoryExists(newCategoryName);
    await assertCategoryDoesNotExist(perTestCategoryName);
    await clickOn("undo");
    await assertCategoryExists(perTestCategoryName);
    await assertCategoryDoesNotExist(newCategoryName);
    await clickOn("redo");
    await assertCategoryExists(newCategoryName);
    await assertCategoryDoesNotExist(perTestCategoryName);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("undo/redo label creation", async () => {
    await setup(config);

    const labelName = `label-created-undo-${config.tag}`;

    await assertLabelDoesNotExist(perTestCategoryName, labelName);
    await createLabel(perTestCategoryName, labelName);
    await assertLabelExists(perTestCategoryName, labelName);
    await clickOn("undo");
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await assertLabelDoesNotExist(perTestCategoryName);
    await clickOn("redo");
    await assertLabelExists(perTestCategoryName, labelName);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("undo/redo label deletion", async () => {
    await setup(config);

    await deleteLabel(perTestCategoryName, perTestLabelName);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await assertLabelDoesNotExist(perTestCategoryName);
    await clickOn("undo");
    await assertLabelExists(perTestCategoryName, perTestLabelName);
    await clickOn("redo");
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await assertLabelDoesNotExist(perTestCategoryName);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("undo/redo label rename", async () => {
    await setup(config);

    const newLabelName = `label-renamed-undo-${config.tag}`;

    await assertLabelDoesNotExist(perTestCategoryName, newLabelName);
    await renameLabel(perTestCategoryName, perTestLabelName, newLabelName);
    await assertLabelExists(perTestCategoryName, newLabelName);
    await assertLabelDoesNotExist(perTestCategoryName, perTestLabelName);
    await clickOn("undo");
    await assertLabelExists(perTestCategoryName, perTestLabelName);
    await assertLabelDoesNotExist(perTestCategoryName, newLabelName);
    await clickOn("redo");
    await assertLabelExists(perTestCategoryName, newLabelName);
    await assertLabelDoesNotExist(perTestCategoryName, perTestLabelName);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("stacked bar graph renders", async () => {
    await setup(config);

    await expandCategory(perTestCategoryName);

    await clickOn(`colorby-louvain`);

    const labels = await getAllByClass("categorical-row");

    const result = await Promise.all(
      labels.map((label: any) => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
        return page.evaluate((element: any) => {
          return element.outerHTML;
        }, label);
      })
    );

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(result).toMatchSnapshot();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("truncate midpoint whitespace", async () => {
    await setup(config);
    const newLabelName = "123 456";
    await renameLabel(perTestCategoryName, perTestLabelName, newLabelName);
    const value = await waitByID(
      `categorical-value-${perTestCategoryName}-${newLabelName}`
    );
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
    const result = await page.evaluate((elem: any) => elem.outerHTML, value);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(result).toMatchSnapshot();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("truncate single character", async () => {
    await setup(config);
    const newLabelName = "T";
    await renameLabel(perTestCategoryName, perTestLabelName, newLabelName);
    const value = await waitByID(
      `categorical-value-${perTestCategoryName}-${newLabelName}`
    );
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
    const result = await page.evaluate((elem: any) => elem.outerHTML, value);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(result).toMatchSnapshot();
  });

  async function assertCategoryExists(categoryName: any) {
    const handle = await waitByID(`${categoryName}:category-label`);

    const result = await handle.evaluate((node: any) => node.getAttribute("aria-label")
    );

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    return expect(result).toBe(categoryName);
  }

  async function assertLabelExists(categoryName: any, labelName: any) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    await expect(page).toMatchElement(
      getTestId(`${categoryName}:category-expand`)
    );

    await expandCategory(categoryName);

    const previous = await waitByID(
      `categorical-value-${categoryName}-${labelName}`
    );

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      await previous.evaluate((node: any) => node.getAttribute("aria-label"))
    ).toBe(labelName);
  }

  async function assertLabelDoesNotExist(categoryName: any, labelName: any) {
    await expandCategory(categoryName);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
    const result = await page.$(
      `[data-testid='categorical-value-${categoryName}-${labelName}']`
    );
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(result).toBeNull();
  }
});
