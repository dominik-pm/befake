//HOSTNAME + PATH_TO_RESOURCE + "?" + CANONICAL_QUERY_STRING + "&X-Goog-Signature=" + REQUEST_SIGNATURE
const HOSTNAME = "https://storage.googleapis.com"
const PATH_TO_RESOURCE = "Photos/wuNHMSLQkkWgrTgHERySzNSBjsR2/realmoji/RcWoVe0kIqnk84Yb.webp"
const CANONICAL_QUERY_STRING = "?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=prod-backend-fasterstore%40alexisbarreyat-bereal.iam.gserviceaccount.com%2F20230117%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230117T125904Z&X-Goog-Expires=36000&X-Goog-SignedHeaders=cache-control%3Bcontent-type%3Bhost%3Bx-goog-content-length-range"
var crypto = require('crypto')
const hash = crypto.createHash('SHA256').update(CANONICAL_QUERY_STRING).digest('hex');
const REQUEST_SIGNATURE = crypto.sign("SHA256", hash, crypto.createPrivateKey(`-----BEGIN PRIVATE KEY-----
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ3dU5ITVNMUWtrV2dyVGdIRVJ5U3pOU0Jqc1IyIiwidXNlcl9pZCI6Ind1TkhNU0xRa2tXZ3JUZ0hFUnlTek5TQmpzUjIiLCJwaG9uZV9udW1iZXIiOiIrNDM2ODE4MTg0NjcxMyIsImlzcyI6Imh0dHBzOi8vYXV0aC5iZXJlYWwudGVhbS8iLCJhdWQiOiJhbmRyb2lkIiwiaWF0IjoxNjczOTY0MjE0LCJleHAiOjE2NzM5Njc4MTR9.jQ9XcgRVeGBC9sawYgP95zMnW-W_h-UgHQfTJDfwykc
-----END PRIVATE KEY-----`))
console.log(REQUEST_SIGNATURE)
