import Content from "./content";

export default function Page({ params }: { params: { authorId: string } }) {
  return <Content params={params} />;
}
