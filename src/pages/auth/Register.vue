<template>
    <div class="register-page">
        <div class="form-section">
            <!-- Register Form -->
            <div class="register-form-box">
                <h2>Create Account</h2>
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

                    <!-- Password Input with Bootstrap Popover -->
                    <div class="form-group password-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="form-control" v-model="password"
                            @focus="showPopover" @blur="hidePopover" />
                        <i :class="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
                            class="password-toggle align-self-center" @click="togglePasswordVisibility('password')"></i>
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

// Function to initialize Bootstrap popover
const showPopover = () => {
    const passwordInput = document.getElementById('password');
    const popover = new bootstrap.Popover(passwordInput, {
        title: 'Create strong passwords',
        content: `
            <ul class='popover-rules'>
                <li><i class="fas fa-check-circle"></i> Must be 4 to 16 characters in length.</li>
                <li><i class="fas fa-check-circle"></i> Must contain an Uppercase & lower case.</li>
                <li><i class="fas fa-check-circle"></i> Symbols such as !, @, #, $, etc. are allowed.</li>
                <li><i class="fas fa-check-circle"></i> Cannot include your username.</li>
                <li><i class="fas fa-times-circle"></i> Cannot be a previously used password.</li>
                <li><i class="fas fa-check-circle"></i> Cannot be a commonly used word or sequence of numbers, (password or 123456).</li>
            </ul>
        `,
        html: true,
        trigger: 'manual',
        placement: 'right',
    });

    popover.show();
};

const hidePopover = () => {
    const passwordInput = document.getElementById('password');
    const popover = bootstrap.Popover.getInstance(passwordInput);
    if (popover) {
        popover.hide();
    }
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
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
}

.register-form-box h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
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

/* Custom styling for popover rules */
.popover .popover-rules {
    padding-left: 0;
    list-style: none !important;
    margin: 0 !important;
}

.popover .popover-rules li {
    font-size: 14px !important;
    margin-bottom: 5px !important;
    color: #333 !important;
}

.popover .popover-rules li i {
    margin-right: 10px !important;
    color: #6c63ff !important;
}

.popover .popover-rules li .fa-times-circle {
    color: #dc3545 !important;
}
</style>
