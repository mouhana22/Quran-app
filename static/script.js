/**
 * Modern Quran App JavaScript
 * Enhanced with smooth animations and better UX
 */

let counter = 1;

/**
 * Add a new student with enhanced animations
 */
function addStudent() {
    counter++; 
    
    // Create new student card with modern structure
    const div = document.createElement("div");
    div.setAttribute("class", "student-card");
    div.setAttribute("id", `student${counter}`);
    
    // Add entry animation
    div.style.opacity = "0";
    div.style.transform = "translateY(50px)";
    
    const html = generateStudentHTML(counter);
    div.innerHTML = html;
    
    // Add to DOM
    document.getElementById('form').appendChild(div);
    
    // Animate in
    setTimeout(() => {
        div.style.transition = "all 0.6s ease";
        div.style.opacity = "1";
        div.style.transform = "translateY(0)";
    }, 100);
    
    // Scroll to new student smoothly
    setTimeout(() => {
        div.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }, 700);
    
    // Show success notification
    showNotification('تم إضافة طالب جديد بنجاح', 'success');
}

/**
 * Generate HTML for student form
 */
function generateStudentHTML(studentNumber) {
    return `
        <div class="card">
            <div class="card-header">
                <h3 class="student-title">
                    <i class="fas fa-user-graduate me-2"></i>
                    الطالب رقم ${studentNumber}
                </h3>
            </div>
            <div class="card-body">
                <!-- Basic Info -->
                                  <div class="section-divider">
                    <h4 class="section-title">
                      <i class="fas fa-circle-user me-2"></i>
                      البيانات الأساسية
                    </h4>
                  </div>
                <div class="row mb-4">
                    <div class="col-12 col-md-12">
                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control"
                                id="studentName${studentNumber}"
                                name="studentName${studentNumber}"
                                placeholder="مثال: مهنا بن عاصم "
                                required
                            />
                            <label for="studentName${studentNumber}">
                                اسم الطالب
                            </label>
                        </div>
                    </div>
                </div>
                
                <!-- Memorization Section -->
                <div class="section-divider">
                    <h4 class="section-title">
                        <i class="fas fa-brain me-2"></i>
                        إعدادات الحفظ
                    </h4>
                </div>
                
                <div class="row mb-4">
                    <div class="col-12 col-md-6">
                        <div class="form-floating mb-3">
                            <select class="form-select" id="souraOfSaving${studentNumber}" name="souraOfSaving${studentNumber}" required>
                                ${generateSurahOptions()}
                            </select>
                            <label for="souraOfSaving${studentNumber}">
                                بداية الحفظ من
                            </label>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="form-floating mb-3">
                            <input
                                type="number"
                                class="form-control"
                                id="amountOfSaving${studentNumber}"
                                name="amountOfSaving${studentNumber}"
                                placeholder="7"
                                required
                            />
                            <label for="amountOfSaving${studentNumber}">
                                عدد الأسطر لكل واجب
                            </label>
                        </div>
                    </div>
                    <div class="col-12 col-md-12">
                        <div class="form-floating mb-3">
                            <input
                                type="number"
                                class="form-control"
                                id="repeatCountOfSaving${studentNumber}"
                                name="repeatCountOfSaving${studentNumber}"
                                placeholder="3"
                                min="0"
                                required
                            />
                            <label for="repeatCountOfSaving${studentNumber}">
                                تكرار السورة بعد الحفظ
                            </label>
                        </div>
                    </div>
                </div>
                
                <!-- Revision Section -->
                <div class="section-divider">
                    <h4 class="section-title">
                        <i class="fas fa-redo me-2"></i>
                        إعدادات المراجعة
                    </h4>
                </div>
                
                <div class="row mb-4">
                    <div class="col-12 col-md-6">
                        <div class="form-floating mb-3">
                            <select class="form-select" id="souraOfRevision${studentNumber}" name="souraOfRevision${studentNumber}" required>
                                ${generateSurahOptions(true)}
                            </select>
                            <label for="souraOfRevision${studentNumber}">
                                بداية المراجعة من
                            </label>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="form-floating mb-3">
                            <input
                                type="number"
                                class="form-control"
                                id="amountOfRevision${studentNumber}"
                                name="amountOfRevision${studentNumber}"
                                placeholder="14"
                                required
                            />
                            <label for="amountOfRevision${studentNumber}">
                                مقدار المراجعة لكل واجب
                            </label>
                        </div>
                    </div>
                </div>
                
                <div class="row mb-4">
                    <div class="col-12">
                        <h5 class="option-subtitle">نوع المراجعة</h5>
                        <div class="option-group">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="typeOfRevision${studentNumber}" id="revisionType${studentNumber}_0" value="0" checked>
                                <label class="form-check-label" for="revisionType${studentNumber}_0">
                                    <i class="fas fa-list-ol"></i>بعدد الأسطر
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="typeOfRevision${studentNumber}" id="revisionType${studentNumber}_1" value="1">
                                <label class="form-check-label" for="revisionType${studentNumber}_1">
                                    <i class="fas fa-book"></i>بعدد السور
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Options Section -->
                <div class="section-divider">
                    <h4 class="section-title">
                        <i class="fas fa-cogs me-2"></i>
                        خيارات إضافية
                    </h4>
                </div>
                
                <div class="row mb-4">
                    <div class="col-12 col-md-6">
                        <h5 class="option-subtitle">اتجاه الحفظ</h5>
                        <div class="option-group">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="typeOfSaving${studentNumber}" id="savingType${studentNumber}_0" value="0" checked>
                                <label class="form-check-label" for="savingType${studentNumber}_0">
                                    <i class="fas fa-arrow-up"></i>من سورة الناس
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="typeOfSaving${studentNumber}" id="savingType${studentNumber}_1" value="1">
                                <label class="form-check-label" for="savingType${studentNumber}_1">
                                    <i class="fas fa-arrow-down"></i>من سورة البقرة
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <h5 class="option-subtitle">اتجاه المراجعة</h5>
                        <div class="option-group">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="startOfRevision${studentNumber}" id="revisionStart${studentNumber}_0" value="0" checked>
                                <label class="form-check-label" for="revisionStart${studentNumber}_0">
                                    <i class="fas fa-arrow-down"></i>من سورة البقرة
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="startOfRevision${studentNumber}" id="revisionStart${studentNumber}_1" value="1">
                                <label class="form-check-label" for="revisionStart${studentNumber}_1">
                                    <i class="fas fa-arrow-up"></i>من سورة الناس
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Generate Surah options for select elements
 */
function generateSurahOptions(isRevision = false) {
    const surahs = [
        "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس", "هود",
        "يوسف", "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه", "الأنبياء",
        "الحج", "المؤمنون", "النّور", "الفرقان", "الشعراء", "النّمل", "القصص", "العنكبوت", "الرّوم", "لقمان",
        "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر", "فصّلت",
        "الشورى", "الزخرف", "الدّخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق", "الذاريات",
        "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة", "الصف",
        "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج", "نوح",
        "الجن", "المزّمّل", "المدّثر", "القيامة", "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس", "التكوير",
        "الإنفطار", "المطفّفين", "الإنشقاق", "البروج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد", "الشمس",
        "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة", "العاديات", "القارعة",
        "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر", "المسد",
        "الإخلاص", "الفلق", "النّاس"
    ];
    
    let options = '<option value="" selected disabled hidden>اختر السورة</option>';
    
    if (!isRevision) {
        options += '<option value="0">ايقاف الحفظ</option>';
    }
    
    surahs.forEach((surah, index) => {
        options += `<option value="${index + 1}">سورة ${surah}</option>`;
    });
    
    return options;
}

/**
 * Remove student with enhanced animations
 */
function removeStudent() {
    if (counter > 1) {
        const studentElement = document.getElementById(`student${counter}`);
        
        // Add exit animation
        studentElement.style.transition = "all 0.5s ease";
        studentElement.style.opacity = "0";
        studentElement.style.transform = "translateY(-50px) scale(0.8)";
        
        // Remove after animation
        setTimeout(() => {
            studentElement.remove();
        counter--;
            showNotification('تم حذف الطالب بنجاح', 'info');
        }, 500);
    } else {
        showNotification('لا يمكن حذف آخر طالب', 'warning');
    }
}

/**
 * Show notification with different types
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)} me-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1050;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        color: white;
        font-family: var(--font-arabic);
        font-weight: 500;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        background: ${getNotificationColor(type)};
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

/**
 * Get notification icon based on type
 */
function getNotificationIcon(type) {
    const icons = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

/**
 * Get notification color based on type
 */
function getNotificationColor(type) {
    const colors = {
        'success': 'linear-gradient(135deg, #28A745 0%, #20853C 100%)',
        'error': 'linear-gradient(135deg, #DC3545 0%, #C42E3E 100%)',
        'warning': 'linear-gradient(135deg, #FFC107 0%, #E0A500 100%)',
        'info': 'linear-gradient(135deg, #6C757D 0%, #5A6268 100%)'
    };
    return colors[type] || colors.info;
}

/**
 * Enhanced form validation
 */
function validateForm() {
    const form = document.getElementById('main-form');
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('is-invalid');
            
            // Add shake animation
            input.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                input.style.animation = '';
            }, 500);
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    });
    
    if (!isValid) {
        showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
    }
    
    return isValid;
}

/**
 * Loading state management
 */
function showLoading() {
    const submitBtn = document.getElementById('btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = `
        <i class="fas fa-spinner fa-spin me-2"></i>
        جاري إنشاء الخطة...
    `;
    submitBtn.disabled = true;
    
    return () => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    };
}

/**
 * Initialize app functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation to form submission
    const form = document.getElementById('main-form');
    form.addEventListener('submit', function(e) {
        if (!validateForm()) {
            e.preventDefault();
            return;
        }
        
        // Show loading state
        const hideLoading = showLoading();
    });
    
    // Add real-time validation
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required')) {
                if (!this.value.trim()) {
                    this.classList.add('is-invalid');
                    this.classList.remove('is-valid');
                } else {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                }
            }
        });
        
        // Remove validation classes on focus
        input.addEventListener('focus', function() {
            this.classList.remove('is-invalid', 'is-valid');
        });
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to submit form
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('btn').click();
        }
        
        // Ctrl/Cmd + Plus to add student
        if ((e.ctrlKey || e.metaKey) && e.key === '+') {
            e.preventDefault();
            addStudent();
        }
        
        // Ctrl/Cmd + Minus to remove student
        if ((e.ctrlKey || e.metaKey) && e.key === '-') {
            e.preventDefault();
            removeStudent();
        }
    });
    
    // Show welcome message
    setTimeout(() => {
        showNotification('مرحباً بك في صانع الخطط القرآنية', 'success');
    }, 1000);
});

// Add shake animation for invalid inputs
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .is-invalid {
        border-color: #DC3545 !important;
    }
    
    .is-valid {
        border-color: #28A745 !important;
    }
`;
document.head.appendChild(style);
