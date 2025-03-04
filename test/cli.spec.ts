import { join } from 'node:path'
import process from 'node:process'
import { execa } from 'execa'
import { ensureDir, readFile, readJSON, rm, writeFile } from 'fs-extra'
import { afterAll, beforeEach, expect, it } from 'vitest'

const CLI_PATH = join(__dirname, '../bin/index.js')
const genPath = join(__dirname, '..', randomStr())

function randomStr() {
  return Math.random().toString(36).slice(2)
}

async function run(params: string[] = [], env = {
  SKIP_PROMPT: '1',
  NO_COLOR: '1',
}) {
  return execa('node', [CLI_PATH, ...params], {
    cwd: genPath,
    env: {
      ...process.env,
      ...env,
    },
  })
};

async function createMockDir() {
  await rm(genPath, { recursive: true, force: true })
  await ensureDir(genPath)

  await Promise.all([
    writeFile(join(genPath, 'package.json'), JSON.stringify({}, null, 2)),
    writeFile(join(genPath, '.eslintrc.yml'), ''),
    writeFile(join(genPath, '.eslintignore'), 'some-path\nsome-file'),
    writeFile(join(genPath, '.prettierc'), ''),
    writeFile(join(genPath, '.prettierignore'), 'some-path\nsome-file'),
  ])
};

beforeEach(async () => await createMockDir())
afterAll(async () => await rm(genPath, { recursive: true, force: true }))

it('package.json updated', async () => {
  const { stdout } = await run()

  const pkgContent: Record<string, any> = await readJSON(join(genPath, 'package.json'))

  expect(JSON.stringify(pkgContent.devDependencies)).toContain('@jhqn/eslint-config')
  expect(stdout).toContain('Changes wrote to package.json')
})

it('esm eslint.config.js', async () => {
  const pkgContent = await readFile('package.json', 'utf-8')
  await writeFile(join(genPath, 'package.json'), JSON.stringify({ ...JSON.parse(pkgContent), type: 'module' }, null, 2))

  const { stdout } = await run()

  const eslintConfigContent = await readFile(join(genPath, 'eslint.config.js'), 'utf-8')
  expect(eslintConfigContent.includes('export default')).toBeTruthy()
  expect(stdout).toContain('Created eslint.config.js')
})

it('ignores files added in eslint.config.js', async () => {
  const { stdout } = await run()

  const eslintConfigContent = (await readFile(join(genPath, 'eslint.config.mjs'), 'utf-8')).replace(/\\/g, '/')

  expect(stdout).toContain('Created eslint.config.mjs')
  expect(eslintConfigContent)
    .toMatchInlineSnapshot(`
      "import jhqn from '@jhqn/eslint-config'

      export default jhqn({
        ignores: ["some-path","**/some-path/**","some-file","**/some-file/**"],
      })
      "
    `)
})

it('suggest remove unnecessary files', async () => {
  const { stdout } = await run()

  expect(stdout).toContain('You can now remove those files manually')
  expect(stdout).toContain('.eslintignore, .eslintrc.yml, .prettierc, .prettierignore')
})
