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
const btnSaveCompany = $("#saveCompany");
const btnUpdateCompany = $("#updateCompany");
const btnAddCompany = $("#btnAddCompany");
const btnExportExcel = $("#btnExportExcel");

function openModal(title) {
  modalTitle.text(title);
  modal.show();
  btnSaveCompany.show();
  btnUpdateCompany.hide();
}
function closedModal() {
  modal.hide();
}
$(window).on("click", function (event) {
  if ($(event.target).is("#modal")) {
    closedModal();
  }
});
async function exportToExcel() {
  $("#loading-screen").css("display", "flex");
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Danh sách công ty");
    console.log(workbook);
    //định nghĩa cột
    worksheet.columns = [
      {
        header: "STT",
        key: "stt",
        width: 10,
      },
      { header: "Tên công ty", key: "name", width: 30 },
      { header: "Địa chỉ", key: "address", width: 40 },
      { header: "Email", key: "email", width: 30 },
      { header: "Số điện thoạt", key: "phone", width: 20 },
    ];
    //thêm dữ liệu
    datas.forEach((item, index) => {
      const row = worksheet.addRow({
        stt: index + 1,
        name: item.name,
        address: item.address,
        email: item.email,
        phone: item.phone,
      });
      row.getCell("stt").alignment = {
        vertical: "middle",
        horizontal: "center",
      };
    });

    // định dạng
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4F81BD" },
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    //kẻ bảng (border)
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });
    await new Promise((resolve, reject) => setTimeout(resolve, 500));
    //xuất file
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "Danh_sach_cong_ty.xlsx");
  } catch (err) {
    console.error("Lỗi xuất file:", err);
    Swal.fire({
      icon: "error",
      title: "Lỗi xuất file",
      text: "Đã có lỗi xảy ra khi xuất file Excel. Vui lòng thử lại.",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    // Ẩn loading dù thành công hay thất bại
    $("#loading-screen").hide();
  }
}

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

  $(window).on("resize", function () {
    table.columns.adjust().draw();
  });
  closeModal.off("click").on("click", function () {
    closedModal();
  });
  btnAddCompany.on("click", function () {
    openModal("Thêm mới công ty");
    $("#NameCompany").val("");
    $("#AddressCompany").val("");
    $("#EmailCompany").val("");
    $("#Hotline").val("");
  });

  $("#companyTable tbody").on("click", ".edit-btn", function () {
    openModal("Cập nhật thông tin công ty");
    btnSaveCompany.hide();
    btnUpdateCompany.show();
    const rowData = table.row($(this).closest("tr")).data();
    console.log("Dữ liệu công ty cần sửa:", rowData);
    $("#NameCompany").val(rowData.name);
    $("#AddressCompany").val(rowData.address);
    $("#EmailCompany").val(rowData.email);
    $("#Hotline").val(rowData.phone);
  });
  $("#companyTable tbody").on("click", ".delete-btn", function () {
    const rowData = table.row($(this).closest("tr")).data();
    const companyId = rowData.id;
    const companyName = rowData.name;
    Swal.fire({
      title: "Xác nhận xóa công ty",
      text: `Bạn có chắc chắn muốn xóa công ty "${companyName}" không ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        $("#loading-screen").css("display", "flex");

        //logic call api xóa công ty
        setTimeout(() => {
          $("#loading-screen").css("display", "none");
          Swal.fire({
            icon: "success",
            title: "Xóa thành công!",
            text: "Xóa công ty hoàn tất.",
            timer: 1200,
            showConfirmButton: false,
          });

          // reload bảng
          // deviceTable.ajax.reload(null, false);
        }, 1000);
      }
    });
  });

  $("#searchInput").on("keyup", function () {
    table.column(1).search(this.value).draw();
  });

  btnUpdateCompany.off("click").on("click", function (e) {
    e.preventDefault();
    let isValid = true; // thay bằng validate thật

    if (!isValid) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng nhập đầy đủ thông tin!",
      });
      return;
    }
    $("#loading-screen").css("display", "flex");
    btnUpdateCompany.prop("disabled", true);
    //logic call api, setimeout để giả lập
    // $.ajax({
    //   url: "",
    //   type: "POST",
    //   data: "",
    //   success: function () {
    //     $("#loading-screen").hide();
    //     Swal.fire({
    //       icon: "success",
    //       title: "Lưu thành công!",
    //       timer: 1500,
    //       showConfirmButton: false,
    //     });

    //     table.ajax.reload(null, false);
    //   },
    //   error: function () {
    //     $("#loading-screen").hide();

    //     Swal.fire({
    //       icon: "error",
    //       title: "Lỗi",
    //       text: "Không thể lưu dữ liệu!",
    //     });
    //   },
    // });
    setTimeout(() => {
      $("#loading-screen").css("display", "none");
      btnUpdateCompany.prop("disabled", false);
      modal.hide();

      Swal.fire({
        icon: "success",
        title: "Lưu thành công!",
        text: "Dữ liệu đã được cập nhật.",
        timer: 1500,
        showConfirmButton: false,
      });

      // 👉 reload bảng nếu cần
      // table.ajax.reload(null, false);
    }, 1000);
  });
  btnExportExcel.on("click", async function () {
    btnExportExcel.prop("disabled", true);
    await exportToExcel();
    btnExportExcel.prop("disabled", false);
  });
});
