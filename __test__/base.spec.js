const PageObject = require('../src/index')

describe('Main class functionality', () => {
  const pageObject = new PageObject()
  const targetUrl = 'https://ya.ru/'

  afterAll(async () => {
    await pageObject.close()
  })

  it('.init() creates browser and page instance', async () => {
    expect.assertions(2)

    await pageObject.init()

    expect(pageObject.browser).not.toBeNull()
    expect(pageObject.page).not.toBeNull()
  })

  it('.open(url) opens url in browser', async () => {
    expect.assertions(1)

    await pageObject.open(targetUrl)

    const pageUrl = await pageObject.page.url()

    expect(pageUrl).toEqual(targetUrl)
  })
})
