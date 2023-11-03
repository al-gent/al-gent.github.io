let inStockTable = document.querySelector('.inStock');
let cart = document.querySelector('.cart');

fetch('./products/products.json')
    .then(response => response.json())
    .then(data => {
        allVeggies = data;
        fillTable();
    })
    .catch(error => console.error('Error:', error));


function fillTable() {
    // Clear the inStockTable first
    inStockTable.innerHTML = `
    <tr>
        <th>Vegetable</th>
        <th>Price</th>
        <th>Quantity</th>
    </tr>
`;

    // Add a new row for each item
    allVeggies.forEach(veg => {
        let row = document.createElement('tr');

        let cell1 = document.createElement('td');
        cell1.textContent = veg.name;
        row.appendChild(cell1);

        let cell2 = document.createElement('td');
        cell2.textContent = `${veg.price} per ${veg.unit}`;
        row.appendChild(cell2);

        let cell3 = document.createElement('td');
        cell3.textContent = veg.quantity + ' ' + veg.unit;
        row.appendChild(cell3);

        let cell5 = document.createElement('input');
        row.appendChild(cell5)
        cell5.setAttribute('type', 'number');
        cell5.setAttribute('placeholder', 'Quantity Desired');
        cell5.addEventListener('change', event => {
            veg.cart = event.target.value;
            console.log(`Added ${veg.cart} ${veg.name} to cart`);
            veg.quantity = add(veg.quantity, -veg.cart);
            total = calcTotal();
            fillCart();
            fillTable();
        })
        
        if (veg.quantity > 0) {
        inStockTable.appendChild(row);}

    });
}

function fillCart() {
    cart.innerHTML = `
    <tr>
        <th>Vegetable</th>
        <th>Price per unit</th>
        <th>Quantity Chosen</th>
        <th>Price</th>
    </tr>
`;
    allVeggies.forEach(veg => {
        let row = document.createElement('tr');

        let cell1 = document.createElement('td');
        cell1.textContent = veg.name;
        row.appendChild(cell1);

        let cell2 = document.createElement('td');
        cell2.textContent = veg.price;
        row.appendChild(cell2);

        let cell3 = document.createElement('td');
        cell3.textContent = veg.cart + ' ' + veg.unit;
        row.appendChild(cell3);

        let cell5 = document.createElement('td');
        cell5.textContent = veg.cart * veg.price;
        row.appendChild(cell5)

        let cell6 = document.createElement('button');
        row.appendChild(cell6);
        cell6.textContent = 'Remove from Cart';
        cell6.addEventListener('click', event => {
            veg.quantity = add(veg.quantity,  veg.cart);
            veg.cart = 0;
            console.log(`Removed ${veg.name} from cart`);
            total = calcTotal();
            fillCart();
            fillTable();
        })
        
        if (veg.cart > 0) {
        cart.appendChild(row);}
    });


};

function add(a,b) {
    return parseInt(a) + parseInt(b);
}

function calcTotal() {
    let total = 0;
    allVeggies.forEach(veg => {
        total = total + veg.cart * veg.price;
    })
    document.querySelector('.total').textContent = `Total = $${total}`;
    return total;
}