const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    slug: String,

    image: String,

    sku: String,

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const AddressSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    province: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    postalCode: {
      type: String,
    },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    // کاربر
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // محصولات
    items: [OrderItemSchema],

    // اطلاعات گیرنده
    address: AddressSchema,

    // روش ارسال
    shippingMethod: {
      type: String,
      enum: ["tipax", "post", "express"],
      default: "tipax",
    },

    // هزینه ارسال
    shippingPrice: {
      type: Number,
      default: 0,
    },

    // روش پرداخت
    paymentMethod: {
      type: String,
      enum: ["online", "card", "cash"],
      default: "online",
    },

    // جمع کالا
    itemsPrice: {
      type: Number,
      required: true,
    },

    // تخفیف
    discountPrice: {
      type: Number,
      default: 0,
    },

    // مبلغ نهایی
    totalPrice: {
      type: Number,
      required: true,
    },

    // وضعیت سفارش
    status: {
      type: String,
      enum: [
        "pending",     // ثبت شده
        "paid",        // پرداخت شده
        "processing",  // آماده سازی
        "shipped",     // ارسال شده
        "delivered",   // تحویل شده
        "cancelled",   // لغو شده
        "failed",      // پرداخت ناموفق
      ],
      default: "pending",
    },

    // اطلاعات پرداخت
    paymentAuthority: String,

    paymentRefId: String,

    paidAt: Date,

    // کد رهگیری مرسوله
    trackingCode: String,

    deliveredAt: Date,

    // توضیحات مدیر
    adminNote: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);