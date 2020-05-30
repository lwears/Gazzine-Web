let baseUrl: string;
if (__DEV__) {
  baseUrl = "http://localhost:8080/"
} else {
  baseUrl = "https://europe-west1-master-plateau-272609.cloudfunctions.net/getPosts"
}

export default baseUrl;
