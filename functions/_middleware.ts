// www.incubatelabs.ai -> incubatelabs.ai (301), so search engines see one host.
// Everything else passes straight through.

export const onRequest: PagesFunction = async ({ request, next }) => {
  const url = new URL(request.url);
  if (url.hostname === "www.incubatelabs.ai") {
    url.hostname = "incubatelabs.ai";
    return Response.redirect(url.toString(), 301);
  }
  return next();
};
