import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import FastGlob from 'fast-glob';
import handlebars from 'vite-plugin-handlebars';
import Handlebars from 'handlebars';
import showdown from 'showdown';

function pageData(file) {
  const path = file.replace(__dirname + '/src/', '').replace(/^\//, '');
  const pathParts = path.replace(/\..*/, '').split('/');
  pathParts.forEach((part, index) => {
    pathParts[index] = part.charAt(0).toUpperCase() + part.slice(1);
  });
  const directories = [];
  for (const title of pathParts) {
    directories.push({
      title: title,
      url: `${directories.map((dir) => dir.url)}/${title.toLowerCase()}`,
    });
  }
  const directoriesString = JSON.stringify(directories);
  const directoriesJson = JSON.parse(directoriesString);
  return {
    title: 'Gavin Bogie',
    directories: directoriesJson,
  };
}

const partials = FastGlob.sync(resolve(__dirname, "src", "components", "**", "*.hbs"));
for (const partial of partials) {
  const partialName = partial.replace(/.*\/src\/components\/(.*)\.hbs/, '$1');
  const partialContent = fs.readFileSync(partial, 'utf-8');
  Handlebars.registerPartial(partialName, partialContent);
}

function transformMarkdown() {
  return {
    name: 'transform-markdown',
    apply: 'build',
    buildStart() {
      const files = FastGlob.sync(resolve(__dirname, "src", "**", "*.md"));
      const converter = new showdown.Converter();
      files.forEach((file) => {
        const fileName = file.replace(/.*\/(.*)\.md$/, '$1');
        const body = converter.makeHtml(fs.readFileSync(file, 'utf-8'));
        const prepend = `<!DOCTYPE html><html lang="en">{{>head}}<body class="min-h-screen">{{>header}}`;
        const append = '{{>breadcrumbs}}{{>footer}}</body></html>';
        const preHtml = `${prepend}${body}${append}`;
        const data = pageData(file);
        const template = Handlebars.compile(preHtml);
        const html = template(data);
        this.emitFile({
          type: 'asset',
          fileName: `blog/${fileName}.html`,
          source: html,
        });
      });
    }
  }
}

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        ...FastGlob.sync(resolve(__dirname, "src", "**", "*.html")),
      },
      output: {
        entryFileNames: `index.js`,
        chunkFileNames: `app.js`,
        assetFileNames: `[name].[ext]`,
      },
    },
  },
  plugins: [
    transformMarkdown(),
    handlebars({
      context(pagePath) {
        if (pagePath == '/index.html') {
          return {
            title: 'Gavin Bogie',
            directories: [],
            url: '/',
          }
        }
        return {
          ...pageData(pagePath),
        }
      },
      partialDirectory: resolve(__dirname, 'src/components'),
    }),
  ],
})
