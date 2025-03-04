<template>
    <header class="header flex justify-between items-center fixed top-0 right-0 left-0">
        <div class="">
            <img src="../assets/Logo.png" alt="DoneEasy Logo" width="150" />
        </div>
        <div class="help-link">
            <h6 class="font-theme-bold">
                Need Help?
                <router-link to="/super-admin/contact-us" class="text-primary text-decoration-none font-theme-bold">
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