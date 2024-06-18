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
                                <router-link to="/dishView">
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
                        <h6 class="m-0 font-weight-bold text-primary">Thực đơn món ăn</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <div class="row">
                                <div class="col-lg-11">
                                    <div class="d-flex justify-content-end mb-3">
                                        <input type="file" id="fileInput" ref="fileInput" style="display:none"
                                            @change="handleFileUpload" />
                                        <button type="button" class="btn btn-info" @click="triggerFileInput">
                                            <i class="fa fa-file-word"></i> Nhập File
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <div class="d-flex justify-content-end mb-3" style="padding-right:15px;">
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
                                                            <label for="ngay">Ngày:</label>
                                                            <input type="date" class="form-control" id="ngay"
                                                                v-model="formTDdata.ngay" placeholder="Ngày" required>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="maBuoi">Bữa ăn:</label>
                                                            <select class="form-control" id="maBuoi"
                                                                v-model="formTDdata.maBuoi" required>
                                                                <option v-for="buoi in buois" :value="buoi.maBuoi">{{
                                                buoi.tenBuoi }}</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="monAn">Món Ăn:</label>
                                                            <textarea class="form-control" id="monAn"
                                                                v-model="formTDdata.monAn" placeholder="Món ăn"
                                                                required></textarea>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="gia">Giá:</label>
                                                            <input type="text" class="form-control" id="gia"
                                                                v-model="formTDdata.gia" placeholder="Giá" required>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="maLop">Lớp:</label>
                                                            <select class="form-control" id="maLop"
                                                                v-model="formTDdata.maLop" required>
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
                                <!-- <div>
                                    <div class="d-flex justify-content-end mb-3">
                                        <button type="button" class="btn btn-success" @click="exportToExcel">
                                            <i class="fa fa-file-excel"></i> Xuất Excel
                                        </button>
                                    </div>
                                </div> -->
                            </div>
                            <div>
                            </div>
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Ngày</th>
                                        <th>Sáng</th>
                                        <th>Trưa</th>
                                        <th>Chiều</th>
                                        <th>Danh sách học sinh</th>
                                        <!-- <th>Sửa</th>
                                        <th>Xóa</th> -->
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
                                <div class="col-lg-7">
                                    <div class="form-group">
                                        <div class="col-lg-6">
                                            <label for="ngayHoc">Ngày học:</label>
                                            <input type="text" disabled class="form-control" id="ngayHoc"
                                                placeholder="Ngày điểm danh" required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-lg-6">
                                            <label for="trangThaiDiHoc">Số học sinh đi học:</label>
                                            <input type="text" disabled class="form-control" id="trangThaiDiHoc"
                                                placeholder="Trạng thái" required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-lg-6">
                                            <label for="trangThaiVang">Số học sinh vắng:</label>
                                            <input type="text" disabled class="form-control" id="trangThaiVang"
                                                placeholder="Trạng thái" required>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <canvas id="attendanceChart" width="300" height="300"></canvas>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="d-flex justify-content-end mb-3">
                                        <button class="btn btn-success" id="updateButton">Cập nhật</button>
                                    </div>
                                </div>
                            </div>
                            <table class="table table-bordered display" id="studentTable">
                                <thead>
                                    <tr>
                                        <th>Mã HS</th>
                                        <th>Tên HS</th>
                                        <th>Ngày sinh</th>
                                        <th>Điểm danh</th>
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
            buois: [],
            formData: {
                tenLop: '',
                maGV: '',
                soLuongHS: '',
            },
            formTDdata: {
                ngay: '',
                maBuoi: '',
                monAn: '',
                gia: '',
                maLop: '',
            },
        }
    },
    mounted() {
        this.fetchData();
        this.fetchDataLopHoc();
        this.fetchLop();
        this.fetchDataBuoi();
    },
    methods: {
        async fetchData() {
            const maLop = this.$route.params.id; // Get maLop from route parameters
            const vm = this;
            // Fetch dishes data
            const fetchDishesData = async () => {
                try {
                    const response = await axios.get(`https://localhost:7186/api/ThucDon/${maLop}`);
                    return response.data;
                } catch (error) {
                    console.error('Error fetching dishes:', error);
                    return [];
                }
            };

            // Fetch students data for attendance
            const fetchStudentsData = async (maLop, ngay) => {
                try {
                    const response = await axios.get(`https://localhost:7186/api/StudentOfClass/diemdanh?maLop=${maLop}&ngayDiemDanh=${ngay}`);
                    return response.data;
                } catch (error) {
                    console.error('Error fetching students:', error);
                    return [];
                }
            };

            // Initialize DataTable
            const initializeDataTable = (data, columns, tableId) => {
                if ($.fn.DataTable.isDataTable(tableId)) {
                    $(tableId).DataTable().destroy();
                }

                $(tableId).DataTable({
                    data: data,
                    paging: true,
                    pageLength: 10,
                    columns: columns,
                    createdRow: (row, data) => {
                        // Edit button click event
                        // $(row).find('.fa-pencil-square').on('click', () => {
                        //     vm.$router.push({ name: 'Student.edit', params: { id: data.maHS } });
                        // });

                        // Delete button click event
                        // $(row).find('.fa-trash').on('click', () => {
                        //     if (confirm('Bạn có chắc chắn muốn xóa học sinh này không?')) {
                        //         axios.delete(`https://localhost:7186/api/HocSinh/deleteStudent/${data.maHS}`)
                        //             .then(() => {
                        //                 vm.fetchData();
                        //                 alert('Xóa học sinh thành công!');
                        //             })
                        //             .catch(error => {
                        //                 console.error('Error deleting student:', error);
                        //             });
                        //     }
                        // });

                        // Attendance button click event
                        $(row).find('.btn-info').on('click', async () => {
                            try {
                                const students = await fetchStudentsData(maLop, data.ngay);
                                renderAttendanceTable(students, maLop, data.ngay);
                            } catch (error) {
                                console.error('Error fetching students for attendance:', error);
                            }
                        });
                    }
                });
            };

            // Render attendance table
            const renderAttendanceTable = (students, maLop, ngay) => {
                const trueCount = students.filter(student => student.trangThai).length;
                const falseCount = students.filter(student => !student.trangThai).length;

                $('#trangThaiDiHoc').val(trueCount);
                $('#trangThaiVang').val(falseCount);
                $('#tableContainer').show();

                const table = $('#studentTable').DataTable({
                    data: students,
                    paging: true,
                    pageLength: 10,
                    columns: [
                        { data: 'maHS', title: 'Mã HS' },
                        { data: 'tenHS', title: 'Tên HS' },
                        {
                            data: 'ngayDiemDanh',
                            title: 'Ngày đi học',
                            render: data => new Date(data).toLocaleDateString()
                        },
                        {
                            data: 'trangThai',
                            render: data => `<input type="checkbox" class="attendanceCheckbox" ${data ? 'checked' : ''}>`,
                            orderable: false,
                            title: 'Trạng thái'
                        }
                    ],
                    destroy: true
                });

                let changedData = [];

                $('#studentTable').on('change', '.attendanceCheckbox', function () {
                    const row = $(this).closest('tr');
                    const maHS = row.find('td:eq(0)').text();
                    const tenHS = row.find('td:eq(1)').text();
                    const isChecked = $(this).prop('checked');
                    const existingEntryIndex = changedData.findIndex(item => item.maHS === maHS);

                    if (existingEntryIndex !== -1) {
                        changedData[existingEntryIndex].trangThai = isChecked;
                    } else {
                        changedData.push({
                            maLop: maLop,
                            ngayDiemDanh: ngay,
                            maHS: maHS,
                            tenHS: tenHS,
                            trangThai: isChecked
                        });
                    }
                });

                $('#updateButton').on('click', () => {
                    if (changedData.length > 0) {
                        axios.post('https://localhost:7186/api/StudentOfClass/updateDiemDanh', changedData)
                            .then(() => {
                                alert("Cập nhật điểm danh thành công!");
                                changedData = [];
                                vm.refreshAttendanceTable(maLop, ngay); // Reload the table
                            })
                            .catch(error => {
                                alert("Cập nhật điểm danh thất bại!");
                                console.error('Error while saving attendance:', error);
                            });
                    } else {
                        alert("Không có thay đổi nào để cập nhật!");
                    }
                });

                $('#ngayHoc').val(ngay);
                vm.drawPieChart(trueCount, falseCount);
            };

            // Refresh the attendance table
            vm.refreshAttendanceTable = async (maLop, ngay) => {
                try {
                    const students = await fetchStudentsData(maLop, ngay);
                    const trueCount = students.filter(student => student.trangThai).length;
                    const falseCount = students.filter(student => !student.trangThai).length;

                    $('#trangThaiDiHoc').val(trueCount);
                    $('#trangThaiVang').val(falseCount);

                    const table = $('#studentTable').DataTable();
                    table.clear().rows.add(students).draw();

                    vm.drawPieChart(trueCount, falseCount);
                } catch (error) {
                    console.error('Error reloading attendance data:', error);
                }
            };

            // Initialize and fetch data
            const init = async () => {
                const dishes = await fetchDishesData();
                const columns = [
                    { data: row => new Date(row.ngay).toLocaleDateString() },
                    { data: 'caSang' },
                    { data: 'caTrua' },
                    { data: 'caChieu' },
                    {
                        defaultContent: `<div><button type="button" class="btn btn-info attendance-button"><i class="fa fa-edit"></i> Chi tiết</button></div>`
                    },
                    // {
                    //     defaultContent: `<div><button class="fa fa-pencil-square btn btn-outline-info"></button></div>`
                    // },
                    // {
                    //     defaultContent: `<div><button class="fa fa-trash btn btn-outline-danger"></button></div>`
                    // }
                ];

                initializeDataTable(dishes, columns, '#dataTable');
            };

            init();
        },

        // Draw pie chart
        drawPieChart(trueCount, falseCount) {
            const ctx = document.getElementById('attendanceChart').getContext('2d');
            if (this.attendanceChart) {
                this.attendanceChart.destroy();
            }
            this.attendanceChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Đi học', 'Vắng'],
                    datasets: [{
                        label: 'Attendance Status',
                        data: [trueCount, falseCount],
                        backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        },

        fetchLop() {
            axios.get('https://localhost:7186/api/LopHoc', {
            })
                .then(res => {
                    this.classes = res.data;
                })
                .catch(error => {
                    console.error('Lỗi!', error);
                });
        },
        fetchDataBuoi() {
            axios.get(`https://localhost:7186/api/ThucDon/Buoi`)
                .then(res => {
                    this.buois = res.data;
                })
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
            formData.append('ngay', this.formTDdata.ngay);
            formData.append('maBuoi', this.formTDdata.maBuoi);
            formData.append('monAn', this.formTDdata.monAn);
            formData.append('gia', this.formTDdata.gia);
            formData.append('maLop', this.formTDdata.maLop);
            axios.post('https://localhost:7186/api/ThucDon', formData)
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
                    this.$swal.fire('Lỗi', 'Đã xảy ra lỗi khi thêm thực đơn', 'error');
                });

        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.uploadFile(file);
            }
        },
        async uploadFile(file) {
            const formTDdata = new FormData();
            formTDdata.append('file', file);
            formTDdata.append('ngay', this.formTDdata.ngay);
            formTDdata.append('maBuoi', this.formTDdata.maBuoi);
            formTDdata.append('monAn', this.formTDdata.monAn);
            formTDdata.append('gia', this.formTDdata.gia);
            formTDdata.append('maLop', this.formTDdata.maLop);

            try {
                const response = await axios.post('https://localhost:7186/api/ThucDon/ImportThucDon', formTDdata);
                if (response.status === 200) {
                    this.fetchData();
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'File imported successfully'
                    });
                    this.resetForm();  // Reset the form fields and file input
                } else if (response.status === 409) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Conflict',
                        text: response.data
                    });
                }
            } catch (error) {
                console.error('Error importing file:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to import file'
                });
            }
        },

        resetForm() {
            this.formTDdata = {
                ngay: '',
                maBuoi: '',
                monAn: '',
                gia: '',
                maLop: ''
            };
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) {
                fileInput.value = '';
            }
        }



    },
};
</script>
