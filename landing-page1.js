$(function() {
    getProgress();
getRank();
getCampaign();
getCoupon();
getPointSettings();
getRewardSettings();

let customerName = "Ten Ne";
$("#gu-customer-name").text(customerName);
$(".accordionTitle").click(function () {
	if ($(this).hasClass("is-open")) {
		$(this).removeClass("is-open");
	} else {
		$(".is-open").removeClass("is-open");
		$(this).addClass("is-open");
	}
});

function getProgress() {
	$.ajax({
		url:
			"https://api.growthup.work/api/partner/kpi-progress-public?domain=https://org-prod.myharavan.com/&email=partner-a1-4@yopmail.com",
		method: "GET",
		success: function (response) {
			// Handle the response data
			renderGift(response.data.items);
		},
		error: function (xhr, status, error) {
			// Handle errors
			console.log("Request failed:", error);
		}
	});
}
function getRank() {
	$.ajax({
		url:
			"https://api.growthup.work/api/partner/portal?domain=https://org-prod.myharavan.com/&email=kpi-reward@yopmail.com",
		method: "GET",
		success: function (response) {
			// Handle the response data
			renderRank(response.data);
		},
		error: function (xhr, status, error) {
			// Handle errors
			console.log("Request failed:", error);
		}
	});
}
function getCampaign() {
	$.ajax({
		url:
			"https://api.growthup.work/api/campaign/portal?domain=https://org-prod.myharavan.com/&email=partner-a1-4@yopmail.com",
		method: "GET",
		success: function (response) {
			// Handle the response data
			renderCampaign(response.data);
		},
		error: function (xhr, status, error) {
			// Handle errors
			console.log("Request failed:", error);
		}
	});
}
function getCoupon() {
	$.ajax({
		url:
			"https://api.growthup.work/api/coupon/portal?domain=https://org-prod.myharavan.com/&email=cp-4@yopmail.com",
		method: "GET",
		success: function (response) {
			// Handle the response data
			renderCoupon(response.data);
		},
		error: function (xhr, status, error) {
			// Handle errors
			console.log("Request failed:", error);
		}
	});
}

function getPointSettings() {
	$.ajax({
		url:
			"https://api.growthup.work/api/point-setting/public?domain=https://org-prod.myharavan.com/",
		method: "GET",
		success: function (response) {
			// Handle the response data
			renderPointSettings(response.data.imtes);
		},
		error: function (xhr, status, error) {
			// Handle errors
			console.log("Request failed:", error);
		}
	});
}

function getRewardSettings() {
	$.ajax({
		url:
			"https://api.growthup.work/api/reward-setting/public?domain=https://org-prod.myharavan.com/",
		method: "GET",
		success: function (response) {
			// Handle the response data
			renderRewardSettings(response.data.items);
		},
		error: function (xhr, status, error) {
			// Handle errors
			console.log("Request failed:", error);
		}
	});
}

function generateGUID() {
	var currentDate = new Date().getTime().toString(16);
	var randomPart = Math.random().toString(16).substring(2);
	var guid = currentDate + randomPart;
	return guid;
}
function renderRank(data) {
	$("#gu-rank-name").text(data.rank);
	$("#gu-amount-approved").text(data.amountApproved);
	$("#gu-amount-need-approve").text(data.amountNeedApprove);
	$("#gu-point").text(data.point);
}
function renderCampaign(data) {
	$("#gu-campaign-description").text(data.description);
}
function renderGift(items) {
	let container = $("#gu-gift-container");
	for (let i = 0; i < items.length; i++) {
		let itemGift = items[i];
		let percent = itemGift.percent;
		let reward = `${itemGift.strReward}  ${itemGift.reward}`;
		let remind = `${itemGift.valueRemind} đ ${itemGift.strType}`;
		let newGUID = generateGUID();
		let itemElement = `
            <div class="gu-col-4 gu-col-md-6 gu-col-s-12 gu-text-center">
        <div class="gu__card gu-bg-white gu__card-border-radius gu__card-border-primary gu__card-gift">
          <img src="https://cdn.jsdelivr.net/gh/huynguyenayp/growthup-cdn@main/landing-page-gift.svg" />
          <div class="gu-text-16">${reward}</div>
          <div class="gu-text-16 gu-text-color-red gu-p-x-10" id="${newGUID}">-</div>
          <div class="gu-p-x-10">
            <div class="gu-progress-bar">
              <span class="gu-progress-bar-fill" style="width: ${percent}%;"></span>
            </div>
          </div>
          <div>Bạn cần đạt <strong>${remind} </strong> nữa để nhận phần thưởng!</div>
        </div>
      </div>
    `;

		container.append(itemElement);
		if (itemGift.endCycle) {
			let targetDate = new Date(itemGift.endCycle);

			let countdownInterval = setInterval(function () {
				let currentDate = new Date();
				let timeRemaining = targetDate - currentDate;

				if (timeRemaining <= 0) {
					clearInterval(countdownInterval);
				} else {
					let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
					let hours = Math.floor(
						(timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
					);
					let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
					let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

					$("#" + newGUID).text(
						days + " ngày " + hours + " giờ " + minutes + " phút " + seconds + " giây"
					);
				}
			}, 1000);
		}
	}
}
function renderCoupon(items) {}

function renderPointSettings(items) {
		console.log("gift:", items);
}

function renderRewardSettings(items) {
	console.log("gift:", items);
	let container = $("#gu-rewards");
	for (let i = 0; i < items.length; i++) {
		let item = items[i];
		let giftPoint = item.point;
		let giftName = item.nameGift;
		let itemElement = `
           <div class="gu-col-4 gu-col-md-6 gu-col-s-12 gu-text-center">
				<div class="gu__card gu__card-border-radius gu-bg-white">
					<img src="https://cdn.jsdelivr.net/gh/huynguyenayp/growthup-cdn@main/landing-page-default.png" width="100%" height="187" width="253" alt="growth-up" />
					<p>
						${giftName}
					</p>
					<div class="gu__price">
							${giftPoint} UP
					</div>
				</div>
			</div>
    `;
		
	container.append(itemElement);
	}

}

});
