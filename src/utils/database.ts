import { Pool } from "pg";

let connection: any;

/**
 * * Conexiones
 * Si cuando llega aquí no existe una conexión, la crea y la guarda en la variable connection
 * Si ya existe, simplemente la exporta
 */
if (!connection) {
  connection = new Pool({
    user: "user",
    host: "dpg-cel00shgp3jlcsmb9skg-a.frankfurt-postgres.render.com",
    database: "tasks_4uxx",
    password: "6Un3IHMYqjrm3hoHmnTvYsrdPPpfojEH",
    port: 5432,
    ssl: true,
  });
}
export { connection };
