(() => {
    const globalData = {
        "data": [
            {
                "id": 1,
                "price": 500,
                "currency": "USDT"
            },
            {
                "id": 2,
                "price": 700,
                "currency": "BTC"
            },
            {
                "id": 3,
                "price": 900,
                "currency": "ETH"
            },
            {
                "id": 4,
                "price": 1000,
                "currency": "BTC"
            },
            {
                "id": 5,
                "price": 1200,
                "currency": "USDT"
            }
        ],
        "currencies-pairs": {
            "USDT-BTC": 0.000035,
            "USDT-ETH": 0.00053,
            "BTC-USDT": 28894.19,
            "BTC-ETH": 15.31,
            "ETH-USDT": 1884.68,
            "ETH-BTC": 0.065
        }
    };

    const currencies = [...globalData.data.reduce((acc, item) => {
        acc.add(item.currency);
        return acc;
    }, new Set())];

    const getSingleItemPrice = (item, currency) => {
        if (item.currency === currency) {
            return item.price;
        }

        const k = pairKey(item.currency, currency);
        const coef = globalData['currencies-pairs'][k];

        if (!coef) {
            throw new Error(`There is no currency pair: '${k}'`);
        }

        return item.price * coef;
    };

    const getTotalItemsPrice = (items, currency) => {
        return items.map((item) => {
            return getSingleItemPrice(item, currency);
        }).reduce((p1, p2) => p1 + p2);
    };

    const pairKey = (c1, c2) => `${c1}-${c2}`;



    const itemSelect = document.getElementById('item-select');
    const itemOptions = globalData.data.map(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.text = item.id;
        return option;
    });

    itemSelect.append(...itemOptions);
    const currencyOptions = currencies.map(c => {
        const option = document.createElement('option');
        option.text = c;
        option.value = c;
        return option;
    });

    const currencySelect = document.getElementById('currency-select');
    currencySelect.append(...currencyOptions);

    const itemPriceElement = document.getElementById('item-price');
    const totalPriceElement = document.getElementById('total-price');

    const currentData = {
        item: null,
        currency: null,
    };

    const handleUpdateCurrenctData = () => {
        if (currentData.item === null || currentData.currency === null) {
            return;
        }
        const item = globalData.data.find(item => item.id == currentData.item);
        itemPriceElement.textContent = `${getSingleItemPrice(item, currentData.currency)} ${currentData.currency}`;
        totalPriceElement.textContent = `${getTotalItemsPrice(globalData.data, currentData.currency)} ${currentData.currency}`;
    };

    itemSelect.addEventListener('change', (event) => {
        currentData.item = event.target.value;
        handleUpdateCurrenctData();
    });

    currencySelect.addEventListener('change', (event) => {
        currentData.currency = event.target.value;
        handleUpdateCurrenctData();
    });


})();