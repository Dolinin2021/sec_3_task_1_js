class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    };

    setAvailable(value) {
        this.available = value;
    }
}

class GoodsList {
    #goods

    constructor(filter, sortPrice, sortDir) {
        this.#goods = [];
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    get list () {
        let arr = this.#goods.filter(good => good.available && good.name.match(this.filter));
        let result = [];
        
        if (this.sortPrice && !this.sortDir) {
            result = arr.sort((item1, item2) => item2.price-item1.price);
            return result;
        }
        else if (this.sortPrice && this.sortDir) {
            result = arr.sort((item1, item2) => item1.price-item2.price);
            return result;
        }
        else {
            return arr;
        }
    }

    add(id, name, description, sizes, price, available) {
        let item = new Good(id, name, description, sizes, price, available);
        this.#goods.push(item);
    }

    remove(id) {
        for (let i = 0; i < this.#goods.length; i++) {
            if (id === this.#goods[i]['id']) {
                this.#goods.splice(i, 1);
            }
        }
    }
}

class BasketGood extends Good {
    constructor(id, name, description, sizes, price, available, amount) {
        super(id, name, description, sizes, price, available);
        this.amount = amount;
    }
}

class Basket {
    constructor() {
        this.goods = [];
    }

    get totalAmount() {
        let result = 0;
        result = this.goods.reduce(function(count, good) {
            return count += good.amount;
        }, 0);
        return result;
    }

    get totalSum() {
        let sum = 0;
        this.goods.forEach((good) => sum += good.price * good.amount);
        return sum;
    }

    add(good, amount) {
        const idx = this.goods.findIndex(item => item.id == good.id);

        if (idx === -1 && amount > 0) {
            let item = new BasketGood(good.id, good.name, good.description, good.sizes, 
                good.price, good.available, amount);
            this.goods.push(item);
        }

        else if (idx >= 0 && amount > 0) {
            this.goods[idx].amount += amount;
        }
    }

    remove(good, amount) {
        const idx = this.goods.findIndex(item => item.id == good.id)

        if (this.goods.length === 0) {
            console.log('Корзина пуста.')
        }
        else if (idx === -1) {
            console.log('Такого товара нет.')
        }
        else if (this.goods[idx].amount === 0) {
            this.goods.splice(idx, 1);
        }
        else if (this.goods[idx].amount >= amount) {
            this.goods[idx].amount -= amount;
        }
        else if (this.goods[idx].amount < amount) {
            console.log('Ошибка: неправильно введён параметр количества. Попробуйте ещё раз.');
        }
    }

    clear() {
        this.goods.length = 0;
    }

    removeUnavailable() {
        this.goods = this.goods.filter(good => good.available === true);
    }
}

let goodList = new GoodsList(/Demix/i, false, false);

goodList.add(
    1, 
    'Кроссовки мужские Demix Bitcrazy M',
    'Кроссовки Demix BitCrazy эффектно дополнят любой образ.',
    [39, 40, 41], 
    200, 
    true
);

goodList.add(
    2, 
    'Кроссовки мужские Skechers Arch Fit Big Country',
    'Технологичные кроссовки Skechers Arch Fit — то что нужно для долгих прогулок.',
    [40, 41, 42, 43], 
    300, 
    false
);

goodList.add(
    3,
    'Кроссовки мужские Demix Tsunami 4 NY',
    'Универсальная модель Demix Tsunamy 4 NY легко дополнит любой образ в спортивном стиле.',
    [40, 41, 42, 43, 44, 45, 46, 47],
    400,
    true
);

goodList.add(
    4,
    'Кроссовки мужские FILA Ray Tracer TR 2',
    'Кроссовки в спортивном стиле от FILA — идеальный выбор для поклонников долгих прогулок.',
    [40, 41, 42, 43, 44, 45, 46, 47],
    500,
    true
);

goodList.add(
    5,
    'Кроссовки мужские GSD Crom',
    'Кроссовки Crom прекрасно подойдут для завершения образа в спортивном стиле.',
    [40, 41, 42, 43, 44, 45, 46,],
    600,
    false
);

// console.log(goodList.list);

let good1 = new Good(
    1, 
    'Кроссовки мужские Demix Bitcrazy M',
    'Кроссовки Demix BitCrazy эффектно дополнят любой образ.',
    [39, 40, 41], 
    200,
    true,
);

let good2 = new Good(
    2,
    'Кроссовки мужские Skechers Arch Fit Big Country',
    'Технологичные кроссовки Skechers Arch Fit с усиленной поддержкой стопы — то что нужно для долгих прогулок.',
    [40, 41, 42, 43, 43.5, 44, 45,],
    300,
    false,
);

let good3 = new Good(
    3,
    'Кроссовки мужские Demix Tsunami 4 NY',
    'Универсальная модель Demix Tsunamy 4 NY легко дополнит любой образ в спортивном стиле.',
    [40, 41, 42, 43, 44, 45, 46, 47],
    400,
    true,
)

let good4 = new Good(
    4,
    'Кроссовки мужские FILA Ray Tracer TR 2',
    'Кроссовки в спортивном стиле от FILA — идеальный выбор для поклонников долгих прогулок.',
    [40, 41, 42, 43, 44, 45, 46, 47],
    500,
    true,
)

let good5 = new Good(
    5,
    'Кроссовки мужские GSD Crom',
    'Кроссовки Crom прекрасно подойдут для завершения образа в спортивном стиле.',
    [40, 41, 42, 43, 44, 45, 46,],
    600,
    false,
)

let basket = new Basket();

// good1.available = false;

basket.add(good1, -5);
basket.add(good1, 5);

basket.add(good2, 0);
basket.add(good2, 10);

basket.add(good3, 15);
basket.add(good3, 15);

// console.log(basket);


// basket.removeUnavailable();
// console.log(basket);

basket.remove(good1, 1);
// basket.remove(good2, 12);
basket.remove(good3, 30);
console.log(basket);

console.log(basket.totalAmount);
console.log(basket.totalSum);

basket.clear();
console.log(basket);