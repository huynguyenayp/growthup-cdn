const html=`<input class='gu-widget-toggle gu-hidden' id='off-gu-widget' type='checkbox' /><label class='gu-widget-bubble' id='gu-widget-bubble' for='off-gu-widget'><div class='gu-bubble-container'><svg width='25' height='24' viewBox='0 0 25 24' fill='none'><path d='M22.5002 6.3335H20.6335C21.1668 5.6935 21.5002 4.8935 21.5002 4.00016C21.5002 1.9735 19.8602 0.333496 17.8335 0.333496C15.5935 0.333496 13.6202 1.52016 12.5002 3.28016C11.3802 1.52016 9.40683 0.333496 7.16683 0.333496C5.14016 0.333496 3.50016 1.9735 3.50016 4.00016C3.50016 4.8935 3.8335 5.6935 4.36683 6.3335H2.50016C1.58016 6.3335 0.833496 7.08016 0.833496 8.00016V11.3335C0.833496 12.1335 1.40683 12.7735 2.16683 12.9335V22.0002C2.16683 22.9202 2.9135 23.6668 3.8335 23.6668H21.1668C22.0868 23.6668 22.8335 22.9202 22.8335 22.0002V12.9335C23.5935 12.7735 24.1668 12.1335 24.1668 11.3335V8.00016C24.1668 7.08016 23.4202 6.3335 22.5002 6.3335ZM22.1668 11.0002H13.5002V8.3335H22.1668V11.0002ZM17.8335 2.3335C18.7535 2.3335 19.5002 3.08016 19.5002 4.00016C19.5002 4.92016 18.7535 5.66683 17.8335 5.66683H13.6202C14.0735 3.76016 15.7935 2.3335 17.8335 2.3335ZM7.16683 2.3335C9.20683 2.3335 10.9268 3.76016 11.3802 5.66683H7.16683C6.24683 5.66683 5.50016 4.92016 5.50016 4.00016C5.50016 3.08016 6.24683 2.3335 7.16683 2.3335ZM2.8335 8.3335H11.5002V11.0002H2.8335V8.3335ZM4.16683 13.0002H11.5002V21.6668H4.16683V13.0002ZM20.8335 21.6668H13.5002V13.0002H20.8335V21.6668Z' fill='#3B82F6'/></svg><span id='gu-label-btn-bubble'>Lấy link giới thiệu</span><div class='gu-widget-arrow'><svg width='13' height='8' viewBox='0 0 13 8' fill='none'><path d='M11.5001 7.2501C11.4015 7.25057 11.3039 7.23135 11.2129 7.19357C11.1219 7.15579 11.0393 7.10021 10.9701 7.0301L6.50009 2.5601L2.03009 7.0001C1.88913 7.09149 1.72157 7.13291 1.55427 7.11773C1.38696 7.10254 1.2296 7.03162 1.10741 6.91634C0.98521 6.80106 0.905255 6.6481 0.880355 6.48196C0.855456 6.31582 0.887054 6.14614 0.970086 6.0001L5.97009 1.0001C6.11071 0.859652 6.30134 0.780762 6.50009 0.780762C6.69884 0.780762 6.88946 0.859652 7.03009 1.0001L12.0301 6.0001C12.1705 6.14073 12.2494 6.33135 12.2494 6.5301C12.2494 6.72885 12.1705 6.91948 12.0301 7.0601C11.8854 7.1908 11.6949 7.25908 11.5001 7.2501Z' fill='#212121'/></svg></div></div></label><div class='gu-widget-box'><div class='gu-widget-content'><div class='gu-widget-form'><label class='gu-widget-close' for='off-gu-widget'><svg width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M6.00018 7.25016C5.90164 7.25063 5.804 7.23141 5.71299 7.19363C5.62197 7.15585 5.53942 7.10027 5.47018 7.03016L0.47018 2.03016C0.370455 1.88426 0.325452 1.70784 0.34311 1.532C0.360767 1.35616 0.43995 1.1922 0.566693 1.06905C0.693436 0.945892 0.859597 0.871447 1.03587 0.858844C1.21214 0.846241 1.38721 0.896289 1.53018 1.00016L6.00018 5.44016L10.4702 1.00016C10.6111 0.90877 10.7787 0.867349 10.946 0.882536C11.1133 0.897724 11.2707 0.968641 11.3929 1.08392C11.5151 1.1992 11.595 1.35217 11.6199 1.5183C11.6448 1.68444 11.6132 1.85412 11.5302 2.00016L6.53018 7.00016C6.46351 7.07572 6.38212 7.13687 6.29098 7.17986C6.19984 7.22285 6.10089 7.24677 6.00018 7.25016Z' fill='#212121'/></svg></label><div class='gu-widget-title text-center' id='gu-widget-title'><span>Test 1 </span></div><div class='gu-widget-note text-center' id='gu-widget-info'><span>Thông tin abc </span></div><form onsubmit='submitForm(); return false;'><label for='gu-email'>Email (*):</label><input type='email' id='gu-email' name='email' required><label for='gu-fullName'>Họ và tên (*):</label><input type='text' id='gu-fullName' name='fullName' required><label for='phone'>Số điện thoại:</label><input type='tel' pattern='(84|0[3|5|7|8|9])+([0-9]{8})' id='gu-phone' name='gu-phone'><input type='submit' id='gu-label-btn-submit' value='Đăng ký cộng tác viên' name='gu-label-btn-submit'></form><div class='gu-widget-check-mail'><input type='text' id='gu-input-copy' class='gu-input-copy' name='gu-input-copy' value='https://domainshop.com?ref=ma_gioi_thieu' readonly><input type='button' id='gu-btn-copy' class='gu-btn-copy' value='Sao chép' name='gu-btn-copy'><span></span></div><div class='text-right'><a class='gu-signin' id='gu-signin' href='https://google.com' target='_blank'>Đăng nhập</a></div></div></div><div class='gu-widget-footer text-center'><div class='gu-widget-powerred'><a href='' id='gu-powered-by-growthup' target='_blank'>Powered by GrowthUP </a></div></div></div>`;
const css=`
<style>
    * {
        font-family: 'Inter';
        font-style: normal;
    }
    
     :root {
        --gu-widget-width: 400px;
        --gu-background: #3B82F6;
        --gu-bottom-position-bottom: 20px;
        --gu-bottom-position-right: 100px;
    }
    
    .gu-widget-bubble {
        display: none;
        position: fixed;
        background-color: #FFFFFF;
        bottom: var(--gu-bottom-position-bottom);
        top: auto !important;
        right: var(--gu-bottom-position-right);
        border-radius: 8px;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
        z-index: 99999999999;
        overflow: hidden;
        align-items: center;
        justify-content: center;
        -webkit-transition: all .2s ease-out;
        transition: all .2s ease-out;
        user-select: none;
    }
    
    .gu-widget-box {
        position: fixed;
        bottom: calc(50px + var(--gu-bottom-position-bottom));
        top: auto !important;
        right: var(--gu-bottom-position-right);
        max-width: var(--gu-widget-width);
        -webkit-transition: all .2s ease-out;
        transition: all .2s ease-out;
        z-index: 99999999999;
        opacity: 0;
        visibility: hidden;
        line-height: normal;
    }
    
    .gu-widget-content {
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        background-color: #fff;
        box-shadow: 0 5px 15px 0 rgba(0, 0, 0, .05);
        overflow: hidden;
    }
    
    .gu-widget-title {
        font-weight: 700;
        font-size: 21px;
        margin-bottom: 30px;
    }
    
    .gu-widget-note {
        font-weight: 400;
        font-size: 14px;
        margin-bottom: 35px;
    }
    
    .gu-widget-form {
        position: relative;
        padding: 54px 34px 20px;
    }
    
    .gu-widget-form form label {
        line-height: 30px;
    }
    
    .gu-widget-form form label,
    span {
        color: #495057;
    }
    
    .gu-widget-form input:hover {
        border-color: var(--gu-background);
    }
    
    .gu-widget-form input:focus {
        outline: 0 none;
        outline-offset: 0;
        box-shadow: 0 0 0 0.2rem #a6d5fa;
        border-color: #2196f3;
    }
    
    .gu-widget-form .gu-widget-close {
        position: absolute;
        top: 10px;
        right: 20px;
        cursor: pointer;
        padding: 10px;
    }
    
    .gu-widget-toggle:checked~.gu-widget-box {
        bottom: calc(70px + var(--gu-bottom-position-bottom));
        opacity: 1;
        visibility: visible;
    }
    
    .gu-bubble-container {
        padding: 10px;
        color: var(--gu-background);
        font-weight: 600;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    
    .gu-bubble-container span {
        padding: 0 20px;
        font-size: 17.5px;
        color: var(--gu-background);
    }
    
    .gu-bubble-container .gu-widget-arrow {
        transform: rotate(180deg);
        -webkit-transition: all .2s ease-out;
        transition: all .2s ease-out
    }
    
    .gu-widget-toggle:checked~.gu-widget-bubble .gu-bubble-container .gu-widget-arrow {
        transform: rotate(0deg);
        -webkit-transition: all .2s ease-out;
        transition: all .2s ease-out
    }
    
    .gu-widget-box input {
        padding: 10.5px;
        border: 1px solid #CED4DA;
        border-radius: 6px;
        font-size: 14px;
        width: 100%;
    }
    
    .gu-widget-box input[type=submit] {
        background: var(--gu-background);
        color: #FFFFFF;
        font-weight: 700;
        margin: 20px 0px;
    }
    
    .text-center {
        text-align: center;
    }
    
    .text-right {
        text-align: right;
    }
    
    .gu-widget-footer {
        background: #F5F5F5;
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
    }
    
    .gu-widget-footer .gu-widget-powerred {
        padding: 8px;
    }
    
    .gu-widget-powerred a {
        text-decoration: none;
        color: #6C757D;
        font-weight: 400;
        font-size: 10.5px;
        line-height: 16px;
    }

    .gu-signin {
        font-weight: 700;
        color: var(--gu-background);
        text-decoration: none;
    }
    
    .gu-hidden {
        display: none;
    }
    
    .gu-widget-check-mail {
        text-align: center;
        font-size: 11px;
        display: none;
        margin-bottom: 20px;
        min-height: 270px;
        flex-direction: column;
        justify-content: end;
    }
    
    .gu-btn-copy {
        /* display: none; */
        background-color: var(--gu-background);
        color: #FFFFFF;
        font-weight: 700;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    
    .gu-input-copy {
        background-color: #CED4DA;
        color: #6C757D;
    }
</style>`;

document.querySelector('body').insertAdjacentHTML('beforeend', html);
document.querySelector('body').insertAdjacentHTML('beforeend', css);
debugger;
const apiDomain='https://api.growthup.work/api';
const orgId='63b8fbd354443de43956e95b';
const refLogin='https://growthup.work/partner-authentication/login';
const domainCurrent=location.hostname;
const refPoweredGrowthup=`https: //app.growthup.vn?utm_campaign=growthup-link&utm_content=Powered+by+GrowthUP&utm_medium=widget&utm_referrer=${domainCurrent}`;
let camId='63b8fc6a41159d51834f41a5';
const widgetEl=document.getElementById('gu-widget-bubble');
const widgetForm=document.querySelector('.gu-widget-form form');
const emailEl=document.getElementById('gu-email');
const fullNameEl=document.getElementById('gu-fullName');
const phoneEl=document.getElementById('gu-phone');
const btnSubmitEl=document.getElementById('gu-label-btn-submit');
const checkMailEl=document.querySelector('.gu-widget-check-mail');
const labelCheckMailEl=document.querySelector('.gu-widget-check-mail span');
const btnCopyEl=document.getElementById('gu-btn-copy');
const signIn=document.getElementById('gu-signin');
const poweredGrowthup=document.getElementById('gu-powered-by-growthup');
signIn.href=refLogin;
poweredGrowthup.href=refPoweredGrowthup;
phoneEl.addEventListener('input', function(event) {
    if (phoneEl.validity.patternMismatch) {
        phoneEl.setCustomValidity('Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng.');
    }
    else {
        phoneEl.setCustomValidity('');
    }
}

);
async function createPartnerAccount(email, fullName, phone) {
    const body= {
        fullName: fullName, email, referral: '', phone, isSendEmail: true, isMerchantCreate: false, camId
    }
    ;
    try {
        const response=await fetch(`${apiDomain}/partner`, {
            method: 'POST', headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            }
            , body: JSON.stringify(body),
        }
        );
        const result=await response.json();
        return result?.message?.success_send_mail=='';
    }
    catch (error) {
        return false;
    }
}

;
async function submitForm() {
    btnSubmitEl.value='Đang tạo tài khoản...';
    const email=emailEl.value;
    const fullName=fullNameEl.value;
    const phone=phoneEl.value;
    const success=await createPartnerAccount(email, fullName, phone);
    if (success) {
        widgetForm.style.display='none';
        labelCheckMailEl.innerHTML=`Kiểm tra email $ {
            email
        }
        để kích hoạt tài khoản và lấy thông tin đăng nhập trang quản lý đơn hàng do bạn giới thiệu.`;
        btnCopyEl.onclick=copy;
        checkMailEl.style.display='flex';
    }
}

async function fetchWidget() {
    try {
        widgetEl.style.display='block';
    }
    catch (error) {
        return;
    }
}


fetchWidget();
