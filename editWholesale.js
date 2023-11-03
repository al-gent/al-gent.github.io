const submit = document.querySelector('.submit');
let inStockTable = document.querySelector('.inStock');
let outOfStockTable = document.querySelector('.outOfStock');
let allVeggies = [];
const save = document.querySelector('.save');


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
        <th>Unit</th>
    </tr>
`;

    outOfStockTable.innerHTML = `
    <tr>
        <th>Vegetable</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Unit</th>
    </tr>
`;
    // Add a new row for each item
    allVeggies.forEach(veg => {
        let row = document.createElement('tr');

        let cell1 = document.createElement('td');
        cell1.textContent = veg.name;
        row.appendChild(cell1);

        let cell2 = document.createElement('input');
        cell2.setAttribute('value', veg.price);
        cell2.setAttribute('type', 'number')
        row.appendChild(cell2);
        cell2.addEventListener('change', event => {
            veg.price = event.target.value;
            console.log(allVeggies)
        })

        let cell3 = document.createElement('input');
        cell3.setAttribute('type', 'number');
        cell3.setAttribute('value', veg.quantity);
        row.appendChild(cell3);
        cell3.addEventListener('change', event => {
            veg.quantity = event.target.value;
            console.log(allVeggies)
        })

        let cell4 = document.createElement('td');
        cell4.textContent = veg.unit;
        row.appendChild(cell4);
        
        if (veg.quantity > 0) {
        inStockTable.appendChild(row);}
        else {
            outOfStockTable.appendChild(row);
        }
    });
}



submit.addEventListener('click', event =>{
    let vegetableName = document.getElementById('vegetable').value;
    let vegetablePrice = document.getElementById('price').value;
    let vegetableQuantity = document.getElementById('quantity').value;
    let vegetableUnit = document.getElementById('unit').value;
    event.preventDefault();
    allVeggies.push({
        name: vegetableName,
        price: vegetablePrice,
        quantity: vegetableQuantity,
        unit: vegetableUnit
    });
    console.log(allVeggies);
    fillTable();

    document.getElementById('vegetable').value = ''    
    document.getElementById('price').value = ''
    document.getElementById('quantity').value = ''
    document.getElementById('unit').value = ''

})


