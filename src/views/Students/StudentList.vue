<template>
    <div id="page-top">
        <div id="wrapper">
            <Sidebar />
            <div class="container-fluid">
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <Navbar />
                        <h6 class="m-0 font-weight-bold text-primary">Danh sách nhập học</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <div>
                                <div class="row">
                                    <div class="col-lg-9">
                                        <!-- <div class="d-flex justify-content-end mb-3">
                                            <button type="button" class="btn btn-info" @click="importFile">
                                                <i class="fa fa-file-word"></i> Nhập File
                                            </button>
                                        </div> -->
                                    </div>
                                    <div style="padding-right:20px;">
                                        <div class="d-flex justify-content-end mb-3">
                                            <button type="button" class="btn btn-primary" data-toggle="modal"
                                                data-target="#exampleModalCenter">
                                                <i class="fa fa-plus"></i> Thêm mới
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="d-flex justify-content-end mb-3">
                                            <button type="button" class="btn btn-success" @click="exportToExcel">
                                                <i class="fa fa-file-excel"></i> Xuất Excel
                                            </button>
                                        </div>
                                    </div>
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
                                                        <label for="tenPH">Tên Phụ Huynh:</label>
                                                        <input type="text" class="form-control" id="tenPH"
                                                            v-model="formData.tenPH" placeholder="Tên Phụ Huynh"
                                                            required>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="diaChi">Địa chỉ:</label>
                                                        <input type="text" class="form-control" id="diaChi"
                                                            v-model="formData.diaChi" placeholder="Địa chỉ" required>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="sdt">Số điện thoại:</label>
                                                        <input type="text" class="form-control" id="sdt"
                                                            v-model="formData.sdt" placeholder="Số điện thoại" required>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="email">Email:</label>
                                                        <input type="email" class="form-control" id="email"
                                                            v-model="formData.email" placeholder="Email" required>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="tenHS">Tên Học Sinh:</label>
                                                        <input type="text" class="form-control" id="tenHS"
                                                            v-model="formData.tenHS" placeholder="Tên Học Sinh"
                                                            required>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="ngaySinh">Ngày sinh:</label>
                                                        <input type="date" class="form-control" id="ngaySinh"
                                                            v-model="formData.ngaySinh" required>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="gioiTinh">Giới Tính:</label>
                                                        <select class="form-control" id="gioiTinh"
                                                            v-model="formData.gioiTinh" required>
                                                            <option value="0">Nam</option>
                                                            <option value="1">Nữ</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="anhHS">Ảnh Học Sinh:</label>
                                                        <input type="file" class="form-control-file" id="anhHS"
                                                            @change="handleFileChange">
                                                        <img v-if="imageUrl" :src="imageUrl" class="img-fluid"
                                                            alt="Ảnh Học Sinh">
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="queQuan">Quê Quán:</label>
                                                        <input type="text" class="form-control" id="queQuan"
                                                            v-model="formData.queQuan" placeholder="Quê Quán">
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="thoiGianNH">Ngày nhập học:</label>
                                                        <input type="date" class="form-control" id="thoiGianNH"
                                                            v-model="formData.thoiGianNH" required>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="maLop">Lớp:</label>
                                                        <select class="form-control" id="maLop" v-model="formData.maLop"
                                                            required>
                                                            <option v-for="clas in classes" :value="clas.maLop">{{
                                                clas.tenLop }}</option>
                                                        </select>
                                                    </div>
                                                    <button type="submit" class="btn btn-primary">Gửi</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Họ và tên</th>
                                        <th>Ngày sinh</th>
                                        <th>Giới tính</th>
                                        <th>Số điện thoại</th>
                                        <th>Phụ huynh</th>
                                        <th>Ngày nhập học</th>
                                        <th>Sửa</th>
                                        <th>Xóa</th>
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
import Sidebar from '@/components/Sidebar.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import axios from 'axios';
import router from '@/router/index.js';

export default {
    components: {
        Sidebar,
        Navbar,
        Footer,
    },
    name: 'ListStudent',
    data() {
        return {
            students: [],
            classes: [],
            formData: {
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
                thoiGianNH: '',
            },
        };
    },
    mounted() {
        this.fetchData();
        this.fetchClassData();
    },
    methods: {
        fetchData() {
            axios.get(`https://localhost:7186/api/HocSinh`)
                .then(res => {
                    this.students = res.data;
                    // Destroy the existing DataTable instance, if it exists
                    const table = $('#dataTable').DataTable();
                    const vm = this;
                    if (table) {
                        table.destroy();
                    }
                    $('#dataTable').DataTable({
                        data: this.students,
                        paging: true,
                        pageLength: 10,
                        columns: [
                            { data: 'maHS' },
                            { data: 'tenHS' },
                            {
                                data: function (row) {
                                    const date = new Date(row.ngaySinh);
                                    const formattedDate = date.toISOString().split('T')[0];
                                    return formattedDate;
                                }
                            },
                            {
                                data: function (row) {
                                    return row.gioiTinh === 0 ? "Nam" : "Nữ";
                                }
                            },
                            { data: 'sdt' },
                            { data: 'tenPH' },
                            {
                                data: function (row) {
                                    const date = new Date(row.thoiGianNH);
                                    const formattedDate = date.toISOString().split('T')[0];
                                    return formattedDate;
                                }
                            },
                            {
                                defaultContent: `
                                <div>
                                    <button class="fa fa-pencil-square btn btn-outline-info"></button>
                                </div>`
                            },
                            {
                                defaultContent: `
                                <div>
                                    <button class="fa fa-trash btn btn-outline-danger"></button>
                                </div>`
                            },
                        ],
                        createdRow: function (row, data) {
                            $(row).find('.fa-pencil-square').on('click', function () {
                                router.push({ name: 'Student.edit', params: { id: data.maHS } });
                            });
                            $(row).find('.fa-trash').on('click', () => {
                                if (confirm('Bạn có chắc chắn muốn xóa học sinh này không?')) {
                                    axios.delete(`https://localhost:7186/api/HocSinh/deleteStudent/${data.maHS}`)
                                        .then(response => {
                                            vm.fetchData(response);
                                            alert('Xóa học sinh thành công!');
                                        })
                                        .catch(error => {
                                            // Xử lý lỗi khi xóa học sinh không thành công
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
        exportToExcel() {
            $('#dataTable').DataTable().button('.buttons-excel').trigger();
        },
        // changePage(action) {
        //     if (action === 'prev' && this.currentPage > 1) {
        //         this.currentPage--;
        //     } else if (action === 'next' && this.currentPage < this.pageSize) {
        //         this.currentPage++;
        //     }
        //     this.fetchData();
        // },
        fetchClassData() {
            axios.get(`https://localhost:7186/api/LopHoc`)
                .then(res => {
                    this.classes = res.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        getXepLoai(gioiTinh) {
            return gioiTinh === 0 ? "Nam" : "Nữ";
        },
        // getDateOfBirth(ngaySinh) {
        //     return ngaySinh.split('T')[0];
        // },
        submitForm() {
            let formData = new FormData();
            formData.append('TenPH', this.formData.tenPH);
            formData.append('DiaChi', this.formData.diaChi);
            formData.append('SDT', this.formData.sdt);
            formData.append('Email', this.formData.email);
            formData.append('TenHS', this.formData.tenHS);
            formData.append('NgaySinh', this.formData.ngaySinh);
            formData.append('GioiTinh', this.formData.gioiTinh);
            formData.append('AnhHS', this.formData.anhHS.name); // Chắc chắn rằng dữ liệu tệp ảnh đã được thêm vào formData
            formData.append('QueQuan', this.formData.queQuan);
            formData.append('maLop', this.formData.maLop);

            axios.post(`https://localhost:7186/api/HocSinh`, formData)
                .then(response => {
                    const modal = document.getElementById('exampleModalCenter');
                    modal.classList.remove('show'); // Loại bỏ lớp 'show' để ẩn modal
                    modal.setAttribute('aria-modal', 'false');
                    modal.setAttribute('aria-hidden', 'true');
                    modal.style.display = 'none'; // Ẩn modal
                    document.body.classList.remove('modal-open'); // Loại bỏ lớp 'modal-open' từ body
                    // Xóa tất cả các phần tử có lớp 'modal-backdrop'
                    const modalBackdrops = document.querySelectorAll('.modal-backdrop');
                    modalBackdrops.forEach(backdrop => {
                        backdrop.remove();
                    });
                    alert("Thêm học sinh thành công!")
                    this.fetchData();
                })
                .catch(error => {
                    console.error('Error adding teacher:', error);
                    alert("Đã xảy ra lỗi khi thêm học sinh!");
                });
        },
        handleFileChange(event) {
            this.formData.anhHS = event.target.files[0];
        },
    },
};
</script>

<style>
.btn-funcion {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
</style>