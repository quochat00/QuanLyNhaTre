<template>
    <div id="page-top">
        <div id="wrapper">
            <SidebarUser />
            <div class="container-fluid">
                <NavbarUser />
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <div class="row">
                            <div class="col-lg-11">
                                <h6 class="m-0 font-weight-bold text-primary">Thông tin lớp học</h6>
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
                        </div>
                    </div>
                </div>
                <div class="card shadow mb-4" id="tableContainer">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Điểm danh</h6>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-gruop">
                                    <div class="col-lg-8">
                                        <label for="thang">Tháng:</label>
                                        <input type="text" class="form-control" v-model="thang" placeholder="Tháng"
                                            required>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-gruop">
                                    <div class="col-lg-8">
                                        <label for="nam">Năm:</label>
                                        <input type="text" class="form-control" v-model="nam" placeholder="Năm"
                                            required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-gruop">
                                <br />
                                <div class="col-lg-11">
                                    <button class="fa fa-search btn btn-outline-info btn-view-schedule"
                                        id="searchButton"> Tìm kiếm</button>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-lg-7">
                                <div class="form-group">
                                    <div class="col-lg-6">
                                        <label for="tenHS">Tên học sinh:</label>
                                        <input type="text" disabled class="form-control" id="tenHS" placeholder="0"
                                            required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6">
                                        <label for="trangThaiDiHoc">Số ngày đi học:</label>
                                        <input type="text" disabled class="form-control" id="soNgayDiHoc"
                                            placeholder="0" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-6">
                                        <label for="trangThaiVang">Số ngày vắng:</label>
                                        <input type="text" disabled class="form-control" id="soNgayVang" placeholder="0"
                                            required>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <canvas id="attendanceChart" width="300" height="300"></canvas>
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
import NavbarUser from '@/components/NavbarUser.vue';
import axios from 'axios';
import router from '@/router/index.js';
import SidebarUser from '@/components/SidebarUser.vue';

export default {
    components: {
        SidebarUser,
        NavbarUser
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
            soLanDiHoc: 0,
            soLanVang: 0,
            tenHS: '',
        }
    },
    mounted() {
        this.fetchDataLopHoc();
        document.getElementById('searchButton').addEventListener('click', () => {
            this.fetchDataHS();
        });
    },
    methods: {
        fetchDataHS() {
            const maHS = this.$route.params.id;
            axios.get(`https://localhost:7186/api/StudentOfClass/diemdanhHS?maHS=${maHS}&month=${this.thang}&year=${this.nam}`)
                .then(res => {
                    const students = res.data;

                    this.trueCount = students.soLanDiHoc;
                    this.falseCount = students.soLanVang;
                    this.tenHS = students.tenHS;
                    document.getElementById('tenHS').value = this.tenHS;;
                    document.getElementById('soNgayDiHoc').value = this.trueCount;
                    document.getElementById('soNgayVang').value = this.falseCount;

                    this.drawPieChart(this.trueCount, this.falseCount);
                })
                .catch(error => {
                    console.error('Lỗi:', error);
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
            const maHS = this.$route.params.id;
            axios.get(`https://localhost:7186/api/LopHoc/HocSinh?maHS=${maHS}`)
                .then(res => {
                    this.formData = res.data[0];
                    console.log(this.dataLopHoc);
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