import { Card } from '../card/Card.tsx';

interface Props {
  items: Pokemon[];
}

interface Pokemon {
  name: string;
  url: string;
}

export const CardList = ({ items }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 overflow-hidden break-words">
      {items.map((item) => (
        <Card key={item.name} name={item.name} url={item.url} />
      ))}
    </div>
  );
};
