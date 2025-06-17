import { concat } from 'eslint-flat-config-utils'
import * as plugin from 'eslint-plugin-regexp'

export const regexp = () => concat(plugin.configs['flat/recommended'])
