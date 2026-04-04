const datas = [
  {
    mmsi: "123456789",
    latitude: 10.762622,
    longitude: 106.660172,
    lastReceive: "2024-06-01T12:34:56Z",
  },
  {
    mmsi: "123456789",
    latitude: 10.762622,
    longitude: 106.660172,
    lastReceive: "2024-06-01T12:34:56Z",
  },
  {
    mmsi: "123456789",
    latitude: 10.762622,
    longitude: 106.660172,
    lastReceive: "2024-06-01T12:34:56Z",
  },
  {
    mmsi: "123456789",
    latitude: 10.762622,
    longitude: 106.660172,
    lastReceive: "2024-06-01T12:34:56Z",
  },
  {
    mmsi: "123456789",
    latitude: 10.762622,
    longitude: 106.660172,
    lastReceive: "2024-06-01T12:34:56Z",
  },
  {
    mmsi: "123456789",
    latitude: 10.762622,
    longitude: 106.660172,
    lastReceive: "2024-06-01T12:34:56Z",
  },
  {
    mmsi: "123456789",
    latitude: 10.762622,
    longitude: 106.660172,
    lastReceive: "2024-06-01T12:34:56Z",
  },
  {
    mmsi: "123456789",
    latitude: 10.762622,
    longitude: 106.660172,
    lastReceive: "2024-06-01T12:34:56Z",
  },
  {
    mmsi: "123456789",
    latitude: 10.762622,
    longitude: 106.660172,
    lastReceive: "2024-06-01T12:34:56Z",
  },
  {
    mmsi: "123456789",
    latitude: 10.762622,
    longitude: 106.660172,
    lastReceive: "2024-06-01T12:34:56Z",
  },
  {
    mmsi: "123456789",
    latitude: 10.762622,
    longitude: 106.660172,
    lastReceive: "2024-06-01T12:34:56Z",
  },
  {
    mmsi: "123456789",
    latitude: 10.762622,
    longitude: 106.660172,
    lastReceive: "2024-06-01T12:34:56Z",
  },
];
$(document).ready(function () {
  const table = $("#log-table").DataTable({
    data: datas,
    searching: true,
    autoWidth: false,
    scrollY: "50vh",
    scrollX: true,
    scrollCollapse: true,
    orderCellsTop: true, // Bắt buộc: Để nó biết dòng 1 là Header Sort, dòng 2 là cái khác
    paging: false,
    info: false,
    rowId: "mmsi",
    columns: [
      {
        data: null,
        render: function (data, type, row, meta) {
          return `<img src="./assets/image/lighthouse.png" style="width:24px;height:24px;" title="Speed: ${row.speed} | Last: ${row.lastReceive}"/>`;
        },
        orderable: false,
        className: "col-fixed",
        width: "50px",
      },
      {
        data: "mmsi",
        orderable: false,
      },
      {
        data: "lastReceive",
        orderable: false,
        render: function (data, type, row) {
          // 1. Kiểm tra null hoặc ngày mặc định
          if (!data || data.startsWith("0001-01-01")) {
            return '<span class="text-muted">-</span>';
          }
          // 2.Parse sang Date object rồi format lại
          // Cách này tự động xử lý cả "T", "Z" và chuyển về giờ Việt Nam nếu cần
          var date = new Date(data);

          // Kiểm tra nếu là ngày hợp lệ
          if (!isNaN(date.getTime())) {
            // Trả về định dạng HH:mm:ss
            return date.toLocaleString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            });
          }
          //backup
          var parts = data.toString().replace("T", " ").split(" ");
          if (parts.length > 1) {
            return parts[1].split(".")[0].replace("Z", "");
          }

          return data;
        },
      },
    ],
    dom: "lrt",
    initComplete: function () {
      const api = this.api();
      api.columns.adjust(); // tính width sau khi load xong
    },
  });
  table.on("draw.dt", function () {
    setTimeout(function () {
      table.columns.adjust();
    }, 50);
  });
  // $("#log-table tbody").on("click", "tr", function () {
  //   // Lấy dữ liệu của hàng vừa click
  //   var rowData = table.row(this).data();
  //   console.log("Hàng được click:", rowData);
  //   if (rowData && rowData.latitude && rowData.longitude) {
  //     console.log("Đang focus vào tàu: " + rowData.mmsi);

  //     //hàm bên Map để bay đến
  //     if (typeof window.focusOnDevice === "function") {
  //       window.focusOnDevice(
  //         rowData.latitude,
  //         rowData.longitude,
  //         rowData.mmsi,
  //         rowData.speed,
  //         rowData.lastReceive,
  //       );
  //     }
  //   } else {
  //     console.warn("Dữ liệu tọa độ không hợp lệ hoặc thiết bị chưa có vị trí.");
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Không có tọa độ",
  //       text: "Thiết bị này chưa cập nhật vị trí GPS.",
  //       toast: true,
  //       position: "top-end",
  //       showConfirmButton: false,
  //       timer: 3000,
  //     });
  //   }
  // });
});
