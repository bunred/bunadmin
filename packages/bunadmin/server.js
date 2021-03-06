const handler = require("serve-handler")
const http = require("http")

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: "out",
    rewrites: [
      { source: "docs/*/*", destination: "/docs/[category]/[slug].html" },
      { source: "/*/*", destination: "/[group]/[name].html" }
    ]
    // More options: https://github.com/vercel/serve-handler#options
  })
})

server.listen(3000, () => {
  console.log("Running at http://localhost:3000")
})
