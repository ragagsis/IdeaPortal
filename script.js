async function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    const messageBox = document.getElementById('messageBox');

    // Fetch user data from Google Sheets
    const response = await fetch('YOUR_GOOGLE_SHEET_API_ENDPOINT'); // Replace with your endpoint
    const data = await response.json();

    // Validate credentials
    const user = data.values.find(row => row[0] === username && row[1] === password); // Assuming username is in column A and password in column B

    if (user) {
        messageBox.classList.add('hidden');
        alert(`Welcome ${username}!`);
        
        // Redirect based on role (you might need to adjust this logic)
        if (username === 'admin') {
            window.location.href = 'admin-dashboard.html'; // Redirect to Admin Dashboard
        } else {
            window.location.href = 'submit-idea.html'; // Redirect to Idea Submission Page
        }
        
    } else {
        messageBox.classList.remove('hidden');
        messageBox.innerText = 'Invalid username or password';
        messageBox.style.color = 'red';
    }
}
