<template>
  <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="#">
      <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-school"></i>
      </div>
      <div class="sidebar-brand-text mx-3">Kitten Preschool</div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0">

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
      <router-link :to="{ name: 'User.Home', params: { id: student.MaHS } }">
        <a class="nav-link">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Thông tin học sinh</span>

        </a>
      </router-link>
    </li>


    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Heading -->
    <div class="sidebar-heading">
      Lớp học của tôi
    </div>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
      <router-link :to="{ name: 'User.Schedule', params: { id: student.MaHS } }">
        <a class="nav-link">
          <i class="fa fa-table"></i>
          <span>Lịch học</span></a>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'User.Attendance', params: { id: student.MaHS } }">
        <a class="nav-link">
          <i class="fa fa-pencil-square"></i>
          <span>Điểm danh</span></a>
      </router-link>
    </li>
    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Heading -->
    <div class="sidebar-heading">
      Quản lý bữa ăn
    </div>
    <li class="nav-item">
      <router-link :to="{ name: 'User.Dish', params: { id: student.MaHS } }">
        <a class="nav-link">
          <i class="fa fa-cutlery"></i>
          <span>Bữa ăn</span></a>
      </router-link>
    </li>
    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Heading -->
    <div class="sidebar-heading">
      Quản lý học phí
    </div>
    <!-- Nav Item - Tables -->
    <li class="nav-item">
      <router-link :to="{ name: 'User.HocPhi', params: { id: student.MaHS } }">
        <a class="nav-link">
          <i class="fas fa-money"></i>
          <span>Học phí</span></a>
      </router-link>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider">
    <li class="nav-item">
      <a class="nav-link" @click="logout">
        <i class="fa fa-sign-out"></i>
        <span>Logout</span>
      </a>
    </li>
    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block">

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
      <button class="rounded-circle border-0" id="sidebarToggle" :class="{ 'toggle': sidebarToggle }"
        @click="toggleSidebar"></button>
    </div>



  </ul>
  <!-- End of Sidebar -->
</template>
<script>
import axios from 'axios';
import router from '@/router/index.js';

export default {
  data() {
    return {
      student: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    generateToken() {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjEyMzQ1Njc4fQ.S6TqJbi0kT06yE7tUeoHbiq5epv1KXeoFw8jblg_C1g';
      return token;
    },
    fetchData() {
      const id = this.$route.params.id;
      axios.get(`https://localhost:7186/api/HocSinh/ById?maHS=${id}`)
        .then(res => {
          this.student = res.data; // Gán dữ liệu từ API vào student
          console.log(this.student);
        })
        .catch(error => {
          console.error('Fetch data failed:', error);
        });
    },
    logout() {
      Swal.fire({
        title: 'Bạn có muốn đăng xuất không?',
        text: "Bạn sẽ phải đăng nhập lại để tiếp tục.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đăng xuất',
        cancelButtonText: 'Hủy'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('authToken');
          this.$router.push('/signin');
          Swal.fire(
            'Đã đăng xuất!',
            'Bạn đã được đăng xuất thành công.',
            'success'
          );
        }
      });
    }

  }
};
</script>



<style scoped>
.toggle {}
</style>