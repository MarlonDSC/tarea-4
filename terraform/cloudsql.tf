resource "google_sql_database_instance" "instance" {
  name             = "yourdatabase-instance"
  database_version = "MYSQL_5_7"
  settings {
    tier = "db-f1-micro"
  }
}

resource "google_sql_database" "database" {
  name     = "yourdatabase"
  instance = google_sql_database_instance.instance.name
}

resource "google_sql_user" "users" {
  name     = "root"
  instance = google_sql_database_instance.instance.name
  password = "yourpassword"
}