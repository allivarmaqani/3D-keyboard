export async function checkout() {
  try {
    const res = await fetch("/api/checkout/route.ts", { method: "POST" });

    const text = await res.text(); // همه چیزو متن میگیریم
    console.log("Response text:", text);

    let data;
    try {
      data = JSON.parse(text); // اگه JSON بود، parse می‌کنیم
    } catch {
      throw new Error("Server did not return JSON");
    }

    window.location.href = data.url;
  } catch (error) {
    console.error("Purchase Failed:", error);
  }
}
