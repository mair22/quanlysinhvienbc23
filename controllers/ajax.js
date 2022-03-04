
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


function getApiSinhVien() {

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien',//api BE cung cấp
        method: 'GET'
    });

    //Thành công
    promise.then(function (result) {
        console.log('result', result.data);
        //Sau khi lấy dữ liệu từ backend về => gọi hàm để từ dữ liệu sinh ra giao diện table sinh viên
        renderTableSinhVien(result.data);
    })

    //Thất bại
    promise.catch(function (error) {
        console.log(error)
    })
}
//Gọi hàm ngay khi web vừa load
getApiSinhVien();


document.querySelector('#btnXacNhan').onclick = function () {
    //Lấy thông tin từ người dùng nhập vào => Chứa trong format object backend yêu cầu
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sv.email = document.querySelector('#email').value;
    sv.soDienThoai = document.querySelector('#soDienThoai').value;

    console.log('sv', sv);

    //Dùng axios gửi dữ liệu lên backend
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien',
        method: 'POST',
        data: sv// {maSinhVien:'1',...}
    });

    //Thành công 
    promise.then(function (result) {
        console.log('result', result.data);
        //Gọi api lấy danh sách sinh viên mới nhất từ server về
        getApiSinhVien();
    });

    promise.catch(function (error) {
        console.log(error);
    })
}


function xoaSinhVien(maSinhVienClick) {

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=' + maSinhVienClick,
        method: 'DELETE'
    });

    promise.then(function (result) {
        console.log('resut', result.data);
        //Gọi api get sinh viên mới về sau khi xoá
        getApiSinhVien();

    });

    promise.catch(function (error) {
        console.log('error', error)
    })
}


function suaSinhVien(maSinhVienClick) {

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=' + maSinhVienClick, //option + z | alt + z
        method: 'GET'
    });

    promise.then(function (result) {
        //Lấy thông tin sinh viên gán lên các thẻ input
        var sinhVien = result.data;
        document.querySelector('#maSinhVien').value = sinhVien.maSinhVien;
        document.querySelector('#tenSinhVien').value = sinhVien.tenSinhVien;
        document.querySelector('#loaiSinhVien').value = sinhVien.loaiSinhVien;
        document.querySelector('#diemHoa').value = sinhVien.diemHoa;
        document.querySelector('#diemLy').value = sinhVien.diemLy;
        document.querySelector('#diemToan').value = sinhVien.diemToan;
        document.querySelector('#diemRenLuyen').value = sinhVien.diemRenLuyen;
        document.querySelector('#email').value = sinhVien.email;
        document.querySelector('#soDienThoai').value = sinhVien.soDienThoai;
    });

    promise.catch(function (error) {
        console.log('error', error)
    })

}



document.querySelector('#btnCapNhat').onclick = function () {
    //Lấy thông tin sinh viên sau khi người dùng thay đổi
    var sinhVienUpdate = new SinhVien();
    sinhVienUpdate.maSinhVien = document.querySelector('#maSinhVien').value;
    sinhVienUpdate.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sinhVienUpdate.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sinhVienUpdate.diemToan = document.querySelector('#diemToan').value;
    sinhVienUpdate.diemLy = document.querySelector('#diemLy').value;
    sinhVienUpdate.diemHoa = document.querySelector('#diemHoa').value;
    sinhVienUpdate.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sinhVienUpdate.email = document.querySelector('#email').value;
    sinhVienUpdate.soDienThoai = document.querySelector('#soDienThoai').value;

    var promise = axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien='+sinhVienUpdate.maSinhVien,
        method:'PUT',
        data:sinhVienUpdate
    });

    promise.then(function(result) {
        console.log('result',result.data);
        //Gọi lại api load sinh viên về 
        getApiSinhVien();
    });

    promise.catch(function(error) {
        console.log(error);
    })
}



//Callback function: Là function đóng vai trò là tham số truyền vào function khác.
function main (callback){


    callback('Cybersoft');
}


function renderH3 (content) {
    document.querySelector('#content').innerHTML = '<h3>'+content+'</h3>';
}

function renderTitle(title) {
    document.querySelector('#content').innerHTML = '<h3 class="alert-success">'+title+'</h3>';
}

main(renderTitle);