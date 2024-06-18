<template>
    <div id="page-top">
        <div id="wrapper">
            <Sidebar />
            <div class="container-fluid">
                <Navbar />
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Thông tin lớp học</h6>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-gruop">
                                    <div class="col-lg-8">
                                        <label for="tenLop">Tên Lớp:</label>
                                        <input type="text" disabled class="form-control" id="tenLop"
                                            v-model="dataLopHoc.tenLop" placeholder="Tên Lớp" required>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-gruop">
                                    <div class="col-lg-8">
                                        <label for="tenGV">Chủ nhiệm:</label>
                                        <input type="text" disabled class="form-control" id="tenGV"
                                            v-model="dataLopHoc.tenGV" placeholder="Chủ nhiệm" required>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-gruop">
                                    <div class="col-lg-8">
                                        <label for="soLuongHS">Số lượng học sinh:</label>
                                        <input type="text" disabled class="form-control" id="soLuongHS"
                                            v-model="dataLopHoc.soLuongHS" placeholder="Số lượng học sinh" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card shadow mb-4">
                    <div class="card-body">
                        <div class="table-responsive">
                            <div>
                                <div class="d-flex justify-content-end mb-3">
                                    <div class="d-flex justify-content-end mb-3" style="padding-right: 20px">
                                        <input type="file" id="fileInput" ref="fileInput" style="display:none"
                                            @change="handleFileUpload" />
                                        <button type="button" class="btn btn-info" @click="triggerFileInput">
                                            <i class="fa fa-file-word"></i> Nhập File
                                        </button>
                                    </div>
                                    <div style="padding-right: 20px">
                                        <button type="button" class="btn btn-primary" data-toggle="modal"
                                            data-target="#exampleModalCenter">
                                            <i class="fa fa-plus"></i> Thêm mới
                                        </button>
                                    </div>
                                    <div>
                                        <button type="button" class="btn btn-danger" data-toggle="modal"
                                            @click="deleteSchedule">
                                            <i class="fa fa-trash"></i> Xóa
                                        </button>
                                    </div>
                                </div>
                                <h2 style="text-align: center;">THỜI KHÓA BIỂU</h2>
                                <br />
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
                                                        <label for="tenMH">Tên Môn Học:</label>
                                                        <input type="text" class="form-control" id="tenMH"
                                                            v-model="formData.tenLH" placeholder="Tên Môn Học" required>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="ca">Ca học:</label>
                                                        <select class="form-control" id="ca" v-model="formData.maCa"
                                                            required>
                                                            <option value="1">8h30'-9h</option>
                                                            <option value="2">9h-9h30'</option>
                                                            <option value="3">9h30-10h</option>
                                                            <option value="4">10h-10h30'</option>
                                                            <option value="5">10h30'-10h45'</option>
                                                            <option value="6">10h45'-15h15'</option>
                                                            <option value="7">15h15'-15h45'</option>
                                                            <option value="8">15h45'-16h15'</option>
                                                            <option value="9">16h15'-16h45'</option>
                                                            <option value="10">16h45'-17h15'</option>
                                                            <option value="11">17h30'-18h</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="maNTT">Ngày trong tuần:</label>
                                                        <select class="form-control" id="maNTT" v-model="formData.maNTT"
                                                            required>
                                                            <option v-for="day in days" :key="day.maNTT"
                                                                :value="day.maNTT">{{ day.tenNTT }}</option>
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
                        </div>


                        <table class="table table-bordered" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Ca/Thứ</th>
                                    <th>Thứ Hai</th>
                                    <th>Thứ Ba</th>
                                    <th>Thứ Tư</th>
                                    <th>Thứ Năm</th>
                                    <th>Thứ Sáu</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in dataLichHoc" :key="item.tenCa">
                                    <td>{{ item.tenCa }}</td>
                                    <td>{{ item.thuHai }}</td>
                                    <td>{{ item.thuBa }}</td>
                                    <td>{{ item.thuTu }}</td>
                                    <td>{{ item.thuNam }}</td>
                                    <td>{{ item.thuSau }}</td>

                                </tr>
                            </tbody>
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
        Sidebar,
        Navbar
    },
    name: 'LichHocList',
    data() {
        return {
            classes: [],
            formData: {
                maLH: '',
                tenLH: '',
                maCa: '',
                maNTT: '',
                maLop: '',
            },
            dataLopHoc: {
                tenLop: '',
                tenGV: '',
                soLuongHS: '',
            },
            days: [],
            dataLichHoc: {
                tenLH: '',
                thuHai: '',
                thuBa: '',
                thuTu: '',
                thuNam: '',
                thuSau: '',
                thuBay: '',
            }
        }
    },
    mounted() {
        this.fetchData();
        this.fetchDays();
        this.fetchDataLichHoc();
        this.fetchDataLopHoc();
    },
    methods: {
        fetchData() {
            //const maNTT = this.$route.params.id;
            axios.get(`https://localhost:7186/api/LopHoc`)
                .then(res => {
                    this.classes = res.data;

                });
        },
        fetchDataLichHoc() {
            const maLop = this.$route.params.id;
            return axios.get(`https://localhost:7186/api/LichHoc/${maLop}`)
                .then(res => {
                    this.dataLichHoc = res.data;
                    console.log(this.dataLichHoc);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        viewDetails(day) {
            router.push({ name: 'Schedule.Date', params: { id: day } });
        },
        fetchDays() {
            axios.get(`https://localhost:7186/api/LichHoc/ngaytt`)
                .then(res => {
                    this.days = res.data;
                });
        },
        fetchDataLopHoc() {
            const maLop = this.$route.params.id;
            axios.get(`https://localhost:7186/api/LopHoc/${maLop}`)
                .then(res => {
                    this.dataLopHoc = res.data;
                    console.log(this.dataLopHoc);
                });
        },
        async deleteSchedule() {
            try {
                const maLop = this.$route.params.id;

                const result = await Swal.fire({
                    title: 'Bạn có chắc chắn muốn xóa?',
                    text: "Bạn sẽ không thể khôi phục lại lịch học này!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Có, xóa nó!',
                    cancelButtonText: 'Không, hủy bỏ!'
                });

                if (result.isConfirmed) {
                    const response = await axios.delete(`https://localhost:7186/api/LichHoc/delete/${maLop}`);
                    if (response.status === 200) {
                        Swal.fire(
                            'Đã xóa!',
                            'Lịch học đã được xóa thành công.',
                            'success'
                        );
                        this.fetchDataLichHoc(); // Refresh data after deletion
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Lỗi',
                            text: 'Không thể xóa lịch học. Vui lòng thử lại.'
                        });
                    }
                }
            } catch (error) {
                console.error('Error deleting schedule:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Không thể xóa lịch học. Vui lòng thử lại sau.'
                });
            }
        },

        submitForm() {
            let formData = new FormData();
            formData.append('tenLH', this.formData.tenLH);
            formData.append('maCa', this.formData.maCa);
            formData.append('maNTT', this.formData.maNTT);
            formData.append('maLop', this.$route.params.id);
            const maLop = this.$route.params.id;
            axios.post(`https://localhost:7186/api/LichHoc/ThemLichHoc/${maLop}`, formData)
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
                    alert("Thêm lịch học thành công!");
                    this.fetchDataLichHoc();
                })
                .catch(error => {
                    console.error('Error adding schedule:', error);
                    alert("Đã xảy ra lỗi khi thêm lịch học!");
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
            const formData = new FormData();
            formData.append('file', file);
            formData.append('TenMH', this.formData.tenMH);
            formData.append('Ca', this.formData.ca);
            formData.append('MaLop', this.formData.maLop);
            formData.append('MaNTT', this.formData.maNTT);

            try {
                const response = await axios.post('https://localhost:7186/api/LichHoc/import', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.status === 200) {
                    this.fetchDataLichHoc(); // Refresh data

                    // Show success message
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'File imported successfully'
                    });

                    // Reset the form fields and file input
                    this.resetForm();

                    // Optionally, disable the button or update its text to indicate completion
                    const uploadButton = document.getElementById('uploadButton');
                    if (uploadButton) {
                        uploadButton.disabled = false; // Enable button again, if disabled
                        uploadButton.textContent = 'Import File'; // Reset button text
                    }
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

                // Optionally, enable the button again if an error occurs
                const uploadButton = document.getElementById('uploadButton');
                if (uploadButton) {
                    uploadButton.disabled = false;
                    uploadButton.textContent = 'Import File'; // Reset button text
                }
            }
        },

        // Reset form fields
        resetForm() {
            this.formData.tenMH = '';
            this.formData.ca = '';
            this.formData.maLop = '';
            this.formData.maNTT = '';
            // Reset file input
            const fileInput = document.getElementById('fileInput');
            if (fileInput) {
                fileInput.value = ''; // Clear file input
            }
        }


    },
}
</script>