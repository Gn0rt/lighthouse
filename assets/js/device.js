const datas = [
  {
    id: 1,
    mmsi: "1234561",
    name: "1234561",
    maxn: "Công ty TNHH Giải Pháp Và Phát Triển Công Nghệ HMS",
    createdAt: "2026-04-08 05:00:00",
  },
  {
    id: 2,
    mmsi: "123456122",
    name: "123456122",
    maxn: "Công ty TNHH Giải Pháp Và Phát Triển Công Nghệ HMS",
    createdAt: "2026-04-08 05:00:00",
  },
  {
    id: 3,
    mmsi: "123456133",
    name: "123456133",
    maxn: "Công ty TNHH Giải Pháp Và Phát Triển Công Nghệ HMS",
    createdAt: "2026-04-08 05:00:00",
  },
  {
    id: 4,
    mmsi: "123456144",
    name: "123456144",
    maxn: "Công ty TNHH Giải Pháp Và Phát Triển Công Nghệ HMS",
    createdAt: "2026-04-08 05:00:00",
  },
  {
    id: 5,
    mmsi: "123456155",
    name: "123456155",
    maxn: "Công ty TNHH Giải Pháp Và Phát Triển Công Nghệ HMS",
    createdAt: "2026-04-08 05:00:00",
  },
];
let deviceTable;
const modal = $("#modal");
const modalTitle = $("#modalTitle");
const modalContent = $("#modalContent");
const closeModal = $("#closedModal");
const btnSaveDevice = $("#saveDevice");
const btnUpdateDevice = $("#updateDevice");
const btnAddDevice = $("#btnAddDevice");
const btnExportExcel = $("#btnExportExcel");
function loadDataDevice() {
  ViewDeviceTable(datas);
}
function openModal(title) {
  modalTitle.text(title);
  modal.show();
  btnSaveDevice.show();
  btnUpdateDevice.hide();
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
    const worksheet = workbook.addWorksheet("Danh sách thiết bị");
    worksheet.columns = [
      {
        header: "STT",
        key: "stt",
        width: 10,
      },
      {
        header: "MMSI",
        key: "mmsi",
        width: 30,
      },
      { header: "Tên thiết bị", key: "name", width: 20 },
      { header: "Công ty", key: "maxn", width: 50 },
      { header: "Ngày tạo", key: "createdAt", width: 30 },
    ];
    datas.forEach((item, index) => {
      const row = worksheet.addRow({
        stt: index + 1,
        mmsi: item.mmsi,
        name: item.name,
        maxn: item.maxn,
        createdAt: item.createdAt,
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
    //kẻ bảng
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
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "Danh_sach_thiet_bi.xlsx");
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
function ViewDeviceTable(data) {
  deviceTable = $("#DeviceTable").DataTable({
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
        width: "3%",
      },
      { data: "mmsi", title: "MMSI", orderable: false, width: "7%" },
      { data: "name", title: "Tên thiết bị", orderable: false, width: "7%" },
      { data: "maxn", title: "Công ty", orderable: false, width: "15%" },
      { data: "createdAt", title: "Ngày tạo", orderable: false, width: "7%" },
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
  loadDataDevice();
  $(window).on("resize", function () {
    deviceTable.columns.adjust().draw();
  });
  closeModal.off("click").on("click", function () {
    closedModal();
  });
  btnAddDevice.on("click", function () {
    openModal("Thêm mới thiết bị");
    $("#MMSI").val("");
    $("#NameDevice").val("");
    $("#Company").val("");
  });
  $("#DeviceTable tbody").on("click", ".edit-btn", function () {
    openModal("Cập nhật thông tin công ty");
    btnSaveDevice.hide();
    btnUpdateDevice.show();
    const rowData = deviceTable.row($(this).closest("tr")).data();
    $("#MMSI").val(rowData.mmsi);
    $("#NameDevice").val(rowData.name);
    $("#Company").val(rowData.maxn);
  });
  $("#DeviceTable tbody").on("click", ".delete-btn", function () {
    const rowData = deviceTable.row($(this).closest("tr")).data();
    const deviceId = rowData.id;
    const deviceName = rowData.name;
    Swal.fire({
      title: "Xác nhận xóa thiết bị ?",
      text: `Bạn có chắc chắn muốn xóa thiết bị "${deviceName}" không ?`,
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
        // $.ajax({
        //   url: "",
        //   type: "POST",
        //   data: "",
        //   success: function () {
        //     $("#loading-screen").css("display", "none");
        //     Swal.fire({
        //       icon: "success",
        //       title: "Xóa thành công!",
        //       timer: 1200,
        //       showConfirmButton: false,
        //     });
        //     deviceTable.ajax.reload(null, false);
        //   },
        //   error: function () {
        //     $("#loading-screen").hide();

        //     Swal.fire({
        //       icon: "error",
        //       title: "Lỗi",
        //       text: "Không thể xóa thiết bị!",
        //     });
        //   },
        // });
        setTimeout(() => {
          $("#loading-screen").css("display", "none");
          Swal.fire({
            icon: "success",
            title: "Xóa thành công!",
            text: "Xóa thiết bị hoàn tất.",
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
    deviceTable.column(1).search(this.value).draw();
  });

  btnUpdateDevice.off("click").on("click", function (e) {
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
    btnUpdateDevice.prop("disabled", true);
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
      btnUpdateDevice.prop("disabled", false);
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
