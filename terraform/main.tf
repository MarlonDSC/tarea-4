provider "google" {
  credentials = file("terraform-marlon-fbfb86f25131.json")
  project     = "terraform-marlon"
  region      = "us-central1"
}

resource "google_storage_bucket" "frontend_bucket" {
  name     = "frontend-bucket"
  location = "US"
}

resource "google_storage_bucket_object" "frontend_files" {
  for_each = fileset("path/to/your/build", "**")
  name     = each.value
  bucket   = google_storage_bucket.frontend_bucket.name
  source   = "path/to/your/build/${each.value}"
}

resource "google_container_cluster" "primary" {
  name               = "my-gke-cluster"
  location           = "us-central1"
  initial_node_count = 3
}

resource "google_container_node_pool" "primary_nodes" {
  cluster    = google_container_cluster.primary.name
  node_count = 3
  node_config {
    preemptible  = true
    machine_type = "e2-medium"
  }
}

resource "kubernetes_deployment" "bff" {
  metadata {
    name      = "bff-deployment"
    namespace = "default"
  }
  spec {
    replicas = 2
    selector {
      match_labels = {
        app = "bff"
      }
    }
    template {
      metadata {
        labels = {
          app = "bff"
        }
      }
      spec {
        container {
          image = "gcr.io/terraform-marlon/bff:latest"
          name  = "bff"
          port {
            container_port = 3000
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "backend" {
  metadata {
    name      = "backend-deployment"
    namespace = "default"
  }
  spec {
    replicas = 2
    selector {
      match_labels = {
        app = "backend"
      }
    }
    template {
      metadata {
        labels = {
          app = "backend"
        }
      }
      spec {
        container {
          image = "gcr.io/terraform-marlon/backend:latest"
          name  = "backend"
          port {
            container_port = 3000
          }
        }
      }
    }
  }
}

resource "google_sql_database_instance" "postgres" {
  name             = "my-postgres-instance"
  database_version = "POSTGRES_13"
  region           = "us-central1"
  settings {
    tier = "db-f1-micro"
  }
}

resource "google_sql_database" "my_database" {
  name     = "mydatabase"
  instance = google_sql_database_instance.postgres.name
}

resource "google_sql_user" "users" {
  name     = "myuser"
  instance = google_sql_database_instance.postgres.name
  password = "mypassword"
}

resource "google_project_iam_member" "storage_admin" {
  project = "terraform-marlon"
  role    = "roles/storage.admin"
  member  = "serviceAccount:terraform-sa@terraform-marlon.iam.gserviceaccount.com"
}

resource "google_project_iam_member" "sql_admin" {
  project = "terraform-marlon"
  role    = "roles/cloudsql.admin"
  member  = "serviceAccount:terraform-sa@terraform-marlon.iam.gserviceaccount.com"
}