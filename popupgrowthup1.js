if (window.location.href.indexOf('thank_you') > 0) {
    var html = `
      <div class="gu-modal" id="gu-modal">
       <div class="gu-modal-body">
         <img id="gu-img-intro" class="gu-img-intro" src="" alt="Growthup" />
         <span class="gu-close" id="gu-close">&times;</span>
           <div class="gu-modal-content">
             <p class="gu-modal-title" id="gu-modal-title"> Giới thiệu bạn bè, nhận hoa hồng ngay </p>
             <p class="gu-modal-description" id="gu-modal-description"> Chia sẻ liên kết mua hàng, và nhận được 10% hoa hồng khi trên mỗi đơn hàng thành công! </p>
             <button id="gu-button-share" class="gu-button-share" onclick="signupPartner()">
              <span class='gu-button-share-label' id="gu-button-share-label">Kích hoạt & lấy liên kết chia sẻ</span>
             </button>
             </div>
             <p class="gu-guide-check-mail" id="gu-guide-check-mail">Vui lòng kiểm tra email để lấy thông tin đăng nhập trang quản lý doanh thu từ các đơn hàng do bạn giới thiệu! </p>
           </div>
       </div>
     </div>`;
    const css = `
    <style>
    .gu-modal {
    position: fixed;
    display: none;
    z-index: 10000000001;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    }
    .gu-modal-body {
    position: relative;
    margin: auto;
    top: 10%;
    background: #FFFFFF;
    border-radius: 6px;
    max-width: 500px;
    }
    .gu-modal-content {
    padding: 20px;
    text-align: center;
    }
    .gu-close {
    position: absolute;
    right: 20px;
    top: 10px;
    font-size: 24px;
    }
    .gu-close:hover,
    .gu-close:focus {
    color: #b3b3b3;
    text-decoration: none;
    cursor: pointer;
    }
    .gu-img-intro {
    width : 500px;
    height: 250px;
    border-radius: 6px 6px 0px 0px;
    }
    .gu-modal-title {
    font-weight: 700;
    font-size: 21px;
    margin-bottom: 25px;
    }
    .gu-modal-description {
    font-weight: 400;
    font-size: 14px;
    }
    .gu-button-share {
    width: 100%;
    height: 34px;
    background: #3B82F6;
    border-radius: 2px;
    margin-top: 20px;
    }
    .gu-button-share-label {
    font-weight: 700;
    color: #FFFFFF;
    }
    .gu-guide-check-mail {
    font-style: italic;
    font-weight: 400;
    font-size: 12px;
    color: #495057;
    padding: 0px 20px 20px;
    }
    </style>`;

    document.querySelector('body').insertAdjacentHTML('beforeend', html);
    document.querySelector('body').insertAdjacentHTML('beforeend', css);

    var camId;
    const orgId = "63b8fbd354443de43956e95b";
    const modal = document.getElementById("gu-modal");
    const btnShare = document.getElementById("gu-button-share");
    const modalTitle = document.getElementById("gu-modal-title");
    const modalDescription = document.getElementById("gu-modal-description");
    const btnContent = document.getElementById("gu-button-share-label");
    const imgIntroElm = document.getElementById("gu-img-intro");
    const guideCheckMail = document.getElementById("gu-guide-check-mail");
    const span = document.getElementById("gu-close");
    const { email, billing_address } = Haravan.checkout ?? {};

    span.onclick = function() {
        modal.style.display = 'none';
    }
    window.onclick = function(event) {
        if (event.target === modal)
            modal.style.display = "none";
    }
    const fetchPopupReferral = async() => {
        try {
            const resPopup = await fetch(`https://api.growthup.work/api/popup/public?orgId=${orgId}&type=1`);
            const { data } = await resPopup.json();
            const { title, description, buttonName, imgIntro, isOnce } = data || {};
            modalTitle.innerHTML = title || '';
            modalDescription.innerHTML = description || '';
            btnContent.innerHTML = buttonName || '';
            imgIntroElm.src = imgIntro || '';
            camId = data.camId;

            if (isOnce && localStorage.getItem(email)) return;
            if (isOnce) localStorage[email] = 1;

            modal.style.display = 'block';
            guideCheckMail.style.display = 'none';
        } catch (error) { return; }
    };
    const createPartnerAccount = async() => {
        btnContent.innerHTML = "Đang tạo tài khoản...";
        const { full_name, phone } = billing_address ?? {};
        const body = { fullName: full_name, email, referral: "", phone, isSendEmail: true, isMerchantCreate: false, camId };

        try {
            const response = await fetch(`https://api.growthup.work/api/partner`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            const result = await response.json();
            const { error } = result ?? {};
            if (error) {
                modal.style.display = "none";
            } else {
                btnShare.style.display = "none";
                guideCheckMail.style.display = "block";
            }
        } catch (error) { return; }
    };
    fetchPopupReferral();
    btnShare.onclick = createPartnerAccount;
}
