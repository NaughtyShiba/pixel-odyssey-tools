interface ApiItemGETParams {
	params: { slug: string };
}

export async function GET(_request: Request, { params }: ApiItemGETParams) {
	const slug = params.slug;

	try {
		const data = await import(`../../../../data/${slug}.json`);

		return new Response(JSON.stringify(data), {
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
