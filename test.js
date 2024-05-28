
async function () {

    let url = "http://localhost:3030/hotel/cozrum-homes-sonata-residence/1";
    let slug = url.split('/')[4];
    console.log(slug);
    function ChangeToSlug(title) {
        var slug;
        slug = title.toLowerCase();
        slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
        slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
        slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
        slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
        slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
        slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
        slug = slug.replace(/đ/gi, 'd');
        slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
        slug = slug.replace(/ /gi, "-");
        slug = slug.replace(/\-\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-/gi, '-');
        slug = slug.replace(/\-\-/gi, '-');
        slug = '@' + slug + '@';
        slug = slug.replace(/\@\-|\-\@|\@/gi, '');
        slug = slug.trim();
        return slug;
    }
    function findHotelBySlug(slug) {
        return fetch('http://localhost:3030/api/v1/hotels/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Lỗi khi gọi API');
                }
                return response.json();
            })
            .then(hotels => {
                const hotel = hotels.find(hotel => ChangeToSlug(hotel.name) == slug);
                return hotel;
            })
            .catch(error => {
                console.error('Lỗi khi gọi API:', error);
                throw error;
            });
    }
    var hotela = await findHotelBySlug(slug)
    console.log(hotela)
};