/** @jsxImportSource react **/
import { serve } from "bun";
import { renderToReadableStream } from "react-dom/server";
import App from "./App";
import { apiRoutes } from "./api/routes";
import service from "./features/contest/contest.service";
import type { Contest } from "./features/contest/contest.type";


if (import.meta.env.IS_DEV) {
  console.log("Building hydrate...");
  await Bun.build({
    entrypoints: ['./src/hydrate.tsx'],
    outdir: './public',
    minify: true,
    publicPath: '/public',
    naming: 'hydrate.mjs',
    format: 'esm',
    target: 'bun',
  });
}

const server = serve({
  port: import.meta.env.PORT || 3000,
  development: {
    hmr: true,
    console: true,
  },
  websocket: {
    message(ws) {
      server.publish("chat", "Hello everyone!");
    },
  },

  routes: {
    ...apiRoutes,

    '/public/*': (req) => {
      const cleanUrl = req.url.split('/public/')[1];
      const publicDir = Bun.file('./public/' + cleanUrl);
      return new Response(publicDir.stream());
    },
    '/*': async (req) => {

      const rest: {
        contest?: Contest

      } = {}

      const splittedUrl = req.url.split('/');

      if (req.method === 'GET' && req.url.includes('/contest/')) {
        const index = splittedUrl.findIndex(url => url === 'contest');
        const key = splittedUrl[index + 1];

        const contest = await service.getContest(key);
        console.log(contest);
        if (contest) rest.contest = contest;
      }

      const url = new URL(req.url);

      const props = { url, ...rest };

      const stream = await renderToReadableStream(
        <App {...props} />,
        {
          bootstrapModules: ['/public/hydrate.mjs'],
          progressiveChunkSize: 10000,

        }
      );

      const html = await new Response(stream).text();
      const propsScript = `<script>window.__INITIAL_PROPS__ = ${JSON.stringify(props)};</script>`;
      const modifiedHtml = html.replace('</head>', `${propsScript}</head>`);

      return new Response(modifiedHtml, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      });
    }
  },
});
