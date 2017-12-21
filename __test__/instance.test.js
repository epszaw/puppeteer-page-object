const PageObject = require('../index')

class YaPageObject extends PageObject {
  async typeRequest(request) {
    await this.page.type('[name=text]', request)
  }

  async pressEnter() {
    await this.page.keyboard.down('Enter')
  }

  async assertResultsWereShowed() {
    await this.page.waitForSelector('.serp-list')
  }

  async assertResultsNotEmpty() {
    const items = await this.page.$('.serp-item')

    return items.length !== 0
  }
}

describe('Extended functionality with methods', () => {
  const targetUrl = 'https://ya.ru/'

  afterAll(async () => {
    await yaPage.close()
  })

  const yaPage = new YaPageObject({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  test('Pass all test via page object instance', async () => {
    await yaPage.init()

    await yaPage.open(targetUrl)
    await yaPage.typeRequest('Hello world!')
    await yaPage.pressEnter()
    await yaPage.assertResultsWereShowed()

    expect(await yaPage.assertResultsNotEmpty()).toBeTruthy()
  })
})
