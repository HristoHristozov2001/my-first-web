document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');
    const emailInput = document.getElementById("email");
    const emailFeedback = document.getElementById("emailFeedback");
    const submitBtn = document.getElementById("submitBtn");

    emailInput.addEventListener('input', function () {
        console.log('Email input detected');
        const email = emailInput.value;
        console.log('Email entered:', email);
        fetch('/logIn/check-email',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email})
        })
        .then(response => response.json())
        .then(data => {
            console.log('Server response:', data);
            if(data.exists){
                emailInput.classList.remove('is-valid');
                emailInput.classList.add('is-invalid');
                emailFeedback.textContent = 'This email already exists';
                submitBtn.disabled = true;
            }else{
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
                emailFeedback.textContent = '';
                submitBtn.disabled = false;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            emailFeedback.textContent = 'Error checking email. Please try again later.';
        });
    });
});