# LNP Unblocker
### Chrome extension for unblocking paywalled articles on lancasteronline.com

This Google Chrome extension will allow you to read lancasteronline.com uninhibited without a subscription of any kind. Currently, when you click an article, the entire page will be loaded including the article. Then, the paywall will obscure the content with a bit of JavaScript. This extension is very minimal and simply reverses this action.

## Installation
* [Download](https://slr-dist.s3.us-east-2.amazonaws.com/lnp-unblocker.zip) the extension
* Open Chrome Extensions (paste `chrome://extensions/` in the address bar and hit enter)
* In upper right, turn on Developer Mode
* Drag and drop the extension you just downloaded (`lnp-unblocker.zip`) into the Extensions window you now have open

## Development
```
yarn install
```
Build:
```
yarn run build
```
Zip file will be placed in `dist` folder

