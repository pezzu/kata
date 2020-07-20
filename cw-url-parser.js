module.exports = {
  extractId: (urlOrSlug) => {
    const url = new RegExp(/https:\/\/www\.codewars\.com\/kata\/([^\/]+)/i);
    return url.test(urlOrSlug)? urlOrSlug.match(url)[1] : urlOrSlug;
  }
}