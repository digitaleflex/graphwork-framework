#!/usr/bin/env node

const { Config } = require('@oclif/config');
const { Main } = require('@oclif/command');

async function run() {
  const config = await Config.load();
  await Main.run([], config);
}

run().catch(require('@oclif/errors/handle'));