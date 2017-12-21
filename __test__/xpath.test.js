const PageObject = require('../index')

describe('xpath method implementation', () => {
  const pageObject = new PageObject({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  const targetUrl = 'https://ya.ru/'

  afterAll(async () => {
    await pageObject.close()
  })

  test('Returns one element when find one element', async () => {
    await pageObject.init()
    await pageObject.open(targetUrl)

    const queryInput = await pageObject.xpath('//*[@id="text"]')

    expect(queryInput.length).not.toBeDefined()
    expect(queryInput).not.toBeNull()
  })

  test('Returns array of elements when elements more than one', async () => {
    await pageObject.page.type('#text', 'Hello world')
    await pageObject.page.keyboard.down('Enter')
    await pageObject.page.waitForSelector('.serp-list')

    const results = await pageObject.xpath('//*[contains(@class, "serp-item")]')

    expect(results.length).not.toEqual(0)
    expect(results.length).toBeDefined()
    expect(results).not.toBeNull()
  })

  test('Returns null when elements not found', async () => {
    const fakeElement = await pageObject.xpath('//*[@class="395f6392-0137-49ec-9276-0a3863c468a4"]')

    expect(fakeElement).toBeNull()
  })
})
