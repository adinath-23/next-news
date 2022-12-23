const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");

const sitemap = async (req, res) => {
  // An array with your pages. 
  const links = [
    { url: "/", changefreq: "hourly", priority: 1 },
    { url: "/business", changefreq: "hourly", priority: 0.7 },
    { url: "/sports", changefreq: "hourly", priority: 0.7 },
    { url: "/science", changefreq: "hourly", priority: 0.7 },
    { url: "/entertainment", changefreq: "hourly", priority: 0.7 },
    { url: "/health", changefreq: "hourly", priority: 0.7 },
    { url: "/technology", changefreq: "hourly", priority: 0.7 },
  ]

  // Create a stream to write to
  const stream = new SitemapStream({ hostname: `https://${req.headers.host}` });

  res.writeHead(200, {
    "Content-Type": "application/xml",
  });

  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then((data) => data.toString());

  res.end(xmlString);
};

export default sitemap