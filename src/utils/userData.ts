// Importing jwtDecode from the jwt-decode library to decode JWT tokens
import { jwtDecode } from "jwt-decode"; 

// Function to retrieve and decode user data from the access token
export function UserData() {
  // Retrieving the access token from localStorage
  const token = localStorage.getItem("accessToken");
  
  // Checking if a token exists
  if (token) {
    try {
      // Decoding the JWT token to extract user data
      const decodedToken = jwtDecode(token);
      
      // Returning the decoded token data
      return decodedToken;
    } catch (error) {
      // Handling any errors that occur during token decoding
      console.error("Token decoding error:", error);
    }
  }
  
  // Returning null if no token is found or decoding fails
  return null;
}
