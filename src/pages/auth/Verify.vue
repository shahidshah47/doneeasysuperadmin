<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="register-form-box p-5 rounded-2 shadow justify-content-center align-items-center text-center">
            <img src="../../assets/image/email_confirm.png" alt="email confirm" class="img-fluid">
            <div class="px-4 my-4">
                <h3>Great Work</h3>
                <p>You have successfully verified your email address.</p>
            </div>
            <button class="btn btn-primary w-100">Login Page</button>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.register-form-box {
    background-color: #FCFDFFB2;
    max-width: 500px;
}

.btn {
    background-color: #6c63ff;
    color: #fff;
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    margin-top: 20px;
}

.btn:hover {
    background-color: #5a54d1;
}
</style>
