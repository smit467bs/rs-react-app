import { useState } from 'react';

interface Props {
  onSearch: (search: string) => void;
  defaultValue: string;
}


export const Search = ({ onSearch, defaultValue }: Props) => {

  const [query, setQuery] = useState(defaultValue || '');


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    if (query.length > 0) {
      onSearch(query.trim().toLowerCase());
    } else onSearch('');
  };



  return (
    <div>
      <input
        className="
          search-input border-l-black rounded-2xl shadow-sm text-black focus:ring-red-500"
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Введите запрос..."
      />
      <button
        className="rounded-2xl bg-black text-white hover:bg-red-400"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};
