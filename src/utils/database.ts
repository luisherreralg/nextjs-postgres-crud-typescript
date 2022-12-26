import { Pool } from "pg";

let connection: any;

/**
 * * Conexiones
 * Si cuando llega aquí no existe una conexión, la crea y la guarda en la variable connection
 * Si ya existe, simplemente la exporta
 */
if (!connection) {
  connection = new Pool({
    user: "postgres",
    host: "localhost",
    database: "tasksdb",
    password: "12345",
    port: 5432,
  });
}
export { connection };
