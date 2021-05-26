const pool = require("../../db");

exports.userRoutes = (app) => {
  //create a user
  app.post("/users", async (req, res) => {
    try {
      const { fullName, email, password } = req.body;

      await pool.query(
        "INSERT INTO users (fullName, email, password) VALUES ($1, $2, $3)",
        [fullName, email, password],
        (error, results) => {
          if (error) {
            res.json({
              status: "Error",
              error: err.message,
            });
          }

          pool.query("SELECT * FROM users", (err, results) => {
            if (err) {
              res.json({
                status: "Error",
                error: err.message,
              });
            }
            res.json({
              status: "Success",
              data: results.rows[results.rows.length - 1],
            });
          });
        }
      );
    } catch (err) {
      res.json({
        status: "Error",
        error: err.message,
      });
    }
  });
  //get a user
  app.get("/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query(
        "SELECT * FROM users WHERE user_id = $1",
        [id],
        (err, results) => {
          if (err) {
            res.json({
              status: "Error",
              error: err.message,
            });
          }
          res.json({
            status: "Success",
            data: results.rows,
          });
        }
      );
    } catch (err) {
      // console.error(err.message);
      res.json({
        status: "Error",
        error: err.message,
      });
    }
  });
  //get all users
  app.get("/users", async (req, res) => {
    try {
      // const allTodos = await pool.query("SELECT * FROM todo");
      pool.query("SELECT * FROM users", (err, results) => {
        if (err) {
          res.json({
            status: "Error",
            error: err.message,
          });
        }
        res.json({
          status: "Success",
          data: results.rows,
        }); // assumes 'results.rows' can be serialized to JSON
      });
      // res.json(allTodos.rows);
    } catch (err) {
      res.json({
        status: "Error",
        error: err.message,
      });
    }
  });
};
