export interface Poke {
  id: string;
  name: string;
  weight: string;
  height: string;
  sprites: {
    front_default: string | null;
  };
}
