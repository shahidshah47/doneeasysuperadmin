<template>
    <header class="header d-flex justify-content-between align-items-center">
        <div class="logo">
            <img src="../assets/Logo.png" alt="DoneEasy Logo" width="150" />
        </div>
        <div class="help-link">
            <h6>
                Need Help?
                <router-link to="/super-admin/contact-us" class="text-primary text-decoration-none">
                    Contact Us
                </router-link>
            </h6>
        </div>
    </header>
</template>

<script setup>
</script>

<style scoped>
.header {
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.help-link {
    font-size: 14px;
    color: #6c757d;
}

.help-link a {
    color: #007bff;
    text-decoration: none;
}

.help-link a:hover {
    text-decoration: underline;
}
</style>