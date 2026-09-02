# 🛒 Next.js Ecommerce

A modern, full-stack e-commerce platform built with **Next.js**, **React**, **Node.js**, **Express**, and **MongoDB**.

The project is designed with a scalable architecture, separating the frontend application from the backend REST API while keeping both applications inside a single repository.

---

## ✨ Features

### 🛍️ E-Commerce

* Product catalog
* Hierarchical product categories
* Subcategories
* Product details
* Product search
* Product availability and stock management
* Discounted prices
* Featured products
* Best-selling products
* Shopping cart
* Order management

### 👤 Authentication

* User authentication with OTP
* Phone-based authentication
* User profile
* Protected routes
* Admin authentication
* Role-based access control

### 🛠️ Admin Panel

* Product management
* Category management
* Subcategory management
* Order management
* User management
* Coupon management
* Banner management
* Store settings
* Image upload management

### 🎨 Frontend

* Next.js App Router
* React
* Tailwind CSS
* Responsive design
* RTL / Persian language support
* Modern component-based architecture
* Dynamic category navigation
* Dynamic product URLs
* SEO-friendly pages

### ⚙️ Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* RESTful API
* Authentication middleware
* Admin middleware
* File upload handling
* Product and order APIs

---

## 🏗️ Project Structure

```text
nextjs-ecommerce/
│
├── frontEnd/
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backEnd/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

## 🚀 Tech Stack

### Frontend

| Technology   | Purpose             |
| ------------ | ------------------- |
| Next.js      | React framework     |
| React        | UI development      |
| JavaScript   | Application logic   |
| Tailwind CSS | Styling             |
| App Router   | Routing and layouts |

### Backend

| Technology           | Purpose                        |
| -------------------- | ------------------------------ |
| Node.js              | Runtime                        |
| Express.js           | REST API                       |
| MongoDB              | Database                       |
| Mongoose             | MongoDB ODM                    |
| JWT / Authentication | Authentication & authorization |

---

## 🔄 Application Architecture

```text
                    ┌──────────────────────┐
                    │      Customer        │
                    │      Browser         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      Next.js         │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │      Express.js      │
                    │       Backend        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       MongoDB        │
                    │       Database        │
                    └──────────────────────┘
```

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/varmazyarziba/nextjs-ecommerce.git
```

Navigate to the project:

```bash
cd nextjs-ecommerce
```

---

## 🎨 Frontend Setup

```bash
cd frontEnd
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

---

## ⚙️ Backend Setup

Open another terminal:

```bash
cd backEnd
```

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
npm run dev
```

The API will run on the configured backend port.

---

## 🔐 Environment Variables

Create the required environment files locally.

### Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> Never commit `.env` files or production credentials to GitHub.

For production deployment, environment variables should be configured through the hosting platform.

---

## 🗄️ Database

The application uses **MongoDB** with **Mongoose**.

The backend is responsible for:

* Database connection
* Users
* Products
* Categories
* Subcategories
* Orders
* Coupons
* Banners
* Store settings

---

## 🔗 API

The backend exposes RESTful endpoints for the frontend.

Example API structure:

```text
/api/auth
/api/products
/api/categories
/api/subcategories
/api/orders
/api/admin
/api/upload
```

---

## 🌐 Deployment

The project is structured as a monorepo and can be deployed using separate services for the frontend and backend.

### Frontend

The `frontEnd` directory can be deployed as a **Next.js application**.

### Backend

The `backEnd` directory contains the **Express.js API** and can be deployed as a Node.js service.

### Production Architecture

```text
                    Internet
                       │
                       ▼
              ┌─────────────────┐
              │     Vercel      │
              │    Next.js      │
              │    Frontend     │
              └────────┬────────┘
                       │
                       │ HTTPS API
                       ▼
              ┌─────────────────┐
              │    Backend      │
              │    Express      │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │  MongoDB Atlas  │
              └─────────────────┘
```

---

## 📱 Responsive Design

The frontend is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

The UI also supports **RTL layouts** for Persian-language content.

---

## 🔒 Security

The project includes several security-oriented practices:

* Protected routes
* Authentication middleware
* Admin authorization
* Environment variables for secrets
* Server-side database access
* Separation between frontend and backend

Production credentials should always be stored in environment variables and never committed to source control.

---

## 📈 Future Improvements

Planned improvements may include:

* Online payment gateway
* Advanced product filtering
* Price range filtering
* Advanced search
* Product reviews and ratings
* Wishlist
* Email notifications
* SMS notifications
* Advanced analytics
* Caching
* Performance optimization
* Automated testing
* CI/CD pipeline

---

## 👨‍💻 Developer

Developed as a full-stack e-commerce application using modern JavaScript technologies.

**Author:** Ziba Varmazy

---

## 📄 License

This project is currently intended for educational, portfolio, and development purposes.

---

⭐ If you find this project useful, consider giving it a star.
