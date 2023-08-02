import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTg5YTI5NjRkNGRmZDY2YTU5NjkwNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3OTIwNTMxNCwiZXhwIjoxNjc5NDY0NTE0fQ.0tRWh63mJpW8Y2mRXNonR-IXAef78gGE_ax2-z5-hyc";
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

console.log(`Bearer ${TOKEN}`);

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: "Bearer " + TOKEN },
});
