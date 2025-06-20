document.addEventListener('DOMContentLoaded', function() {
    // 格式化价格显示
    const formatPrice = () => {
        const priceElement = document.getElementById('domain-price');
        if (priceElement) {
            const price = priceElement.innerText.replace(/,/g, '');
            priceElement.innerText = new Intl.NumberFormat('zh-CN').format(price);
        }
    };

    // 初始化价格显示
    formatPrice();

    // 表单提交处理
    const form = document.getElementById('inquiry-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(form);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // 表单验证
            if (!validateForm(formDataObj)) {
                return;
            }
            
            // 显示提交成功消息
            showSuccessMessage();
            
            // 在实际应用中，这里会发送数据到服务器
            console.log('表单数据:', formDataObj);
            
            // 清空表单
            form.reset();
        });
    }

    // 简单的表单验证
    function validateForm(data) {
        let isValid = true;
        const errorMessages = [];

        if (!data.name || data.name.trim() === '') {
            errorMessages.push('请输入您的姓名');
            isValid = false;
        }

        if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
            errorMessages.push('请输入有效的电子邮箱地址');
            isValid = false;
        }

        if (data.offer && (isNaN(data.offer) || data.offer <= 0)) {
            errorMessages.push('请输入有效的出价金额');
            isValid = false;
        }

        if (!isValid) {
            alert('请修正以下错误:\n' + errorMessages.join('\n'));
        }

        return isValid;
    }

    // 显示提交成功消息
    function showSuccessMessage() {
        const formSection = document.querySelector('.contact-form');
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = `
            <div class="success-icon"><i class="fas fa-check-circle"></i></div>
            <h3>提交成功!</h3>
            <p>感谢您的询价，我们将尽快与您联系。</p>
            <button id="new-inquiry" class="submit-btn">发送新询价</button>
        `;
        
        // 隐藏表单，显示成功消息
        form.style.display = 'none';
        formSection.appendChild(successMsg);
        
        // 点击"发送新询价"按钮时恢复表单
        document.getElementById('new-inquiry').addEventListener('click', function() {
            form.style.display = 'block';
            formSection.removeChild(successMsg);
        });
    }

    // 添加复制域名到剪贴板功能
    const domainName = document.querySelector('.domain-name');
    if (domainName) {
        domainName.addEventListener('click', function() {
            const textToCopy = this.textContent;
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    // 显示复制成功提示
                    const tooltip = document.createElement('div');
                    tooltip.className = 'copy-tooltip';
                    tooltip.textContent = '已复制到剪贴板!';
                    this.appendChild(tooltip);
                    
                    // 2秒后移除提示
                    setTimeout(() => {
                        this.removeChild(tooltip);
                    }, 2000);
                })
                .catch(err => {
                    console.error('无法复制文本: ', err);
                });
        });
    }

    // 添加域名点击动画效果
    if (domainName) {
        domainName.style.cursor = 'pointer';
        domainName.title = '点击复制域名';
    }
}); 