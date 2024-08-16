export async function GET() {
	try {
		const data = await import("@repo/helper/data/enemies.json");

		return new Response(JSON.stringify(data.default), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (err) {
		if (
			err instanceof Error &&
			"code" in err &&
			err.code === "MODULE_NOT_FOUND"
		) {
			return new Response(JSON.stringify({ error: "Not Found" }), {
				status: 404,
				headers: {
					"Content-Type": "application/json",
				},
			});
		}
	}
}
