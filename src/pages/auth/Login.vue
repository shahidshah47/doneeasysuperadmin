<template>
    <div class="flex justify-center items-center min-h-screen">
        <div class="p-4 bg-white min-w-96 rounded-3 shadow">
            <h2 class="fw-bold mb-4">Login</h2>
            <form @submit="handleSubmit">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email" placeholder="e.g johnsmith@gmail.com" class="form-control" />
                </div>

                <div class="form-group password-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" class="form-control" v-model="password" />
                    <i :class="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
                        class="password-toggle align-self-center" @click="togglePasswordVisibility('password')"></i>
                </div>
                <p class="text-end text-primary fw-bold" style="font-size: 14px;">Need help with Login?</p>

                <button type="submit" class="btn btn-primary">Log In</button>
            </form>
            <p class="text-white p-2 bg-red-500 rounded-sm mt-2" v-if="error">{{ error }}</p>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { authApi } from '../../api';
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref('');
const password = ref('');
const isPasswordVisible = ref(false);
const loading = ref(true);
const error = ref(null);

const togglePasswordVisibility = (inputId) => {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        isPasswordVisible.value = true;
    } else {
        input.type = 'password';
        isPasswordVisible.value = false;
    }
}


const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await authApi.post("/superadmin/login", { email: email.value, password: password.value });
        if (!response.data.success) {
            error.value = response.data.message;
        } else {
            error.value = null;
            const { data } = response.data;
            localStorage?.setItem("user", data?.user);
            localStorage?.setItem("token", data?.token);
            router.push("/super-admin/vendor");
        }
        // console.log(response.data, error.value, "response data");
    } catch (err) {
        console.error(err);
        error.value = "Error fetching data";
    } finally {
        loading.value = false;
    }
}

// Fetch data when component mounts
// onMounted(handleSubmit);
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
</style>
