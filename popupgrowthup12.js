if (window.location.href.indexOf('thank_you') > 0) {
    var html = `
 <div class="gu-modal" id="gu-modal">
    <div class="gu-modal-body">
        <span class="gu-close" id="gu-close">&times;</span>
        <div class="gu-modal-content">
            <div class="gu-modal-header-title">Cảm ơn {full_name} đã mua hàng </div>
            <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M101.875 28.4375H93.125C95.625 25.4375 97.1875 21.6875 97.1875 17.5C97.1875 8 89.5 0.3125 80 0.3125C69.5 0.3125 60.25 5.875 55 14.125C49.75 5.875 40.5 0.3125 30 0.3125C20.5 0.3125 12.8125 8 12.8125 17.5C12.8125 21.6875 14.375 25.4375 16.875 28.4375H8.125C3.8125 28.4375 0.3125 31.9375 0.3125 36.25V51.875C0.3125 55.625 3 58.625 6.5625 59.375V101.875C6.5625 106.188 10.0625 109.688 14.375 109.688H95.625C99.9375 109.688 103.438 106.188 103.438 101.875V59.375C107 58.625 109.688 55.625 109.688 51.875V36.25C109.688 31.9375 106.188 28.4375 101.875 28.4375ZM100.312 50.3125H59.6875V37.8125H100.312V50.3125ZM80 9.6875C84.3125 9.6875 87.8125 13.1875 87.8125 17.5C87.8125 21.8125 84.3125 25.3125 80 25.3125H60.25C62.375 16.375 70.4375 9.6875 80 9.6875ZM30 9.6875C39.5625 9.6875 47.625 16.375 49.75 25.3125H30C25.6875 25.3125 22.1875 21.8125 22.1875 17.5C22.1875 13.1875 25.6875 9.6875 30 9.6875ZM9.6875 37.8125H50.3125V50.3125H9.6875V37.8125ZM15.9375 59.6875H50.3125V100.312H15.9375V59.6875ZM94.0625 100.312H59.6875V59.6875H94.0625V100.312Z" fill="#326FD1"/>
          </svg>
            <div class="gu-modal-title" id="gu-modal-title">Giới thiệu bạn bè, nhận hoa hồng 100k</div>
            <div class="gu-modal-description" id="gu-modal-description">
                {full_name} sẽ nhận được 100k khi có bạn bè mua hàng thông qua liên kết giới thiệu của bạn.</p>
            </div>
            <div id="gu-modal-box">
                <button id="gu-button-share" class="gu-button">
                <span class='gu-button-label' id="gu-button-share-label">Lấy link giới thiệu</span>
            </button>
                <button id="gu-button-cancel" class="gu-button-cancel">
               <span class='gu-button-cancel-label' id="gu-button-cancel-label">Không, cảm ơn nhé!</span>
               </button>
            </div>
            <div id="gu-modal-box-success" class="gu-modal-box-success">
                <input type='text' id='gu-input-copy' class='gu-input-copy' name='gu-input-copy' value='https://domainshop.com?ref=ma_gioi_thieu' readonly>
                <button id="gu-button-copy" class="gu-button">
                    <span class='gu-button-label' id="gu-button-copy-label">Sao chép</span>
                </button>
                <div class="gu-guide-check-mail">Kiểm tra email {email_partner} để lấy thông tin đăng nhập trang quản lý đơn hàng do bạn giới thiệu.</div>
                <div style="text-align: right;">
                    <a class="gu-button-link" href="{shop}.growthup.vn">Quản lý đơn hàng giới thiệu</a>
                </div>
            </div>
        </div>
    </div>
</div>
    `;
    const css = `
    <style>
    .gu-modal {
        position: fixed;
        visibility: hidden;
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
        padding: 40px 30px;
        text-align: center;
    }
    
    .gu-close {
        position: absolute;
        right: 20px;
        top: 10px;
        font-size: 24px;
        font-weight: 600;
    }
    
    .gu-close:hover,
    .gu-close:focus,
    .gu-button:hover,
    .gu-button:focus,
    .gu-button-cancel:hover,
    .gu-button-cancel:focus {
        cursor: pointer;
        opacity: 0.8;
    }
    
    .gu-modal-title {
        font-weight: 400;
        font-size: 24px;
        margin-top: 40px;
        margin-bottom: 30px;
    }
    
    .gu-modal-description {
        font-weight: 400;
        font-size: 14px;
    }
    
    .gu-button {
        width: 100%;
        height: 34px;
        background: #3B82F6;
        margin-top: 20px;
        border-radius: 6px;
        border-color: transparent;
    }
    
    .gu-button-label {
        font-weight: 700;
        color: #FFFFFF;
    }
    
    .gu-guide-check-mail {
        font-weight: 400;
        font-size: 12px;
        color: #495057;
        padding: 20px 0;
    }
    
    .gu-modal-header-title {
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 30px;
    }
    
    .gu-button-cancel {
        width: 100%;
        height: 34px;
        background: #3B82F6;
        margin-top: 20px;
        border-radius: 6px;
        background-color: transparent;
        border-color: transparent;
    }
    
    .gu-button-cancel-label {
        font-weight: 700;
        color: #64748B;
    }
    
    .gu-input-copy {
        color: #6C757D;
        width: 100%;
        height: 40px;
        background: #E9ECEF;
        opacity: 0.6;
        border: 1px solid #CED4DA;
        border-radius: 6px;
        margin-top: 20px;
        paddig-left: 12px;
    }
    
    .gu-modal-box-success {
        display: none;
    }
    
    .gu-button-link {
        text-decoration: none;
        color: #3B82F6;
        font-weight: 700;
    }
</style>
 `;
    
    document.querySelector('body').insertAdjacentHTML('beforeend', css);

    var camId;
    const orgId = "63b8fbd354443de43956e95b";
    const modal = document.getElementById("gu-modal");
    const btnShare = document.getElementById("gu-button-share");
    const modalTitle = document.getElementById("gu-modal-title");
    const modalDescription = document.getElementById("gu-modal-description");
    const btnContent = document.getElementById("gu-button-share-label");
    const btnClose = document.getElementById("gu-close");
    const btnCopy = document.getElementById("gu-button-copy");
    const btnSubmit = document.getElementById("gu-button-share");
    
    const { email, billing_address } = Haravan.checkout ?? {};
    const { full_name } = billing_address ?? {};
    html.replace("{full_name}", full_name);
    html.replace("{email_partner}", email);
    
    document.querySelector('body').insertAdjacentHTML('beforeend', html);
    debugger;
    btnClose.onclick = function() {
        closePopup();
    }
    
    btnCopy.onclick = function() {
        copy();
    }
    
    btnSubmit.onclick = function() {
        submit();
    }
    
    window.onclick = function(event) {
        if (event.target === modal)
            closePopup();
    }

    function closePopup() {
        modal.style.visibility = "hidden";
    }

    function copy() {
        const btnCopyEl = document.getElementById('gu-button-copy');
        const inputCopy = document.getElementById('gu-input-copy');
        if (inputCopy) {
            inputCopy.select();
            document.execCommand("copy");
            btnCopyEl.value = 'Đã sao chép';
            btnCopyEl.style.backgroundColor = '#22C55E';
        }
    }


    async function fetchPopupReferral () {
        try {
            const resPopup = await fetch(`https://api.growthup.work/api/popup/public?orgId=${orgId}&type=1`);
            const {
                data
            } = await resPopup.json();
            const {
                title,
                description,
                buttonName,
                imgIntro,
                isOnce
            } = data || {};

            camId = data.camId;

            if (isOnce && localStorage.getItem(email)) return;
            if (isOnce) localStorage[email] = 1;

            modal.style.visibility = 'visible';
        } catch (error) {
            return;
        }
    };

    async function submit() {
        btnContent.innerHTML = "Đang tạo tài khoản...";
        // await createPartnerAccount();
        const guModalBoxEl = document.getElementById('gu-modal-box');
        guModalBoxEl.style.display = 'none';

        const guModalBoxSuccessEl = document.getElementById('gu-modal-box-success');
        guModalBoxSuccessEl.style.display = 'block'
    }

    async function createPartnerAccount () {

        const {
            full_name,
            phone
        } = billing_address || {};
        const body = {
            fullName: full_name,
            email,
            referral: "",
            phone,
            isSendEmail: true,
            isMerchantCreate: false,
            camId
        };

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
            const {
                error
            } = result || {};
            if (error) {
                modal.style.display = "none";
            } else {
                btnShare.style.display = "none";
                guideCheckMail.style.display = "block";
            }
        } catch (error) {
            return;
        }
    };

    fetchPopupReferral();
}
