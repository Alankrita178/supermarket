User: {
    id
    name
    email
    password
    phone
    role
}

Products: {
    id
    name
    desc
    category
    price
    stock_quantity,
    quantity
}

Cart: {
    cust_id
    products: [Products];
}

salesReport: {
    adminid 
    products: [Products]
}