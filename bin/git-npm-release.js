#!/usr/bin/env node
'use strict';

const path        = require('path')
const fs          = require('fs')
const Releaser    = require('../lib/releaser').default
const r           = new Releaser()
const permission  = process.argv.length > 2 ? process.argv[2] : 'public'
r.release(permission)
