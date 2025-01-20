export async function POST(req: Request) {
  const { ip } = await req.json();

  const ipInfoRes = await fetch(
    `https://ipinfo.io/${ip}?token=${process.env.IPINFO_API_KEY}`,
  );

  const { city, region, country } = await ipInfoRes.json();
  return Response.json({ city, region, country });
}
