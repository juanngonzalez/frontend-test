import { JsonDB, Config } from "node-json-db";

export default async function handler(req, res) {
  const db = new JsonDB(new Config("db", true, false, "/"));
  
  if (req.method === "DELETE") {
    try {
      const query = req.query;
      const { pokemonId } = query;

      const index = await db.getIndex("/catchedPokemon", Number(pokemonId), "id");
      if (index === -1) {
        return res.status(409).send("Pokemon not found");
      }

      await db.delete(`/catchedPokemon[${index}]`);
      return res.status(200).send("Pokemon released");
    } catch (error) {
      return res.status(500).send("Error deleting pokemon");
    }
  } 
  return res.status(405).send("Method not allowed.");
}
