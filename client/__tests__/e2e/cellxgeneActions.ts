/* eslint-disable no-await-in-loop -- await in loop is needed to emulate sequential user actions  */
import { strict as assert } from "assert";
import {
  clearInputAndTypeInto,
  clickOn,
  getAllByClass,
  getOneElementInnerText,
  typeInto,
  waitByID,
  waitByClass,
  waitForAllByIds,
  clickOnUntil,
  getTestClass,
  getTestId,
  isElementPresent,
} from "./puppeteerUtils";

export async function drag(testId: any, start: any, end: any, lasso = false) {
  const layout = await waitByID(testId);
  const elBox = await layout.boxModel();
  const x1 = elBox.content[0].x + start.x;
  const x2 = elBox.content[0].x + end.x;
  const y1 = elBox.content[0].y + start.y;
  const y2 = elBox.content[0].y + end.y;
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  await page.mouse.move(x1, y1);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  await page.mouse.down();
  if (lasso) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
    await page.mouse.move(x2, y1);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
    await page.mouse.move(x2, y2);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
    await page.mouse.move(x1, y2);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
    await page.mouse.move(x1, y1);
  } else {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
    await page.mouse.move(x2, y2);
  }
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  await page.mouse.up();
}

export async function clickOnCoordinate(testId: any, coord: any) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
  const layout = await expect(page).toMatchElement(getTestId(testId));
  const elBox = await layout.boxModel();

  if (!elBox) {
    throw Error("Layout's boxModel is not available!");
  }

  const x = elBox.content[0].x + coord.x;
  const y = elBox.content[0].y + coord.y;
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  await page.mouse.click(x, y);
}

export async function getAllHistograms(testclass: any, testIds: any) {
  const histTestIds = testIds.map((tid: any) => `histogram-${tid}`);

  // these load asynchronously, so we need to wait for each histogram individually,
  // and they may be quite slow in some cases.
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
  await waitForAllByIds(histTestIds, { timeout: 4 * 60 * 1000 });

  const allHistograms = await getAllByClass(testclass);

  const testIDs = await Promise.all(
    allHistograms.map((hist: any) => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
      return page.evaluate((elem: any) => {
        return elem.dataset.testid;
      }, hist);
    })
  );

  // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
  return testIDs.map((id) => id.replace(/^histogram-/, ""));
}

export async function getAllCategoriesAndCounts(category: any) {
  // these load asynchronously, so we have to wait for the specific category.
  await waitByID(`category-${category}`);

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  return page.$$eval(
    `[data-testid="category-${category}"] [data-testclass='categorical-row']`,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'fromEntries' does not exist on type 'Obj... Remove this comment to see the full error message
    (rows: any) => Object.fromEntries(
      rows.map((row: any) => {
        const cat = row
          .querySelector("[data-testclass='categorical-value']")
          .getAttribute("aria-label");

        const count = row.querySelector(
          "[data-testclass='categorical-value-count']"
        ).innerText;

        return [cat, count];
      })
    )
  );
}

export async function getCellSetCount(num: any) {
  await clickOn(`cellset-button-${num}`);
  return getOneElementInnerText(`[data-testid='cellset-count-${num}']`);
}

export async function resetCategory(category: any) {
  const checkboxId = `${category}:category-select`;
  await waitByID(checkboxId);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  const checkedPseudoclass = await page.$eval(
    `[data-testid='${checkboxId}']`,
    (el: any) => el.matches(":checked")
  );
  if (!checkedPseudoclass) await clickOn(checkboxId);

  const categoryRow = await waitByID(`${category}:category-expand`);

  const isExpanded = await categoryRow.$(
    "[data-testclass='category-expand-is-expanded']"
  );

  if (isExpanded) await clickOn(`${category}:category-expand`);
}

export async function calcCoordinate(testId: any, xAsPercent: any, yAsPercent: any) {
  const el = await waitByID(testId);
  const size = await el.boxModel();
  return {
    x: Math.floor(size.width * xAsPercent),
    y: Math.floor(size.height * yAsPercent),
  };
}

export async function calcDragCoordinates(testId: any, coordinateAsPercent: any) {
  return {
    start: await calcCoordinate(
      testId,
      coordinateAsPercent.x1,
      coordinateAsPercent.y1
    ),
    end: await calcCoordinate(
      testId,
      coordinateAsPercent.x2,
      coordinateAsPercent.y2
    ),
  };
}

export async function selectCategory(category: any, values: any, reset = true) {
  if (reset) await resetCategory(category);

  await clickOn(`${category}:category-expand`);
  await clickOn(`${category}:category-select`);

  for (const value of values) {
    await clickOn(`categorical-value-select-${category}-${value}`);
  }
}

export async function expandCategory(category: any) {
  const expand = await waitByID(`${category}:category-expand`);
  const notExpanded = await expand.$(
    "[data-testclass='category-expand-is-not-expanded']"
  );
  if (notExpanded) await clickOn(`${category}:category-expand`);
}

export async function clip(min = 0, max = 100) {
  await clickOn("visualization-settings");
  await clearInputAndTypeInto("clip-min-input", min);
  await clearInputAndTypeInto("clip-max-input", max);
  await clickOn("clip-commit");
}

export async function createCategory(categoryName: any) {
  await clickOnUntil("open-annotation-dialog", async () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    await expect(page).toMatchElement(getTestId("new-category-name"));
  });

  await typeInto("new-category-name", categoryName);
  await clickOn("submit-category");
}

export async function duplicateCategory(categoryName: any) {
  await clickOn("open-annotation-dialog");

  await typeInto("new-category-name", categoryName);

  const dropdownOptionClass = "duplicate-category-dropdown-option";

  await clickOnUntil("duplicate-category-dropdown", async () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    await expect(page).toMatchElement(getTestClass(dropdownOptionClass));
  });

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
  const option = await expect(page).toMatchElement(
    getTestClass(dropdownOptionClass)
  );

  await option.click();

  await clickOnUntil("submit-category", async () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    await expect(page).toMatchElement(
      getTestId(`${categoryName}:category-expand`)
    );
  });

  await waitByClass("autosave-complete");
}

export async function renameCategory(oldCategoryName: any, newCategoryName: any) {
  await clickOn(`${oldCategoryName}:see-actions`);
  await clickOn(`${oldCategoryName}:edit-category-mode`);
  await clearInputAndTypeInto(
    `${oldCategoryName}:edit-category-name-text`,
    newCategoryName
  );
  await clickOn(`${oldCategoryName}:submit-category-edit`);
}

export async function deleteCategory(categoryName: any) {
  const targetId = `${categoryName}:delete-category`;

  await clickOnUntil(`${categoryName}:see-actions`, async () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    await expect(page).toMatchElement(getTestId(targetId));
  });

  await clickOn(targetId);

  // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
  await assertCategoryDoesNotExist();
}

export async function createLabel(categoryName: any, labelName: any) {
  /**
   * (thuang): This explicit wait is needed, since currently showing
   * the modal again quickly after the previous action dismissing the
   * modal will persist the input value from the previous action.
   *
   * To reproduce:
   * 1. Click on the plus sign to show the modal to add a new label to the category
   * 2. Type `123` in the input box
   * 3. Hover over your mouse over the plus sign and double click to quickly dismiss and
   * invoke the modal again
   * 4. You will see `123` is persisted in the input box
   * 5. Expected behavior is to get an empty input box
   */
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  await page.waitFor(500);

  await clickOn(`${categoryName}:see-actions`);

  await clickOn(`${categoryName}:add-new-label-to-category`);

  await typeInto(`${categoryName}:new-label-name`, labelName);

  await clickOn(`${categoryName}:submit-label`);
}

export async function deleteLabel(categoryName: any, labelName: any) {
  await expandCategory(categoryName);
  await clickOn(`${categoryName}:${labelName}:see-actions`);
  await clickOn(`${categoryName}:${labelName}:delete-label`);
}

export async function renameLabel(categoryName: any, oldLabelName: any, newLabelName: any) {
  await expandCategory(categoryName);
  await clickOn(`${categoryName}:${oldLabelName}:see-actions`);
  await clickOn(`${categoryName}:${oldLabelName}:edit-label`);
  await clearInputAndTypeInto(
    `${categoryName}:${oldLabelName}:edit-label-name`,
    newLabelName
  );
  await clickOn(`${categoryName}:${oldLabelName}:submit-label-edit`);
}

export async function addGeneToSearch(geneName: any) {
  await typeInto("gene-search", geneName);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  await page.keyboard.press("Enter");
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  await page.waitForSelector(`[data-testid='histogram-${geneName}']`);
}

export async function subset(coordinatesAsPercent: any) {
  // In order to deselect the selection after the subset, make sure we have some clear part
  // of the scatterplot we can click on
  assert(coordinatesAsPercent.x2 < 0.99 || coordinatesAsPercent.y2 < 0.99);
  const lassoSelection = await calcDragCoordinates(
    "layout-graph",
    coordinatesAsPercent
  );
  await drag("layout-graph", lassoSelection.start, lassoSelection.end, true);
  await clickOn("subset-button");
  const clearCoordinate = await calcCoordinate("layout-graph", 0.5, 0.99);
  await clickOnCoordinate("layout-graph", clearCoordinate);
}

export async function setSellSet(cellSet: any, cellSetNum: any) {
  const selections = cellSet.filter((sel: any) => sel.kind === "categorical");

  for (const selection of selections) {
    await selectCategory(selection.metadata, selection.values, true);
  }

  await getCellSetCount(cellSetNum);
}

export async function runDiffExp(cellSet1: any, cellSet2: any) {
  await setSellSet(cellSet1, 1);
  await setSellSet(cellSet2, 2);
  await clickOn("diffexp-button");
}

export async function bulkAddGenes(geneNames: any) {
  await clickOn("section-bulk-add");
  await typeInto("input-bulk-add", geneNames.join(","));
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'page'.
  await page.keyboard.press("Enter");
}

export async function assertCategoryDoesNotExist(categoryName: any) {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  const result = await isElementPresent(
    getTestId(`${categoryName}:category-label`)
  );

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
  await expect(result).toBe(false);
}
/* eslint-enable no-await-in-loop -- await in loop is needed to emulate sequential user actions */
