#!/usr/bin/env node

import fsPromise from 'fs/promises';

import { exec } from 'child_process';
import { promisify } from 'util';

const promisifiedExec = promisify(exec);

const normalize = str => (str === '' ? false : true);

const templateJSOnFile = JSON.parse(
  await fsPromise.readFile('./template.json', { encoding: 'utf-8' })
);

// TODO add support for devDependencies
const dependencies = Object.entries(templateJSOnFile.package.dependencies);

const promiseResults = await Promise.allSettled(
  dependencies.map(async ([packageName, currVer]) => {
    try {
      const { stdout, stderr } = await promisifiedExec(`npm show ${packageName} version`);
      if (normalize(stderr)) throw stderr;
      return [packageName, `^${stdout.replace('\n', '')}`];
    } catch (error) {
      console.error(error);
      return [packageName, currVer];
    }
  })
);

const updatedDeps = promiseResults.map(({ value }) => value);
templateJSOnFile.package.dependencies = Object.fromEntries(updatedDeps);

await fsPromise.writeFile('./template.json', JSON.stringify(templateJSOnFile, null, 2));
console.log('Packages updated!');
