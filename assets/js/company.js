const datas = [
  {
    id: 1,
    name: "Company A",
    address: "123 Hai Bà Trưng, Hà Nội",
    phone: "0234 567 890",
    email: "companya@example.com",
  },
  {
    id: 2,
    name: "Company B",
    address: "456 Lê Duẩn, Đà Nẵng",
    phone: "0236 789 012",
    email: "companyb@example.com",
  },
  {
    id: 3,
    name: "Company C",
    address: "789 Trần Hưng Đạo, TP. HCM",
    phone: "028 123 4567",
    email: "companyc@example.com",
  },
  {
    id: 4,
    name: "Company D",
    address: "101 Nguyễn Huệ, TP. HCM",
    phone: "028 987 6543",
    email: "companyd@example.com",
  },
  {
    id: 5,
    name: "Company E",
    address: "246 Hoàng Văn Thụ, TP. HCM",
    phone: "028 246 8024",
    email: "companye@example.com",
  },
  {
    id: 6,
    name: "Company F",
    address: "369 Lê Lợi, TP. HCM",
    phone: "028 369 0123",
    email: "companyf@example.com",
  },
  {
    id: 7,
    name: "Company G",
    address: "123 Hai Bà Trưng, Hà Nội",
    phone: "0234 567 890",
    email: "companyg@example.com",
  },
  {
    id: 8,
    name: "Company H",
    address: "123 Hai Bà Trưng, Hà Nội",
    phone: "0234 567 890",
    email: "companyh@example.com",
  },
  {
    id: 9,
    name: "Company I",
    address: "123 Hai Bà Trưng, Hà Nội",
    phone: "0234 567 890",
    email: "companyi@example.com",
  },
  {
    id: 10,
    name: "Company J",
    address: "123 Hai Bà Trưng, Hà Nội",
    phone: "0234 567 890",
    email: "companyj@example.com",
  },
  {
    id: 11,
    name: "Company K",
    address: "123 Hai Bà Trưng, Hà Nội",
    phone: "0234 567 890",
    email: "companyk@example.com",
  },
  {
    id: 12,
    name: "Company L",
    address: "123 Hai Bà Trưng, Hà Nội",
    phone: "0234 567 890",
    email: "companyl@example.com",
  },
];
const modal = $("#modal");
const modalTitle = $("#modalTitle");
const modalContent = $("#modalContent");
const closeModal = $("#closedModal");

function openModal(title) {
  modalTitle.text(title);
  modal.show();
}
function closedModal() {
  modal.hide();
}
$(window).on("click", function (event) {
  if ($(event.target).is("#modal")) {
    closedModal();
  }
});

$(document).ready(function () {
  const table = $("#companyTable").DataTable({
    data: datas,
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
      { data: "name", title: "Tên công ty", width: "20%", orderable: false },
      { data: "address", title: "Địa chỉ", width: "25%", orderable: false },
      { data: "phone", title: "Điện thoại", width: "10%", orderable: false },
      { data: "email", title: "Email", width: "25%", orderable: false },
      {
        data: null,
        title: "Hành động",
        render: function (data, type, row) {
          return `
                    <button id="edit-btn" class="btn-action" data-id="${row.id}"><i class="fa-solid fa-pen-to-square"></i>Sửa</button>
                    <button id="delete-btn" class="btn-action" data-id="${row.id}"><i class="fa-solid fa-trash"></i>Xóa</button>
                `;
        },
        orderable: false,
        width: "10%",
      },
    ],
    dom: '<"top" >rt<"tool-bottom"ilp>',
    pagingType: "simple_numbers",
    paginate: {
      next: "Sau",
      previous: "Trước",
    },
    initComplete: function () {
      this.api().columns.adjust();
    },
  });

  $(window).on("resize", function () {
    table.columns.adjust().draw();
  });
  closeModal.off("click").on("click", function () {
    closedModal();
  });
  $("#btnAddCompany").on("click", function () {
    openModal("Thêm mới công ty");
  });
  $("#edit-btn")
    .off("click")
    .on("click", function () {});
});
