export default defineEventHandler(async (event) => {
  // Log event. `.toString()` stringifies to a simple string like `[GET] /<path>`
  console.log(`Request: ${event.toString()}`);

  // // Parse query params
  // const query = getQuery(event)

  // // Try to read request body
  // const body = await readBody(event).catch(() => {})

  // // Echo back request as response
  // return {
  //   path: event.path,
  //   method: event.method,
  //   query,
  //   body,
  // }
})
