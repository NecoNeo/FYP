import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tailwindcss(), reactRouter(), tsconfigPaths(),

    // 屏蔽报错: Error: No route matches URL "/.well-known/appspecific/com.chrome.devtools.json"
    // 禁用Chrome DevTools 的一个“自动工作区”功能触发的请求
    {
      name: 'block-devtools-json',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/.well-known/appspecific/com.chrome.devtools.json') {
            res.writeHead(204); // No Content
            res.end();
          } else {
            next();
          }
        });
      },
    }
  ]
});
