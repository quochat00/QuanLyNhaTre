<template>
    <div class="limiter">
        <div class="container-login100" :style="{ backgroundImage: `url(${backgroundImage})` }">
            <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                <form class="login100-form validate-form" @submit.prevent="signup">
                    <span class="login100-form-title p-b-49">Sign Up</span>

                    <div class="wrap-input100 validate-input m-b-23" data-validate="Username is required">
                        <span class="label-input100">Username</span>
                        <input class="input100" type="text" v-model="username" placeholder="Type your username">
                        <span class="focus-input100" data-symbol="&#xf206;"></span>
                    </div>

                    <div class="wrap-input100 validate-input" data-validate="Password is required">
                        <span class="label-input100">Password</span>
                        <input class="input100" type="password" v-model="password" placeholder="Type your password">
                        <span class="focus-input100" data-symbol="&#xf190;"></span>
                    </div>

                    <div class="wrap-input100 validate-input" data-validate="Email is required">
                        <span class="label-input100">Email</span>
                        <input class="input100" type="email" v-model="email" placeholder="Type your email">
                        <span class="focus-input100" data-symbol="&#xf15a;"></span>
                    </div>
                    <div class="wrap-input100 validate-input" data-validate="Phone is required">
                        <span class="label-input100">Phone</span>
                        <input class="input100" type="phone" v-model="phone" placeholder="Type your phone">
                        <span class="focus-input100" data-symbol="&#xf095;"></span>
                    </div>
                    <p></p>
                    <div class="container-login100-form-btn">
                        <div class="wrap-login100-form-btn">
                            <div class="login100-form-bgbtn"></div>
                            <button class="login100-form-btn">Sign Up</button>
                        </div>
                    </div>

                    <div class="txt1 text-center p-t-54 p-b-20">
                        <span>Or Sign Up Using</span>
                    </div>

                    <div class="flex-c-m">
                        <a href="#" class="login100-social-item bg1"><i class="fa fa-facebook"></i></a>
                        <a href="#" class="login100-social-item bg2"><i class="fa fa-twitter"></i></a>
                        <a href="#" class="login100-social-item bg3"><i class="fa fa-google"></i></a>
                    </div>
                    <div class="text-center">
                        <button @click="toggleLanguage">Change Language</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            email: '',
            language: 'english' // Default language is English
        };
    },
    methods: {
        signup() {
            // Your signup logic here
        },
        toggleLanguage() {
            this.language = this.language === 'english' ? 'vietnamese' : 'english';
            // Perform language switch here
        }
    }
};
</script>

<style scoped>
/* Your CSS styles here */
</style>
