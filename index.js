addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const videoUrl = url.searchParams.get("url")

  if (!videoUrl) {
    return new Response(
      JSON.stringify({ error: "URL parameter missing" }),
      { headers: { "Content-Type": "application/json" }, status: 400 }
    )
  }

  try {
    // Using a known downloaderto endpoint
    const response = await fetch("https://downloaderto.com/api/convert/youtube", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0"
      },
      body: JSON.stringify({ url: videoUrl })
    })

    const data = await response.json()

    // Return JSON with all available download links
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    })
  }
}
