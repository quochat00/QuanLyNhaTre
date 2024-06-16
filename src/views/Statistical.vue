<template>
    <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">
                <Navbar />
                <div class="container-fluid">
                    <!-- Page Heading -->
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800">Thống kê</h1>
                    </div>
                    <div class="row">
                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-primary shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Học sinh</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ totalStudents }}
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-address-book fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--  -->
                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-success shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                Giáo Viên</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ totalTeachers }}
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-female fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--  -->
                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-info shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Lớp học
                                            </div>
                                            <div class="row no-gutters align-items-center">
                                                <div class="col-auto">
                                                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{{
                                                        totalClasses }}</div>
                                                </div>
                                                <div class="col">
                                                    <div class="progress progress-sm mr-2">
                                                        <div class="progress-bar bg-info" role="progressbar"
                                                            style="width: 50%" aria-valuenow="50" aria-valuemin="0"
                                                            aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-home fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card shadow mb-4">
                        <div class="card shadow mb-4">
                        <div class="card-body">
                        <input type="text" v-model="thang" placeholder="Tháng">
                        <input type="text" v-model="nam" placeholder="Năm">
                        <button @click="fetchDataTK">Tìm kiếm</button>
                        </div>
                        <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                <th>Tên lớp</th>
                                <th>Năm</th>
                                <th>Tháng</th>
                                <th>Số lượng học sinh nghỉ</th>
                                <!-- <th>Chi tiết</th> -->
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>

                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Giới thiệu</h6>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="card-body text-center">
                                    <div>
                                        <img src="../assets/images/imgstudent/logo.jpeg" style="width: 50%;" alt="">
                                    </div>
                                    <h6>
                                        KITTEN PRESCHOOL
                                    </h6>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.121054054485!2d105.7982625758421!3d21.06782678643445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abf749cc5f29%3A0x6537faa7a42b9b94!2zVHLGsOG7nW5nIE3huqdtIE5vbiBLaXR0ZW4gMw!5e0!3m2!1svi!2s!4v1717411256452!5m2!1svi!2s"
                                    width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                                    referrerpolicy="no-referrer-when-downgrade"></iframe>
                                <h6 style="text-align:center">Phố Minh Tảo, Xuân Tảo, Bắc Từ Niêm, Hà Nội</h6>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Sidebar from '@/components/Sidebar.vue';
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';
import router from '@/router/index.js';
export default {
    components: {
        Sidebar,
        Navbar,
    },
    name: 'Statistical',
    data() {
        return {
            classes: [],
            teachers: [],
            students: [],
            thongkes: [],
            totalStudents: 0,
            totalTeachers: 0,
            totalClasses: 0,
        }
    },

    mounted() {
        this.fetchData();
        this.fetchTeachers();
        this.fetchStudents();
        this.fetchDataTK();
    },
    methods: {
        fetchDataTK() {
      axios.get(`https://localhost:7186/api/StudentOfClass/diemdanhNghiTheoThang?year=${this.nam}&month=${this.thang}`)
        .then(res => {
          this.students = res.data;

          // Destroy the existing DataTable instance, if it exists
          const table = $('#dataTable').DataTable();
          if (table) {
            table.destroy();
          }

          $('#dataTable').DataTable({
            data: this.students,
            paging: true,
            pageLength: 10,
            columns: [
              { data: 'tenLop' },
              { data: 'nam' },
              { data: 'thang' },
              { data: 'soLuongNghi' },
            ]
          });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
        fetchData() {
            axios.get(`https://localhost:7186/api/LopHoc`)
                .then(res => {
                    this.classes = res.data;
                    this.totalClasses = this.classes.length;
                })
                .catch(error => {
                    console.error('Lỗi:', error);
                });
        },
        fetchTeachers() {
            axios.get('https://localhost:7186/api/GiaoVien')
                .then(res => {
                    this.teachers = res.data;
                    this.totalTeachers = this.teachers.length;
                })
                .catch(error => {
                    console.error('Lỗi!', error);
                });
        },
        fetchStudents() {
            axios.get(`https://localhost:7186/api/HocSinh`)
                .then(res => {
                    this.students = res.data;
                    this.totalStudents = this.students.length;
                })
                .catch(error => {
                    console.error('Lỗi!', error);
                });
        },
    }
}
</script>