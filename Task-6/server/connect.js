import mysql from "mysql";

export const db = mysql.createConnection({
  host: "eu-cdbr-west-03.cleardb.net",
  user: "be863d846220e3",
  password: "63ee8262",
  database: "heroku_8ef6623adc71e17",
});

// mysql://be863d846220e3:63ee8262@eu-cdbr-west-03.cleardb.net/heroku_8ef6623adc71e17?