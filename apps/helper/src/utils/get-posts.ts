export async function postComponents(slug: string) {
	const { default: Component } = await import(`@/content/${slug}.mdx`);
	return Component;
}
