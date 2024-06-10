<template>
    <div id="page-top">
        <div id="wrapper">
            <Sidebar />
            <div class="container-fluid">
                <Navbar />
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Thông tin lịch học lớp 3 tuổi</h6>
                    </div>
                    <div class="card shadow mb-4">
                        <div class="card-body">
                            <div class="table-responsive">
                                <div c>
                                    <div class="d-flex justify-content-end mb-3">
                                        <button type="button" class="btn btn-primary" data-toggle="modal"
                                            data-target="#exampleModalCenter" @click="submitForm">
                                            <i class="fa fa-plus"></i> Thêm mới
                                        </button>

                                    </div>
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
                                                                v-model="formData.tenMH" placeholder="Tên Môn Học"
                                                                required>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="ca">Ca học:</label>
                                                            <select class="form-control" id="ca" v-model="formData.ca"
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
                                                            <label for="ngayNTT">Ngày trong tuần:</label>
                                                            <select class="form-control" id="maNTT"
                                                                v-model="formData.maNTT" required>
                                                                <option v-for="date in dates" :value="date.maNTT">{{
                                                date.tenNTT }}</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="maLop">Lớp:</label>
                                                            <select class="form-control" id="maLop"
                                                                v-model="formData.maLop" required>
                                                                <option v-for="clas in classes" :value="clas.maLop">{{
                                                clas.tenLop }}</option>
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
                                    <div class="card mb-4 py-3 border-left-primary">
                                        <div class="card-body">
                                            <table class="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Ca học</th>
                                                        <th>Tên môn học</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{{ getCaTime() }}</td>
                                                        <td>{{ data.tenMH }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
    name: 'LichHocList',
    data() {
        return {
            dates: [],
            classes: [],
            formData: {
                maLH: '',
                tenMH: '',
                ca: '',
                maLop: '',
                maNTT: '',
            },
            data: {
                tenMH: '',
                ca: '',
            }
        }
    },
    mounted() {
        this.fetchData();
        this.fetchClassData();
        this.fetchDateData();
    },
    methods: {
        fetchData() {
            const maNTT = this.$route.params.id;
            return axios.get(`https://localhost:7186/api/LichHoc/ntt/${maNTT}`)
                .then(res => {
                    this.data = res.data[0];
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        fetchClassData() {
            axios.get(`https://localhost:7186/api/LopHoc`)
                .then(res => {
                    this.classes = res.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        fetchDateData() {
            axios.get(`https://localhost:7186/api/LichHoc/ngaytt`)
                .then(res => {
                    this.dates = res.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        submitForm() {
            let formData = new FormData();
            formData.append('TenMH', this.formData.tenMH);
            formData.append('Ca', this.formData.ca);
            formData.append('MaLop', this.formData.maLop);
            formData.append('MaNTT', this.formData.maNTT);
            axios.post(`https://localhost:7186/api/LichHoc`, formData)
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
                    alert("Thêm lịch học thành công!")
                    this.fetchData();
                })
                .catch(error => {
                    console.error('Error adding teacher:', error);
                    alert("Đã xảy ra lỗi khi thêm lịch học!");
                });
        },
        getCaTime() {
            const timeSlots = [
                "8h30'-9h",
                "9h-9h30'",
                "9h30-10h",
                "10h-10h30'",
                "10h30'-10h45'",
                "10h45'-15h15'",
                "15h15'-15h45'",
                "15h45'-16h15'",
                "16h15'-16h45'",
                "16h45'17h15'",
                "17h30'-18h",
            ];
            // Ensure that ca is within the valid range
            const index = Math.min(Math.max(this.data.ca - 1, 0), timeSlots.length - 1);
            return timeSlots[index];
        }

    },
}
</script>