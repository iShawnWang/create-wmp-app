#!/usr/bin/env node

const D = require('download-git-repo')
const fs = require('fs')
const e = console.error
const l = console.log
const inquirer = require('inquirer')
inquirer
  .prompt([
    {
      name: 'projectName',
      message: 'input project name',
      validate: v => {
        return !!v
      }
    }
  ])
  .then(answers => {
    const p = `./${answers.projectName}`
    try {
      if (!fs.existsSync(p)) {
        fs.mkdirSync(p)
      }
      const dir = fs.readdirSync(p)
      if (dir.length > 0) {
        e('Ensure the dir is empty !')
        return
      }
      l('Downloading project base files ...')
      D('iShawnWang/create-wmp-app', p, err => {
        if (err) {
          e(err)
        } else {
          l(`${answers.projectName} : Generate done, good luck ~`)
        }
      })
    } catch (error) {
      e(error)
    }
  })
