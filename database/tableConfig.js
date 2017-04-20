module.exports = (db) => {
  return db.query('\
    CREATE TABLE IF NOT EXISTS users (\
    id INT PRIMARY KEY,\
    username VARCHAR(15) NOT NULL,\
    email VARCHAR(50) NOT NULL,\
    password VARCHAR(40) NOT NULL,\
    UNIQUE(username, email)\
    );\
  ')
  .then(() => {
    
  })
}