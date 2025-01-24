
> a chrome extension tools built with Vite + [VanJS](https://vanjs.org/), and Manifest

## Installing

1. Check if your `Node.js` version is >= **20**.
   1. Optional: Install [bun](https://bun.sh/)
2. Run `bun install` to install the dependencies.
3. Set VITE_API_KEY in .env or via options

## Developing

run the command

`npm run dev` / `bun run dev`

### Chrome Extension Developer Mode

1. set your Chrome browser 'Developer mode' up
2. click 'Load unpacked', and select `your-project/build` folder

### Normal FrontEnd Developer Mode

1. access `http://0.0.0.0:3000/`
2. when debugging popup page, open `http://0.0.0.0:3000//popup.html`
3. when debugging options page, open `http://0.0.0.0:3000//options.html`

## Packing

After the development of your extension run the command

```shell
npm run build
```

Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.

