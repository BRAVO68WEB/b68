#!/usr/bin/env NODE_OPTIONS=--no-warnings node
import { Command } from 'commander'
const program = new Command()

import status from './commands/status'
import { signin, verifyAuth } from './commands/auth'
import Configstore from 'configstore'
import pkg from '../package.json'

export const conf = new Configstore(pkg.name)

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

program
    .command('auth')
    .name('auth')
    .description('Auth with the API')
    .requiredOption('-s, --signin', 'Sign in to the API', false)
    .requiredOption('-v, --verify', 'Verify your auth status', false)
    .action((options) => {
        if (options.signin) {
            signin()
        } else if (options.verify) {
            verifyAuth()
        } else {
            console.log('Please specify a valid option')
        }
    })

program.parse()
