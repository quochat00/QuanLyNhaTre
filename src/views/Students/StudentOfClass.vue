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
                                <div class="col-lg-9">
                                    <div class="d-flex justify-content-end mb-3">
                                        <input type="file" id="fileInput" ref="fileInput" style="display:none"
                                            @change="handleFileUpload" />
                                        <button type="button" class="btn btn-info" @click="triggerFileInput">
                                            <i class="fa fa-file-word"></i> Nhập File
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <div class="d-flex justify-content-end mb-3" style="padding-right:15px">
                                        <button type="button" class="btn btn-success" @click="exportToExcel">
                                            <i class="fa fa-file-excel"></i> Xuất Excel
                                        </button>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-end mb-3">
                                    <button type="button" class="btn btn-info" id="attendanceButton">
                                        <i class="fa fa-edit"></i> Điểm Danh
                                    </button>
                                </div>

                            </div>
                            <div>
                            </div>
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Ảnh</th>
                                        <th>Họ và tên</th>
                                        <th>Ngày sinh</th>
                                        <th>Giới tính</th>
                                        <th>Quê Quán</th>
                                        <th>Sửa</th>
                                        <th>Xóa</th>
                                        <th>Chuyển lớp</th>
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
                                <div class="form-group">
                                    <div class="col-lg-12">
                                        <label for="date">Ngày điểm danh:</label>
                                        <div class="input-group">
                                            <input type="date" class="form-control" id="date"
                                                placeholder="Ngày điểm danh" required>
                                        </div>
                                    </div>
                                </div>
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
import fileSaver from 'file-saver';

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
        }
    },
    mounted() {
        this.fetchData();
        this.fetchDataHS();
        this.fetchDataLopHoc();
    },
    methods: {
        fetchData() {
            const maLop = this.$route.params.id;
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
                                    return date.toLocaleDateString();
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
                            {
                                defaultContent: `
                                <div>
                                    <button class="fa fa-arrow-right btn btn-outline-success"></button>
                                </div>`
                            },
                        ],
                        createdRow: function (row, data) {
                            $(row).find('.fa-pencil-square').on('click', function () {
                                router.push({ name: 'Student.edit', params: { id: data.maHS } });
                            });
                            $(row).find('.fa-trash').on('click', () => {
                                Swal.fire({
                                    title: 'Bạn có chắc chắn muốn xóa học sinh này không?',
                                    text: "Bạn sẽ không thể khôi phục lại dữ liệu này!",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Xóa',
                                    cancelButtonText: 'Hủy'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        axios.delete(`https://localhost:7186/api/HocSinh/deleteStudentFromClass/${data.maHS}`)
                                            .then(response => {
                                                vm.fetchData(response);
                                                vm.fetchDataLopHoc(response);
                                                Swal.fire(
                                                    'Đã xóa!',
                                                    'Học sinh đã được xóa thành công.',
                                                    'success'
                                                );
                                            })
                                            .catch(error => {
                                                console.error('Error deleting student:', error);
                                                Swal.fire(
                                                    'Lỗi!',
                                                    'Đã xảy ra lỗi khi xóa học sinh.',
                                                    'error'
                                                );
                                            });
                                    }
                                });
                            });
                            $(row).find('.fa-arrow-right').on('click', async () => {
                                try {
                                    // Fetch current class details
                                    const { data: currentClass } = await axios.get(`https://localhost:7186/api/HocSinh/getStudent/${data.maHS}`);

                                    // Fetch list of classes
                                    const classes = await getLopHocList();

                                    // Generate class options for the dropdown
                                    const classOptions = classes.map(cls => `
            <option value="${cls.maLop}" ${cls.maLop === currentClass.maLop ? 'selected' : ''}>${cls.tenLop}</option>
        `).join('');

                                    // Display Swal with class selection
                                    const { value: selectedClass, isConfirmed } = await Swal.fire({
                                        title: 'Hãy chọn lớp cần chuyển?',
                                        html: `<select id="classSelect" class="swal2-select">${classOptions}</select>`,
                                        icon: 'question',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Chuyển',
                                        cancelButtonText: 'Hủy',
                                        preConfirm: () => {
                                            const selectElement = document.getElementById('classSelect');
                                            return selectElement ? selectElement.value : null;
                                        }
                                    });

                                    if (isConfirmed && selectedClass) {
                                        try {
                                            // chuyển lớp
                                            await axios.patch(`https://localhost:7186/api/HocSinh/nextClass/${data.maHS}/${selectedClass}`, {
                                                headers: { 'Content-Type': 'application/json' }
                                            });
                                            // Refresh data 
                                            vm.fetchData();
                                            vm.fetchDataLopHoc();

                                            Swal.fire(
                                                'Thành công!',
                                                'Học sinh đã được chuyển lớp thành công.',
                                                'success'
                                            );
                                        } catch (error) {
                                            console.error('Error transferring student:', error);
                                            Swal.fire(
                                                'Lỗi!',
                                                'Đã xảy ra lỗi khi chuyển lớp cho học sinh.',
                                                'error'
                                            );
                                        }
                                    }
                                } catch (error) {
                                    console.error('Error fetching class list or current class:', error);
                                    Swal.fire(
                                        'Lỗi!',
                                        'Đã xảy ra lỗi khi lấy danh sách lớp hoặc thông tin lớp hiện tại.',
                                        'error'
                                    );
                                }
                            });
                            // Hàm để lấy danh sách các lớp
                            function getLopHocList() {
                                return axios.get('https://localhost:7186/api/LopHoc')
                                    .then(response => {
                                        return response.data;
                                    })
                                    .catch(error => {
                                        console.error('Error fetching classes:', error);
                                        throw error;
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
            const ngayDiemDanh = new Date();
            const formattedDate = ngayDiemDanh.toISOString();

            axios.get(`https://localhost:7186/api/StudentOfClass/themdiemdanh?maLop=${maLop}&ngayDiemDanh=${formattedDate}`)
                .then(res => {
                    const students = res.data;
                    console.log(students);

                    // Khi document đã sẵn sàng, khởi tạo DataTable
                    $(document).ready(function () {
                        $('#attendanceButton').on('click', function () {
                            $('#tableContainer').show();

                            $('#studentTable').DataTable({
                                data: students,
                                paging: true,
                                pageLength: 9,
                                columns: [
                                    { data: 'maHS', title: 'Mã HS' },
                                    { data: 'tenHS', title: 'Tên HS' },
                                    {
                                        data: 'ngayDiemDanh',
                                        render: function (data) {
                                            const date = new Date(data);
                                            return date.toLocaleDateString();
                                        },
                                        title: 'Ngày đi học'
                                    },
                                    {
                                        data: 'trangThai',
                                        render: function (data) {
                                            const checked = data ? 'checked' : '';
                                            return `<input type="checkbox" class="attendanceCheckbox" ${checked}>`;
                                        },
                                        orderable: false,
                                        title: '<input type="button" class="btn btn-outline-info" id="selectAll" value="Trạng Thái">'
                                    },
                                ],
                                destroy: true // Xóa table cũ trước khi khởi tạo lại
                            });

                            // Đăng ký sự kiện click cho nút "Select All"
                            $('#selectAll').on('click', function () {
                                const allChecked = $('.attendanceCheckbox').prop('checked');
                                $('.attendanceCheckbox').prop('checked', !allChecked);
                            });
                        });

                        // Lưu dữ liệu khi nhấn nút Save
                        $('#saveButton').on('click', function () {
                            let data = [];
                            $('#studentTable tbody tr').each(function () {
                                const maHS = $(this).find('td:eq(0)').text();
                                const isChecked = $(this).find('.attendanceCheckbox').prop('checked');
                                const dateInput = $('#date').val();
                                const ngay = new Date(dateInput);
                                const formatDate = ngay.toISOString();
                                data.push({
                                    maLop: maLop,
                                    ngayDiemDanh: formatDate,
                                    maHS: maHS,
                                    trangThai: isChecked
                                });
                            });

                            axios.post(`https://localhost:7186/api/StudentOfClass/DiemDanhHocSinh`, data)
                                .then(response => {
                                    alert("Điểm danh thành công!");
                                })
                                .catch(error => {
                                    alert("Điểm danh thất bại!");
                                    console.error('Error while saving attendance:', error);
                                });
                        });
                    });
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
                if (response.status === 200) {
                    this.fetchData();
                    this.fetchDataLopHoc();
                    Swal.fire({
                        icon: 'success',
                        title: 'File Imported',
                        text: 'File imported successfully: ' + response.data
                    });
                    this.resetForm();  // Reset the form fields and reinitialize state
                } else if (response.status === 409) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Import Failed',
                        text: 'Failed to import file: ' + response.data
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
            this.formHSdata = {
                tenPH: '',
                diaChi: '',
                sdt: '',
                email: '',
                tenHS: '',
                ngaySinh: '',
                gioiTinh: '',
                anhHS: '',
                queQuan: '',
                maLop: '',
                thoiGianNH: ''
            };
            // Optionally clear the file input
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) {
                fileInput.value = '';
            }
        },


        async exportToExcel() {
            const maLop = this.$route.params.id; // Ensure this is the correct way to access the route parameter
            try {
                const response = await axios.get(`https://localhost:7186/api/HocSinh/ExportHocSinh?maLop=${maLop}`, {
                    responseType: 'blob', // Important to handle binary data
                });

                const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const filename = `DanhSachHocSinh-${new Date().toISOString().slice(0, 10)}.xlsx`;
                fileSaver.saveAs(blob, filename);

                alert('File exported successfully');
            } catch (error) {
                console.error('Error exporting file:', error);
                alert('Failed to export file');
            }
        }

    },
};
</script>
