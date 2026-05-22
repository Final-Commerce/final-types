import { expectType } from "tsd";
import * as finalTypes from "../src/index";

// Smoke: the imported namespace exists. Plan 3b populates it.
expectType<typeof finalTypes>(finalTypes);
