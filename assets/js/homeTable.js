const datas = [
  {
    id: 1,
    name: "Hải đăng 1",
    mmsi: "123456789",
    latitude: 15.422884140443102,
    longitude: 109.14396262587107,
    lastReceive: "2024-06-01T12:34:56Z",
  },
  {
    id: 2,
    name: "Hải đăng 2",

    mmsi: "123456711",
    latitude: 15.438623,
    longitude: 109.189339,
    lastReceive: "2024-06-01T12:34:56Z",
  },
  {
    id: 3,
    name: "Hải đăng 3",

    mmsi: "123456722",
    latitude: 15.328724,
    longitude: 109.187622,
    lastReceive: "2024-06-01T12:34:56Z",
  },
  {
    id: 4,
    name: "Hải đăng 4",

    mmsi: "123456733",
    latitude: 15.366467,
    longitude: 109.287872,
    lastReceive: "2024-06-01T12:34:56Z",
  },
  {
    id: 5,
    name: "Hải đăng 5",

    mmsi: "123456744",
    latitude: 15.520513316761523,
    longitude: 109.26298141479494,
    lastReceive: "2024-06-01T12:34:56Z",
  },
  {
    id: 6,
    name: "Hải đăng 6",

    mmsi: "1234567855",
    latitude: 15.451529296067756,
    longitude: 109.37421798706056,
    lastReceive: "2024-06-01T12:34:56Z",
  },
  {
    id: 7,
    name: "Hải đăng 7",

    mmsi: "123456766",
    latitude: 15.042285357258967,
    longitude: 109.17457580566406,
    lastReceive: "2024-06-01T12:34:56Z",
  },
  {
    id: 8,
    name: "Hải đăng 8",

    mmsi: "12345678777",
    latitude: 13.968719455908259,
    longitude: 111.01959228515625,
    lastReceive: "2024-06-01T12:34:56Z",
  },
  {
    id: 9,
    name: "Hải đăng 9",

    mmsi: "1234567888",
    latitude: 14.857195658870625,
    longitude: 111.80511474609375,
    lastReceive: "2024-06-01T12:34:56Z",
  },
  {
    id: 10,
    name: "Hải đăng 10",

    mmsi: "1234567899999",
    latitude: 15.593938580800794,
    longitude: 112.66479492187501,
    lastReceive: "2024-06-01T12:34:56Z",
  },
  {
    id: 11,
    name: "Hải đăng 11",
    mmsi: "12345678909090",
    latitude: 15.37027407332405,
    longitude: 108.99227142333986,
    lastReceive: "2024-06-01T12:34:56Z",
  },
  {
    id: 12,
    name: "Hải đăng 12",

    mmsi: "123456789222",
    latitude: 13.968719455908259,
    longitude: 112.92572021484376,
    lastReceive: "2024-06-01T12:34:56Z",
  },
];
let resizeTimeout;

$(document).ready(function () {
  const table = $("#log-table").DataTable({
    data: datas,
    searching: true,
    autoWidth: true,
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
  $(window).on("resize", function () {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(function () {
      table.columns.adjust().draw(false);
    }, 200);
  });
  if (typeof window.lighthouseMakers === "function") {
    window.lighthouseMakers(datas);
  }

  $("#log-table tbody").on("click", "tr", function () {
    var rowData = table.row(this).data();
    if (rowData && rowData.latitude && rowData.longitude) {
      if (typeof window.focusOnDevice === "function") {
        window.focusOnDevice(
          rowData.latitude,
          rowData.longitude,
          rowData.mmsi,
          rowData.lastReceive,
        );
      } else {
        Swal.fire({
          icon: "warning",
          title: "Không có tọa độ",
          text: "Thiết bị này chưa cập nhật vị trí GPS.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    }
  });
});
