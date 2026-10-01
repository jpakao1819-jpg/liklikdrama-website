/**
 * LiklikDrama access gate.
 *
 * This is a client-side gate, so it is suitable for controlling visibility only.
 * Do not use the codes here as protection for confidential content.
 */
(function () {
  "use strict";

  const CODES = Object.freeze({
    ACCESS: "3",
    REBOOT: "09/07/2003",
    KILL: "05/05/2002"
  });

  const CLOUD = Object.freeze({
    statusUrl: "https://keyvalue.immanuel.co/api/KeyVal/GetValue/7i4f8prd/site_status",
    updateUrl: "https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/7i4f8prd/site_status/",
    openPoll: 20000,
    lockedPoll: 5000,
    timeout: 5000
  });

  const KEYS = Object.freeze({
    master: "__ag_master_session",
    status: "__ag_cached_status"
  });

  const TRIGGER = Object.freeze({ xMin: 0.65, yMin: 0.25, yMax: 0.75 });
  const TRIPLE_WINDOW = 1200;
  let overlay;
  let popup;
  let pollTimer;
  let isLocked = false;
  let triggerEvents = [];

  function storageGet(key) {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  }

  function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (_) { /* private browsing */ }
  }

  function storageRemove(key) {
    try { localStorage.removeItem(key); } catch (_) { /* private browsing */ }
  }

  function isMaster() {
    return storageGet(KEYS.master) === "1";
  }

  function makeOverlay() {
    overlay = document.createElement("div");
    overlay.id = "ag-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    Object.assign(overlay.style, {
      position: "fixed", inset: "0", display: "none", opacity: "0",
      flexDirection: "column", alignItems: "center", justifyContent: "center",
      zIndex: "2147483646", background: "#0a0a0a", color: "#f5f5f5",
      padding: "24px", textAlign: "center", fontFamily: "system-ui, sans-serif",
      transition: "opacity .25s ease", userSelect: "none"
    });
    overlay.innerHTML = `
      <div style="max-width:440px">
        <div style="font-size:42px;margin-bottom:16px" aria-hidden="true">🔒</div>
        <h1 style="font-size:clamp(1.5rem,6vw,2.2rem);margin:0;color:#fff">Private Access Only</h1>
        <p style="color:#999;line-height:1.6;margin:12px 0 0">This portal is temporarily unavailable. Please try again later.</p>
      </div>`;
    document.body.appendChild(overlay);
  }

  function makePopup() {
    popup = document.createElement("div");
    popup.id = "ag-popup";
    Object.assign(popup.style, {
      position: "fixed", inset: "0", display: "none", alignItems: "center",
      justifyContent: "center", zIndex: "2147483647", padding: "20px",
      background: "rgba(0,0,0,.82)", backdropFilter: "blur(8px)",
      fontFamily: "system-ui, sans-serif"
    });
    popup.innerHTML = `
      <form id="ag-card" style="box-sizing:border-box;width:min(440px,100%);padding:28px;background:#141414;border:1px solid #333;border-radius:16px;box-shadow:0 20px 60px #000">
        <h2 style="margin:0 0 18px;color:#fff;text-align:center;font:italic 500 1.2rem Georgia,serif">Master control</h2>
        <label for="ag-input" style="display:block;color:#aaa;font-size:.85rem;margin-bottom:7px">Access code</label>
        <input id="ag-input" type="password" inputmode="text" autocomplete="off" autocapitalize="none" style="box-sizing:border-box;width:100%;padding:13px;border:1px solid #444;border-radius:9px;background:#202020;color:#fff;font-size:1rem;text-align:center;letter-spacing:.12em">
        <div id="ag-message" role="status" aria-live="polite" style="min-height:22px;margin:12px 0;text-align:center;font-size:.88rem"></div>
        <button id="ag-submit" type="submit" style="width:100%;padding:13px;border:0;border-radius:9px;background:#3b82f6;color:#fff;font-weight:700;cursor:pointer">Execute</button>
        <button id="ag-cancel" type="button" style="display:block;margin:10px auto 0;padding:5px;border:0;background:none;color:#999;cursor:pointer">Dismiss</button>
      </form>`;
    document.body.appendChild(popup);

    popup.querySelector("#ag-card").addEventListener("submit", function (event) {
      event.preventDefault();
      handleCode();
    });
    popup.querySelector("#ag-cancel").addEventListener("click", closePopup);
    popup.addEventListener("click", event => {
      if (event.target === popup) closePopup();
    });
  }

  function showOverlay() {
    if (isMaster() || !overlay) return;
    isLocked = true;
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => { overlay.style.opacity = "1"; });
  }

  function hideOverlay() {
    if (!overlay) return;
    isLocked = false;
    overlay.style.opacity = "0";
    document.body.style.overflow = "";
    setTimeout(() => {
      if (!isLocked) overlay.style.display = "none";
    }, 260);
  }

  function openPopup() {
    if (!popup) return;
    popup.style.display = "flex";
    const input = popup.querySelector("#ag-input");
    popup.querySelector("#ag-message").textContent = "";
    input.value = "";
    setTimeout(() => input.focus(), 50);
  }

  function closePopup() {
    if (!popup) return;
    popup.style.display = "none";
    popup.querySelector("#ag-input").value = "";
    popup.querySelector("#ag-message").textContent = "";
  }

  function message(text, color = "#ef4444") {
    const node = popup.querySelector("#ag-message");
    node.textContent = text;
    node.style.color = color;
  }

  function normalizeStatus(value) {
    if (value && typeof value === "object") {
      value = value.value ?? value.status ?? value.data;
    }
    const status = String(value ?? "").replace(/["'\\s]/g, "").toLowerCase();
    if (["open", "granted", "1", "true"].includes(status)) return "open";
    if (["locked", "killed", "0", "false"].includes(status)) return "locked";
    return null;
  }

  async function request(url, options = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), CLOUD.timeout);
    try {
      return await fetch(url, { ...options, signal: controller.signal, cache: "no-store" });
    } finally {
      clearTimeout(timer);
    }
  }

  async function fetchCloudStatus() {
    try {
      const response = await request(`${CLOUD.statusUrl}?_=${Date.now()}`);
      if (!response.ok) return null;
      const text = await response.text();
      try { return normalizeStatus(JSON.parse(text)); } catch (_) { return normalizeStatus(text); }
    } catch (error) {
      console.warn("Access gate status unavailable:", error.message);
      return null;
    }
  }

  async function setCloudStatus(status) {
    try {
      const response = await request(`${CLOUD.updateUrl}${status}`, { method: "POST", body: "1" });
      return response.ok;
    } catch (error) {
      console.warn("Access gate update unavailable:", error.message);
      return false;
    }
  }

  function schedulePoll(interval) {
    clearInterval(pollTimer);
    pollTimer = setInterval(syncStatus, interval);
  }

  async function syncStatus() {
    if (isMaster()) {
      hideOverlay();
      return;
    }
    const cloudStatus = await fetchCloudStatus();
    if (cloudStatus) storageSet(KEYS.status, cloudStatus);
    const status = cloudStatus || storageGet(KEYS.status);
    if (status === "locked") {
      showOverlay();
      schedulePoll(CLOUD.lockedPoll);
    } else if (status === "open") {
      hideOverlay();
      schedulePoll(CLOUD.openPoll);
    } else {
      // A new visitor is not blocked while the cloud service is unreachable.
      hideOverlay();
      schedulePoll(CLOUD.openPoll);
    }
  }

  async function handleCode() {
    const input = popup.querySelector("#ag-input");
    const submit = popup.querySelector("#ag-submit");
    const value = input.value.trim();
    if (!value) return message("Enter an access code.");
    submit.disabled = true;

    try {
      if (value === CODES.REBOOT) {
        storageSet(KEYS.master, "1");
        hideOverlay();
        message("Master access granted on this device.", "#4ade80");
        setTimeout(closePopup, 900);
      } else if (value === CODES.ACCESS) {
        message("Opening the website...", "#60a5fa");
        if (!(await setCloudStatus("open"))) throw new Error("The access service did not accept the update.");
        storageSet(KEYS.status, "open");
        hideOverlay();
        message("Website opened for all visitors.", "#4ade80");
        setTimeout(closePopup, 900);
        schedulePoll(CLOUD.openPoll);
      } else if (value === CODES.KILL) {
        message("Locking the website...", "#f87171");
        if (!(await setCloudStatus("locked"))) throw new Error("The access service did not accept the update.");
        storageRemove(KEYS.master);
        storageSet(KEYS.status, "locked");
        showOverlay();
        message("Website locked for all visitors.", "#4ade80");
        setTimeout(closePopup, 900);
        schedulePoll(CLOUD.lockedPoll);
      } else {
        message("Incorrect access code.");
        input.value = "";
      }
    } catch (error) {
      message(error.message || "Unable to update access status.");
    } finally {
      submit.disabled = false;
    }
  }

  function inTriggerZone(event) {
    return event.clientX / window.innerWidth >= TRIGGER.xMin &&
      event.clientY / window.innerHeight >= TRIGGER.yMin &&
      event.clientY / window.innerHeight <= TRIGGER.yMax;
  }

  function registerTrigger(event) {
    if (popup.style.display === "flex" || !inTriggerZone(event)) return;
    const now = Date.now();
    triggerEvents = triggerEvents.filter(time => now - time <= TRIPLE_WINDOW);
    triggerEvents.push(now);
    if (triggerEvents.length >= 3) {
      triggerEvents = [];
      openPopup();
    }
  }

  function init() {
    makeOverlay();
    makePopup();
    document.addEventListener("pointerup", registerTrigger, true);
    syncStatus();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
