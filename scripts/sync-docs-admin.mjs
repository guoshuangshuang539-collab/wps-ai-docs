import { cp, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')
const srcDir = resolve(rootDir, 'src', 'docs_admin')
const destDir = resolve(rootDir, 'public', 'docs_admin')

async function main() {
  await mkdir(destDir, { recursive: true })
  await cp(srcDir, destDir, { recursive: true, force: true })
  console.log('[sync-docs-admin] copied src/docs_admin -> public/docs_admin')
}

main().catch((error) => {
  console.error('[sync-docs-admin] failed:', error)
  process.exit(1)
})

