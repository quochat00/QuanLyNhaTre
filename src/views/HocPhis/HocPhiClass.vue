<template>
    <div id="page-top">
        <div id="wrapper">
            <Sidebar />
            <div class="container-fluid">
                <Navbar />
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <div class="row">
                            <div class="col-lg-11">
                                <h6 class="m-0 font-weight-bold text-primary">Thông tin lớp học</h6>
                            </div>
                            <div>
                                <router-link to="/classView">
                                    <button type="button" class="btn btn-outline-success">Back</button>
                                </router-link>
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
                            <div class="col-lg-4">
                                <div class="form-gruop">
                                    <div class="col-lg-8">
                                        <label for="soLuongHS">Số lượng học sinh:</label>
                                        <input type="text" disabled class="form-control" id="soLuongHS"
                                            v-model="formData.soLuongHS" placeholder="Số lượng học sinh" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Danh sách lớp học</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <div class="row">
                                <!-- <div class="col-lg-9">
                                    <div class="d-flex justify-content-end mb-3">
                                        <input type="file" id="fileInput" ref="fileInput" style="display:none"
                                            @change="handleFileUpload" />
                                        <button type="button" class="btn btn-info" @click="triggerFileInput">
                                            <i class="fa fa-file-word"></i> Nhập File
                                        </button>
                                    </div>
                                </div> -->
                                <div class="col-lg-10">
                                    <div class="d-flex justify-content-end mb-3">
                                        <button type="button" class="btn btn-primary" data-toggle="modal"
                                            data-target="#exampleModalCenter">
                                            <i class="fa fa-plus"></i> Thêm mới
                                        </button>
                                    </div>
                                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
                                        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">Nhập thông tin</h5>
                                                    <button type="button" class="close" data-dismiss="modal"
                                                        aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <form @submit.prevent="submitForm">
                                                        <div class="form-group">
                                                            <label for="tenHP">Tên Học Phí:</label>
                                                            <input type="text" class="form-control" id="tenHP"
                                                                v-model="formHPdata.tenHP" placeholder="Tên Học Phí"
                                                                required>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="soTien">Số Tiền:</label>
                                                            <input type="number" class="form-control" id="soTien"
                                                                v-model="formHPdata.soTien" placeholder="Số Tiền"
                                                                required>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="hanNop">Hạn nộp:</label>
                                                            <input type="date" class="form-control" id="hanNop"
                                                                v-model="formHPdata.hanNop" placeholder="Hạn Nộp"
                                                                required>
                                                        </div>
                                                        <button type="submit" class="btn btn-primary">Gửi</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>

                                    <div class="d-flex justify-content-end mb-3" style="padding-right:15px">
                                        <button type="button" class="btn btn-success" @click="exportToExcel">
                                            <i class="fa fa-file-excel"></i> Xuất Excel
                                        </button>
                                    </div>
                                </div>
                                <!-- <div class="d-flex justify-content-end mb-3">
                                    <button type="button" class="btn btn-info" id="attendanceButton">
                                        <i class="fa fa-edit"></i> Điểm Danh
                                    </button>
                                </div> -->

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
                                        <!-- <th>Trạng thái</th> -->
                                        <th>Xóa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>

                        </div>

                    </div>
                </div>
                <div class="card shadow mb-4" id="tableContainer" style="display:none;">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Điểm danh</h6>
                    </div>
                    <div class="card-body">
                        <div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="d-flex justify-content-end mb-3">
                                        <button class="btn btn-primary" id="saveButton">Lưu</button>
                                    </div>
                                </div>

                            </div>

                            <table class="table table-bordered display" id="studentTable">

                            </table>
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
        Sidebar: Sidebar,
        Navbar: Navbar,
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
            formHSdata: {
                tenPH: '',
                diaChi: '',
                sdt: '',
                email: '',
                tenHS: '',
                ngaySinh: '',
                gioiTinh: '0',
                anhHS: null,
                queQuan: '',
                maLop: '',
                thoiGianNH: ''
            },
            formHPdata: {
                tenHP: '',
                soTien: '',
                hanNop: ''
            }
        }
    },
    mounted() {
        this.fetchData();
        this.fetchDataLopHoc();
        this.fetchDataHS();
    },
    methods: {
        fetchData() {
            const maLop = this.$route.params.id; // Lấy giá trị maLop từ đường dẫn
            axios.get(`https://localhost:7186/api/HocPhi?maLop=${maLop}`)
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
                                    return date.toLocaleDateString();
                                }
                            },
                            // {
                            //     defaultContent: `
                            //     <div>
                            //         <button class="fa fa-pencil-square btn btn-outline-info"></button> 
                            //     </div>`
                            // },
                            {
                                defaultContent: `
                                <div>
                                    <button class="fa fa-trash btn btn-outline-danger"></button>
                                </div>`
                            },
                        ],
                        createdRow: function (row, data) {
                            // $(row).find('.fa-pencil-square').on('click', function () {
                            //     router.push({ name: 'Student.edit', params: { id: data.maHS } });
                            // });
                            $(row).find('.fa-trash').on('click', () => {
                                if (confirm('Bạn có chắc chắn muốn xóa học sinh này không?')) {
                                    axios.delete(`https://localhost:7186/api/HocSinh/deleteStudent/${data.maHS}`)
                                        .then(response => {
                                            vm.fetchData(response);
                                            alert('Xóa học sinh thành công!')
                                        })
                                        .catch(error => {
                                            console.error('Error deleting teacher:', error);
                                        });
                                }
                            });
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
            const maLop = this.$route.params.id;
            axios.get(`https://localhost:7186/api/LopHoc/${maLop}`)
                .then(res => {
                    this.formData = res.data;
                }
                ).catch(error => {
                    console.error('Lỗi:', error);
                });
        },
        submitForm() {
            let formData = new FormData();
            const maLop = this.$route.params.id;
            formData.append('maLop', maLop);
            formData.append('tenHP', this.formHPdata.tenHP);
            formData.append('soTien', this.formHPdata.soTien);
            formData.append('hanNop', this.formHPdata.hanNop);

            axios.post('https://localhost:7186/api/TienHoc/TienHoc', formData)
                .then(response => {
                    if (response.data) {
                        const modal = document.getElementById('exampleModalCenter');
                        modal.classList.remove('show');
                        modal.setAttribute('aria-modal', 'false');
                        modal.setAttribute('aria-hidden', 'true');
                        modal.style.display = 'none';
                        document.body.classList.remove('modal-open');
                        const modalBackdrops = document.querySelectorAll('.modal-backdrop');
                        modalBackdrops.forEach(backdrop => {
                            backdrop.remove();
                        });
                        this.fetchData();
                    }
                })
                .catch(error => {
                    this.$swal.fire('Lỗi', 'Đã xảy ra lỗi khi thêm học phí', 'error');
                });
        },


    },
};
</script>
