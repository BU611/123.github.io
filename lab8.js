// 图书对象构造函数
function Book(title, author, price, rating, category, description, image) {
    this.title = title;
    this.author = author;
    this.price = price;
    this.rating = rating;
    this.category = category;
    this.description = description;
    this.image = image;
    this.id = Date.now() + Math.random().toString(36).substr(2, 9);
}

// 用户对象字面量
const UserManager = {
    currentUser: null,
    users: [],
    cart: [],
    
    // 添加用户
    addUser: function(user) {
        this.users.push(user);
        console.log('用户添加成功:', user);
    },
    
    // 登录
    login: function(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            this.currentUser = user;
            this.cart = user.cart || [];
            return true;
        }
        return false;
    },
    
    // 登出
    logout: function() {
        this.currentUser = null;
        this.cart = [];
    },
    
    // 添加到购物车
    addToCart: function(book) {
        if (this.currentUser) {
            const cartItem = {
                book: book,
                quantity: 1,
                addedAt: new Date()
            };
            this.cart.push(cartItem);
            this.currentUser.cart = this.cart;
            return true;
        }
        return false;
    },
    
    // 从购物车移除
    removeFromCart: function(bookId) {
        if (this.currentUser) {
            const index = this.cart.findIndex(item => item.book.id === bookId);
            if (index > -1) {
                this.cart.splice(index, 1);
                this.currentUser.cart = this.cart;
                return true;
            }
        }
        return false;
    },
    
    // 获取购物车总数
    getCartCount: function() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }
};

// 图书数据（使用构造函数创建）
const books = [
    new Book(
        "文学经典合集", 
        "多位作家", 
        68.00, 
        4.8, 
        "literature", 
        "经典文学作品集，收录多部传世名作。页数：320页", 
        "https://via.placeholder.com/300x200?text=文学经典"
    ),
    new Book(
        "科技前沿解读", 
        "科技出版社", 
        88.00, 
        4.7, 
        "technology", 
        "前沿科技解读，了解最新技术发展趋势。页数：256页", 
        "https://via.placeholder.com/300x200?text=科技前沿"
    ),
    new Book(
        "企业管理实战", 
        "经济出版社", 
        128.00, 
        4.9, 
        "business", 
        "企业管理实战指南，提升管理能力。页数：400页", 
        "https://via.placeholder.com/300x200?text=企业管理"
    ),
    new Book(
        "科幻未来世界", 
        "刘慈欣", 
        56.00, 
        4.9, 
        "literature", 
        "科幻文学经典，探索未来世界奥秘。页数：380页", 
        "https://via.placeholder.com/300x200?text=科幻未来"
    ),
    new Book(
        "人工智能入门", 
        "李开复", 
        78.00, 
        4.6, 
        "technology", 
        "人工智能基础知识普及，适合初学者。页数：280页", 
        "https://via.placeholder.com/300x200?text=人工智能"
    ),
    new Book(
        "投资理财指南", 
        "巴菲特", 
        98.00, 
        4.8, 
        "business", 
        "投资理财实用指南，财富增值秘籍。页数：350页", 
        "https://via.placeholder.com/300x200?text=投资理财"
    )
];

// 模拟用户数据
const sampleUsers = [
    {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        password: "Test123!",
        cart: []
    }
];

sampleUsers.forEach(user => UserManager.addUser(user));

// DOM 工具函数
const DOM = {
    // 多种获取元素方法
    getById: function(id) {
        return document.getElementById(id);
    },
    
    getByClass: function(className) {
        return document.getElementsByClassName(className);
    },
    
    getByTag: function(tagName) {
        return document.getElementsByTagName(tagName);
    },
    
    query: function(selector) {
        return document.querySelector(selector);
    },
    
    queryAll: function(selector) {
        return document.querySelectorAll(selector);
    },
    
    // 创建元素
    create: function(tag, className, innerHTML) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (innerHTML) element.innerHTML = innerHTML;
        return element;
    },
    
    // 移除元素
    remove: function(element) {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    },
    
    // 添加样式
    addStyle: function(element, styles) {
        for (const [property, value] of Object.entries(styles)) {
            element.style[property] = value;
        }
    }
};

// 表单验证工具
const FormValidator = {
    // 邮箱验证
    validateEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // 手机号验证
    validatePhone: function(phone) {
        const phoneRegex = /^1[3-9]\d{9}$/;
        return phoneRegex.test(phone);
    },
    
    // 用户名验证（邮箱或手机号）
    validateUsername: function(username) {
        return this.validateEmail(username) || this.validatePhone(username);
    },
    
    // 密码强度验证
    checkPasswordStrength: function(password) {
        if (password.length < 6) return "weak";
        
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        let score = 0;
        if (hasLower) score++;
        if (hasUpper) score++;
        if (hasNumber) score++;
        if (hasSpecial) score++;
        
        if (score >= 4) return "strong";
        if (score >= 2) return "medium";
        return "weak";
    },
    
    // 显示密码强度提示
    showPasswordStrength: function(password, elementId) {
        const strength = this.checkPasswordStrength(password);
        const strengthElement = DOM.getById(elementId);
        
        if (strengthElement) {
            let message = "";
            let color = "";
            
            switch(strength) {
                case "weak":
                    message = "密码强度：弱";
                    color = "#ff6b6b";
                    break;
                case "medium":
                    message = "密码强度：中";
                    color = "#ffa726";
                    break;
                case "strong":
                    message = "密码强度：强";
                    color = "#66bb6a";
                    break;
            }
            
            strengthElement.textContent = message;
            strengthElement.style.color = color;
            DOM.addStyle(strengthElement, {
                fontWeight: "bold",
                fontSize: "12px",
                marginTop: "5px"
            });
        }
    }
};

// 图书搜索功能
const BookSearch = {
    searchInput: null,
    resultsContainer: null,
    
    // 初始化搜索
    init: function() {
        this.searchInput = DOM.query('#bookSearch');
        this.resultsContainer = DOM.create('div', 'search-results');
        
        if (this.searchInput && this.searchInput.parentNode) {
            this.searchInput.parentNode.appendChild(this.resultsContainer);
            
            // 输入事件监听
            this.searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });
            
            // 聚焦显示结果
            this.searchInput.addEventListener('focus', (e) => {
                if (e.target.value.trim()) {
                    this.performSearch(e.target.value);
                }
            });
            
            // 点击外部关闭
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-box')) {
                    this.hideResults();
                }
            });
        }
    },
    
    // 执行搜索
    performSearch: function(query) {
        if (!query.trim()) {
            this.hideResults();
            return;
        }
        
        const results = this.searchBooks(query);
        this.displayResults(results);
    },
    
    // 搜索图书
    searchBooks: function(query) {
        query = query.toLowerCase();
        return books.filter(book => {
            return book.title.toLowerCase().includes(query) ||
                   book.author.toLowerCase().includes(query) ||
                   book.category.toLowerCase().includes(query) ||
                   book.description.toLowerCase().includes(query);
        });
    },
    
    // 显示搜索结果
    displayResults: function(results) {
        this.resultsContainer.innerHTML = '';
        
        if (results.length === 0) {
            const noResults = DOM.create('div', 'no-results', '没有找到相关图书');
            DOM.addStyle(noResults, {
                padding: '15px',
                color: '#ccc',
                textAlign: 'center'
            });
            this.resultsContainer.appendChild(noResults);
        } else {
            results.forEach(book => {
                const resultItem = this.createResultItem(book);
                this.resultsContainer.appendChild(resultItem);
            });
        }
        
        DOM.addStyle(this.resultsContainer, { display: 'block' });
    },
    
    // 创建结果项
    createResultItem: function(book) {
        const item = DOM.create('div', 'search-result-item');
        
        // 鼠标悬停效果
        item.addEventListener('mouseenter', () => {
            DOM.addStyle(item, {
                background: '#444',
                transform: 'translateX(5px) translateZ(10px)'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            DOM.addStyle(item, {
                background: 'transparent',
                transform: 'translateX(0) translateZ(0)'
            });
        });
        
        // 点击事件
        item.addEventListener('click', () => {
            this.selectBook(book);
        });
        
        // 图书信息
        const bookInfo = DOM.create('div', 'book-info');
        bookInfo.innerHTML = `
            <div style="font-weight: bold; color: #fff; margin-bottom: 5px;">${book.title}</div>
            <div style="font-size: 12px; color: #aaa;">
                <span>作者：${book.author}</span>
                <span style="margin-left: 15px;">分类：${this.getCategoryName(book.category)}</span>
                <span style="margin-left: 15px;">价格：¥${book.price.toFixed(2)}</span>
            </div>
        `;
        
        item.appendChild(bookInfo);
        return item;
    },
    
    // 获取分类名称
    getCategoryName: function(category) {
        const categories = {
            'literature': '文学小说',
            'technology': '科技科普',
            'business': '经济管理',
            'social': '人文社科',
            'art': '艺术设计'
        };
        return categories[category] || category;
    },
    
    // 选择图书
    selectBook: function(book) {
        this.searchInput.value = book.title;
        this.hideResults();
        
        // 显示图书详情
        this.showBookDetails(book);
    },
    
    // 显示图书详情
    showBookDetails: function(book) {
        // 创建详情模态框
        const modal = DOM.create('div', 'book-details-modal');
        
        const modalContent = DOM.create('div', 'modal-content');
        
        modalContent.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
                <h2 style="color: #667eea; margin: 0;">${book.title}</h2>
                <button id="closeModalBtn" style="background: none; border: none; color: #ccc; font-size: 24px; cursor: pointer;">×</button>
            </div>
            <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                <div style="flex: 1;">
                    <img src="${book.image}" alt="${book.title}" style="width: 100%; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">
                </div>
                <div style="flex: 2;">
                    <p style="color: #fff; margin-bottom: 10px;"><strong>作者：</strong>${book.author}</p>
                    <p style="color: #fff; margin-bottom: 10px;"><strong>价格：</strong>¥${book.price.toFixed(2)}</p>
                    <p style="color: #fff; margin-bottom: 10px;"><strong>评分：</strong>${book.rating} ⭐</p>
                    <p style="color: #fff; margin-bottom: 10px;"><strong>分类：</strong>${this.getCategoryName(book.category)}</p>
                </div>
            </div>
            <div style="margin-bottom: 20px;">
                <h3 style="color: #fff; margin-bottom: 10px;">图书简介</h3>
                <p style="color: #ccc; line-height: 1.6;">${book.description}</p>
            </div>
            <div style="display: flex; gap: 10px;">
                <button id="addToCartBtn" style="flex: 1; padding: 12px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">加入购物车</button>
                <button id="closeBtn" style="flex: 1; padding: 12px; background: #444; color: white; border: none; border-radius: 6px; cursor: pointer;">关闭</button>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // 事件监听
        const closeModalBtn = DOM.query('#closeModalBtn');
        const closeBtn = DOM.query('#closeBtn');
        const addToCartBtn = DOM.query('#addToCartBtn');
        
        const closeModal = () => DOM.remove(modal);
        
        closeModalBtn.addEventListener('click', closeModal);
        closeBtn.addEventListener('click', closeModal);
        
        addToCartBtn.addEventListener('click', () => {
            if (UserManager.currentUser) {
                const added = UserManager.addToCart(book);
                if (added) {
                    alert('已添加到购物车！');
                    updateCartCount();
                    closeModal();
                } else {
                    alert('添加失败！');
                }
            } else {
                alert('请先登录！');
                closeModal();
                DOM.getById('loginBtn').click();
            }
        });
        
        // 点击外部关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    },
    
    // 隐藏搜索结果
    hideResults: function() {
        DOM.addStyle(this.resultsContainer, { display: 'none' });
    }
};

// 购物车功能
const CartManager = {
    // 更新购物车数量显示
    updateCartCount: function() {
        const cartCountElement = DOM.query('.cart-count');
        if (cartCountElement) {
            const count = UserManager.getCartCount();
            cartCountElement.textContent = count > 0 ? count.toString() : "!";
            
            // 添加动画效果
            if (count > 0) {
                DOM.addStyle(cartCountElement, {
                    animation: 'none'
                });
                setTimeout(() => {
                    DOM.addStyle(cartCountElement, {
                        animation: 'pulse 0.5s ease'
                    });
                }, 10);
            }
        }
    },
    
    // 显示购物车详情
    showCartDetails: function() {
        if (!UserManager.currentUser) {
            alert('请先登录！');
            DOM.getById('loginBtn').click();
            return;
        }
        
        const modal = DOM.create('div', 'cart-modal');
        
        const modalContent = DOM.create('div', 'cart-modal-content');
        
        let cartHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="color: #667eea; margin: 0;">我的购物车</h2>
                <button id="closeCartBtn" style="background: none; border: none; color: #ccc; font-size: 24px; cursor: pointer;">×</button>
            </div>
        `;
        
        if (UserManager.cart.length === 0) {
            cartHTML += `
                <div style="text-align: center; padding: 40px; color: #ccc;">
                    <p style="font-size: 18px; margin-bottom: 20px;">购物车空空如也</p>
                    <button id="continueShopping" style="padding: 10px 20px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 6px; cursor: pointer;">继续购物</button>
                </div>
            `;
        } else {
            cartHTML += `
                <div style="margin-bottom: 20px;">
                    ${UserManager.cart.map((item, index) => `
                        <div class="cart-item" data-index="${index}">
                            <div style="flex: 2;">
                                <h4 style="color: #fff; margin-bottom: 5px;">${item.book.title}</h4>
                                <p style="color: #aaa; font-size: 12px; margin-bottom: 5px;">${item.book.author}</p>
                                <p style="color: #ff6b6b; font-weight: bold;">¥${item.book.price.toFixed(2)}</p>
                            </div>
                            <div style="flex: 1; display: flex; align-items: center; gap: 10px;">
                                <button class="decrease-qty" style="width: 30px; height: 30px; border-radius: 50%; background: #444; color: white; border: none; cursor: pointer;">-</button>
                                <span style="color: #fff;">${item.quantity}</span>
                                <button class="increase-qty" style="width: 30px; height: 30px; border-radius: 50%; background: #444; color: white; border: none; cursor: pointer;">+</button>
                            </div>
                            <div style="flex: 1; text-align: right;">
                                <button class="remove-item" style="padding: 5px 10px; background: #ff6b6b; color: white; border: none; border-radius: 4px; cursor: pointer;">删除</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div style="text-align: right; margin-bottom: 20px;">
                    <p style="color: #fff; font-size: 18px;">
                        总计：¥${this.calculateTotal().toFixed(2)}
                    </p>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button id="checkoutBtn" style="flex: 1; padding: 12px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">结算</button>
                    <button id="closeCart" style="flex: 1; padding: 12px; background: #444; color: white; border: none; border-radius: 6px; cursor: pointer;">关闭</button>
                </div>
            `;
        }
        
        modalContent.innerHTML = cartHTML;
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // 事件监听
        const closeCartBtn = DOM.query('#closeCartBtn');
        const closeCart = DOM.query('#closeCart');
        const continueShopping = DOM.query('#continueShopping');
        
        const closeModal = () => DOM.remove(modal);
        
        if (closeCartBtn) closeCartBtn.addEventListener('click', closeModal);
        if (closeCart) closeCart.addEventListener('click', closeModal);
        if (continueShopping) continueShopping.addEventListener('click', closeModal);
        
        // 购物车项目操作
        const cartItems = DOM.queryAll('.cart-item');
        cartItems.forEach((item, index) => {
            const decreaseBtn = item.querySelector('.decrease-qty');
            const increaseBtn = item.querySelector('.increase-qty');
            const removeBtn = item.querySelector('.remove-item');
            
            decreaseBtn.addEventListener('click', () => {
                if (UserManager.cart[index].quantity > 1) {
                    UserManager.cart[index].quantity--;
                    this.showCartDetails();
                    this.updateCartCount();
                }
            });
            
            increaseBtn.addEventListener('click', () => {
                UserManager.cart[index].quantity++;
                this.showCartDetails();
                this.updateCartCount();
            });
            
            removeBtn.addEventListener('click', () => {
                UserManager.cart.splice(index, 1);
                this.showCartDetails();
                this.updateCartCount();
            });
        });
        
        // 结算按钮
        const checkoutBtn = DOM.query('#checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                alert(`结算成功！总金额：¥${this.calculateTotal().toFixed(2)}`);
                UserManager.cart = [];
                this.updateCartCount();
                closeModal();
            });
        }
        
        // 点击外部关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    },
    
    // 计算总价
    calculateTotal: function() {
        return UserManager.cart.reduce((total, item) => {
            return total + (item.book.price * item.quantity);
        }, 0);
    }
};

// 初始化函数
function init() {
    // 初始化搜索功能
    BookSearch.init();
    
    // 更新购物车数量
    CartManager.updateCartCount();
    
    // 购物车图标点击事件
    const cartIcon = DOM.query('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            CartManager.showCartDetails();
        });
    }
    
    // 侧边栏购物车菜单点击
    const cartMenuItem = DOM.query('.cart-menu-item');
    if (cartMenuItem) {
        cartMenuItem.addEventListener('click', (e) => {
            e.preventDefault();
            CartManager.showCartDetails();
        });
    }
    
    // 登录表单验证增强
    enhanceLoginForm();
    
    // 注册表单验证
    enhanceRegisterForm();
    
    // 订阅表单验证
    enhanceSubscriptionForm();
    
    // 添加图书到购物车按钮
    addProductCardListeners();
}

// 增强登录表单
function enhanceLoginForm() {
    const loginForm = DOM.getById('loginForm');
    const loginEmail = DOM.getById('loginEmail');
    const loginPassword = DOM.getById('loginPassword');
    
    if (loginEmail) {
        loginEmail.addEventListener('input', function() {
            const isValid = FormValidator.validateUsername(this.value);
            DOM.addStyle(this, {
                borderColor: isValid ? '#66bb6a' : '#ff6b6b'
            });
        });
    }
    
    if (loginPassword) {
        loginPassword.addEventListener('input', function() {
            FormValidator.showPasswordStrength(this.value, 'passwordStrength');
            const strengthDiv = DOM.getById('passwordStrength');
            if (strengthDiv && this.value) {
                strengthDiv.style.display = 'block';
            }
        });
        
        loginPassword.addEventListener('focus', function() {
            const strengthDiv = DOM.getById('passwordStrength');
            if (strengthDiv && this.value) {
                strengthDiv.style.display = 'block';
            }
        });
        
        loginPassword.addEventListener('blur', function() {
            if (!this.value) {
                const strengthDiv = DOM.getById('passwordStrength');
                if (strengthDiv) {
                    strengthDiv.style.display = 'none';
                }
            }
        });
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = loginEmail.value;
            const password = loginPassword.value;
            
            // 表单验证
            if (!email || !password) {
                alert('请填写完整的登录信息！');
                return;
            }
            
            if (!FormValidator.validateUsername(email)) {
                alert('请输入有效的邮箱或手机号！');
                return;
            }
            
            // 模拟登录
            const loginSuccess = UserManager.login(email, password);
            
            if (loginSuccess) {
                alert('登录成功！');
                DOM.getById('loginModal').style.display = 'none';
                
                // 更新界面
                updateUserInterface();
                CartManager.updateCartCount();
            } else {
                alert('登录失败！请检查用户名和密码。');
            }
        });
    }
}

// 增强注册表单
function enhanceRegisterForm() {
    const registerForm = DOM.getById('registerForm');
    const regUsername = DOM.getById('regUsername');
    const regEmail = DOM.getById('regEmail');
    const regPassword = DOM.getById('regPassword');
    const regConfirmPassword = DOM.getById('regConfirmPassword');
    
    // 用户名验证
    if (regUsername) {
        regUsername.addEventListener('input', function() {
            const isValid = this.value.length >= 3;
            DOM.addStyle(this, {
                borderColor: isValid ? '#66bb6a' : '#ff6b6b'
            });
        });
    }
    
    // 邮箱验证
    if (regEmail) {
        regEmail.addEventListener('input', function() {
            const isValid = FormValidator.validateEmail(this.value);
            DOM.addStyle(this, {
                borderColor: isValid ? '#66bb6a' : '#ff6b6b'
            });
        });
    }
    
    // 密码验证
    if (regPassword) {
        regPassword.addEventListener('input', function() {
            FormValidator.showPasswordStrength(this.value, 'regPasswordStrength');
            const strengthDiv = DOM.getById('regPasswordStrength');
            if (strengthDiv && this.value) {
                strengthDiv.style.display = 'block';
            }
            
            // 验证密码匹配
            if (regConfirmPassword && regConfirmPassword.value) {
                const passwordsMatch = this.value === regConfirmPassword.value;
                DOM.addStyle(regConfirmPassword, {
                    borderColor: passwordsMatch ? '#66bb6a' : '#ff6b6b'
                });
            }
        });
        
        regPassword.addEventListener('focus', function() {
            const strengthDiv = DOM.getById('regPasswordStrength');
            if (strengthDiv && this.value) {
                strengthDiv.style.display = 'block';
            }
        });
    }
    
    // 确认密码验证
    if (regConfirmPassword) {
        regConfirmPassword.addEventListener('input', function() {
            const passwordsMatch = this.value === regPassword.value;
            DOM.addStyle(this, {
                borderColor: passwordsMatch ? '#66bb6a' : '#ff6b6b'
            });
        });
    }
    
    // 注册表单提交
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 验证所有字段
            if (!regUsername.value || !regEmail.value || !regPassword.value || !regConfirmPassword.value) {
                alert('请填写完整的注册信息！');
                return;
            }
            
            if (!FormValidator.validateEmail(regEmail.value)) {
                alert('请输入有效的邮箱地址！');
                return;
            }
            
            if (regPassword.value !== regConfirmPassword.value) {
                alert('两次输入的密码不一致！');
                return;
            }
            
            const passwordStrength = FormValidator.checkPasswordStrength(regPassword.value);
            if (passwordStrength === 'weak') {
                if (!confirm('密码强度较弱，建议使用更复杂的密码。是否继续？')) {
                    return;
                }
            }
            
            // 创建新用户
            const newUser = {
                id: Date.now(),
                username: regUsername.value,
                email: regEmail.value,
                password: regPassword.value,
                cart: []
            };
            
            UserManager.addUser(newUser);
            UserManager.login(regEmail.value, regPassword.value);
            
            alert('注册成功！已自动登录。');
            DOM.getById('registerModal').style.display = 'none';
            
            // 更新界面
            updateUserInterface();
            CartManager.updateCartCount();
        });
    }
}

// 增强订阅表单
function enhanceSubscriptionForm() {
    const subscriptionForm = DOM.getById('subscriptionForm');
    
    if (subscriptionForm) {
        // 用户名验证
        const usernameInput = subscriptionForm.querySelector('#username');
        if (usernameInput) {
            usernameInput.addEventListener('input', function() {
                const isValid = this.value.length >= 2;
                DOM.addStyle(this, {
                    borderColor: isValid ? '#66bb6a' : '#ff6b6b'
                });
            });
        }
        
        // 邮箱验证
        const emailInput = subscriptionForm.querySelector('#email');
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                const isValid = FormValidator.validateEmail(this.value);
                DOM.addStyle(this, {
                    borderColor: isValid ? '#66bb6a' : '#ff6b6b'
                });
            });
        }
        
        // 密码强度
        const passwordInput = subscriptionForm.querySelector('#password');
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                FormValidator.showPasswordStrength(this.value, 'subPasswordStrength');
                const strengthDiv = DOM.getById('subPasswordStrength');
                if (strengthDiv && this.value) {
                    strengthDiv.style.display = 'block';
                }
            });
        }
        
        // 表单提交
        subscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = usernameInput ? usernameInput.value : '';
            const email = emailInput ? emailInput.value : '';
            const password = passwordInput ? passwordInput.value : '';
            
            if (!username || !email || !password) {
                alert('请填写用户名、邮箱和密码！');
                return;
            }
            
            if (!FormValidator.validateEmail(email)) {
                alert('请输入有效的邮箱地址！');
                return;
            }
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            console.log('订阅信息:', data);
            alert('订阅成功！感谢您的订阅，我们将为您推荐优质的图书。');
            this.reset();
            
            // 隐藏密码强度提示
            const strengthDiv = DOM.getById('subPasswordStrength');
            if (strengthDiv) {
                strengthDiv.style.display = 'none';
            }
        });
    }
}

// 添加产品卡片事件监听
function addProductCardListeners() {
    const productCards = DOM.queryAll('.product-card');
    
    productCards.forEach((card, index) => {
        if (index < books.length) {
            const book = books[index];
            
            // 添加点击事件
            card.addEventListener('click', (e) => {
                // 如果不是按钮点击，则显示详情
                if (!e.target.closest('button')) {
                    BookSearch.showBookDetails(book);
                }
            });
            
            // 添加添加到购物车按钮
            const addToCartBtn = DOM.create('button', 'add-to-cart-btn', '加入购物车');
            
            card.querySelector('.product-info').appendChild(addToCartBtn);
            
            // 按钮点击事件
            addToCartBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                
                if (UserManager.currentUser) {
                    const added = UserManager.addToCart(book);
                    if (added) {
                        alert('已添加到购物车！');
                        CartManager.updateCartCount();
                        
                        // 按钮反馈动画
                        addToCartBtn.style.background = '#66bb6a';
                        addToCartBtn.textContent = '已添加';
                        
                        setTimeout(() => {
                            addToCartBtn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                            addToCartBtn.textContent = '加入购物车';
                        }, 1000);
                    }
                } else {
                    alert('请先登录！');
                    DOM.getById('loginBtn').click();
                }
            });
        }
    });
}

// 更新用户界面
function updateUserInterface() {
    const loginBtn = DOM.getById('loginBtn');
    if (loginBtn && UserManager.currentUser) {
        loginBtn.textContent = UserManager.currentUser.username;
        loginBtn.style.background = '#66bb6a';
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 原有轮播图功能
    const carouselSlides = DOM.query('.carousel-slides');
    const slides = DOM.queryAll('.carousel-slide');
    const indicators = DOM.queryAll('.indicator');
    const prevBtn = DOM.query('.carousel-control.prev');
    const nextBtn = DOM.query('.carousel-control.next');
    let currentSlide = 0;
    let autoPlayInterval;
    let isAnimating = false;
    
    function goToSlide(slideIndex) {
        if (isAnimating) return;
        
        isAnimating = true;
        
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            indicators[index].classList.remove('active');
        });
        
        currentSlide = slideIndex;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
        
        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }

    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 3000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (isAnimating) return;
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (isAnimating) return;
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }

    if (indicators.length > 0) {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                if (isAnimating || currentSlide === index) return;
                goToSlide(index);
                stopAutoPlay();
                startAutoPlay();
            });
        });
    }

    const carouselContainer = DOM.query('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }

    startAutoPlay();
    
    // 原有模态框功能
    const loginBtn = DOM.getById('loginBtn');
    const loginModal = DOM.getById('loginModal');
    const registerModal = DOM.getById('registerModal');
    const closeModal = DOM.getById('closeModal');
    const closeRegisterModal = DOM.getById('closeRegisterModal');
    const showRegister = DOM.getById('showRegister');
    const showLogin = DOM.getById('showLogin');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            if (loginModal) loginModal.style.display = 'block';
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            if (loginModal) loginModal.style.display = 'none';
        });
    }
    
    if (closeRegisterModal) {
        closeRegisterModal.addEventListener('click', function() {
            if (registerModal) registerModal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });
    
    if (showRegister) {
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            if (loginModal) loginModal.style.display = 'none';
            if (registerModal) registerModal.style.display = 'block';
        });
    }

    if (showLogin) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            if (registerModal) registerModal.style.display = 'none';
            if (loginModal) loginModal.style.display = 'block';
        });
    }

    // 初始化新功能
    init();
});

// 全局函数，供HTML内联使用
function updateCartCount() {
    CartManager.updateCartCount();
}