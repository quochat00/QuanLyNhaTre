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
                                                    v-model="email" placeholder="Enter Email Address..." required>
                                            </div>
                                            <div class="form-group">
                                                <input type="password" class="form-control form-control-user"
                                                    v-model="password" placeholder="Password" required>
                                            </div>
                                            <button type="submit" class="btn btn-primary btn-user btn-block">
                                                Login
                                            </button>
                                            <hr>
                                        </form>
                                        <hr>
                                        <div class="text-center">
                                            <a class="small" href="forgot-password.html">Forgot Password?</a>
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
import router from '@/router';

export default {
    name: 'LoginComponent',
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
  generateToken(userType) {
    let token;
    if (userType === 'admin') {
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjEyMzQ1Njc4fQ.S6TqJbi0kT06yE7tUeoHbiq5epv1KXeoFw8jblg_C1g'; // Token admin
    } else {
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1bWJlc2VyIiwiaWF0IjoxNjEyMzQ1Njc4fQ.kWzRA8w_J4J7QdAWFqHhQ10DqZGnCnS8U0Dgp4sFvhc'; // Token user
    }
    return token;
  },
  login() {
    const adminEmail = 'admin@gmail.com';
    const adminPassword = '123456';

    if (this.email === adminEmail && this.password === adminPassword) {
      // Đăng nhập thành công với tư cách admin
      const token = this.generateToken('admin');
      localStorage.setItem('authToken', token);
      this.$router.push('/thongke');
    } else {
      // Đăng nhập với tư cách người dùng thông thường, gọi API để kiểm tra
      axios.get(`https://localhost:7186/api/Login/login?taiKhoan=${this.email}&matKhau=${this.password}`)
        .then(res => {
          const loginData = res.data;
          console.log(loginData);
          if (loginData) {
            // Lưu token vào localStorage
            const token = this.generateToken('user');
            localStorage.setItem('authToken', token);

            // Chuyển hướng người dùng đến trang người dùng tương ứng
            this.$router.push({ name: 'User.Home', params: { id: loginData.maHS } });
          } else {
            alert('Sai tài khoản hoặc mật khẩu');
          }
        })
        .catch(error => {
          console.error('Đăng nhập thất bại', error);
          alert('Đăng nhập thất bại, vui lòng thử lại.');
        });
    }
  },
}

};
</script>