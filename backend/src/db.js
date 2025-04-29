import pg from 'pg'

export const pool = new pg.Pool({
    user: "postgres",
    host:"localhost",
    password: "TUria1423",
    database: "recetasdeyanira",
    port: "5432"
})