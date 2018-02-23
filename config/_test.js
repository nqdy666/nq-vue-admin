import { argv } from 'yargs'

const coverage_enabled = !argv.watch

const coverage_reporters = [
  { type: 'lcov' }
]

if (coverage_enabled) {
  coverage_reporters.push(
    { type: 'json-summary', file: 'lcov.json' }
  )
} else {
  coverage_reporters.push(
    { type: 'text-summary' }
  )
}

export default config => ({
  compiler_devtool: 'inline-source-map',
  coverage_enabled,
  coverage_reporters
})
