const cameraData = [
    { id: 1, name: "Camera Hải Đăng 01", status: "Online" },
    { id: 2, name: "Camera Hải Đăng 02", status: "Online" },
    { id: 3, name: "Camera Hải Đăng 03", status: "Offline" },
    { id: 4, name: "Camera Hải Đăng 04", status: "Online" },
    { id: 5, name: "Camera Hải Đăng 05", status: "Online" },
    { id: 6, name: "Camera Hải Đăng 06", status: "Online" },
    { id: 7, name: "Camera Hải Đăng 07", status: "Online" },
    { id: 8, name: "Camera Hải Đăng 08", status: "Online" },
];

$(document).ready(function() {
    renderCameraList(cameraData);

    // Layout switching
    $('.btn-layout').click(function() {
        const layout = $(this).data('layout');
        $('.btn-layout').removeClass('active');
        $(this).addClass('active');
        
        const grid = $('#camera-grid');
        grid.removeClass('layout-1x1 layout-2x2 layout-3x3').addClass('layout-' + layout);
        
        // Generate slots
        let count = 0;
        if (layout === '1x1') count = 1;
        if (layout === '2x2') count = 4;
        if (layout === '3x3') count = 9;
        
        generateSlots(count);
    });

    // Initial grid (2x2)
    generateSlots(4);

    // Search functionality
    $('#searchCamera').on('keyup', function() {
        const value = $(this).val().toLowerCase();
        const filtered = cameraData.filter(c => c.name.toLowerCase().includes(value));
        renderCameraList(filtered);
    });

    // Selecting a camera to play
    $(document).on('click', '.camera-item', function() {
        const name = $(this).data('name');
        const activeSlot = $('.video-slot.active');
        
        if (activeSlot.length) {
            playCameraInSlot(activeSlot, name);
        } else {
            // If no slot is active, find the first empty slot or just the first one
            const firstSlot = $('.video-slot').first();
            playCameraInSlot(firstSlot, name);
        }
    });

    $(document).on('click', '.video-slot', function() {
        $('.video-slot').removeClass('active');
        $(this).addClass('active');
    });
});

function renderCameraList(data) {
    const list = $('#camera-list');
    list.empty();
    data.forEach(cam => {
        const iconClass = cam.status === "Online" ? "fa-video" : "fa-video-slash";
        const statusColor = cam.status === "Online" ? "text-success" : "text-danger";
        
        list.append(`
            <div class="camera-item" data-id="${cam.id}" data-name="${cam.name}">
                <i class="fa-solid ${iconClass}"></i>
                <span>${cam.name}</span>
                <span class="ms-auto small ${statusColor}">${cam.status}</span>
            </div>
        `);
    });
}

function generateSlots(count) {
    const grid = $('#camera-grid');
    grid.empty();
    for (let i = 1; i <= count; i++) {
        grid.append(`
            <div class="video-slot" data-slot="${i}">
                <span class="slot-label">CH ${i}</span>
                <div class="video-placeholder">
                    <i class="fa-solid fa-camera"></i>
                    <span>Kênh ${i}</span>
                </div>
            </div>
        `);
    }
}

function playCameraInSlot(slot, cameraName) {
    slot.find('.video-placeholder').html(`
        <div class="playing-overlay" style="color: #00ff00; font-weight: bold;">
            <i class="fa-solid fa-play"></i>
            <p>Đang xem: ${cameraName}</p>
        </div>
    `);
    // Highlight the playing state
    slot.css('background-image', 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://via.placeholder.com/640x360.png?text=Video+Stream")');
    slot.css('background-size', 'cover');
}
