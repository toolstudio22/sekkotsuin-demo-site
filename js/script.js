// ========================================
// ハンバーガーメニュー
// ========================================

const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

// ナビゲーションリンクをクリックしたらメニューを閉じる
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// ========================================
// スムーススクロール
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// ヘッダーのスクロール時スタイル変更
// ========================================

const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// スクロールアニメーション
// ========================================

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
            element.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ========================================
// トップへ戻るボタン
// ========================================

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// フォームバリデーション
// ========================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// バリデーション関数
const validateName = (name) => {
    return name.trim().length >= 2;
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePhone = (phone) => {
    const phoneRegex = /^[0-9\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
};

const validateMessage = (message) => {
    return message.trim().length >= 10;
};

// エラーメッセージ表示
const showError = (inputId, message) => {
    const errorElement = document.getElementById(`${inputId}Error`);
    const inputElement = document.getElementById(inputId);
    
    if (errorElement && inputElement) {
        errorElement.textContent = message;
        inputElement.style.borderColor = 'var(--error-color)';
    }
};

// エラーメッセージクリア
const clearError = (inputId) => {
    const errorElement = document.getElementById(`${inputId}Error`);
    const inputElement = document.getElementById(inputId);
    
    if (errorElement && inputElement) {
        errorElement.textContent = '';
        inputElement.style.borderColor = '';
    }
};

// 各フィールドのリアルタイムバリデーション
document.getElementById('name').addEventListener('blur', function() {
    if (!validateName(this.value)) {
        showError('name', 'お名前は2文字以上で入力してください');
    } else {
        clearError('name');
    }
});

document.getElementById('email').addEventListener('blur', function() {
    if (!validateEmail(this.value)) {
        showError('email', '有効なメールアドレスを入力してください');
    } else {
        clearError('email');
    }
});

document.getElementById('phone').addEventListener('blur', function() {
    if (!validatePhone(this.value)) {
        showError('phone', '有効な電話番号を入力してください');
    } else {
        clearError('phone');
    }
});

document.getElementById('message').addEventListener('blur', function() {
    if (!validateMessage(this.value)) {
        showError('message', 'お問い合わせ内容は10文字以上で入力してください');
    } else {
        clearError('message');
    }
});

// フォーム送信
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // すべてのエラーをクリア
    ['name', 'email', 'phone', 'message', 'privacy'].forEach(clearError);
    
    // フォームの値を取得
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const privacy = document.getElementById('privacy').checked;
    
    let isValid = true;
    
    // バリデーション
    if (!validateName(name)) {
        showError('name', 'お名前は2文字以上で入力してください');
        isValid = false;
    }
    
    if (!validateEmail(email)) {
        showError('email', '有効なメールアドレスを入力してください');
        isValid = false;
    }
    
    if (!validatePhone(phone)) {
        showError('phone', '有効な電話番号を入力してください');
        isValid = false;
    }
    
    if (!validateMessage(message)) {
        showError('message', 'お問い合わせ内容は10文字以上で入力してください');
        isValid = false;
    }
    
    if (!privacy) {
        showError('privacy', 'プライバシーポリシーに同意してください');
        isValid = false;
    }
    
    if (isValid) {
        // 実際の送信処理（サーバー側の実装が必要）
        // ここではデモとして成功メッセージを表示
        
        formMessage.textContent = 'お問い合わせを受け付けました。ありがとうございます。';
        formMessage.className = 'form-message success';
        
        // フォームをリセット
        contactForm.reset();
        
        // 3秒後にメッセージを非表示
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
        
        // トップへスクロール
        const contactSection = document.getElementById('contact');
        const headerHeight = document.getElementById('header').offsetHeight;
        window.scrollTo({
            top: contactSection.offsetTop - headerHeight,
            behavior: 'smooth'
        });
        
    } else {
        formMessage.textContent = '入力内容に誤りがあります。ご確認ください。';
        formMessage.className = 'form-message error';
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
});

// ========================================
// 営業時間の強調表示（現在営業中かどうか）
// ========================================

const checkBusinessHours = () => {
    const now = new Date();
    const day = now.getDay(); // 0 (日曜) - 6 (土曜)
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour * 60 + minute;
    
    // 営業時間の定義
    const businessHours = {
        1: [{ start: 9 * 60, end: 12 * 60 }, { start: 15 * 60, end: 20 * 60 }], // 月曜
        2: [{ start: 9 * 60, end: 12 * 60 }, { start: 15 * 60, end: 20 * 60 }], // 火曜
        3: [{ start: 9 * 60, end: 12 * 60 }, { start: 15 * 60, end: 20 * 60 }], // 水曜
        4: [], // 木曜（休診）
        5: [{ start: 9 * 60, end: 12 * 60 }, { start: 15 * 60, end: 20 * 60 }], // 金曜
        6: [{ start: 9 * 60, end: 13 * 60 }], // 土曜
        0: [] // 日曜（休診）
    };
    
    const todayHours = businessHours[day];
    let isOpen = false;
    
    if (todayHours.length > 0) {
        isOpen = todayHours.some(period => 
            currentTime >= period.start && currentTime < period.end
        );
    }
    
    // 営業状態を表示（オプション - ヘッダーに追加する場合）
    // const statusElement = document.createElement('div');
    // statusElement.className = 'business-status';
    // statusElement.textContent = isOpen ? '営業中' : '営業時間外';
    // statusElement.style.color = isOpen ? 'var(--success-color)' : 'var(--error-color)';
    
    return isOpen;
};

// ページ読み込み時に営業状況をチェック
checkBusinessHours();

// ========================================
// パフォーマンス最適化: 遅延読み込み
// ========================================

// Intersection Observerを使用した画像の遅延読み込み（将来の画像追加用）
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // data-src属性を持つ画像を監視
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// コンソールメッセージ
// ========================================

console.log('%cあやこ接骨院 Webサイト', 'color: #2C5F9F; font-size: 20px; font-weight: bold;');
console.log('%c開発者の方へ: このサイトは教育目的で作成されています。', 'color: #666; font-size: 12px;');

// ========================================
// ユーティリティ関数
// ========================================

// デバウンス関数（スクロールイベントの最適化）
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// スロットル関数
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 最適化されたスクロールイベント
const optimizedScroll = throttle(() => {
    animateOnScroll();
}, 100);

window.addEventListener('scroll', optimizedScroll);
