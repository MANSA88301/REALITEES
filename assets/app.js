(function () {
  "use strict";
  const S = window.SITE;
  if (!S) return;

  const $ = (sel) => document.querySelector(sel);
  const esc = (v) =>
    String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const isSafeUrl = (u) => /^https:\/\//i.test(String(u || ""));
  const isLocalAsset = (u) => /^\/assets\/[\w./-]+$/.test(String(u || ""));
  const c = S.contact;
  const productSelect = $("#item");

  // Hero photo (optional)
  if (isLocalAsset(S.brand.heroImage)) {
    const v = $("#hero-visual");
    v.removeAttribute("aria-hidden");
    v.closest(".hero").classList.add("has-photo");
    v.innerHTML = `<img class="hero-photo" src="${esc(S.brand.heroImage)}" alt="${esc(S.brand.heroImageAlt || "")}" width="1593" height="987" fetchpriority="high">`;
  }

  // Lanes
  $("#lane-list").innerHTML = S.lanes
    .map(
      (l, i) => `<article class="lane" id="${esc(l.anchor)}">
        <span class="n">0${i + 1}</span>
        <h3>${esc(l.title)}</h3>
        <p>${esc(l.body)}</p>
        ${
          l.href
            ? `<a class="lane-cta" href="${esc(l.href)}">${esc(l.cta)} →</a>`
            : `<button class="lane-cta" type="button" data-order="${esc(l.orderItem)}">${esc(l.cta)} →</button>`
        }
      </article>`
    )
    .join("");

  // Pink Season designs
  $("#pink-designs").innerHTML = S.pinkSeason.designs
    .map(
      (d) => `<article class="design">
        <span class="label">F.L.Y.</span>
        <h3>${esc(d)}</h3>
        <button class="lane-cta" type="button" data-order="${esc("Pink Season: " + d)}">Personalize →</button>
      </article>`
    )
    .join("");

  // Checklist
  $("#checklist").innerHTML = S.checklist.map((x) => `<li>${esc(x)}</li>`).join("");

  // Portfolio
  $("#portfolio").innerHTML = S.portfolio
    .map(
      (w, i) => `<article class="work tone-${i % 3}${isLocalAsset(w.image) ? " has-img" : ""}">
        ${isLocalAsset(w.image) ? `<img src="${esc(w.image)}" alt="${esc(w.title + " — " + w.category + " design by Realiteez (watermarked preview)")}" width="600" height="900" loading="lazy">` : ""}
        <div class="work-text"><span class="label">${esc(w.category)}</span><h3>${esc(w.title)}</h3></div>
      </article>`
    )
    .join("");

  // Vault
  $("#vault-list").innerHTML = S.vault
    .map((v) => `<div class="panel"><h3>${esc(v.title)}</h3><p>${esc(v.body)}</p></div>`)
    .join("");

  // Steps
  $("#steps").innerHTML = S.steps
    .map((s, i) => `<div class="step"><span class="n">0${i + 1}</span><h3>${esc(s.title)}</h3><p>${esc(s.body)}</p></div>`)
    .join("");

  // FAQ
  $("#faq").innerHTML = S.faq
    .map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`)
    .join("");

  // Order form item choices
  const items = [
    ...S.lanes.filter((l) => l.orderItem).map((l) => l.orderItem),
    ...S.pinkSeason.designs.map((d) => "Pink Season: " + d),
    "Printed tee",
    "Something else",
  ];
  productSelect.innerHTML =
    `<option value="">Choose one</option>` + items.map((x) => `<option value="${esc(x)}">${esc(x)}</option>`).join("");

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-order]");
    if (!btn) return;
    productSelect.value = btn.dataset.order;
    $("#order").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => $("#name").focus({ preventScroll: true }), 400);
  });

  // Contact + socials
  const contactLines = [];
  if (c.email) contactLines.push(`<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>`);
  if (c.phone) contactLines.push(`<a href="tel:${esc(c.phone.replace(/[^\d+]/g, ""))}">${esc(c.phone)}</a>`);
  if (c.city) contactLines.push(`<span>${esc(c.city)}</span>`);
  if (!contactLines.length) contactLines.push(`<span>Use the Create Your Tee form to reach us.</span>`);
  $("#contact").innerHTML = contactLines.join("");
  const socials = [
    ["Instagram", c.instagram],
    ["TikTok", c.tiktok],
    ["Facebook", c.facebook],
  ].filter(([, u]) => isSafeUrl(u));
  $("#social").innerHTML = socials
    .map(([n, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${n}</a>`)
    .join("");
  $("#year").textContent = new Date().getFullYear();

  // Shared submit helper
  const postForm = async (data) => {
    const res = await fetch(S.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error("HTTP " + res.status);
  };

  // Order form
  const form = $("#order-form");
  const status = $("#form-status");
  const fallback = $("#fallback");
  const setStatus = (msg, kind) => {
    status.textContent = msg;
    status.className = "form-status" + (kind ? " " + kind : "");
  };
  const summarize = (data) =>
    [
      `Order request — ${S.brand.name}`,
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "-"}`,
      `Creating: ${data.get("item")}`,
      `Quantity: ${data.get("quantity")}`,
      `Needed by: ${data.get("deadline") || "-"}`,
      ``,
      `${data.get("details")}`,
    ].join("\n");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (form.website.value) return; // honeypot: bots fill hidden fields
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const btn = form.querySelector("button[type=submit]");

    if (!isSafeUrl(S.formEndpoint)) {
      fallback.hidden = false;
      $("#fallback-text").textContent = summarize(data);
      $("#fallback-to").textContent = c.email
        ? `Send this to ${c.email}:`
        : "Copy your request and send it to us by DM or text:";
      setStatus("Your request is ready to send.", "ok");
      return;
    }

    btn.disabled = true;
    setStatus("Sending…");
    try {
      await postForm(data);
      form.reset();
      setStatus("Request received. We'll follow up with your protected proof.", "ok");
    } catch (err) {
      console.error("Order form submit failed:", err);
      setStatus("That didn't go through. Check your connection and try again.", "err");
    } finally {
      btn.disabled = false;
    }
  });

  $("#copy-request").addEventListener("click", async () => {
    const pre = $("#fallback-text");
    try {
      await navigator.clipboard.writeText(pre.textContent);
      setStatus("Copied. Paste it into an email or DM to us.", "ok");
    } catch {
      const r = document.createRange();
      r.selectNodeContents(pre);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
      setStatus("Text selected. Press Ctrl/Cmd + C to copy.", "ok");
    }
  });

  // Order status lookup (no order database yet: routes the request to the shop)
  const statusForm = $("#status-form");
  statusForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = $("#status-msg");
    const num = statusForm.order.value.trim();
    if (!num) {
      msg.textContent = "Enter the order number from your confirmation.";
      return;
    }
    if (!isSafeUrl(S.formEndpoint)) {
      msg.textContent = c.email
        ? `Email ${c.email} with order ${num} and we'll reply with an update.`
        : `Send us order ${num} by DM or text and we'll reply with an update.`;
      return;
    }
    try {
      const data = new FormData();
      data.append("type", "order-status");
      data.append("order", num);
      await postForm(data);
      msg.textContent = `Got it. We'll send an update on order ${num} soon.`;
    } catch (err) {
      console.error("Order status request failed:", err);
      msg.textContent = "That didn't go through. Check your connection and try again.";
    }
  });

  // Structured data for search engines
  const ld = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: S.brand.name,
    description: S.brand.pitch,
    url: S.brand.url,
    ...(c.email && { email: c.email }),
    ...(c.phone && { telephone: c.phone }),
    ...(c.city && { address: { "@type": "PostalAddress", addressLocality: c.city } }),
    sameAs: socials.map(([, u]) => u),
  };
  const tag = document.createElement("script");
  tag.type = "application/ld+json";
  tag.textContent = JSON.stringify(ld);
  document.head.appendChild(tag);
})();
