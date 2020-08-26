import undoable from "../../src/reducers/undoable";

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("create", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("no keys", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(() => undoable(() => {})).toThrow();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(() => undoable(() => {}, null)).toThrow();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(() => undoable(() => {}, [])).toThrow();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(() => undoable(() => {}, [], {})).toThrow();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("simple", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(undoable(() => {}, ["foo"])).toBeInstanceOf(Function);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(undoable(() => {}, ["foo"], {})).toBeInstanceOf(Function);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("handles undefined initial state", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(
      undoable(() => {}, ["a"])(undefined, { type: "test" })
    ).toMatchObject({});
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("undo", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("expected state modifications", () => {
    const initialState = { a: 0, b: 1000 };
    const reducer = (state: any) => {
      return { a: state.a + 1, b: state.b + 1 };
    };
    const undoableReducer = undoable(reducer, ["a"]);

    const s1 = undoableReducer(initialState, { type: "test" });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(s1).toMatchObject({ a: 1, b: 1001 });

    // test that only specified keys are undone
    const s2 = undoableReducer(s1, { type: "@@undoable/undo" });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(s2).toMatchObject({ a: 0, b: 1001 });

    // test backstop when no more history
    const s3 = undoableReducer(s2, { type: "@@undoable/undo" });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(s3).toMatchObject({ a: 0, b: 1001 });
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("redo", () => {
  const initialState = { a: 0, b: 1000 };
  const reducer = (state: any) => {
    return { a: state.a + 1, b: state.b + 1 };
  };
  let UR: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(() => {
    UR = undoable(reducer, ["a"]);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("expected state modifications", () => {
    const s1 = UR(initialState, { type: "test" });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(s1).toMatchObject({ a: 1, b: 1001 });

    // verify undo->redo reverts state.
    const s2 = UR(UR(s1, { type: "@@undoable/undo" }), {
      type: "@@undoable/redo",
    });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(s2).toMatchObject({ a: 1, b: 1001 });

    // verify backstop when no redo future
    const s3 = UR(s2, { type: "@@undoable/redo" });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(s3).toMatchObject({ a: 1, b: 1001 });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("history cleared", () => {
    // verify future cleared upon a normal state transition
    const s1 = UR(initialState, { type: "test" });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(s1).toMatchObject({ a: 1, b: 1001 });
    const s2 = UR(s1, { type: "@@undoable/undo" });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(s2).toMatchObject({ a: 0, b: 1001 });
    const s3 = UR(s2, { type: "test" });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(s3).toMatchObject({ a: 1, b: 1002 });
    const s4 = UR(s3, { type: "@@undoable/redo" });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(s4).toMatchObject({ a: 1, b: 1002 });
  });
});

/*
TODO:
- historyLimit is enforced
- action filters
*/
