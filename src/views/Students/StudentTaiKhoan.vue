<template>
    <div id="page-top">
        <div id="wrapper">
            <Sidebar />


            <div class="container-fluid">
                <Navbar />
                <div class="card shadow mb-4">
                    <div class="card-header py-3">

                        <h6 class="m-0 font-weight-bold text-primary">Danh sách tài khoản</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <div>
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
                                                        <label for="tenLop">Tên Lớp:</label>
                                                        <input type="text" class="form-control" id="tenLop"
                                                            v-model="formData.tenLop" placeholder="Tên Lớp" required>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="maGV">Chủ Nhiệm:</label>
                                                        <select class="form-control" id="maGV" v-model="formData.maGV"
                                                            required>
                                                            <option v-for="teacher in teachers" :value="teacher.maGV">{{
                                                    teacher.tenGV }}</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="soLuongHocSinh">Số lượng học sinh:</label>
                                                        <input type="number" class="form-control" id="soLuongHocSinh"
                                                            v-model="formData.soLuongHS" placeholder="Số lượng học sinh"
                                                            required>
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
                                        <th>ID</th>
                                        <th>Học sinh</th>
                                        <th>Tài Khoản</th>
                                        <th>Mật khẩu</th>
                                        <th>Ghi chú</th>
                                        
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
import axios from 'axios';
import router from '@/router/index.js';

const components = {
    Sidebar: Sidebar,
    Navbar: Navbar
};
export default {
    components,
    name: 'ListTeacher',
    data() {
        return {
            taikhoans:[],
            classes: [],
            teachers: [],
            formData: {
                maLop: '',
                tenLop: '',
                maGV: '',
                soLuongHS: '',
            },
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            axios.get(`https://localhost:7186/api/HocSinh/TaiKhoan`)
                .then(res => {
                    const taikhoans = res.data;
                    const table = $('#dataTable').DataTable();
                    const vm = this;
                    if (table) {
                        table.destroy();
                    }
                    $('#dataTable').DataTable({
                        data: taikhoans,
                        paging: true,
                        pageLength: 8,
                        columns: [
                            { data: 'maTK' },
                            { data: 'tenHS' },
                            { data: 'tenDN' },
                            { data: 'matKhau' },
                            { defaultContent:``
                            },
                           
                        ],
                        createdRow: function (row, data) {
                            $(row).find('.fa-eye').on('click', function () {
                                router.push({ name: 'Attendance.Class', params: { id: data.maLop } });
                            });
                            $(row).find('.fa-pencil-square').on('click', function () {
                                router.push({ name: 'Attendance.Class', params: { id: data.maHS } });
                            });
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
                            $(document).on('click', '.btn-view-schedule', function () {
                                const rowData = $('#dataTable').DataTable().row($(this).parents('tr')).data();
                                if (rowData) {
                                    const maLop = rowData.maLop;
                                    router.push({ name: 'Schedule.Class', params: { id: maLop } });
                                }
                            });

                        }
                    });
                })
                .catch(error => {
                    console.error('Lỗi:', error);
                });
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