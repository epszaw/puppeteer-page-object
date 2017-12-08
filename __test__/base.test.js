const fs = require('fs')
const path = require('path')
const PageObject = require('../index')

describe('Main class functionality', () => {
  const pageObject = new PageObject({
    screenshotsPath: '__test__/screenshots'
  })
  const targetUrl = 'https://ya.ru/'
  const screenshotsDir = path.join(__dirname, 'screenshots')

  afterAll(async() => {
    await pageObject.close()
  })

  test('.init() creates browser and page instance', async () => {
    await pageObject.init()

    expect(pageObject.browser).not.toBeNull()
    expect(pageObject.page).not.toBeNull()
  })

  test('.open(url) opens url in browser', async () => {
    await pageObject.open(targetUrl)

    const pageUrl = await pageObject.page.url()

    expect(pageUrl).toEqual(targetUrl)
  })

  test('.screenshot() takes screenshot and save it to __test__/screenshots', async () => {
    await pageObject.open(targetUrl)

    const pageUrl = await pageObject.page.url()

    await pageObject.screenshot()

    const screenshots = fs.readdirSync(screenshotsDir)

    expect(screenshots).not.toHaveLength(0)

    screenshots.forEach((screenshot) => {
      fs.unlinkSync(path.join(screenshotsDir, screenshot))
    })
  })
})
