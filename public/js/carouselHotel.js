$(document).ready(() => {
  const containerData = {
    carousel_topPick: {
      containerId: "carousel_topPick",
      sortType: "desc_feedback",
    },
    carousel_budgetFriendly: {
      containerId: "carousel_budgetFriendly",
      sortType: "asc_price",
    },
    carousel_favorite: {
      containerId: "carousel_Trending",
      sortType: "desc_rating",
    },
  };

  // Function to convert number to string with commas
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function ChangeToSlug(title) {
    var slug;
    slug = title.toLowerCase();
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
    slug = slug.replace(/đ/gi, "d");
    slug = slug.replace(
      /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
      ""
    );
    slug = slug.replace(/ /gi, "-");
    slug = slug.replace(/\-\-\-\-\-/gi, "-");
    slug = slug.replace(/\-\-\-\-/gi, "-");
    slug = slug.replace(/\-\-\-/gi, "-");
    slug = slug.replace(/\-\-/gi, "-");
    slug = "@" + slug + "@";
    slug = slug.replace(/\@\-|\-\@|\@/gi, "");
    slug = slug.trim();
    return slug;
  }

  // Fetch and display data for each container
  Object.values(containerData).forEach((containerConfig) => {
    const { containerId, sortType } = containerConfig;
    const container = $("#" + containerId);

    $.ajax({
      url: `http://localhost:3030/api/v1/hotels`,
      method: "GET",
      data: { sortType: sortType },
      success: (data) => {
        data.forEach((item, index) => {
          // Check if the hotel already exists in the container
          if ($("#" + item.id).length === 0) {
            // Validate data
            if (
              !item.name ||
              !item.cost ||
              !item.UrlImageHotels ||
              item.UrlImageHotels.length === 0
            ) {
              return;
            }

            const imgFeature = item.UrlImageHotels.map(
              (item1) => item1.url
            ).filter(Boolean);
            const imgRender = imgFeature.length > 0 ? imgFeature[0] : "";

            // Skip rendering if there's no valid image URL
            if (!imgRender) {
              return;
            }

            let activeClass = index == 0 ? "active" : "";
            const formattedCost = numberWithCommas(item.cost);
            const slug = ChangeToSlug(item.name);
            const card = `<div class="carousel-item ${activeClass}" id=${
              item.id
            }">
              <a href="/hotel/${slug}/${
              item.id
            }" target="_blank" class="hotel-link">
                <div class="card">
                  <div class="img-wrapper">
                    <img src="${imgRender}" alt="${item.name}">
                  </div>
                  <div class="card-body">
                    <a class="click-item" href="/hotel/${slug}/${
              item.id
            }" target="_blank">
                      <h5 class="card-title">${item.name}</h5>
                    </a>
                    <p class="card-text">${item.map || ""}</p>
                    <a href="/hotel/${slug}/${
              item.id
            }" class="btn btn-primary"><span class="from">From</span> VND ${formattedCost}</a>
                  </div>
                </div>
              </a>
            </div>`;

            container.append(card);
          }
        });
      },
      error: (err) => {
        console.error(`Error fetching data for container ${containerId}:`, err);
      },
    });
  });
});
