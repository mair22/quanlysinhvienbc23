console.log(axios)


function getDataText() {
    var promise = axios({
        url: '../data/data.txt', //Đường dẫn đến file hoặc api backend cung cấp
        method: 'GET', //Phương thức đọc dữ liệu hoặc backend cung cấp
        responseType: 'text' //Kiểu dữ liệu trả về của file 
    })

    //Xử lý thành công
    promise.then(function (result) {
        console.log('result', result);
        document.querySelector('body').innerHTML = '<p> Họ tên: ' + result.data + '</p>'
    })
    //Thất bại
    promise.catch(function (error) {
        console.log('error', error);
    })
}

// getDataText();



function getDataXML() {
    var promise = axios({
        url: '../data/data.xml',
        method: 'GET',
        responseType: 'document'
    });

    //Thành công
    promise.then(function (ketQua) {
        console.log('kết quả', ketQua.data)
        var hoTen = ketQua.data.querySelector('hoten').innerHTML;
        document.querySelector('body').innerHTML = 'Họ tên: ' + hoTen;
    })

    //Thất bại
    promise.catch(function (error) {
        console.log('error', error)
    })
}

// getDataXML();

console.log(document);


function getDataJson() {

    var promise = axios({
        url: '../data/data.json',
        method: 'GET',
        // responseType:'json'
    });

    promise.then(function (result) {
        console.log('result', result.data)
        document.querySelector('body').innerHTML = '<h3> Họ tên: ' + result.data.hoTen + '</h3>';
    })

    promise.catch(function (error) {
        console.log('error', error)
    })
};

getDataJson();