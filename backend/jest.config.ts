import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config = {
  verbose: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: `<rootDir>${compilerOptions.baseUrl}`}),
  modulePaths: ['<rootDir>'],
};

export default config;
