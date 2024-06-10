<template>
    <div>
        <div class="container">
            <!-- Outer Row -->
            <div class="row justify-content-center">

                <div class="col-xl-10 col-lg-12 col-md-9">

                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-0">
                            <!-- Nested Row within Card Body -->
                            <div class="row">
                                <div class="col-lg-6 d-none d-lg-block">
                                    <img src="../assets/images/imgstudent/logo.jpeg" style="width:510px" height="100%"
                                        alt="">
                                </div>
                                <div class="col-lg-6">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <form class="user" @submit.prevent="login">
                                            <div class="form-group">
                                                <input type="email" class="form-control form-control-user"
                                                    v-model="email" placeholder="Enter Email Address...">
                                            </div>
                                            <div class="form-group">
                                                <input type="password" class="form-control form-control-user"
                                                    v-model="password" placeholder="Password">
                                            </div>
                                            <div class="form-group">
                                                <div class="custom-control custom-checkbox small">
                                                    <input type="checkbox" class="custom-control-input"
                                                        id="customCheck">
                                                    <label class="custom-control-label" for="customCheck">Remember
                                                        Me</label>
                                                </div>
                                            </div>
                                            <button type="submit" class="btn btn-primary btn-user btn-block">
                                                Login
                                            </button>
                                            <hr>
                                            <!-- <a href="index.html" class="btn btn-google btn-user btn-block">
                                                <i class="fab fa-google fa-fw"></i> Login with Google
                                            </a>
                                            <a href="index.html" class="btn btn-facebook btn-user btn-block">
                                                <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                            </a> -->
                                        </form>
                                        <hr>
                                        <div class="text-center">
                                            <a class="small" href="forgot-password.html">Forgot Password?</a>
                                        </div>
                                        <div class="text-center">
                                            <a class="small" href="register.html">Create an Account!</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import router from '@/router/index.js';
export default {
    name: 'LoginComponent',
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        login() {
    const adminEmail = 'admin@gmail.com';
    const adminPassword = '123456';

    if (this.email === adminEmail && this.password === adminPassword) {
        // Đăng nhập thành công với tư cách admin
        window.isAuthenticated = true; // Đánh dấu đã xác thực, có thể sử dụng Vuex trong ứng dụng thực tế
        this.$router.push('/thongke'); // Chuyển hướng đến trang thống kê
    } else {
        // Đăng nhập với tư cách người dùng thông thường, gọi API để kiểm tra
        axios.get(`https://localhost:7186/api/Login/login?taiKhoan=${this.email}&matKhau=${this.password}`)
            .then(res => {
                const login = res.data;
                console.log(login);
                if (this.email === login.taiKhoan && this.password === login.matKhau) {
                    // Đăng nhập thành công với tài khoản người dùng
                    // Chuyển hướng đến trang cá nhân của người dùng
                    this.$router.push({ name: 'User.Home', params: { id: login.maHS } });
                } else {
                    // Xử lý trường hợp tài khoản hoặc mật khẩu không chính xác
                    // Hiển thị thông báo lỗi cho người dùng
                    console.error('Sai tài khoản hoặc mật khẩu');
                }
            })
            .catch(error => {
                // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi cho người dùng
                console.error('Đăng nhập thất bại:', error);
            });
    }
}


    }
};
</script>

<style scoped>
/* Your CSS styles here */
</style>