export class Shop {
    categoriesContainer = document.querySelector('.categories');
    goodsContainer = document.querySelector('.list');
    infoContainer = document.querySelector('.info__container');
    container = document.querySelector('.container');
    formContainer = document.querySelector('.form-container');
    deliveryInfo = document.querySelector('.delivery-info');
    selectedProduct;


    constructor(config) {
        this.config = config;
    };

    init() {
        this.render();

        this.categoriesContainer.addEventListener('click', ({target}) => {
            if (target.matches('li')) {
                const {id} = target.dataset;
                const category = this.config.categories.find((item) => item.id === +id);
                const goods = this.config.goods.filter((item) => {
                    return category.goods.includes(item.id);
                });
                this.renderGoods(goods);
            }
        });

        this.goodsContainer.addEventListener('click', ({target}) => {
            const listElem = target.closest('li');

            if (listElem || target.matches('li')) {
                const {id} = listElem.dataset;
                const good = this.config.goods.find((item) => item.id === +id);
                this.renderInfo(good);
            }
        });

        this.infoContainer.addEventListener('click', ({target}) => {
            if (target.matches('button')) {
                this.clearGoods();
                this.clearInfo();
                this.notification();
                this.showForm();
            }
        });
    };

    clearInfo() {
        this.infoContainer.innerHTML = '';
    };

    clearGoods() {
        this.goodsContainer.innerHTML = '';
    };

    render() {
        this.renderCategories();
    };

    renderCategories() {
        this.config.categories.forEach(({title, id}) => {
            const categoryItem = document.createElement('li');
            categoryItem.classList.add('categories__item')
            categoryItem.innerText = title;
            categoryItem.dataset.id = id;
            this.categoriesContainer.append(categoryItem);
        });
    };

    renderGoods(goods) {
        this.clearGoods();
        goods.forEach(({title, id, img, price}) => {
            const listItem = document.createElement('li');
            listItem.classList.add('list__item');
            listItem.dataset.id = id;
            listItem.innerHTML = `
            <div class="list__item__image">
                <img src="${img}" alt="${title}">
            </div>
            <p class="list__item__title">${title}</p>
            <p class="list__item__price">${price}₴</p>`
            this.goodsContainer.append(listItem);
        });
    };

    renderInfo({title, price, description, img, id}) {
        this.clearInfo();
        const info = document.createElement('div');
        info.innerHTML = `
        <img src="${img}" alt="" class="info__container__image">
        <div class="info__container__item">
            <p class="info__container__title">${title}</p>
            <p class="info__container__description">${description}</p>
            <p class="info__container__price">${price}₴</p>
            <button class="info__container__button">
                В кошик
            </button>`
        this.infoContainer.append(info);
        this.selectedProduct = id;
    };

    notification() {
        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerText = 'Додано у кошик!';
        this.container.append(popup);
        setTimeout(function () {
            popup.remove();
        }, 2000);
    };

    showForm() {
        this.formContainer.classList.add('form-container_styles');
        const form = document.createElement('form');
        form.innerHTML = `
        <p class="form-container__title">Заповніть, будь ласка, дані про доставку:</p>
                <label for="name" class="input__title">Прізвище, ім'я та по-батькові: (обов'язково)</label>
                <input name="name" type="text" id="name" required>
                <div></div>
                <label for="city">Місто:</label>
                <select name="city" id="city">
                    <option value="1">Київ</option>
                    <option value="2">Харків</option>
                    <option value="3">Дніпро</option>
                    <option value="4">Одеса</option>
                    <option value="5">Львів</option>
                    <option value="6">Луцьк</option>
                    <option value="7">Миколаїв</option>
                    <option value="8">Херсон</option>
                </select>
                <label for="stock" class="input__title">Номер складу нової пошти: (обов'язково)</label>
                <input name="stock" type="number" id="stock" required>
                <p class="input__title">Оберіть спосіб оплати: (обов'язково)</p>
                <label>
                    <input name="payment" type="radio" value="Післяплата" checked>
                    Післяплата
                </label>
                <label>
                    <input name="payment" type="radio" value="Післяплата">
                    Оплата карткою при замовленні
                </label>
                <div></div>
                <label for="quantity" class="input__title">Введіть кількість обраного товару: (обов'язково)</label>
                <input name="quantity" type="number" id="quantity" required>
                <div></div>
                <p class="input__title">Залиште коментар: (необов'язково)</p>
                <textarea name="comment" cols="50" rows="7"></textarea>
                <button class="form__button">Готово</button>`
        this.formContainer.append(form);
        form.onchange = (({target}) => {
            const {required, value} = target;
            const message = target.nextElementSibling;
            console.log(target)
            if (required && value === '') {
                message.classList.add('message');
                target.classList.add('invalid');
                message.innerText = "Це поле є обов'язковим";
                return;
            }
            message.innerText = '';
            target.classList.remove('invalid');
        })
        form.addEventListener('click', (event) => {
            if (event.target.matches('button')) {
                event.preventDefault();
                const good = this.config.goods.find((item) => item.id === +this.selectedProduct);
                if (form.checkValidity()) {
                    this.showDeliveryInfo(good);
                    this.formContainer.innerHTML = '';
                    this.formContainer.classList.remove('form-container_styles')
                }
            }
        });

    };

    showDeliveryInfo(info) {
        const inputQuantity = document.getElementById('quantity');
        const inputCity = document.querySelector('#city > option:checked').innerHTML;
        const inputStock = document.getElementById('stock');
        console.log(this.selectedProduct, info, inputQuantity)
        this.deliveryInfo.innerText = `Ви замовили ${info.title} на сумму ${(+info.price) * (+inputQuantity.value)}₴ буде відправлено у місто ${inputCity} на поштове відділення №${inputStock.value}
        Дякуємо за замовлення! Очікуйте дзвінок менеджера для підтвердження протягом години.`;
    }

};