resource "google_storage_bucket" "website" {
  name     = "marlon-react-js-website"
  location = "US"
}

resource "google_storage_object_access_control" "public_rule" {
  for_each = google_storage_bucket_object.static_site_src
  object   = each.value.name
  bucket   = google_storage_bucket.website.name
  role     = "READER"
  entity   = "allUsers"
}

resource "google_storage_bucket_object" "static_site_src" {
  for_each = fileset("../frontend/my-react-app/build", "**")
  name     = each.value
  bucket   = google_storage_bucket.website.name
  # source   = "../frontend/my-react-app/build/${each.value}"
  source   = "../frontend/my-react-app/build/index.html"
}