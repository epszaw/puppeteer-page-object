const PageObject = require('../index')

describe('Main class functionality', () => {
  const pageObject = new PageObject({
    headless: true,
    screenshotsPath: '__test__/screenshots',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  const targetUrl = 'https://ya.ru/'

  afterAll(async () => {
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
})
