<template>
    <div class="loader"></div>
</template>

<style scoped lang="scss">
    .loader {
        border: 5px solid #f3f3f3;
        border-top: 5px solid #51c560;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>