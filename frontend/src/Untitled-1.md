electronic-store/
│
├── frontend/
│   └── ...React project
│
│
└── backend/
    │
    ├── src/
    │   │
    │   ├── config/
    │   │   ├── db.js
    │   │   └── cloudinary.js
    │   │
    │   ├── controllers/
    │   │   ├── auth.controller.js
    │   │   ├── user.controller.js
    │   │   ├── product.controller.js
    │   │   ├── category.controller.js
    │   │   ├── cart.controller.js
    │   │   ├── wishlist.controller.js
    │   │   ├── order.controller.js
    │   │   ├── review.controller.js
    │   │   ├── address.controller.js
    │   │   └── contact.controller.js
    │   │
    │   ├── models/
    │   │   ├── user.model.js
    │   │   ├── product.model.js
    │   │   ├── category.model.js
    │   │   ├── cart.model.js
    │   │   ├── wishlist.model.js
    │   │   ├── order.model.js
    │   │   ├── review.model.js
    │   │   └── address.model.js
    │   │
    │   ├── routes/
    │   │   ├── auth.routes.js
    │   │   ├── user.routes.js
    │   │   ├── product.routes.js
    │   │   ├── category.routes.js
    │   │   ├── cart.routes.js
    │   │   ├── wishlist.routes.js
    │   │   ├── order.routes.js
    │   │   ├── review.routes.js
    │   │   ├── address.routes.js
    │   │   └── contact.routes.js
    │   │
    │   ├── middleware/
    │   │   ├── auth.middleware.js
    │   │   ├── admin.middleware.js
    │   │   ├── error.middleware.js
    │   │   └── upload.middleware.js
    │   │
    │   ├── services/
    │   │   ├── email.service.js
    │   │   ├── payment.service.js
    │   │   └── storage.service.js
    │   │
    │   ├── utils/
    │   │   ├── generateToken.js
    │   │   ├── hashPassword.js
    │   │   └── validators.js
    │   │
    │   ├── app.js
    │   └── server.js
    │
    ├── .env
    ├── .gitignore
    └── package.json