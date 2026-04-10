

let BASE_API_URL: string;

switch (import.meta.env.MODE) {
  case "github":
    BASE_API_URL = "https://gridaan-assessment-backend.onrender.com";
    break;

  default:
    BASE_API_URL = "http://localhost:8000";
    break;
}

console.log({ BASE_API_URL })

export { BASE_API_URL };