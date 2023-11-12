document.addEventListener("DOMContentLoaded", function (events) {

    if (window.location.pathname.includes("pages/partner")) {

        loadCss();
        loadView();

        function loadCss() {
            let head = document.getElementsByTagName("head")[0];
            let link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href =
                "https://cdn.jsdelivr.net/gh/huynguyenayp/growthup-cdn@main/langing_page15.css";
            head.appendChild(link);

            let link2 = document.createElement("link");
            link2.rel = "stylesheet";
            link2.type = "text/css";
            link2.href =
                "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css";
            head.appendChild(link2);

            let link3 = document.createElement("link");
            link3.rel = "stylesheet";
            link3.type = "text/css";
            link3.href = "https://fonts.googleapis.com/css?family=Inter";

            head.appendChild(link3);
        }

        function loadView() {

            let guCustomerEmail = getCookie("email_portal");
            let guCustomerName = getCookie("name_portal");

            if (guCustomerEmail) {
                const viewIsGuestElement = document.getElementById("gu-is-guest");
                viewIsGuestElement?.style?.display = "none";

                const viewIsLogin = document.getElementById("gu-is-login");
                viewIsLogin?.style?.display = "block";
            }

            document.getElementsByClassName("gu-customer-name")[0].innerText = guCustomerName;

            getProgress(guCustomerEmail);
            getRank(guCustomerEmail);
            getCampaign(guCustomerEmail);
            getCoupon(guCustomerEmail);
            getPointSettings();
            getRewardSettings();
            loadAccordion();

            function loadAccordion() {
                let accordionTitles = document.querySelectorAll(".accordionTitle");

                accordionTitles.forEach(function (accordionTitle) {
                    accordionTitle.addEventListener("click", function () {
                        if (this.classList.contains("is-open")) {
                            this.classList.remove("is-open");
                        } else {
                            let openAccordion = document.querySelector(".is-open");
                            if (openAccordion) {
                                openAccordion.classList.remove("is-open");
                            }
                            this.classList.add("is-open");
                        }
                    });
                });
            }

            function getProgress(email) {
                fetch(
                    `https://api.growthup.work/api/partner/kpi-progress-public?domain=${origin}/&email=${email}`
                )
                    .then((response) => response.json())
                    .then((data) => renderGift(data.data.items))
                    .catch((err) => console.error(err));
            }

            function getRank(email) {
                fetch(
                    `https://api.growthup.work/api/partner/portal?domain=${origin}/&email=${email}`
                )
                    .then((response) => response.json())
                    .then((data) => renderRank(data.data))
                    .catch((err) => console.error(err));
            }

            function getCampaign(email) {
                fetch(
                    `https://api.growthup.work/api/campaign/portal?domain=${origin}/&email=${email}`
                )
                    .then((response) => response.json())
                    .then((data) => renderCampaign(data.data))
                    .catch((err) => console.error(err));
            }

            function getCoupon(email) {
                fetch(
                    `https://api.growthup.work/api/coupon/portal?domain=${origin}/&email=${email}`
                )
                    .then((response) => response.json())
                    .then((data) => renderCoupon(data.data))
                    .catch((err) => console.error(err));
            }

            function getPointSettings() {
                fetch(
                    `https://api.growthup.work/api/point-setting/public?domain=${origin}`
                )
                    .then((response) => response.json())
                    .then((data) => renderPointSettings(data.data.items))
                    .catch((err) => console.error(err));
            }

            function getRewardSettings() {
                fetch(
                    `https://api.growthup.work/api/reward-setting/public?domain=${origin}`
                )
                    .then((response) => response.json())
                    .then((data) => renderRewardSettings(data.data.items))
                    .catch((err) => console.error(err));
            }

            function renderRank(data) {
                document.getElementsByClassName("gu-rank-name")[0].innerText = data.rank;

                document.getElementsByClassName(
                    "gu-amount-approved"
                )[0].innerText = formatNumber(data.amountApproved);

                document.getElementsByClassName(
                    "gu-amount-need-approve"
                )[0].innerText = formatNumber(data.amountNeedApprove);

                document.getElementsByClassName("gu-point")[0].innerText = formatNumber(
                    formatNumber(data.point)
                );
            }

            function renderCampaign(data) {
                var guCampaignDescription = document.getElementsByClassName(
                    "gu-campaign-description"
                )[0];

                guCampaignDescription.textContent = data.description;
            }

            function renderGift(items) {
                let container = document.getElementsByClassName("gu-gift-container")[0];
                for (let i = 0; i < items.length; i++) {
                    let itemGift = items[i];
                    let percent = itemGift.percent;
                    let rewardTypeStr = itemGift.rewardType === 1 ? " đ" : "";
                    let reward = `${itemGift.strReward}  ${formatNumber(
                        itemGift.reward
                    )}${rewardTypeStr}`;
                    let remind = `${formatNumber(itemGift.valueRemind)} đ ${itemGift.strType}`;
                    let newGUID = generateGUID();

                    let itemElement = document.createElement("div");
                    itemElement.classList.add(
                        "gu-col-4",
                        "gu-col-md-6",
                        "gu-col-s-12",
                        "gu-text-center"
                    );
                    itemElement.innerHTML = `
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
    `;

                    container.appendChild(itemElement);

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

                                document.getElementById(newGUID).textContent =
                                    days +
                                    " ngày " +
                                    hours +
                                    " giờ " +
                                    minutes +
                                    " phút " +
                                    seconds +
                                    " giây";
                            }
                        }, 1000);
                    }
                }
            }

            function renderCoupon(data) {
                if (!data?.items?.length) return;
                const tbodyElement = document.getElementsByClassName("coupon-tbody")?.[0];
                data.items.forEach((item) => {
                    if (!item) return;
                    const iconCopy = `<svg width="15" height="14" viewBox="0 0 15 14" fill="none">
														<path d="M12.9058 4.12821L8.93555 0.157949C8.83466 0.0569387 8.6978 0.000125678 8.55503 0H6.7817C6.25807 0 5.75588 0.208012 5.38562 0.578276C5.01535 0.948541 4.80734 1.45073 4.80734 1.97436V2.87179H3.90991C3.38627 2.87179 2.88409 3.07981 2.51382 3.45007C2.14356 3.82034 1.93555 4.32252 1.93555 4.84615V12.0256C1.93555 12.5493 2.14356 13.0515 2.51382 13.4217C2.88409 13.792 3.38627 14 3.90991 14H8.93555C9.45918 14 9.96137 13.792 10.3316 13.4217C10.7019 13.0515 10.9099 12.5493 10.9099 12.0256V11.1282H11.0894C11.613 11.1282 12.1152 10.9202 12.4855 10.5499C12.8557 10.1797 13.0638 9.67748 13.0638 9.15385V4.48718C13.0581 4.35192 13.0017 4.22375 12.9058 4.12821ZM9.11503 1.83795L11.2258 3.94872H9.11503V1.83795ZM9.83298 12.0256C9.83298 12.2637 9.73843 12.4919 9.57013 12.6602C9.40183 12.8285 9.17356 12.9231 8.93555 12.9231H3.90991C3.67189 12.9231 3.44362 12.8285 3.27532 12.6602C3.10702 12.4919 3.01247 12.2637 3.01247 12.0256V4.84615C3.01247 4.60814 3.10702 4.37987 3.27532 4.21157C3.44362 4.04327 3.67189 3.94872 3.90991 3.94872H4.80734V9.15385C4.80734 9.67748 5.01535 10.1797 5.38562 10.5499C5.75588 10.9202 6.25807 11.1282 6.7817 11.1282H9.83298V12.0256ZM11.0894 10.0513H6.7817C6.54369 10.0513 6.31542 9.95673 6.14712 9.78843C5.97882 9.62013 5.88426 9.39186 5.88426 9.15385V1.97436C5.88426 1.73634 5.97882 1.50808 6.14712 1.33978C6.31542 1.17147 6.54369 1.07692 6.7817 1.07692H8.03811V4.48718C8.03997 4.62941 8.0973 4.76529 8.19788 4.86587C8.29846 4.96645 8.43434 5.02378 8.57657 5.02564H11.9868V9.15385C11.9868 9.39186 11.8923 9.62013 11.724 9.78843C11.5557 9.95673 11.3274 10.0513 11.0894 10.0513Z" fill="white" />
													</svg>`;
                    const trElement = document.createElement("tr");
                    const tdCode = document.createElement("td");
                    const tdExpiredDate = document.createElement("td");
                    const tdNote = document.createElement("td");
                    const tdCopy = document.createElement("td");
                    const btnCopy = document.createElement("a");
                    const expiredDate = new Date(item.expiredDate);
                    btnCopy.classList.add(
                        "gu-button",
                        "gu-button__primary",
                        "gu-width-fit-content"
                    );
                    btnCopy.innerHTML = "Sao chép " + iconCopy;
                    btnCopy.onclick = () => {
                        navigator.clipboard.writeText(item.code);
                    };

                    tdCode.textContent = item.code;
                    tdExpiredDate.textContent = `${expiredDate.getHours()}:${expiredDate.getMinutes()} ${expiredDate.getDate()}/${expiredDate.getMonth() + 1
                        }/${expiredDate.getFullYear()}`;
                    tdNote.textContent = item.note;
                    tdCopy.appendChild(btnCopy);
                    trElement.appendChild(tdCode);
                    trElement.appendChild(tdExpiredDate);
                    trElement.appendChild(tdNote);
                    trElement.appendChild(tdCopy);
                    tbodyElement.appendChild(trElement);
                });
            }

            function renderPointSettings(items) {
                let giftSetting1 = items.find((obj) => obj.type === 13);

                renderGift1(giftSetting1);
                let giftSetting2 = items.find((obj) => obj.type === 9);

                renderGift2(giftSetting2);
                let giftSetting3 = items.find((obj) => obj.type === 1);
                renderGift3(giftSetting3);
                renderGift4(giftSetting3);
                let giftSetting5 = items.find((obj) => obj.type === 5);
                renderGift5(giftSetting5);
                let giftSetting6 = items.find((obj) => obj.type === 3);
                renderGift6(giftSetting6);
            }

            function renderRewardSettings(items) {
                let container = document.getElementById("gu-rewards");

                for (let i = 0; i < items.length; i++) {
                    let item = items[i];
                    let giftPoint = item.point;
                    let giftName = item.nameGift;

                    let itemElement = document.createElement("div");
                    itemElement.classList.add(
                        "gu-col-4",
                        "gu-col-md-6",
                        "gu-col-s-12",
                        "gu-text-center"
                    );
                    itemElement.innerHTML = `
      <div class="gu__card gu__card-border-radius gu-bg-white">
        <img src="https://cdn.jsdelivr.net/gh/huynguyenayp/growthup-cdn@main/landing-page-default.png" width="100%" height="187" width="253" alt="growth-up" />
        <p>
          ${giftName}
        </p>
        <div class="gu__price">
          ${formatNumber(giftPoint)} UP
        </div>
      </div>
    `;

                    container.appendChild(itemElement);
                }
            }

            function renderGift1(item) {
                let rewardSetting = document.querySelector("#reward-settings");
                let strPoint = item.strPoint;
                let strType = item.strType;
                let icon = `<svg width="76" height="76" viewBox="0 0 76 76" fill="none">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M31.4028 36.7878C33.3556 38.0926 35.6515 38.7891 38.0002 38.7891C41.1496 38.7891 44.1701 37.538 46.3971 35.311C48.6241 33.084 49.8752 30.0635 49.8752 26.9141C49.8752 24.5654 49.1787 22.2695 47.8739 20.3167C46.569 18.3638 44.7144 16.8418 42.5445 15.943C40.3747 15.0442 37.987 14.809 35.6835 15.2672C33.3799 15.7254 31.264 16.8564 29.6033 18.5172C27.9425 20.1779 26.8115 22.2938 26.3533 24.5974C25.8951 26.9009 26.1303 29.2886 27.0291 31.4584C27.9279 33.6283 29.4499 35.4829 31.4028 36.7878ZM34.0417 20.9898C35.2134 20.2069 36.591 19.7891 38.0002 19.7891C39.8898 19.7891 41.7021 20.5397 43.0383 21.8759C44.3745 23.2121 45.1252 25.0244 45.1252 26.9141C45.1252 28.3233 44.7073 29.7008 43.9244 30.8725C43.1415 32.0442 42.0287 32.9574 40.7268 33.4967C39.4249 34.036 37.9923 34.1771 36.6101 33.9022C35.228 33.6272 33.9585 32.9487 32.962 31.9522C31.9656 30.9558 31.287 29.6862 31.0121 28.3041C30.7371 26.922 30.8782 25.4894 31.4175 24.1874C31.9568 22.8855 32.87 21.7728 34.0417 20.9898ZM58.4965 60.251C58.9402 60.6947 59.5395 60.9475 60.1668 60.9557C60.7942 60.9475 61.3935 60.6947 61.8371 60.251C62.2808 59.8074 62.5336 59.2081 62.5418 58.5807C62.5418 43.5391 45.3468 43.5391 38.0002 43.5391C30.6535 43.5391 13.4585 43.5391 13.4585 58.5807C13.4585 59.2106 13.7087 59.8147 14.1541 60.2601C14.5995 60.7055 15.2036 60.9557 15.8335 60.9557C16.4634 60.9557 17.0675 60.7055 17.5129 60.2601C17.9583 59.8147 18.2085 59.2106 18.2085 58.5807C18.2085 52.4057 21.5652 48.2891 38.0002 48.2891C54.4352 48.2891 57.7918 52.4057 57.7918 58.5807C57.8 59.2081 58.0529 59.8074 58.4965 60.251Z" fill="#212121" />
						</svg>`;

                let elm = document.createElement("div");
                elm.classList.add("gu-col-4", "gu-col-md-6", "gu-col-s-12", "gu-text-center");
                elm.innerHTML = `
        <div class="gu__card gu__card-border gu-position-relative">
            <div>
                ${icon}
                <div class="gu-text-18">
                    ${strPoint}
                </div>
                <div>
                    ${strType}
                </div>
            </div>
            <div class="gu__card-backdrop gu-d-flex gu-d-flex-column gu-ai-center gu-flex-jc-center">
                <span class="gu-text-16">Bạn đã nhận điểm thưởng rồi!</span>
            </div>
        </div>
    `;
                rewardSetting.appendChild(elm);
            }

            function renderGift2(item) {
                let rewardSetting = document.querySelector("#reward-settings");
                let strPoint = item.strPoint;
                let strType = item.strType;
                let point = formatNumber(item.point);
                let icon = `<svg width="76" height="76" viewBox="0 0 76 76" fill="none">
							<path d="M61.7498 24.5391H57.3165C58.5832 23.0191 59.3748 21.1191 59.3748 18.9974C59.3748 14.1841 55.4798 10.2891 50.6665 10.2891C45.3465 10.2891 40.6598 13.1074 37.9998 17.2874C35.3398 13.1074 30.6532 10.2891 25.3332 10.2891C20.5198 10.2891 16.6248 14.1841 16.6248 18.9974C16.6248 21.1191 17.4165 23.0191 18.6832 24.5391H14.2498C12.0648 24.5391 10.2915 26.3124 10.2915 28.4974V36.4141C10.2915 38.3141 11.6532 39.8341 13.4582 40.2141V61.7474C13.4582 63.9324 15.2315 65.7057 17.4165 65.7057H58.5832C60.7682 65.7057 62.5415 63.9324 62.5415 61.7474V40.2141C64.3465 39.8341 65.7082 38.3141 65.7082 36.4141V28.4974C65.7082 26.3124 63.9348 24.5391 61.7498 24.5391ZM60.9582 35.6224H40.3748V29.2891H60.9582V35.6224ZM50.6665 15.0391C52.8515 15.0391 54.6248 16.8124 54.6248 18.9974C54.6248 21.1824 52.8515 22.9557 50.6665 22.9557H40.6598C41.7365 18.4274 45.8215 15.0391 50.6665 15.0391ZM25.3332 15.0391C30.1782 15.0391 34.2632 18.4274 35.3398 22.9557H25.3332C23.1482 22.9557 21.3748 21.1824 21.3748 18.9974C21.3748 16.8124 23.1482 15.0391 25.3332 15.0391ZM15.0415 29.2891H35.6248V35.6224H15.0415V29.2891ZM18.2082 40.3724H35.6248V60.9557H18.2082V40.3724ZM57.7915 60.9557H40.3748V40.3724H57.7915V60.9557Z" fill="#212121" />
						</svg>`;

                let elm = document.createElement("div");
                elm.classList.add("gu-col-4", "gu-col-md-6", "gu-col-s-12", "gu-text-center");
                elm.innerHTML = `
       <div class="gu__card gu__card-border gu-position-relative">
					<div>
						${icon}
						<div class="gu-text-18">
								${strPoint}
						</div>
						<div>
								${strType}
						</div>
					</div>
					<div class="gu__card-backdrop gu-d-flex gu-d-flex-column gu-ai-center gu-flex-jc-center">
						<span class="gu-text-16">Nhận ${point} điểm khi đến sinh nhật</span>
						<div class="gu-d-flex gu-mt-30">
							<input type="date" placeholder="dd-mm-yyyy" data-date-format="dd-mm-yyyy">
							<button id="gu-sign-up" class="gu-button gu-button__primary gu-ml-10">Gửi <i class="fa fa-check"></i></button>
						</div>
					</div>
				</div>
    `;
                rewardSetting.appendChild(elm);
            }

            function renderGift3(item) {
                let rewardSetting = document.querySelector("#reward-settings");
                let strPoint = item.strPoint;
                let strType = item.strType;
                let point = formatNumber(item.point);
                let icon = `<svg width="76" height="76" viewBox="0 0 76 76" fill="none">
								<path d="M35.6268 59.375C35.6268 62.0033 33.5051 64.125 30.8768 64.125C28.2485 64.125 26.1268 62.0033 26.1268 59.375C26.1268 56.7467 28.2485 54.625 30.8768 54.625C33.5051 54.625 35.6268 56.7467 35.6268 59.375ZM51.4601 54.625C48.8318 54.625 46.7101 56.7467 46.7101 59.375C46.7101 62.0033 48.8318 64.125 51.4601 64.125C54.0885 64.125 56.2101 62.0033 56.2101 59.375C56.2101 56.7467 54.0885 54.625 51.4601 54.625ZM65.6468 24.32L59.3135 49.6533C59.0601 50.6983 58.1101 51.4583 57.0018 51.4583H25.3351C24.1951 51.4583 23.2135 50.635 22.9918 49.495L17.0068 16.625H12.6685C11.3701 16.625 10.2935 15.5483 10.2935 14.25C10.2935 12.9517 11.3701 11.875 12.6685 11.875H19.0018C20.1418 11.875 21.1235 12.6983 21.3451 13.8383L22.7068 21.375H63.3351C64.0635 21.375 64.7601 21.7233 65.2035 22.2933C65.6468 22.8633 65.8051 23.6233 65.6468 24.32ZM60.2951 26.125H23.5618L27.2985 46.7083H55.1335L60.2951 26.125Z" fill="#212121" />
							</svg>`;

                let elm = document.createElement("div");
                elm.classList.add("gu-col-4", "gu-col-md-6", "gu-col-s-12", "gu-text-center");
                elm.innerHTML = `
<div class="gu__card gu__card-border gu-position-relative">
						<div>
							<svg width="76" height="76" viewBox="0 0 76 76" fill="none">
								<path d="M35.6268 59.375C35.6268 62.0033 33.5051 64.125 30.8768 64.125C28.2485 64.125 26.1268 62.0033 26.1268 59.375C26.1268 56.7467 28.2485 54.625 30.8768 54.625C33.5051 54.625 35.6268 56.7467 35.6268 59.375ZM51.4601 54.625C48.8318 54.625 46.7101 56.7467 46.7101 59.375C46.7101 62.0033 48.8318 64.125 51.4601 64.125C54.0885 64.125 56.2101 62.0033 56.2101 59.375C56.2101 56.7467 54.0885 54.625 51.4601 54.625ZM65.6468 24.32L59.3135 49.6533C59.0601 50.6983 58.1101 51.4583 57.0018 51.4583H25.3351C24.1951 51.4583 23.2135 50.635 22.9918 49.495L17.0068 16.625H12.6685C11.3701 16.625 10.2935 15.5483 10.2935 14.25C10.2935 12.9517 11.3701 11.875 12.6685 11.875H19.0018C20.1418 11.875 21.1235 12.6983 21.3451 13.8383L22.7068 21.375H63.3351C64.0635 21.375 64.7601 21.7233 65.2035 22.2933C65.6468 22.8633 65.8051 23.6233 65.6468 24.32ZM60.2951 26.125H23.5618L27.2985 46.7083H55.1335L60.2951 26.125Z" fill="#212121" />
							</svg>
							<div class="gu-text-18">
								${strPoint}
							</div>
							<div>
								${strType}
							</div>
						</div>
						<div class="gu__card-backdrop gu-d-flex gu-d-flex-column gu-ai-center gu-flex-jc-center">
							<span class="gu-text-16">${point} điểm cho 1 đơn hàng bạn giới thiệu</span>
							<a id="gu-sign-up" class="gu-button gu-button__primary gu-mt-30">Xem hướng dẫn</a>
						</div>
					</div>
    `;
                rewardSetting.appendChild(elm);
            }

            function renderGift4(item) {
                let rewardSetting = document.querySelector("#reward-settings");
                let strPoint = item.strPoint;
                let strType = item.strType;
                let point = formatNumber(item.point);
                let icon = `<svg width="76" height="76" viewBox="0 0 76 76" fill="none">
							<path d="M61.7498 26.1224H52.2498V24.5391C52.2498 20.7597 50.7485 17.1352 48.0761 14.4628C45.4037 11.7904 41.7792 10.2891 37.9998 10.2891C34.2205 10.2891 30.596 11.7904 27.9236 14.4628C25.2512 17.1352 23.7498 20.7597 23.7498 24.5391V26.1224H14.2498C13.2 26.1224 12.1932 26.5394 11.4509 27.2818C10.7085 28.0241 10.2915 29.0309 10.2915 30.0807V56.9974C10.2915 59.307 11.209 61.522 12.8421 63.1551C14.4752 64.7882 16.6902 65.7057 18.9998 65.7057H56.9998C59.3094 65.7057 61.5244 64.7882 63.1576 63.1551C64.7907 61.522 65.7082 59.307 65.7082 56.9974V30.0807C65.7082 29.0309 65.2911 28.0241 64.5488 27.2818C63.8065 26.5394 62.7997 26.1224 61.7498 26.1224ZM28.4998 24.5391C28.4998 22.0195 29.5007 19.6031 31.2823 17.8215C33.0639 16.04 35.4803 15.0391 37.9998 15.0391C40.5194 15.0391 42.9358 16.04 44.7174 17.8215C46.499 19.6031 47.4998 22.0195 47.4998 24.5391V26.1224H28.4998V24.5391ZM60.9582 56.9974C60.9582 58.0472 60.5411 59.054 59.7988 59.7964C59.0565 60.5387 58.0497 60.9557 56.9998 60.9557H18.9998C17.95 60.9557 16.9432 60.5387 16.2009 59.7964C15.4585 59.054 15.0415 58.0472 15.0415 56.9974V30.8724H23.7498V37.9974C23.7498 38.6273 24.0001 39.2314 24.4455 39.6768C24.8909 40.1222 25.4949 40.3724 26.1248 40.3724C26.7547 40.3724 27.3588 40.1222 27.8042 39.6768C28.2496 39.2314 28.4998 38.6273 28.4998 37.9974V30.8724H47.4998V37.9974C47.4998 38.6273 47.7501 39.2314 48.1955 39.6768C48.6409 40.1222 49.2449 40.3724 49.8748 40.3724C50.5047 40.3724 51.1088 40.1222 51.5542 39.6768C51.9996 39.2314 52.2498 38.6273 52.2498 37.9974V30.8724H60.9582V56.9974Z" fill="#212121" />
						</svg>`;

                let elm = document.createElement("div");
                elm.classList.add("gu-col-4", "gu-col-md-6", "gu-col-s-12", "gu-text-center");
                elm.innerHTML = `
<div class="gu__card gu__card-border gu-position-relative">
					<div>
						${icon}
						<div class="gu-text-18">
							${strPoint}
						</div>
						<div>
							${strType}
						</div>
					</div>
					<div class="gu__card-backdrop gu-d-flex gu-d-flex-column gu-ai-center gu-flex-jc-center">
						<span class="gu-text-16">${point} điểm cho 1,000đ trên giá trị đơn hàng bạn giới thiệu</span>
						<a id="gu-sign-up" class="gu-button gu-button__primary gu-mt-30">Xem hướng dẫn</a>
					</div>
				</div>
    `;
                rewardSetting.appendChild(elm);
            }

            function renderGift5(item) {
                let rewardSetting = document.querySelector("#reward-settings");
                let strPoint = item.strPoint;
                let strType = item.strType;
                let point = formatNumber(item.point);
                let icon = `<svg width="76" height="76" viewBox="0 0 76 76" fill="none">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M31.4028 38.3737C33.3556 39.6785 35.6515 40.375 38.0002 40.375C41.1496 40.375 44.1701 39.1239 46.3971 36.8969C48.6241 34.6699 49.8752 31.6495 49.8752 28.5C49.8752 26.1514 49.1787 23.8554 47.8739 21.9026C46.569 19.9498 44.7144 18.4277 42.5445 17.5289C40.3747 16.6301 37.987 16.395 35.6835 16.8532C33.3799 17.3114 31.264 18.4424 29.6033 20.1031C27.9425 21.7639 26.8115 23.8798 26.3533 26.1833C25.8951 28.4868 26.1303 30.8745 27.0291 33.0444C27.9279 35.2142 29.4499 37.0689 31.4028 38.3737ZM34.0417 22.5758C35.2134 21.7929 36.591 21.375 38.0002 21.375C39.8898 21.375 41.7021 22.1257 43.0383 23.4619C44.3745 24.7981 45.1252 26.6103 45.1252 28.5C45.1252 29.9092 44.7073 31.2867 43.9244 32.4584C43.1415 33.6301 42.0287 34.5434 40.7268 35.0826C39.4249 35.6219 37.9923 35.763 36.6102 35.4881C35.228 35.2132 33.9585 34.5346 32.962 33.5381C31.9656 32.5417 31.287 31.2721 31.0121 29.89C30.7372 28.5079 30.8783 27.0753 31.4175 25.7734C31.9568 24.4715 32.87 23.3587 34.0417 22.5758ZM58.4965 61.837C58.9402 62.2806 59.5395 62.5335 60.1668 62.5417C60.7942 62.5335 61.3935 62.2806 61.8371 61.837C62.2808 61.3933 62.5336 60.794 62.5418 60.1667C62.5418 45.125 45.3468 45.125 38.0002 45.125C30.6535 45.125 13.4585 45.125 13.4585 60.1667C13.4585 60.7966 13.7087 61.4006 14.1541 61.846C14.5995 62.2914 15.2036 62.5417 15.8335 62.5417C16.4634 62.5417 17.0675 62.2914 17.5129 61.846C17.9583 61.4006 18.2085 60.7966 18.2085 60.1667C18.2085 53.9917 21.5652 49.875 38.0002 49.875C54.4352 49.875 57.7918 53.9917 57.7918 60.1667C57.8 60.794 58.0529 61.3933 58.4965 61.837ZM60.1668 45.9167C59.5395 45.9085 58.9402 45.6556 58.4965 45.212C58.0529 44.7683 57.8 44.169 57.7918 43.5417V40.375H54.6252C53.9953 40.375 53.3912 40.1248 52.9458 39.6794C52.5004 39.234 52.2502 38.6299 52.2502 38C52.2502 37.3701 52.5004 36.766 52.9458 36.3206C53.3912 35.8752 53.9953 35.625 54.6252 35.625H57.7918V32.4583C57.7918 31.8284 58.0421 31.2244 58.4875 30.779C58.9328 30.3336 59.5369 30.0833 60.1668 30.0833C60.7967 30.0833 61.4008 30.3336 61.8462 30.779C62.2916 31.2244 62.5418 31.8284 62.5418 32.4583V35.625H65.7085C66.3384 35.625 66.9425 35.8752 67.3879 36.3206C67.8333 36.766 68.0835 37.3701 68.0835 38C68.0835 38.6299 67.8333 39.234 67.3879 39.6794C66.9425 40.1248 66.3384 40.375 65.7085 40.375H62.5418V43.5417C62.5336 44.169 62.2808 44.7683 61.8371 45.212C61.3935 45.6556 60.7942 45.9085 60.1668 45.9167Z" fill="#212121" />
						</svg>`;

                let elm = document.createElement("div");
                elm.classList.add("gu-col-4", "gu-col-md-6", "gu-col-s-12", "gu-text-center");
                elm.innerHTML = `
	<div class="gu__card gu__card-border gu-position-relative">
					<div>
						${icon}
						<div class="gu-text-18">
								${strPoint}
						</div>
						<div>
								${strType}
						</div>
					</div>
					<div class="gu__card-backdrop gu-d-flex gu-d-flex-column gu-ai-center gu-flex-jc-center">
						<span class="gu-text-16">${point} điểm khi mời được đối tác mới</span>
						<button id="gu-sign-up" class="gu-button gu-button__primary gu-mt-30">Sao chép link mời</button>
					</div>
				</div>
    `;
                rewardSetting.appendChild(elm);
            }

            function renderGift6(item) {
                let rewardSetting = document.querySelector("#reward-settings");
                let strPoint = item.strPoint;
                let strType = item.strType;
                let point = formatNumber(item.point);
                let icon = `<svg width="76" height="76" viewBox="0 0 76 76" fill="none">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M26.9165 34.0391C25.5073 34.0391 24.1298 33.6212 22.9581 32.8383C21.7864 32.0554 20.8731 30.9426 20.3339 29.6407C19.7946 28.3388 19.6535 26.9062 19.9284 25.524C20.2033 24.1419 20.8819 22.8724 21.8784 21.8759C22.8748 20.8795 24.1444 20.2009 25.5265 19.926C26.9086 19.6511 28.3412 19.7921 29.6431 20.3314C30.9451 20.8707 32.0578 21.7839 32.8407 22.9556C33.6236 24.1273 34.0415 25.5049 34.0415 26.9141C34.0415 28.8037 33.2908 30.616 31.9546 31.9522C30.6184 33.2884 28.8062 34.0391 26.9165 34.0391ZM26.9165 24.5391C26.4468 24.5391 25.9876 24.6784 25.597 24.9393C25.2065 25.2003 24.9021 25.5712 24.7223 26.0052C24.5425 26.4392 24.4955 26.9167 24.5871 27.3774C24.6788 27.8381 24.905 28.2613 25.2371 28.5934C25.5693 28.9256 25.9925 29.1518 26.4532 29.2434C26.9139 29.3351 27.3914 29.288 27.8254 29.1083C28.2594 28.9285 28.6303 28.6241 28.8912 28.2335C29.1522 27.843 29.2915 27.3838 29.2915 26.9141C29.2833 26.2867 29.0305 25.6874 28.5868 25.2438C28.1432 24.8001 27.5438 24.5473 26.9165 24.5391ZM22.3248 56.0475C22.0128 56.0489 21.7036 55.9881 21.4154 55.8684C21.1272 55.7488 20.8658 55.5728 20.6465 55.3508C20.2017 54.9055 19.9519 54.3018 19.9519 53.6725C19.9519 53.0431 20.2017 52.4394 20.6465 51.9941L51.9965 20.6441C52.2139 20.4108 52.4761 20.2236 52.7675 20.0938C53.0588 19.964 53.3733 19.8942 53.6922 19.8886C54.0111 19.883 54.3278 19.9416 54.6236 20.0611C54.9193 20.1805 55.1879 20.3583 55.4135 20.5838C55.639 20.8094 55.8168 21.078 55.9362 21.3737C56.0557 21.6695 56.1143 21.9862 56.1087 22.3051C56.1031 22.624 56.0333 22.9385 55.9035 23.2298C55.7737 23.5212 55.5865 23.7834 55.3532 24.0008L24.0032 55.3508C23.7839 55.5728 23.5225 55.7488 23.2343 55.8684C22.9461 55.9881 22.6369 56.0489 22.3248 56.0475ZM45.1247 55.0049C46.2964 55.7879 47.674 56.2057 49.0832 56.2057C50.9728 56.2057 52.7851 55.4551 54.1213 54.1189C55.4575 52.7827 56.2082 50.9704 56.2082 49.0807C56.2082 47.6715 55.7903 46.294 55.0074 45.1223C54.2245 43.9506 53.1117 43.0374 51.8098 42.4981C50.5079 41.9588 49.0753 41.8177 47.6932 42.0926C46.311 42.3676 45.0415 43.0461 44.045 44.0426C43.0486 45.039 42.37 46.3086 42.0951 47.6907C41.8202 49.0728 41.9613 50.5054 42.5005 51.8074C43.0398 53.1093 43.953 54.222 45.1247 55.0049ZM47.7637 47.106C48.1543 46.845 48.6134 46.7057 49.0832 46.7057C49.7105 46.7139 50.3098 46.9668 50.7535 47.4104C51.1971 47.8541 51.45 48.4534 51.4582 49.0807C51.4582 49.5505 51.3189 50.0096 51.0579 50.4002C50.7969 50.7908 50.426 51.0952 49.992 51.2749C49.5581 51.4547 49.0805 51.5017 48.6198 51.4101C48.1591 51.3185 47.7359 51.0923 47.4038 50.7601C47.0716 50.428 46.8454 50.0048 46.7538 49.5441C46.6622 49.0834 46.7092 48.6058 46.889 48.1719C47.0687 47.7379 47.3731 47.367 47.7637 47.106Z" fill="#212121" />
						</svg>`;

                let elm = document.createElement("div");
                elm.classList.add("gu-col-4", "gu-col-md-6", "gu-col-s-12", "gu-text-center");
                elm.innerHTML = `
	<div class="gu__card gu__card-border gu-position-relative">
					<div>
						${icon}
						<div class="gu-text-18">
								${strPoint}
						</div>
						<div>
								${strType}
						</div>
					</div>
					<div class="gu__card-backdrop gu-d-flex gu-d-flex-column gu-ai-center gu-flex-jc-center">
						<span class="gu-text-16">${point} điểm cho 1,000đ hoa hồng bạn nhận được</span>
						<button id="gu-sign-up" class="gu-button gu-button__primary gu-mt-30">Xem hướng dẫn</button>
					</div>
				</div>
    `;
                rewardSetting.appendChild(elm);
            }

            var modal = document.getElementsByClassName("modalGetCoupon")[0];

            var modal2 = document.getElementsByClassName("modalSendInfo")[0];

            var btnGetCoupon = document.getElementsByClassName("btn-get-coupon")[0];

            var btnSendInfo = document.getElementsByClassName("btn-send-info")[0];

            var btnCloseList = document.querySelectorAll(".gu-modal-close");

            btnGetCoupon.addEventListener("click", function () {
                modal.style.display = "block";
            });

            btnSendInfo.addEventListener("click", function () {
                modal2.style.display = "block";
            });

            btnCloseList.forEach(function (element) {
                element.addEventListener("click", function () {
                    modal.style.display = "none";
                    modal2.style.display = "none";
                });
            });

            window.addEventListener("click", function (e) {
                if (e.target.classList.contains("modal")) {
                    modal.style.display = "none";
                    modal2.style.display = "none";
                }
            });

            var guFormInfo = document.getElementsByClassName("gu-form-info")[0];
            guFormInfo.innerHTML += `
    <div class="gu-d-flex gu-d-flex-column gu-mt-20">
        <label for="phoneNumber">Số điện thoại*:</label>
        <input name="phoneNumber" type="text" class="gu-w-100 form-info-input-phone">
    </div>
    <div class="gu-d-flex gu-d-flex-column gu-mt-20">
        <label for="fullName">Họ và tên khách hàng:</label>
        <input name="fullName" type="text" class="gu-w-100 form-info-input-name">
    </div>
    <div class="gu-d-flex gu-d-flex-column gu-mt-20">
        <label for="txtname">Nhu cầu:</label>
        <textarea id="txtid" name="txtname" rows="4" cols="50" maxlength="200" class="gu-w-100 form-info-input-note"></textarea>
    </div>
`;

            const formInfoButtonSubmit = document.getElementsByClassName(
                "form-info-btn-submit"
            )?.[0];
            formInfoButtonSubmit.onclick = () => {
                const formInfoInputPhone = document.getElementsByClassName(
                    "form-info-input-phone"
                )?.[0];
                const formInfoInputName = document.getElementsByClassName(
                    "form-info-input-name"
                )?.[0];
                const formInfoInputNote = document.getElementsByClassName(
                    "form-info-input-note"
                )?.[0];
                const body = {
                    domain: origin,
                    email: guCustomerEmail,
                    phone: formInfoInputPhone?.value ?? "",
                    name: formInfoInputName?.value ?? "",
                    request: formInfoInputNote?.value ?? "",
                    note: formInfoInputNote?.value ?? ""
                };

                if (!body.phone?.trim()?.length) return;

                fetch("https://api.growthup.work/api/potential-customer/portal", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                })
                    .then((response) => response.json())
                    .catch((err) => console.error(err))
                    .finally(() => {
                        modal2.style.display = "none";
                    });
            };

            function generateGUID() {
                var currentDate = new Date().getTime().toString(16);
                var randomPart = Math.random().toString(16).substring(2);
                var guid = currentDate + randomPart;
                return guid;
            }

            function getCookie(cookieName) {
                const cookies = document.cookie.split(';');

                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();

                    if (cookie.startsWith(cookieName + '=')) {
                        return cookie.substring(cookieName.length + 1);
                    }
                }

                return null; // Cookie not found
            }

            function formatNumber(number) {
                return number.toLocaleString("en");
            }
        }
    }
});
