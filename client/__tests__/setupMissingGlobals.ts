/*
Define globals which are present in the client, but not in node (and therefore not in
the jest test environment).
*/

import { TextDecoder, TextEncoder } from "util";

// @ts-expect-error ts-migrate(2339) FIXME: Property 'TextDecoder' does not exist on type 'Glo... Remove this comment to see the full error message
global.TextDecoder = TextDecoder;
// @ts-expect-error ts-migrate(2339) FIXME: Property 'TextEncoder' does not exist on type 'Glo... Remove this comment to see the full error message
global.TextEncoder = TextEncoder;
