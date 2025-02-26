import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const handleLoginSuccess = (response) => {
        console.log('Login Success:', response);
        const token = response.credential; // Get token from Google login response

        // Decode the JWT token to extract email
        const userPayload = JSON.parse(atob(token.split('.')[1])); // Decode the payload
        const userEmail = userPayload.email; // Get email from the payload

        // Check if the email ends with @bitsathy.ac.in
        if (userEmail.endsWith('@bitsathy.ac.in')) {
            localStorage.setItem('token', token); // Save token to localStorage
            window.location.href = '/dashboard'; // Redirect to dashboard after successful login
        } else {
            alert('Only BIT accounts are allowed.'); // Alert for unauthorized email
            console.error('Unauthorized email:', userEmail);
        }
    };

    const handleLoginFailure = (error) => {
        console.error('Login Failure:', error);
        // Handle the login failure scenario here
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h3 style={styles.heading}>Welcome Back!</h3>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgoKmrlslyJy-XsZsYrBEWNb3Ex-ECISQ8rgMROrX8QjxDsg0OdpWh6qUbHLdZnI_fRAQ&usqp=CAU"
                    alt="Bannari Amman Institute of Technology"
                    style={styles.logo}
                />
                <h4 style={styles.heading}>BIT INFORMATION PORTAL</h4>
                <div style={styles.googleButton}>
                    <GoogleOAuthProvider clientId="41731137679-od5a8t935qambrn4vgo8v4h0asoc1m4e.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={handleLoginFailure}
                            useOneTap
                            className="google-login-button" // Apply the CSS class
                        />
                    </GoogleOAuthProvider>
                </div>
                <p style={styles.text}>Sign in with your BIT account</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#cfd5dd', // Updated background color
        fontFamily: 'Times New Roman, serif', // Set font family for container
    },
    card: {
        backgroundColor: '#ffffff', // White background for the card
        padding: '2rem',
        borderRadius: '10px',
        width: '350px',
        textAlign: 'center',
        color: '#000000', // Black text color for other texts
        fontFamily: 'Times New Roman, serif', // Set font family for card
    },
    logo: {
        width: '200px',
    },
    heading: {
        color: 'rgba(100, 116, 139)', // Updated color for headings
        fontFamily: 'Times New Roman, serif', // Set font family for headings
    },
    text: {
        fontFamily: 'Times New Roman, serif', // Set font family for text
        color: 'rgba(100, 116, 139)', // Set color for <p> elements
    },
    googleButton: {
        margin: '1rem 0',
        backgroundColor: '#ffffff',
    },
};

export default Login;
