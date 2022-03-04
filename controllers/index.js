var mangSinhVien = [];
var kiemTra = new Validation();
document.querySelector('#btnXacNhan').onclick = function () {
    //Khi người dùng click vào xác nhận thì tạo đối tượng lấy thông tin người dùng nhập
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sv.email = document.querySelector('#email').value;
    sv.soDienThoai = document.querySelector('#soDienThoai').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    console.log('sv', sv);

    var valid = true;
    //Kiểm tra rổng
    valid = valid & kiemTra.kiemTraRong(sv.maSinhVien,'#error_required_maSinhVien') & kiemTra.kiemTraRong(sv.tenSinhVien,'#error_required_tenSinhVien');
    //Kiểm tra ký tự
    valid &= kiemTra.kiemTraKyTu(sv.tenSinhVien,'#error_all_letter_tenSinhVien');
    //Kiểm tra email
    valid &= kiemTra.kiemTraEmail(sv.email,'#error_email');
    //Kiểm tra tất cả là số
    valid &= kiemTra.kiemTraTatCaSo(sv.soDienThoai,'#error_all_number_soDienThoai') & kiemTra.kiemTraTatCaSo(sv.diemToan,'#error_all_number_diemToan')& kiemTra.kiemTraTatCaSo(sv.diemLy,'#error_all_number_diemLy')& kiemTra.kiemTraTatCaSo(sv.diemHoa,'#error_all_number_diemHoa')
    //Kiểm tra độ dài
    valid &= kiemTra.kiemTraDoDai(sv.maSinhVien,'#error_min_max_length_maSinhVien',4,6);
    //Kiểm tra giá trị
    valid &= kiemTra.kiemTraGiaTri(sv.diemToan,'#error_min_max_value_diemToan',0,10);



    var regex = /[A-Z]/ig;

    var input = '321321A';

    console.log(regex.test(input));
    

    if(valid != true) {
        return;
    }



    //Đưa đối tượng sinh viên vào mảng
    mangSinhVien.push(sv);
    console.log('mangSinhVien', mangSinhVien);

    //Mỗi lần thêm sinh viên gọi hàm tạo lại table sinh viên
    renderTableSinhVien(mangSinhVien);
    //Lưu mangSinhVien sau khi thêm sinh viên vào mảng
    luuSinhVienStorage();
}



//Viết hàm từ 1 mảng sinh viên mangSinhVien = [{maSinhVien:'1',tenSinhVien:'A'},{maSinhVien:'2',tenSinhVien:'B'},{maSinhVien:'3',tenSinhVien:'C'}, {...},...]

function renderTableSinhVien(mangSV) {
    var sHTML = '';
    for (var index = 0; index < mangSV.length; index++) {
        //Mỗi lần duyệt lấy ra 1 sinh viên
        var sinhVien = mangSV[index];
        sHTML += `
            <tr>
                <td>${sinhVien.maSinhVien}</td>
                <td>${sinhVien.tenSinhVien}</td>
                <td>${sinhVien.email}</td>
                <td>${sinhVien.soDienThoai}</td>
                <td>${sinhVien.loaiSinhVien}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaSinhVien('${sinhVien.maSinhVien}')" > Xoá </button>
                    <button class="btn btn-primary ml-2" onclick="suaSinhVien('${sinhVien.maSinhVien}')">Chỉnh sửa</button>
                </td>
            </tr>
        `
    };
    console.log('shtml', sHTML);
    //Ra khỏi vòng lặp for dom đến thẻ tbody đưa html vào 
    document.querySelector('#tblSinhVien').innerHTML = sHTML;
}
// [{maSinhVien:'1',tenSinhVien:'A'},{maSinhVien:'2',tenSinhVien:'B'},{maSinhVien:'3',tenSinhVien:'C'}, {...},...]

function suaSinhVien(maSinhVienClick) {
    console.log('maSinhVien', maSinhVienClick);
    //Duyệt mảng tìm ra sinh viên bấm nút sửa
    for (var index = 0; index < mangSinhVien.length; index++) {
        //Mỗi lần duyệt lấy ra 1 object kiểm tra mã sinh viên
        var sinhVien = mangSinhVien[index];
        if (sinhVien.maSinhVien === maSinhVienClick) {
            //Tìm thấy => gán dữ liệu của sinh viên đó lên các thẻ input
            document.querySelector('#maSinhVien').value = sinhVien.maSinhVien;
            document.querySelector('#tenSinhVien').value = sinhVien.tenSinhVien;
            document.querySelector('#loaiSinhVien').value = sinhVien.loaiSinhVien;
            document.querySelector('#diemRenLuyen').value = sinhVien.diemRenLuyen;
            document.querySelector('#diemToan').value = sinhVien.diemToan;
            document.querySelector('#diemLy').value = sinhVien.diemLy;
            document.querySelector('#diemHoa').value = sinhVien.diemHoa;
            document.querySelector('#email').value = sinhVien.email;
            document.querySelector('#soDienThoai').value = sinhVien.soDienThoai;
        }
    }

}



// [{maSinhVien:'1',tenSinhVien:'A'},{maSinhVien:'2',tenSinhVien:'B'},{maSinhVien:'3',tenSinhVien:'C'}, {...},...]

function xoaSinhVien(maSVClick) { //2
    // alert(maSVClick);

    for (var index = mangSinhVien.length - 1; index >= 0; index--) {
        //Mỗi lần lấy ra 1 sinh viên
        var sv = mangSinhVien[index];
        if (sv.maSinhVien === maSVClick) {
            //Xử lý xoá
            mangSinhVien.splice(index, 1);
        }
    }
    //Gọi hàm render => tạo lại giao diện từ mảng sinh viên đã xoá
    renderTableSinhVien(mangSinhVien);
    luuSinhVienStorage();
}




//Lưu sinh viên vào localstorage
function luuSinhVienStorage() {
    //Chuyển đổi mảng sinh viên thành string => lưu vào localstorage
    var sMangSinhVien = JSON.stringify(mangSinhVien);
    //Lưu storage
    localStorage.setItem('mangSinhVien', sMangSinhVien);
}


//Lấy localstorage 
function laySinhVienStorage() {
    //Kiểm tra xem có storage đó không
    if (localStorage.getItem('mangSinhVien')) {
        var sMaSinhVien = localStorage.getItem('mangSinhVien');
        //Biến đổi chuỗi thành object
        mangSinhVien = JSON.parse(sMaSinhVien);
        //Từ mảng tạo ra table
        renderTableSinhVien(mangSinhVien);
    }
}
//Gọi hàm lấy storage ngay sau khi giao diện vừa load
laySinhVienStorage();



document.querySelector('#btnCapNhat').onclick = function () {
    //Tạo đối tượng chứa thông tin người dùng nhập vào
    var sinhVienUpdate = new SinhVien();
    sinhVienUpdate.maSinhVien = document.querySelector('#maSinhVien').value;
    sinhVienUpdate.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sinhVienUpdate.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sinhVienUpdate.diemHoa = document.querySelector('#diemHoa').value;
    sinhVienUpdate.diemLy = document.querySelector('#diemLy').value;
    sinhVienUpdate.diemToan = document.querySelector('#diemToan').value;
    sinhVienUpdate.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sinhVienUpdate.email = document.querySelector('#email').value;
    sinhVienUpdate.soDienThoai = document.querySelector('#soDienThoai').value;
    console.log('sinhVienUpdate', sinhVienUpdate);
    //Tìm ra sinh viên trong mảng lấy thông tin người dùng thay đổi gán lại cho sinh viên đó
    for (var index = 0; index < mangSinhVien.length; index++) {
        //Mỗi lần duyệt lấy ra 1 sinh viên
        var sinhVien = mangSinhVien[index];
        if (sinhVien.maSinhVien === sinhVienUpdate.maSinhVien) {
            //Lấy thông tin sinh viên trong mảng gán = sinh viên giao diện người dùng update
            sinhVien.tenSinhVien = sinhVienUpdate.tenSinhVien;
            sinhVien.loaiSinhVien = sinhVienUpdate.loaiSinhVien;
            sinhVien.diemToan = sinhVienUpdate.diemToan;
            sinhVien.diemLy = sinhVienUpdate.diemLy;
            sinhVien.diemHoa = sinhVienUpdate.diemHoa;
            sinhVien.diemRenLuyen = sinhVienUpdate.diemRenLuyen;
            sinhVien.email = sinhVienUpdate.email;
            sinhVien.soDienThoai = sinhVienUpdate.soDienThoai;
        }
    }

    renderTableSinhVien(mangSinhVien)
}

// [{maSinhVien:'1',tenSinhVien:'nguyen van A'},{maSinhVien:'2',tenSinhVien:'nguyen Van B'},{maSinhVien:'3',tenSinhVien:'Tran Van C'}, {...},...]

document.querySelector('#btnTimKiem').onclick = function () {
    //Lấy ra từ khoá người dùng nhập vào
    var tuKhoa = document.querySelector('#tuKhoa').value;
    //.trim(): Loại bỏ khoảng trống đầu và cuối của chuỗi
    //.toLowerCase(): Biến đổi tất cả các chữ cái in hoá của chuỗi thành chữ thường
    //.toUpperCase(): Biến đổi tất cả các chữ cái thường thành hoa
    tuKhoa = tuKhoa.trim().toLowerCase();
    //output là 1 mảng sinh viên tên có chứa từ khoá
    var mangSVTimKiem = [];
    for (var index = 0; index < mangSinhVien.length; index++) {
        var sinhVien = mangSinhVien[index];
        if(sinhVien.tenSinhVien.trim().toLowerCase().search(tuKhoa) !== -1) {
            mangSVTimKiem.push(sinhVien);
        }
    }
    //Hiển thị thông tin sinh viên ra table
    renderTableSinhVien(mangSVTimKiem);
}





















