"use client";

export default function PhoneForm({ phone, setPhone, onSuccess }) {
  async function submitHandler(e) {
    e.preventDefault();

    await fetch("http://localhost:3000/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    onSuccess();
  }

  return (
    <form onSubmit={submitHandler} className="space-y-4">
      <input
        type="tel"
        placeholder="شماره موبایل"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border rounded-lg p-3 text-center"
      />

      <button className="w-full bg-[#CB2D58] text-white py-3 rounded-lg">
        ادامه
      </button>
    </form>
  );
}
