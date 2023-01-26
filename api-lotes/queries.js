const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'db',
  database: 'locations',
  port: 5432,
});
const getLotes = (request, response) => {
  pool.query('SELECT id, area, name,ST_AsText(geom) as geom FROM lotes ORDER BY id ASC', (error, results) => {
    if (error) {
      //throw error;
      console.log(error);
      response.status(500).json({
        message: "error"
      })
      return;
    }
    response.status(200).json(results.rows);
  });
};

const getLoteById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT id, name, area, ST_AsText(geom) as geom FROM lotes WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createLote = (request, response) => {
  const { name, area, geom } = request.body;

  pool.query(
    'INSERT INTO lotes (name, area, geom) VALUES ($1, $2, ST_GeomFromText($3)) RETURNING *',
    [name, area, geom],
    (error, results) => {
      if (error) {
        //throw error;
        console.error(error);
        response.status(500).json({message: 'internal server error'});
      }
      response.status(201).json({id:results.rows[0].id});
    }
  );
};

const deleteLote = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM lotes WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json({menssage: `Lote deleted with ID: ${id}`});
  });
};

module.exports = {
  getLotes,
  getLoteById,
  createLote,
  deleteLote,
};