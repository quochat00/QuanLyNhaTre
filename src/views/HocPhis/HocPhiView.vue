<template>
    <div id="page-top">
        <div id="wrapper">
            <Sidebar />
            <div class="container-fluid">
                <Navbar />
                <div class="card shadow mb-4">
                    <div class="card-header py-3">

                        <h6 class="m-0 font-weight-bold text-primary">Danh sách lớp học</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên lớp</th>
                                        <th>Chủ nhiệm</th>
                                        <th>Ghi chú</th>
                                        <th >Số lượng học sinh</th>
                                        <th>Học phí</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- <tr v-for="clas in classes" :key="clas.maLop">
                                        <td>{{ clas.maLop }}</td>
                                        <td>{{ clas.tenLop }}</td>
                                        <td>{{ clas.tenGV }}</td>
                                        <td>{{ clas.soLuongHS }}</td>
                                        <td>
                                            <button type="button" class="btn btn-outline-success">Thời khóa
                                                biểu</button>
                                        </td>
                                        <td>
                                            <div class="btn-funcion">
                                                <router-link :to="{name:'Class.stofclass',params: { id: clas.maLop } }">
                                                    <button class="fa fa-eye"></button>
                                                </router-link>
                                                <button class="fa fa-pencil-square"></button>
                                                <button class="fa fa-trash" @click="xoaLopHoc(clas.maLop)"></button>
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

const components = {
    Sidebar: Sidebar,
    Navbar: Navbar
};
export default {
    components,
    name: 'HocPhiView',
    data() {
        return {
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
        this.fetchTeachers();
        this.fetchStudentsByClass();
    },
    methods: {
        fetchData() {
            axios.get(`https://localhost:7186/api/LopHoc`)
                .then(res => {
                    const classes = res.data;
                    const table = $('#dataTable').DataTable();
                    const vm = this;
                    if (table) {
                        table.destroy();
                    }
                    $('#dataTable').DataTable({
                        data: classes,
                        paging: true,
                        pageLength: 8,
                        columns: [
                            { data: 'maLop' },
                            { data: 'tenLop' },
                            { data: 'tenGV' },
                            {
                                defaultContent: ``
                            },
                            { data: 'soLuongHS' },
                            {
                                data: null,
                                render: function (data, type, row) {
                                    return `<button type="button" class="btn btn-outline-warning btn-view-schedule">Học phí</button>`;
                                }
                            },
                        ],
                        createdRow: function (row, data) {
                            $(row).find('.fa-eye').on('click', function () {
                                router.push({ name: 'Class.stofclass', params: { id: data.maLop } });
                            });
                            $(row).find('.fa-pencil-square').on('click', function () {
                                router.push({ name: 'Student.edit', params: { id: data.maHS } });
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
                                    router.push({ name: 'HocPhi.Class', params: { id: maLop } });
                                }
                            });

                        }
                    });
                })
                .catch(error => {
                    console.error('Lỗi:', error);
                });
        },
        fetchTeachers() {
            axios.get('https://localhost:7186/api/GiaoVien', {
            })
                .then(res => {
                    this.teachers = res.data;
                })
                .catch(error => {
                    console.error('Lỗi!', error);
                });
        },
        fetchStudentsByClass(maLop) {
            axios.get(`https://localhost:7186/api/StudentOfClass?maLop=${maLop}`)
                .then(response => {
                    this.students = response.data; // Cập nhật mảng students với dữ liệu học sinh mới
                })
                .catch(error => {
                    // Xử lý lỗi nếu có
                    console.error('Error fetching students by class:', error);
                });
        },

        getXepLoai(xepLoai) {
            switch (xepLoai) {
                case 0:
                    return "Giỏi";
                case 1:
                    return "Khá";
            }
        },
        submitForm() {
            let formData = new FormData();
            formData.append('tenLop', this.formData.tenLop);
            formData.append('maGV', this.formData.maGV);
            formData.append('soLuongHS', this.formData.soLuongHS);
            axios.post('https://localhost:7186/api/LopHoc', formData)
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
                    this.$swal.fire('Lỗi', 'Đã xảy ra lỗi khi thêm lớp học', 'error');
                });

        },
        xoaLopHoc(maLop) {
            axios.delete(`https://localhost:7186/api/LopHoc/${maLop}`)
                .then(response => {
                    if (response.data) {
                        this.fetchData();
                    }
                })
                .catch(error => {
                    console.error('Không thể xóa lớp học:', error);
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