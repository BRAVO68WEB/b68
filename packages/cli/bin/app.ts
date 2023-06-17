#!/usr/bin/env node
import { Command } from 'commander'
const program = new Command()

import status from './commands/status'

program
    .name('b68')
    .description(
        'A CLI tool to interact with BRAVO68WEB API hosted at https://api.b68.dev'
    )
    .version('2.0.0')
    .usage('<command>')

program
    .command('status')
    .name('status')
    .description('Get the status of the API')
    .action(status)

program.parse()
