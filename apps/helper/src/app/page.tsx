export default async function Page() {
  const data = await import(`../../data/items.json`);
  return <h1 className="flex">{JSON.stringify(Array.from(data))}</h1>;
}
