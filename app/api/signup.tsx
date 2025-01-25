interface SignupResponse {
    success: boolean;
    message: string;
    // Add other properties as needed (e.g., user data, etc.)
  }
  
  interface UserData {
    email: string;
    password: string;
    phoneNumber: string;
  }
  
  export async function signup(referralCode: string, userData: UserData): Promise<SignupResponse> {
    try {
      // Log the data before sending the request to ensure it's correctly formatted
      console.log('Sending request with data:', {
        email: userData.email,
        password: userData.password,
        phone_number: userData.phoneNumber,
        referral_code: referralCode
      });
  
      const response = await fetch(`http://51.77.230.180:8000/api/v2/auth/register/${referralCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers here if needed, like an Authorization token
          // 'Authorization': 'Bearer YOUR_TOKEN_HERE', // Example if needed
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          phone_number: userData.phoneNumber,  // Ensure it's sent as phone_number
          referral_code: referralCode,        // Ensure it's sent as referral_code
        }),
      });
  
      // Check if the response is successful
      if (!response.ok) {
        const errorText = await response.text();  // Read response as text
        console.error('Error response:', errorText);  // Log the error response from the API
        throw new Error(`Signup failed with status: ${response.status}`);
      }
  
      // Attempt to parse the successful response JSON
      const data: SignupResponse = await response.json();
  
      // Log the success response from the API
      console.log('Signup successful:', data);
      return data;
    } catch (error: any) {
      // Log the error and throw it
      console.error('Error during signup:', error);
      throw error;
    }
  }
  