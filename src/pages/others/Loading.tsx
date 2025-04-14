import React from 'react';

function Loading() {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column' as const,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f0f4f8',
        },
        spinner: {
            width: '50px',
            height: '50px',
            border: '5px solid #ccc',
            borderTop: '5px solid #0078d4',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
        },
        text: {
            marginTop: '20px',
            fontSize: '24px',
            color: '#333',
        },
    };

    // Adding keyframes for spinner animation
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `, styleSheet.cssRules.length);

    return (
        <div style={styles.container}>
            <div style={styles.spinner}></div>
            <h1 style={styles.text}>Loading...</h1>
        </div>
    );
}

export default Loading;