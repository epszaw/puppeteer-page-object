const puppeteer = require('puppeteer')
const path = require('path')

/**
 * Small puppeteer page object pattern implementation
 * @constructor
 * @param {Object} options
 * @param {string} options.scenarioName
 * @param {string} options.headless
 * @param {string} options.screenshotsPath
 * @param {Array<string>} options.args
 */
class PageObject {
  constructor(options = {}) {
    this.screenshotsPath = options.screenshotsPath || 'screenshots'
    this.headless = options.headless !== undefined ? options.headless : true
    this.scenarioName = options.scenarioName || ''
    this.args = options.args || ['--no-sandbox', '--disable-setuid-sandbox']

    this.browser = null
    this.page = null
  }

  /**
   * Generates screenshot name with this.scenarioName and current date
   * @example
   * returns 'Fri_Dec_08_2017_14:56:01_GMT+0300_(MSK)'
   * @example
   * returns 'scenario-name_Fri_Dec_08_2017_14:56:01_GMT+0300_(MSK)'
   * @returns {string} screenshot file name
   */
  generateScreenshotName() {
    const date = new Date()
    const fileNameDate = date.toString().replace(/ /gm, '_')

    if (this.scenarioName) {
      return `${this.scenarioName}_${fileNameDate}.jpg`
    }

    return `${fileNameDate}.jpg`
  }

  /**
   * Init page object and define this.browser and this.page instances
   */
  async init() {
    this.browser = await puppeteer.launch({
      headless: this.headless,
      args: this.args,
    })

    this.page = await this.browser.newPage()
  }

  /**
   * Takes screenshot and save it to this.screenshotsPath
   * By default to __dirname/screenshots
   * @param {object} params screenshot parameters
   * @returns {Promise<void>}
   */
  async screenshot(params) {
    return await this.page.screenshot(
      Object.assign(
        {
          path: path.join(this.screenshotsPath, this.generateScreenshotName()),
        },
        params,
      ),
    )
  }

  /**
   * Opens url with page instance
   * @param {string} url
   * @returns {Promise<void>}
   */
  async open(url) {
    return await this.page.goto(url)
  }

  /**
   * Closes current page instance
   * @returns {Promise<void>}
   */
  async close() {
    await this.browser.close()
  }
}

module.exports = PageObject
