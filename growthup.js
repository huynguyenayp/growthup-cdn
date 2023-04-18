  if (window.location.href.indexOf('thank_you') > 0) {
    debugger; 
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
    document.querySelector('body').insertAdjacentHTML("beforeend", html);

    var camId;
    const orgId = "63ebab522c2fbdb15c491447";
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
            const { title, description, buttonName, imgIntro, isOnce} = data || {};
            modalTitle.innerHTML = title || '';
            modalDescription.innerHTML = description || '';
            btnContent.innerHTML = buttonName || '';
            imgIntroElm.src = imgIntro || '';
            camId = data.camId;

            if (isOnce && localStorage.getItem(email)) return;
            if (isOnce) localStorage[email] = 1;

            modal.style.display = 'block';
            guideCheckMail.style.display = 'none';
        } catch (error) {return;}
    };
    const createPartnerAccount = async() => {
        btnContent.innerHTML = "Đang tạo tài khoản...";
        const { full_name, phone } = billing_address ?? {};
        const body = { fullName: full_name, email, referral: "", phone, isSendEmail: true, camId};

        try {
            const response = await fetch("https://api.growthup.work/api/partner", {
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
        } catch (error) {return;}
    };
    fetchPopupReferral();
    btnShare.onclick = createPartnerAccount;
  }
