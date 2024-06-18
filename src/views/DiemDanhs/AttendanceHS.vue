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
                <div class="card shadow mb-4" id="tableContainer">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Điểm danh</h6>
                    </div>
                    <div class="card-body">
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
                                <div class="form-group">
                                    <div class="col-lg-6">
                                        <label for="date">Ngày điểm danh:</label>
                                        <div class="input-group">
                                            <input type="date" class="form-control" id="date"
                                                placeholder="Ngày điểm danh" required>
                                            <div class="input-group-append" style="padding-left: 15px">
                                                <button class="fa fa-search btn btn-outline-info btn-view-schedule"
                                                    id="searchButton"></button>
                                            </div>
                                        </div>
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

                        </table>
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
            trueCount: 0,
            falseCount: 0,
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
        }
    },
    mounted() {
        this.fetchData();
        this.fetchDataLopHoc();
        // this.fetchDataHS();
        //document.getElementById('searchButton').addEventListener('click', this.fetchDataHS());
        document.getElementById('searchButton').addEventListener('click', () => {
            this.fetchDataHS();
        });
    },
    methods: {
        fetchData() {
            const maLop = this.$route.params.id; // Lấy giá trị maLop từ đường dẫn
            axios.get(`https://localhost:7186/api/StudentOfClass?maLop=${maLop}`)
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
                        pageLength: 5,
                        columns: [
                            { data: 'maHS' },
                            {
                                data: 'anhHS',
                                render: function (data, type, row) {
                                    return `<img src="/src/assets/images/imgstudent/${row.anhHS}" alt="Ảnh học sinh" style="width: 100px; height: auto;">`;
                                }
                            },

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
                            { data: 'queQuan' },
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
            const dateInput = document.getElementById('date').value;
            const ngayDiemDanh = dateInput ? new Date(dateInput) : new Date();
            const formattedDate = ngayDiemDanh.toISOString().substring(0, 10);

            axios.get(`https://localhost:7186/api/StudentOfClass/diemdanh?maLop=${maLop}&ngayDiemDanh=${formattedDate}`)
                .then(res => {
                    const students = res.data;
                    console.log(students);
                    this.students = students;

                    this.trueCount = this.students.filter(student => student.trangThai).length;
                    this.falseCount = this.students.filter(student => !student.trangThai).length;

                    document.getElementById('trangThaiDiHoc').value = this.trueCount;
                    document.getElementById('trangThaiVang').value = this.falseCount;

                    $(document).ready(() => {
                        $('#tableContainer').show();

                        $('#studentTable').DataTable({
                            data: students,
                            paging: true,
                            pageLength: 10,
                            columns: [
                                { data: 'maHS', title: 'Mã HS' },
                                { data: 'tenHS', title: 'Tên HS' },
                                {
                                    data: function (row) {
                                        const date = new Date(row.ngayDiemDanh);
                                        const formattedDate = date.toISOString().split('T')[0];
                                        return formattedDate;
                                    },
                                    title: 'Ngày đi học'
                                },
                                {
                                    data: 'trangThai',
                                    render: (data) => {
                                        const checked = data ? 'checked' : '';
                                        return `<input type="checkbox" class="attendanceCheckbox" ${checked}>`;
                                    },
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
                                    ngayDiemDanh: formattedDate,
                                    maHS: maHS,
                                    tenHS: tenHS,
                                    trangThai: isChecked
                                });
                            }
                        });

                        $('#updateButton').on('click', () => {
                            if (changedData.length > 0) {
                                Swal.fire({
                                    title: 'Xác nhận',
                                    text: "Bạn có chắc chắn muốn cập nhật điểm danh không?",
                                    icon: 'question',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Có, cập nhật!',
                                    cancelButtonText: 'Không, hủy!'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        axios.post(`https://localhost:7186/api/StudentOfClass/updateDiemDanh`, changedData)
                                            .then(response => {
                                                Swal.fire(
                                                    'Thành công!',
                                                    'Cập nhật điểm danh thành công!',
                                                    'success'
                                                );
                                                changedData = [];
                                                this.fetchDataHS();
                                            })
                                            .catch(error => {
                                                Swal.fire(
                                                    'Thất bại!',
                                                    'Cập nhật điểm danh thất bại!',
                                                    'error'
                                                );
                                                console.error('Error while saving attendance:', error);
                                            });
                                    }
                                });
                            } else {
                                Swal.fire(
                                    'Không có thay đổi!',
                                    'Không có thay đổi nào để cập nhật!',
                                    'info'
                                );
                            }
                        });


                        document.getElementById('ngayHoc').value = formattedDate;
                    });

                    this.drawPieChart(this.trueCount, this.falseCount);

                })
                .catch(error => {
                    console.error('Error fetching students:', error);
                });
        },

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
            const formHSdata = new FormData();
            formHSdata.append('file', file);
            formHSdata.append('tenPH', this.formHSdata.tenPH);
            formHSdata.append('diaChi', this.formHSdata.diaChi);
            formHSdata.append('sdt', this.formHSdata.sdt);
            formHSdata.append('email', this.formHSdata.email);
            formHSdata.append('tenHS', this.formHSdata.tenHS);
            formHSdata.append('ngaySinh', this.formHSdata.ngaySinh);
            formHSdata.append('gioiTinh', this.formHSdata.gioiTinh);
            formHSdata.append('anhHS', this.formHSdata.anhHS);
            formHSdata.append('queQuan', this.formHSdata.queQuan);
            formHSdata.append('maLop', this.formHSdata.maLop);
            formHSdata.append('thoiGianNH', this.formHSdata.thoiGianNH);

            try {
                const response = await axios.post('https://localhost:7186/api/HocSinh/ImportHocSinh', formHSdata);
                this.fetchData();
                alert('File imported successfully: ' + response.data);
            } catch (error) {
                console.error('Error importing file:', error);
                alert('Failed to import file');
            }
        }

    },
};
</script>
<style scoped>
.chart-container {
    position: relative;
    height: 40vh;
    width: 80vw;
}
</style>