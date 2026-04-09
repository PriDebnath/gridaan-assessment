

let BASE_API_URL:string;
if (import.meta.env.MODE === "github") {
  BASE_API_URL = "https://gridaan-assessment-backend.onrender.com";
} else {
  BASE_API_URL = "http://localhost:8000";
}

console.log({BASE_API_URL})

export { BASE_API_URL };