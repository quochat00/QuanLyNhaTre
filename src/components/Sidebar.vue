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
        <router-link to="/thongke">
          <a class="nav-link">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Thống kê</span></a>
        </router-link>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Heading -->
      <div class="sidebar-heading">
        Quản lý lớp học
      </div>

      <!-- Nav Item - Pages Collapse Menu -->
      <li class="nav-item">
        <router-link to="/classView">
          <a class="nav-link">
            <i class="fa fa-home"></i>
            <span>Lớp học</span></a>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/attendanceView">
          <a class="nav-link">
            <i class="fa fa-pencil-square"></i>
            <span>Điểm danh</span></a>
        </router-link>
      </li>
      <!-- <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
           <router-link to="/classView">
            <a class="collapse-item">Lớp 3 tuổi</a>
           </router-link> -->
      <!-- <router-link to="/classFour">
              <a class="collapse-item">Lớp 4 tuổi</a>
            </router-link>
           <router-link to="/classFive">
            <a class="collapse-item">Lớp 5 tuổi</a>
           </router-link> -->
      <!-- </div>
        </div> -->

      <!-- Nav Item - Utilities Collapse Menu -->
      <!-- <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
          aria-expanded="true" aria-controls="collapseUtilities">
          <i class="fas fa-fw fa-wrench"></i>
          <span>Utilities</span>
        </a>
        <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Custom Utilities:</h6>
            <a class="collapse-item" href="utilities-color.html">Colors</a>
            <a class="collapse-item" href="utilities-border.html">Borders</a>
            <a class="collapse-item" href="utilities-animation.html">Animations</a>
            <a class="collapse-item" href="utilities-other.html">Other</a>
          </div>
        </div>
      </li> -->

      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Heading -->
      <div class="sidebar-heading">
        Quản lý giáo viên
      </div>

      <!-- Nav Item - Pages Collapse Menu -->
      <!-- <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true"
          aria-controls="collapsePages">
          <i class="fas fa-fw fa-folder"></i>
          <span>Pages</span>
        </a>
        <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Login Screens:</h6>
            <a class="collapse-item" href="login.html">Login</a>
            <a class="collapse-item" href="register.html">Register</a>
            <a class="collapse-item" href="forgot-password.html">Forgot Password</a>
            <div class="collapse-divider"></div>
            <h6 class="collapse-header">Other Pages:</h6>
            <a class="collapse-item" href="404.html">404 Page</a>
            <a class="collapse-item" href="blank.html">Blank Page</a>
          </div>
        </div>
      </li> -->

      <!-- Nav Item - Charts -->
      <li class="nav-item">
        <router-link to="/teacher">
          <a class="nav-link">
            <i class="fa fa-address-book"></i>
            <span>Giáo Viên</span></a>
        </router-link>
      </li>
      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Heading -->
      <div class="sidebar-heading">
        Quản lý nhập học
      </div>
      <li class="nav-item">
        <router-link to="/studentList">
          <a class="nav-link">
            <i class="fa fa-address-book"></i>
            <span>Nhập học</span></a>
        </router-link>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Heading -->
      <div class="sidebar-heading">
        Quản lý bữa ăn
      </div>
      <li class="nav-item">
        <router-link to="/dishView">
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
        <router-link to="/hocphi">
          <a class="nav-link">
          <i class="fas fa-money"></i>
          <span>Học phí</span></a>
        </router-link>
      </li>

        <!-- Divider -->
      <hr class="sidebar-divider">


      <li class="nav-item">
        <router-link to="/signin">
          <a class="nav-link">
          <i class="fa fa-sign-out"></i>
          <span>Logout</span></a>
        </router-link>
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
<script setup>
let sidebarToggle = false;

const toggleSidebar = () => {
  sidebarToggle = !sidebarToggle;
};
</script>


<style scoped>
.toggle {}
</style>