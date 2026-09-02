"use client";

import { useContext, useMemo, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function CheckoutPage() {
  const { cart } = useContext(CartContext);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    province: "",
    city: "",
    address: "",
    postalCode: "",
    description: "",
    shipping: "tipax",
    payment: "online",
  });

  const total = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cart]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitOrder = async () => {
    const body = {
      customer: form,
      products: cart,
      total,
    };

    console.log(body);

    // بعدا
    // await fetch("/api/orders",...)
  };

  return (
    <section className="max-w-7xl mx-auto py-10 px-4">

      <h1 className="text-3xl font-bold mb-8">
        تسویه حساب
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* اطلاعات */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow">

          <h2 className="text-xl font-bold mb-6">
            اطلاعات گیرنده
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              name="firstName"
              placeholder="نام"
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              name="lastName"
              placeholder="نام خانوادگی"
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              name="phone"
              placeholder="شماره موبایل"
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              name="postalCode"
              placeholder="کد پستی"
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              name="province"
              placeholder="استان"
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              name="city"
              placeholder="شهر"
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

          </div>

          <textarea
            name="address"
            placeholder="آدرس کامل"
            rows={4}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full mt-4"
          />

          <textarea
            name="description"
            placeholder="توضیحات سفارش"
            rows={3}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full mt-4"
          />

          <div className="mt-8">

            <h3 className="font-bold mb-3">
              روش ارسال
            </h3>

            <label className="block mb-2">
              <input
                type="radio"
                name="shipping"
                value="tipax"
                defaultChecked
                onChange={handleChange}
              />
              <span className="mr-2">
                تیپاکس
              </span>
            </label>

            <label className="block">
              <input
                type="radio"
                name="shipping"
                value="post"
                onChange={handleChange}
              />
              <span className="mr-2">
                پست پیشتاز
              </span>
            </label>

          </div>

          <div className="mt-8">

            <h3 className="font-bold mb-3">
              روش پرداخت
            </h3>

            <label className="block mb-2">
              <input
                type="radio"
                name="payment"
                value="online"
                defaultChecked
                onChange={handleChange}
              />
              <span className="mr-2">
                پرداخت آنلاین
              </span>
            </label>

            <label className="block">
              <input
                type="radio"
                name="payment"
                value="card"
                onChange={handleChange}
              />
              <span className="mr-2">
                کارت به کارت
              </span>
            </label>

          </div>

        </div>

        {/* خلاصه سفارش */}

        <div className="bg-white rounded-xl shadow p-6 h-fit sticky top-24">

          <h2 className="font-bold text-xl mb-6">
            خلاصه سفارش
          </h2>

          {cart.map(item => (

            <div
              key={item.id}
              className="flex justify-between border-b py-3"
            >

              <div>

                <div>{item.title}</div>

                <div className="text-sm text-gray-500">
                  {item.quantity} عدد
                </div>

              </div>

              <div>

                {(item.price * item.quantity).toLocaleString()} تومان

              </div>

            </div>

          ))}

          <div className="flex justify-between mt-6">

            <span>جمع</span>

            <span>
              {total.toLocaleString()} تومان
            </span>

          </div>

          <button
            onClick={submitOrder}
            className="w-full mt-8 bg-[#CB2D58] text-white py-3 rounded-xl"
          >
            ثبت سفارش و پرداخت
          </button>

        </div>

      </div>

    </section>
  );
}