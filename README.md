
# Furnitech

FurniTech is an application designed to facilitate the exploration and purchase of a wide array of furniture products. Users have the capability to establish an account, peruse an extensive inventory of furniture items, and conveniently add their selections to the shopping cart for either immediate or deferred acquisition. Inspiration from RH furniture's eccomerce website.

## Wire Frames

**App Home page**

![image](<Homepage.png>)

**Login Page**

![image](<Loginpage.png>)

**Show page**

![image](<Showpage.png>)

**Detail page**

![image](<Detailpage.png>)

**Cart page**

![image](<Cart.png>)

## How to work on this App
This app let users can create their own account. Before they sign in to an existing account or sign up, users can only view the catalog of available items. They cannot add those items to the cart. This furniture app shows 4 categories  for home-furnishings. User also can view item's details that include dimension, color, price, and about info. User's shopping cart will show selected items image, quantity and price. User can remove items from their own cart and add more furniture on that order.

## Technologies Used


![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![HTML](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

### Routes

- **Home**: Access the landing page.
  - Path: `/`
  - Component: `<LandingPage />`

- **Signup**: Access the signup page.
  - Path: `/signup`
  - Component: `<Signup />`

- **Signin**: Access the signin page.
  - Path: `/signin`
  - Component: `<Signin />`

- **User Profile**: Access user profiles. The `userId` parameter is used.
  - Path: `/:userId`
  - Component: `<Profile />`

- **Cart**: Access the cart page.
  - Path: `/cart`
  - Component: `<Cart />`

- **Marketplace**: Access the marketplace.
  - Path: `/mp/`
  - Component: `<MarketPlace />`

- **Marketplace - Lighting**: Access the marketplace's lighting section.
  - Path: `/mp/lighting`
  - Component: `<MarketPlace lighting={'lighting'} />`

- **Marketplace - Decor**: Access the marketplace's decor section.
  - Path: `/mp/decor`
  - Component: `<MarketPlace decor={'decor'} />`

- **Marketplace - Furniture**: Access the marketplace's furniture section.
  - Path: `/mp/furniture`
  - Component: `<MarketPlace furniture={'furniture'} />`

- **Marketplace - Linens**: Access the marketplace's linens section.
  - Path: `/mp/linens`
  - Component: `<MarketPlace linens={'linens'} />`

- **Item Details**: Access individual item details. The `itemId` parameter is used.
  - Path: `/items/:itemId`
  - Component: `<Details />`

### MVP Goals

- As a User, I want to have a home page that has the featured items displayed.
- As a User, I want to be able to log in and log out.
- As a User, I want to be able to delete my account.
- As a User, I want to receive an error message if I enter the wrong credentials.
- As a User, I want to have a profile page where I am able to see my previous orders.
- As a User, I want to be able to browse a specific section of furniture/items (furnoture, decor, lighting, linens) to see available products.
- As a User, I want to be able to click on an item and see it's details.
- As a User, I want to be able to add the item to my cart.
- As a User, I want to be able to remove an item from my cart.
- As a User, I want to be able to update the quantity of an item in my cart.
#### Stretch Goals
- As a User, I want to be able to filter the items by their color or type of furniture they are.
- As a User, I want to be able to shop from more sections of furniture.
- As a User, when I hover over an item's image, it cycles through the same item in different angles/colors.


## Team Expectations

#### Front End Developers
- Gerardo Arriaza Pantaleon , Jasmine Williams, & Axel Witt  

#### Backend Developers
- Guoxing Liu & Felix Carela 
