<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="register-form-box p-4 rounded-3 shadow">
            <h2 class="fw-bold">Create Account</h2>
            <form>
                <!-- Full Name Input -->
                <div class="form-group">
                    <label for="fullName">Full Name</label>
                    <input type="text" id="fullName" placeholder="e.g John Smith" class="form-control" />
                </div>

                <!-- Email Input -->
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" placeholder="e.g johnsmith@gmail.com" class="form-control" />
                </div>

                <!-- Password Input with Custom Tooltip -->
                <div class="form-group password-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" class="form-control" v-model="password" @focus="showTooltip"
                        @blur="hideTooltip" />
                    <i :class="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
                        class="password-toggle align-self-center" @click="togglePasswordVisibility('password')"></i>

                    <!-- Tooltip Trigger -->
                    <div id="passwordTooltip" class="custom-tooltip" ref="tooltip">
                        <ul class="tooltip-rules">
                            <li><i class="fas fa-check-circle"></i> Must be 4 to 16 characters in length.</li>
                            <li><i class="fas fa-check-circle"></i> Must contain an Uppercase & lower case.</li>
                            <li><i class="fas fa-check-circle"></i> Symbols such as !, @, #, $, etc. are allowed.
                            </li>
                            <li><i class="fas fa-check-circle"></i> Cannot include your username.</li>
                            <li><i class="fas fa-times-circle"></i> Cannot be a previously used password.</li>
                            <li><i class="fas fa-check-circle"></i> Cannot be a commonly used word or sequence of
                                numbers, (password or 123456).</li>
                        </ul>
                    </div>
                </div>

                <!-- Confirm Password Input -->
                <div class="form-group password-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" class="form-control" v-model="confirmPassword" />
                    <i :class="isConfirmPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'" class="password-toggle"
                        @click="togglePasswordVisibility('confirmPassword')"></i>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="btn btn-primary">CREATE ACCOUNT</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const password = ref('');
const confirmPassword = ref('');
const isPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);

const togglePasswordVisibility = (inputId) => {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        if (inputId === 'password') {
            isPasswordVisible.value = true;
        } else if (inputId === 'confirmPassword') {
            isConfirmPasswordVisible.value = true;
        }
    } else {
        input.type = 'password';
        if (inputId === 'password') {
            isPasswordVisible.value = false;
        } else if (inputId === 'confirmPassword') {
            isConfirmPasswordVisible.value = false;
        }
    }
};

// Function to show the tooltip
const showTooltip = () => {
    const tooltip = document.getElementById('passwordTooltip');
    tooltip.style.display = 'block';
};

// Function to hide the tooltip
const hideTooltip = () => {
    const tooltip = document.getElementById('passwordTooltip');
    tooltip.style.display = 'none';
};
</script>

<style scoped>
.form-section {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px 20px;
}

.register-form-box {
    background-color: #FCFDFFB2;
    max-width: 400px;
    width: 100%;
}

.register-form-box h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
}

.form-control {
    border: none !important;
    border-radius: 8px !important;
    background-color: #F2F4FB;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
    color: #333;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
}

.password-group {
    position: relative;
}

.password-group .password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    cursor: pointer;
    color: #5825EB;
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

/* Custom Tooltip Styling */
.custom-tooltip {
    display: none;
    position: absolute;
    top: -100%;
    left: 105%;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 15px;
    width: 360px;
    z-index: 1000;
    border: 1px solid #ddd;
}

.custom-tooltip::before {
    content: "";
    position: absolute;
    left: -5%;
    top: 50%;
    transform: translateY(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: transparent white transparent transparent;
}

.tooltip-rules {
    padding-left: 0;
    list-style: none;
}

.tooltip-rules li {
    font-size: 14px;
    margin-bottom: 10px;
}

.tooltip-rules li i {
    margin-right: 10px;
    color: #6c63ff;
}

.tooltip-rules li .fa-times-circle {
    color: #dc3545;
}
</style>
