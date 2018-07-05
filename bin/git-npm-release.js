#!/usr/bin/env node
'use strict';

const path        = require('path')
const fs          = require('fs')
const Releaser    = require('../lib/releaser').default
const r           = new Releaser()
const permission  = process.argv.length > 1 ? process.argv[1] : 'public'
r.release(permission)
