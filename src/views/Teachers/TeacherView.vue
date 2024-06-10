<template>
    <div id="page-top">
        <div id="wrapper">
            <Sidebar />
            <div class="container-fluid">
                <Navbar />
                <div class="card shadow mb-4">
                    <div class="card-body">
                        <div class="table-responsive">
                            <div>
                                <div class="d-flex justify-content-end mb-3">
                                    <button type="button" class="btn btn-primary" data-toggle="modal"
                                        data-target="#exampleModalCenter" @click="submitForm">
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
                                                        <label for="tenGV">Tên Giáo Viên:</label>
                                                        <input type="text" class="form-control" id="tenGV"
                                                            v-model="formData.tenGV" placeholder="Tên Giáo Viên"
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
                                                        <label for="vaiTro">Vai Trò:</label>
                                                        <input type="text" class="form-control" id="vaiTro"
                                                            v-model="formData.vaiTro" placeholder="Vai Trò" required>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="xepLoai">Xếp loại:</label>
                                                        <select class="form-control" id="xepLoai"
                                                            v-model="formData.xepLoai" required>
                                                            <option value="0">Giỏi</option>
                                                            <option value="1">Khá</option>
                                                        </select>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="submit" class="btn btn-primary">Gửi</button>
                                                        <button type="button" class="btn btn-secondary"
                                                            data-dismiss="modal">Đóng</button>
                                                    </div>
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
                                        <th>Địa chỉ</th>
                                        <th>Số điện thoại</th>
                                        <th>Email</th>
                                        <th>Xếp Loại</th>
                                        <th>Sửa</th>
                                        <th>Xóa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- <tr v-for="teacher in teachers" :key="teacher.MaGV">
                                        <td>{{ teacher.maGV }}</td>
                                        <td>{{ teacher.tenGV }}</td>
                                        <td>{{ teacher.diaChi }}</td>
                                        <td>{{ teacher.sdt }}</td>
                                        <td>{{ teacher.email }}</td>
                                        <td>{{ getXepLoai(teacher.xepLoai) }}</td>
                                        <td>
                                            <div class="btn-funcion">
                                                <button class="fa fa-eye" @click="showGiaoVien(teacher.maGV)"></button>
                                                <button class="fa fa-pencil-square"
                                                    @click="showGiaoVien(teacher.maGV)"></button>
                                                <button class="fa fa-trash" @click="xoaGiaoVien(teacher.maGV)"></button>
                                            </div>
                                        </td>
                                    </tr> -->

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

export default {
    components: {
        Sidebar,
        Navbar
    },
    name: 'ListTeacher',
    data() {
        return {
            teachers: [],
            formData: {
                maGV: '',
                tenGV: '',
                diaChi: '',
                sdt: '',
                email: '',
                vaiTro: '',
                xepLoai: '0',
            },
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            axios.get(`https://localhost:7186/api/GiaoVien`)
                .then(res => {
                    this.teachers = res.data;
                    this.initializeDataTable();
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        initializeDataTable() {
            const vm = this;
            const table = $('#dataTable').DataTable();
            if (table) {
                table.destroy();
            }
            $('#dataTable').DataTable({
                data: this.teachers,
                paging: true,
                pageLength: 10,
                columns: [
                    { data: 'maGV' },
                    { data: 'tenGV' },
                    { data: 'diaChi' },
                    { data: 'sdt' },
                    { data: 'email' },
                    {
                        data: function (row) {
                            return row.xepLoai === 0 ? "Giỏi" : "Khá";
                        }
                    },
                    {
                        data: null,
                        render: function (data) {
                            return `
                            <div>
                            <button class="fa fa-pencil-square btn btn-outline-info"></button>
                        </div>`;
                        }
                    },
                    {
                        data: null,
                        render: function (data) {
                            return `
                            <div>
                            <button class="fa fa-trash btn btn-outline-danger"></button>
                        </div>`;
                        }
                    }
                ],
                createdRow: function (row, data) {
                    $(row).find('.fa-pencil-square').on('click', function () {
                        router.push({ name: 'Teacher.edit', params: { id: data.maGV } });
                    });

                    $(row).find('.fa-trash').on('click', () => {
                        if (confirm('Bạn có chắc chắn muốn xóa giáo viên này không?')) {
                            axios.delete(`https://localhost:7186/api/GiaoVien/${data.maGV}`)
                                .then(response => {
                                    vm.fetchData(response);
                                    alert('Xóa giáo viên thành công!')
                                })
                                .catch(error => {
                                    console.error('Error deleting teacher:', error);
                                });
                        }
                    });
                }
            });
        },
        // getXepLoai(xepLoai) {
        //     return xepLoai === '0' ? "Giỏi" : "Khá";
        // },
        submitForm() {
            let formData = new FormData();
            formData.append('tenGV', this.formData.tenGV);
            formData.append('diaChi', this.formData.diaChi);
            formData.append('sdt', this.formData.sdt);
            formData.append('email', this.formData.email);
            formData.append('vaiTro', this.formData.vaiTro);
            formData.append('xepLoai', this.formData.xepLoai);
            // Nếu không phải đang chỉnh sửa, gửi yêu cầu POST
            axios.post('https://localhost:7186/api/GiaoVien', formData)
                .then(response => {
                    if (response.data) {
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
                        alert("Thêm giáo viên thành công!")
                        this.fetchData();
                    }
                })
                .catch(error => {
                    this.$swal.fire('Lỗi', 'Đã xảy ra lỗi khi thêm giáo viên', error);
                });
        },
        xoaGiaoVien(maGV) {
            axios.delete(`https://localhost:7186/api/GiaoVien/${maGV}`)
                .then(response => {
                    this.fetchData();
                })
                .catch(error => {
                    console.error('Error deleting teacher:', error);
                });
        },
        // showGiaoVien(maGV) {
        //     axios.get(`https://localhost:7186/api/GiaoVien/${maGV}`)
        //         .then(response => {
        //             const teacherData = response.data;
        //             this.isEditing = true;
        //             this.formData = {
        //                 maGV: teacherData.maGV,
        //                 tenGV: teacherData.tenGV,
        //                 diaChi: teacherData.diaChi,
        //                 sdt: teacherData.sdt,
        //                 email: teacherData.email,
        //                 vaiTro: teacherData.vaiTro,
        //                 xepLoai: teacherData.xepLoai
        //             };
        //             $('#exampleModalCenter').modal('show');
        //         })
        //         .catch(error => {
        //             console.error('Error fetching teacher:', error);
        //         });
        // }
    }
};



</script>
<style>
.btn-funcion {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
</style>