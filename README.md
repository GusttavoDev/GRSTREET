# Goiabaldio
E-Commerce Gioballdio

# API Documentation

## Users

### Create User
- **Endpoint:** `POST /users`
- **Description:** Create a new user.
- **Request Body:**
  ```json
  {
    "header": { /* user header data */ },
    "addres": { /* user address data */ },
    "personal_data": { /* user personal data */ },
    "purchases": [ /* user purchases */ ],
    "cart": [ /* user cart items */ ]
  }

### Response:

```json
{
  "msg": "Usuário Criado com Sucesso!"
}
```

### Get Users
- **Endpoint:** `GET /users`
- **Description:** `Retrieve all users.`
### Response:
```json
[ /* Array of users */ ]
```
### Get User by ID
- **Endpoint:** `GET /users/:id`
- **Description:** `Retrieve a user by ID.`
### Response:
```json
{ /* User data */ }
```
### Delete User
- **Endpoint:** `DELETE /users/:search`
- **Description:** `Delete a user by search parameter.`
### Response:
```json
{
  "msg": "Usuário Deletado com Sucesso"
}
```
### Update User Address
- **Endpoint:** `PUT /users/address`
- **Description:** `Update user address.`
Request Body:
```json
{
  "token": "user-token",
  "newAddress": { /* New address data */ }
}
```
### Response:
```json
{
  "msg": "Sucess!"
}
```
### Update User Personal Data
- **Endpoint:** `PUT /users/personal`
- **Description:** `Update user personal data.`
Request Body:
```json
{
  "token": "user-token",
  "newPersonalData": { /* New personal data */ }
}
```
### Response:
```json
{
  "msg": "Sucess!"
}
```
### Update User Email
- **Endpoint:** `PUT /users/email`
- **Description:** `Update user email.`
Request Body:
```json
{
  "token": "user-token",
  "newEmail": "new-email@example.com"
}
```
### Response:
```json
{
  "msg": "Sucess!"
}
```
### Update User Password
- **Endpoint:** `PUT /users/password`
- **Description:** `Update user password.`
Request Body:
```json
{
  "token": "user-token",
  "newPassword": "new-password"
}
```
### Response:
```json
{
  "msg": "Sucess!"
}
```

## Products


### Create Product


- **Endpoint:** `POST /products`
- **Description:** `Create a new product.`
Request Body:
```json
{
  "name": "Product Name",
  "description": "Product Description",
  "category": "Category ID",
  "sub_category": "Subcategory ID",
  "colors": [ /* Array of colors */ ],
  "reviews": [ /* Array of reviews */ ],
  "images": [ /* Array of image URLs */ ],
  "relatedProducts": [ /* Array of related product IDs */ ]
}
```
### Response:
```json
{
  "msg": "Product created successfully"
}
```
### Get Product by ID
- **Endpoint:** `GET /products/:id`
- **Description:** `Retrieve a product by ID.`
Response:
```json
{ /* Product data */ }
```
### List Products
- **Endpoint:** `GET /products`
- **Description:** `List all products.`
Response:
```json
[ /* Array of products */ ]
```
### Update Product
- **Endpoint:** `PUT /products`
- **Description:** `Update an existing product.`
Request Body:
```json
{
  "id": "Product ID",
  "name": "Product Name",
  "description": "Product Description",
  "category": "Category ID",
  "sub_category": "Subcategory ID",
  "colors": [ /* Array of colors */ ],
  "reviews": [ /* Array of reviews */ ],
  "images": [ /* Array of image URLs */ ],
  "relatedProducts": [ /* Array of related product IDs */ ]
}
```
Response:
```json
{
  "msg": "Product updated successfully"
}
```
### Delete Product
- **Endpoint:** `DELETE /products/:token`
- **Description:** `Delete a product by token.`
Response:
```json
{
  "msg": "Product deleted successfully"
}
```

## Categories

### List Categories
- **Endpoint:** `GET /categories`
- **Description:** `List all categories.`
Response:
```json
[ /* Array of categories */ ]
```
### Create Category
- **Endpoint:** `POST /categories`
- **Description:** `Create a new category.`
Request Body:
```json
{
  "name": "Category Name"
}
```
Response:
```json
{
  "message": "Category created successfully"
}
```
### Update Category
- **Endpoint:** `PUT /categories`
- **Description:** `Update an existing category.`
Request Body:
```json
{
  "id": "Category ID",
  "name": "Category Name"
}
```
Response:
```json
{
  "message": "Category updated successfully"
}
```
### Delete Category
- **Endpoint:** `DELETE /categories`
- **Description:** `Delete a category.`
Request Body:
```json
{
  "id": "Category ID"
}
```
Response:
```json
{
  "message": "Category deleted successfully"
}
```

## Colors

### List Colors
- **Endpoint:** `GET /colors/:id`
- **Description:** `List colors by ID.`
Response:
```json
[ /* Array of colors */ ]
```
### Create Color
- **Endpoint:** `POST /colors`
- **Description:** `Create a new color.`
Request Body:
```json
{
  "name": "Color Name",
  "images": [ /* Array of image URLs */ ],
  "price": "Color Price",
  "product_id": "Product ID",
  "stock": "Color Stock"
}
```
Response:
```json
{
  "message": "Color created successfully"
}
```
### Update Color
- **Endpoint:** `PUT /colors`
- **Description:** `Update an existing color.`
Request Body:
```json
{
  "id": "Color ID",
  "name": "Color Name",
  "images": [ /* Array of image URLs */ ],
  "price": "Color Price",
  "product_id": "Product ID",
  "stock": "Color Stock"
}
```
Response:
```json
{
  "message": "Color updated successfully"
}
```
### Delete Color
- **Endpoint:** `DELETE /colors`
- **Description:** `Delete a color.`
Request Body:
```json
{
  "id": "Color ID",
  "name": "Color Name"
}
```
Response:
```json
{
  "message": "Color deleted successfully"
}
```

## Purchases


### List Purchases
- **Endpoint:** `GET /purchases`
- **Description:** `List all purchases.`
Response:
```json
[ /* Array of purchases */ ]
```

### Create Purchase
- **Endpoint:** `POST /purchases`
- **Description:** `Create a new purchase.`
Request Body:
```json
{
  "user_id": "User ID",
  "products": [ /* Array of product objects */ ],
  "payment_method": "Payment Method",
  "date": "Purchase Date",
  "status": "Purchase Status"
}
```
Response:
```json
{
  "message": "Purchase created successfully"
}
```
### Update Purchase
- **Endpoint:** `PUT /purchases`
- **Description:** `Update an existing purchase.`
Request Body:
```json
{
  "id": "Purchase ID",
  "user_id": "User ID",
  "products": [ /* Array of product objects */ ],
  "payment_method": "Payment Method",
  "date": "Purchase Date",
  "status": "Purchase Status"
}
```
Response:
```json
{
  "message": "Purchase updated successfully"
}
```
### Update Purchase Status
- **Endpoint:** `PATCH /purchases/status`
- **Description:** `Update the status of a purchase.`
Request Body:
```json
{
  "id": "Purchase ID",
  "status": "PREPARANDO" | "ENVIADO" | "CONCLUIDO" | "CANCELADO"
}
```
Response:
```json
{
<<<<<<< HEAD
 "message": "Purchase updated successfully"
=======
  "message": ""
>>>>>>> f08bc107afb4788296e0ba39c5d7229ce5ac9f8f
}
```




