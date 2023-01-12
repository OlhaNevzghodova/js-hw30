export class Shop {
    categoriesContainer = document.querySelector('.categories');
    goodsContainer = document.querySelector('.list');
    infoContainer = document.querySelector('.info__container');
    container = document.querySelector('.container');

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
            <p class="list__item__price">${price}</p>`
            this.goodsContainer.append(listItem);
        });
    };

    renderInfo({title, id, price, description, img}) {
        this.clearInfo();
        const info = document.createElement('div');
        info.innerHTML = `
        <img src="${img}" alt="" class="info__container__image">
        <div class="info__container__item">
            <p class="info__container__title">${title}</p>
            <p class="info__container__description">${description}</p>
            <p class="info__container__price">${price}</p>
            <button class="info__container__button">
                В кошик
            </button>`
        this.infoContainer.append(info);
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
}