
import React from 'react';

function SignIn() {
    return (
        <div style={{ backgroundColor: 'grey', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#ECECEC', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', color: '#f9a58c', textAlign: 'center', width: '80%', maxWidth: '400px' }}>
                <h1 style={{ fontSize: '2.5em' }}>Sign In</h1>
                <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <input type="text" placeholder="Username" style={{ margin: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #f9a58c' }} />
                    <input type="password" placeholder="Password" style={{ margin: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #f9a58c' }} />
                    <button style={{ margin: '10px', padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#f9a58c', color: '#0f5257', cursor: 'pointer', width: '100%' }}>Sign In</button>
                </form>
                <p style={{ marginTop: '20px' }}>Don't have an account? <button style={{ border: 'none', background: 'none', color: '#f9a58c', textDecoration: 'underline', cursor: 'pointer' }}>Sign Up</button></p>
            </div>
        </div>
    );
}

export default SignIn;
