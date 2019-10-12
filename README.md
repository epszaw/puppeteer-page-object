# Puppeteer page object [![Build Status](https://travis-ci.org/lamartire/puppeteer-page-object.svg?branch=master)](https://travis-ci.org/lamartire/puppeteer-page-object)

Small wrapper on [puppeteer](https://github.com/GoogleChrome/puppeteer/) allows
to you use page object pattern with clean steps and incapsulated methods.

## Installation

Install it with `npm`:

```bash
npm i --save-dev puppeteer-page-object
```

Or yarn:

```bash
yarn add -D puppeteer-page-object
```

## Usage

Follow examples bellow for fast start.

You can also check some examples with cucumber [here](https://github.com/lamartire/puppeteer-cucumber-test).

### Base page object

About all properties you can [here](#properties).

```js
const PageObject = require('puppeteer-page-object')

const examplePageObject = new PageObject({
  scenarioName: 'example-scenario'
})
;async () => {
  await examplePageObject.init()
  await examplePageObject.open('https://example.com')
  await examplePageObject.screenshot()
  await examplePageObject.close()
}
```

### Extending

You can create page object instances and use all power of build in methods and
properties:

```js
const PageObject = require('puppeteer-page-object')

class ExamplePage extends PageObject {
  async typeToInput(text) {
    await this.page.type('#input', text)
  }
}

const examplePageObject = new ExamplePage()
;async () => {
  await examplePageObject.init()
  await examplePageObject.open('https://example.com')
  await examplePageObject.screenshot()
  await examplePageObject.typeToInput('Hello world')
  await examplePageObject.close()
}
```

## Properties

| Name              | Type       | Default value                                  | Description                                        |
| ----------------- | ---------- | ---------------------------------------------- | -------------------------------------------------- |
| `headless`        | `boolean`  | `true`                                         | Headless mode.                                     |
| `scenarioName`    | `string`   | `null`                                         | Scenario name to creates better screenshots names. |
| `screenshotsPath` | `string`   | `screenshots`                                  | Path to save screenshots.                          |
| `args`            | `string[]` | `['--no-sandbox', '--disable-setuid-sandbox']` | Args for puppeteer browser launch.                 |

## Methods

| Name                           | Returns         | Description                                                                                                                                                                                                                           |
| ------------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.init()`                      | `Promise<void>` | Initialize page object, creates `browser` and `page` instance. Must be called before all actions with `browser` and `page` properties.                                                                                                |
| `.open(url: string)`           | `Promise<void>` | Opens given `url`. Sugar for [`this.page.goto`](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagegotourl-options).                                                                                               |
| `.close()`                     | `Promise<void>` | Closes page. Sugar for [`this.browser.close`](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#browserclose).                                                                                                        |
| `.screenshot(params?: object)` | `Promise<void>` | Capture screenshot and save it to dir defined by `this.screenshotsPath`. You can alse pass params-object. Sugar for [`this.page.screenshot`](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagescreenshotoptions) |
| `.generateScreenshotName()`    | `string`        | Generates unique screenshot name with test date and scenario name (if it defined in class instance).                                                                                                                                  |
