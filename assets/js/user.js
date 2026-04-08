const datas = [
  {
    id: 1,
    FullName: "Bùi Thế Trọng",
    Username: "trongbt",
    Password: "123456",
    Phone: "0123456789",
    Email: "trongbt@gmail.com",
    MaXN: 11,
    CreatedAt: "2026-04-08",
  },
  {
    id: 2,
    FullName: "Bùi Thế Trọng",
    Username: "trongbt",
    Password: "123456",
    Phone: "0123456789",
    Email: "trongbt@gmail.com",
    MaXN: 11,
    CreatedAt: "2026-04-08",
  },
  {
    id: 3,
    FullName: "Bùi Thế Trọng",
    Username: "trongbt",
    Password: "123456",
    Phone: "0123456789",
    Email: "trongbt@gmail.com",
    MaXN: 12,
    CreatedAt: "2026-04-08",
  },
  {
    id: 4,
    FullName: "Bùi Thế Trọng",
    Username: "trongbt",
    Password: "123456",
    Phone: "0123456789",
    Email: "trongbt@gmail.com",
    MaXN: 12,
    CreatedAt: "2026-04-08",
  },
  {
    id: 5,
    FullName: "Bùi Thế Trọng",
    Username: "trongbt",
    Password: "123456",
    Phone: "0123456789",
    Email: "trongbt@gmail.com",
    MaXN: 13,
    CreatedAt: "2026-04-08",
  },
];
let userTable;
function loadDataUser() {
  ViewUserTable(datas);
}
function ViewUserTable(data) {
  userTable = $("#UserTable").DataTable({
    data: data,
    searching: true,
    autoWidth: true,
    // scrollY: "50vh",
    columns: [
      {
        data: null,
        title: "STT",
        render: function (data, type, row, meta) {
          return meta.row + 1;
        },
        width: "5%",
      },
      { data: "FullName", title: "Họ Tên", orderable: false },
      { data: "Username", title: "Tài khoản", orderable: false },
      { data: "Password", title: "Mật khẩu", orderable: false },
      { data: "Phone", title: "SDT", orderable: false },
      { data: "Email", title: "Email", orderable: false },
      { data: "Phone", title: "SDT", orderable: false },
      { data: "MaXN", title: "Công ty", orderable: false },
      { data: "CreatedAt", title: "Ngày tạo", orderable: false },
      {
        data: null,
        title: "Hành động",
        render: function (data, type, row) {
          return `
                    <button class="btn-action edit-btn" data-id="${row.id}"><i class="fa-solid fa-pen-to-square"></i>Sửa</button>
                    <button class="btn-action delete-btn" data-id="${row.id}"><i class="fa-solid fa-trash"></i>Xóa</button>
                `;
        },
        orderable: false,
        width: "10%",
      },
    ],
    dom: '<"top" >rt<"tool-bottom"ilp>',
    pagingType: "simple_numbers",
    language: {
      paginate: {
        next: "Sau",
        previous: "Trước",
      },
      info: "Hiển thị _START_ đến _END_ của _TOTAL_ dòng",
      lengthMenu: "Hiển thị _MENU_ dòng",
    },

    initComplete: function () {
      this.api().columns.adjust();
    },
  });
}

$(document).ready(function () {
  loadDataUser();
});
