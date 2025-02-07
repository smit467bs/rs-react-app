import { Component, useEffect, useState } from 'react';
import { Poke } from '../../interfaces';

interface Props {
  name: string;
  url: string;
}


export const Card = ({ name, url }: Props) => {


  const [pokeInfo, setPokeInfo] = useState<Poke | null>(null);
  const fetchData = async () => {
    try {
      const response = await fetch(`${url}`);
      if (response.ok) {
        const data = await response.json();
        setPokeInfo(data);
      } else {
        throw new Error(`Could not fetch data from ${url}`);
      }
    } catch (error) {
      throw new Error(
        `Could not fetch data from ${(url + String(error))}`,
      );
    }
  };


  useEffect(() => {

    fetchData();
  }, [url]);


  return (
    <div className="bg-white shadow-md rounded-lg p-2 border border-gray-200 hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-semibold text-gray-800">
        {name}
      </h3>
      {pokeInfo ? (
        <div className="text-gray-700 text-sm">
          {pokeInfo.sprites.front_default ? (
            <img
              className="w-32 h-32 mx-auto mb-2 border border-gray-300 rounded-lg"
              src={pokeInfo.sprites.front_default}
              alt={pokeInfo.name}
            />
          ) : null}
          <p>
            <span className="font-medium">Weight: </span>{' '}
            {pokeInfo.weight}
          </p>
          <p>
            <span className="font-medium">Height: </span>{' '}
            {pokeInfo.height}
          </p>
        </div>
      ) : (
        <p className="text-gray-600">Loading.....</p>
      )}
    </div>
  );
};
