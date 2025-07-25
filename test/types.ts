import type { Linter } from 'eslint'
import type { TypedFlatConfigItem } from '../src';

// Make sure they are compatible
((): Linter.Config => ({} as TypedFlatConfigItem))();
// @ts-expect-error This is a test to ensure compatibility
((): TypedFlatConfigItem => ({} as Linter.Config))()
