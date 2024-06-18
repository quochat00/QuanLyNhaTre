<template>
    <div id="page-top">
        <div id="wrapper">
            <SidebarUser />
            <div class="container-fluid">
                <NavbarUser />
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <div class="row">
                            <div class="col-lg-11">
                                <h6 class="m-0 font-weight-bold text-primary">Thông tin lớp học</h6>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-gruop">
                                    <div class="col-lg-8">
                                        <label for="tenLop">Tên Lớp:</label>
                                        <input type="text" disabled class="form-control" id="tenLop"
                                            v-model="formData.tenLop" placeholder="Tên Lớp" required>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-gruop">
                                    <div class="col-lg-8">
                                        <label for="tenGV">Chủ nhiệm:</label>
                                        <input type="text" disabled class="form-control" id="tenGV"
                                            v-model="formData.tenGV" placeholder="Chủ nhiệm" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Thông tin học phí</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="form-gruop">
                                        <div class="col-lg-8">
                                            <label for="thang">Tháng:</label>
                                            <input type="text" class="form-control" v-model="thang" placeholder="Tháng"
                                                required>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="form-gruop">
                                        <div class="col-lg-8">
                                            <label for="nam">Năm:</label>
                                            <input type="text" class="form-control" v-model="nam" placeholder="Năm"
                                                required>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-gruop">
                                    <br />
                                    <div class="col-lg-11">
                                        <button class="fa fa-search btn btn-outline-info btn-view-schedule"
                                            @click="fetchData"> Tìm kiếm</button>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                            </div>
                            <div>
                            </div>
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Họ và tên</th>
                                        <th>Số buổi ăn</th>
                                        <th>Tổng tiền ăn</th>
                                        <th>Học phí</th>
                                        <th>Tổng tiền</th>
                                        <th>Hạn nộp tiền</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>

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
import SidebarUser from '@/components/SidebarUser.vue';
import NavbarUser from '@/components/NavbarUser.vue';

export default {
    components: {
        SidebarUser,
        NavbarUser,
    },
    name: 'ListStudent',
    data() {
        return {
            students: [],
            classes: [],
            formData: {
                tenLop: '',
                maGV: '',
                soLuongHS: '',
            },
        }
    },
    mounted() {
        this.fetchData();
        this.fetchDataLopHoc();
        this.fetchDataHS();
    },
    methods: {
        fetchData() {
            const maHS = this.$route.params.id; // Lấy giá trị maLop từ đường dẫn
            axios.get(`https://localhost:7186/api/HocPhi/HocPhiByHS?maHS=${maHS}&thang=${this.thang}&nam=${this.nam}`)
                .then(res => {
                    const students = res.data; // Lấy dữ liệu sinh viên từ phản hồi
                    //console.log(students)
                    const table = $('#dataTable').DataTable();
                    const vm = this;
                    if (table) {
                        table.destroy();
                    }
                    $('#dataTable').DataTable({
                        data: students, // Sử dụng dữ liệu sinh viên lấy từ phản hồi
                        paging: true,
                        pageLength: 10,
                        columns: [
                            { data: 'maHS' },
                            { data: 'tenHS' },
                            { data: 'soNgayAn' },
                            { data: 'tongTienAn' },
                            { data: 'tongTienHoc' },
                            { data: 'tongTien' },
                            {
                                data: function (row) {
                                    const date = new Date(row.hanNop);
                                    const formattedDate = date.toISOString().split('T')[0];
                                    return formattedDate;
                                }
                            },
                            { data: 'trangThai' },
                        ],
                    });

                    students.forEach(student => {
                        if (student.trangThai === 'Đã đóng') {
                            // Hiển thị nếu học sinh đã đóng học phí
                            Swal.fire({
                                title: 'Học phí',
                                text: `Học sinh ${student.tenHS} không tồn tại khoản phải nộp.`,
                                icon: 'success',
                                confirmButtonText: 'OK'
                            });
                        } else {
                            const hanNopDate = new Date(student.hanNop);
                            const currentDate = new Date();
                            const timeDiff = hanNopDate - currentDate;
                            const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

                            if (daysLeft > 0) {
                                // Hiển thị số ngày còn lại
                                Swal.fire({
                                    title: 'Hạn nộp học phí',
                                    text: `Học sinh ${student.tenHS} còn ${daysLeft} ngày nữa đến hạn nộp.`,
                                    icon: 'info',
                                    confirmButtonText: 'OK'
                                });
                            } else if (daysLeft === 0) {
                                // Hiển thị nếu hôm nay là ngày cuối
                                Swal.fire({
                                    title: 'Hạn nộp học phí',
                                    text: `Hôm nay là hạn nộp học phí của học sinh ${student.tenHS}.`,
                                    icon: 'warning',
                                    confirmButtonText: 'OK'
                                });
                            } else {
                                // Hiển thị nếu đã quá hạn
                                Swal.fire({
                                    title: 'Hạn nộp học phí đã qua!',
                                    text: `Học sinh ${student.tenHS} đã quá hạn nộp học phí ${Math.abs(daysLeft)} ngày. Vui lòng liên hệ giáo viên chủ nhiệm để đóng học phí.`,
                                    icon: 'error',
                                    confirmButtonText: 'Đã hiểu',
                                    customClass: {
                                        title: 'swal-title',
                                        text: 'swal-text',
                                        confirmButton: 'swal-confirm-button'
                                    }
                                });

                            }
                        }
                    });


                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        fetchDataHS() {
            const maLop = this.$route.params.id;
            let ngayDiemDanh = new Date();
            var formattedDate = ngayDiemDanh.toISOString();

            axios.get(`https://localhost:7186/api/StudentOfClass/themdiemdanh?maLop=${maLop}&ngayDiemDanh=${formattedDate}`)
                .then(res => {
                    const students = res.data;
                    console.log(students);
                })
                .catch(error => {
                    console.error('Error fetching students:', error);
                });
        },

        fetchDataLopHoc() {
            const maHS = this.$route.params.id;
            axios.get(`https://localhost:7186/api/LopHoc/HocSinh?maHS=${maHS}`)
                .then(res => {
                    this.formData = res.data[0];
                    console.log(this.dataLopHoc);
                });
        },

    },
};
</script>
