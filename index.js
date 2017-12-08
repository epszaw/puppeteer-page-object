const puppeteer = require('puppeteer')
const path = require('path')

class PageObject {
  constructor (options) {
    const {
      scenarioName = '',
      headless = false,
      screenshotsPath = 'screenshots'
    } = options

    this.screenshotsPath = screenshotsPath
    this.headless = headless
    this.scenarioName = scenarioName
    this.browser = null
    this.page = null
  }

  generateScreenshotName () {
    const date = new Date()
    const fileNameDate = date.toString().replace(/ /gm, '_')

    if (this.scenarioName) {
      return `${this.scenarioName}_${fileNameDate}.jpg`
    }

    return fileNameDate
  }

  async init () {
    this.browser = await puppeteer.launch({
      headless: this.headless
    })
    this.page = await this.browser.newPage()
  }

  async screenshot () {
    return await this.page.screenshot({
      path: path.join(this.screenshotsPath, this.generateScreenshotName())
    })
  }

  async open (url) {
    return await this.page.goto(url)
  }

  async close () {
    await this.browser.close()
  }
}

module.exports = PageObject
