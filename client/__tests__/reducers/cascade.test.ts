import cascadeReducers from "../../src/reducers/cascade";

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("create", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("from Array", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(cascadeReducers([["foo", () => 0]])).toBeInstanceOf(Function);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("from Map", () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(cascadeReducers(new Map([["foo", () => 0]]))).toBeInstanceOf(
      Function
    );
  });
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("cascade", () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test("expected arguments provided & cascade ordering", () => {
    const topLevelState = {};
    const topLevelAction = { type: "test" };

    const reducer = cascadeReducers([
      [
        "foo",
        (currentState: any, action: any, nextSharedState: any, prevSharedState: any) => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(currentState).toBeUndefined();
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(action).toEqual(topLevelAction);
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(nextSharedState).toStrictEqual({});
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(prevSharedState).toBe(topLevelState);
          return 0;
        },
      ],
      [
        "bar",
        (currentState: any, action: any, nextSharedState: any, prevSharedState: any) => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(currentState).toBeUndefined();
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(action).toEqual(topLevelAction);
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(nextSharedState).toStrictEqual({ foo: 0 });
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(prevSharedState).toBe(topLevelState);
          return 99;
        },
      ],
    ]);

    const nextState = reducer(topLevelState, topLevelAction);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(nextState).toStrictEqual({ foo: 0, bar: 99 });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(topLevelState).toStrictEqual({});
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(topLevelAction).toStrictEqual({ type: "test" });
  });
});
