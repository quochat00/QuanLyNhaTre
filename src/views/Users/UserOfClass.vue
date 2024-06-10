<template>
    <div id="page-top">
        <div id="wrapper">
            <Sidebar/> 
            <div class="container-fluid">
                <NavbarUser />
                <div class="card shadow mb-4">
                    <div class="card-header py-3">

                        <h6 class="m-0 font-weight-bold text-primary">Danh sách lớp học</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <div>
                            </div>
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tên lớp</th>
                                        <th>Chủ nhiệm</th>
                                        <th>Ghi chú</th>
                                        <th>Thời khóa biểu</th>
                                        <th>Chi tiết lớp học</th>
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
import SidebarUser from '@/components/SidebarUser.vue';
import axios from 'axios';
import router from '@/router/index.js';
import NavbarUser from '@/components/NavbarUser.vue';

const components = {
    SidebarUser,
    NavbarUser,
};
export default {
    components,
    name: 'ListTeacher',
    data() {
        return {
           
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
    const maHS = this.$route.params.id;
    
    axios.get(`https://localhost:7186/api/LopHoc/HocSinh?maHS=${maHS}`)
        .then(res => {
            const classes = res.data;

            // Log the data to inspect its structure
            console.log('Classes Data:', classes);


            // Destroy existing DataTable if it exists
            if ($.fn.DataTable.isDataTable('#dataTable')) {
                $('#dataTable').DataTable().destroy();
            }

            // Initialize DataTable
            $('#dataTable').DataTable({
                data: classes,
                paging: true,
                pageLength: 8,
                columns: [
                    { data: 'maLop' },
                    { data: 'tenLop' },
                    { data: 'tenGV' },
                    {
                        data: null,
                        defaultContent: `
                       `
                    },
                    {
                        data: null,
                        render: function (data, type, row) {
                            return `<button type="button" class="btn btn-outline-success btn-view-schedule">Thời khóa biểu</button>`;
                        }
                    },
                    {
                        data: null,
                        defaultContent: `
                        <div>
                            <button class="fa fa-eye btn btn-outline-info btn-view-details"> Chi tiết </button>
                        </div>`
                    }
                ],
                createdRow: function (row, data) {
                    $(row).find('.btn-view-schedule').on('click', function () {
                        const rowData = $('#dataTable').DataTable().row($(this).parents('tr')).data();
                        if (rowData) {
                            const maLop = rowData.maLop;
                            router.push({ name: 'User.Schedule', params: { id: maLop } });
                        }
                    });

                    $(row).find('.btn-view-details').on('click', function () {
                        const rowData = $('#dataTable').DataTable().row($(this).parents('tr')).data();
                        if (rowData) {
                            const maLop = rowData.maLop;
                            // Handle the details button click
                            // Example: router.push({ name: 'ClassDetails', params: { id: maLop } });
                        }
                    });
                }
            });
        })
        .catch(error => {
            console.error('Lỗi:', error);
        });
}

        


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