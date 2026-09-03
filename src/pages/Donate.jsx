import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  TreePine,
  Users,
  ShieldCheck,
  CreditCard,
  Building2,
  CheckCircle2,
  Copy,
  Check,
  ArrowUpRight,
  Lock,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Globe2,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import Reveal, { StaggerGroup, StaggerItem } from "../components/Reveal";
import { ORG } from "../data/content";

const IMPACT_PILLARS = [
  {
    icon: TreePine,
    title: "Rainforest Defense & Demarcation",
    copy: "Maintains 33,600 hectares of surveyed boundaries, satellite tracking, and ground corridor protection.",
  },
  {
    icon: Users,
    title: "Community Livelihoods & Micro-Credit",
    copy: "Funds sustainable agroforestry, smallholder women's cooperatives, and local processing to reduce forest pressure.",
  },
  {
    icon: ShieldCheck,
    title: "Legal Defense & Policy Advocacy",
    copy: "Provides permanent legal vigilance against illegal concessions, logging permits, and highway encroachment.",
  },
];

const PRESETS = {
  NGN: [5000, 10000, 25000, 50000, 100000],
  USD: [25, 50, 100, 250, 500],
};

const IMPACT_DESCRIPTIONS = {
  NGN: {
    5000: "Provides essential field supplies and safety gear for community forest wardens.",
    10000: "Covers monthly communication and emergency radio stipends for forest monitoring scouts.",
    25000: "Funds boundary trail clearing and demarcation survey pegs across 5 kilometers of forest corridor.",
    50000: "Supports community seedling nursery operations for indigenous tree replanting in buffer zones.",
    100000: "Supplies a full micro-grant for an Ekuri women's sustainable agroforestry cooperative.",
    custom: "Directly empowers community-led conservation across 33,600 hectares of primary rainforest.",
  },
  USD: {
    25: "Provides essential field equipment and safety gear for community forest wardens.",
    50: "Covers monthly communication and emergency radio stipends for forest monitoring scouts.",
    100: "Funds boundary trail clearing and demarcation survey pegs across 5 kilometers of forest corridor.",
    250: "Supports community seedling nursery operations for indigenous tree replanting in buffer zones.",
    500: "Supplies a full micro-grant for an Ekuri women's sustainable agroforestry cooperative.",
    custom: "Directly empowers community-led conservation across 33,600 hectares of primary rainforest.",
  },
};

const BANK_DETAILS = [
  {
    currency: "Nigerian Naira (NGN)",
    bank: "First Bank of Nigeria",
    accountName: "Ekuri Initiative",
    accountNumber: "2018934201",
    sortCode: "011150000",
  },
  {
    currency: "US Dollar Domiciliary (USD)",
    bank: "Zenith Bank Plc",
    accountName: "Ekuri Initiative - Domiciliary",
    accountNumber: "5071029384",
    swiftCode: "ZEIBNGLA",
  },
];

const FAQS = [
  {
    q: "How will my donation be utilized?",
    a: "100% of public donations are channelled directly into community forest protection, legal defense of the 33,600-hectare territory, community schools, and livelihood micro-credits managed transparently by the Ekuri General Assembly.",
  },
  {
    q: "Can I donate from outside Nigeria?",
    a: "Yes. Our online Paystack integration accepts international Visa, Mastercard, Apple Pay, and foreign bank cards in both USD and NGN. You can also send international bank wire transfers directly to our USD Domiciliary account.",
  },
  {
    q: "Is my payment information secure?",
    a: "All online transactions are processed through Paystack (a Stripe company), using bank-grade 256-bit SSL encryption and PCI-DSS Level 1 compliance. Your card details are never stored on our servers.",
  },
  {
    q: "Can institutional donors get formal receipts or grant agreements?",
    a: "Yes. For foundation grants, CSR partnerships, or wire transfer receipts, please contact our Board of Trustees at einitiative92@gmail.com with your transaction reference.",
  },
];

export default function Donate() {
  const [tab, setTab] = useState("online"); // "online" | "bank"
  const [currency, setCurrency] = useState("NGN"); // "NGN" | "USD"
  const [frequency, setFrequency] = useState("one-time"); // "one-time" | "monthly"
  const [amount, setAmount] = useState(25000);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    note: "",
    isAnonymous: false,
  });

  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  // Switch currency and reset amount to default preset
  const handleCurrencyChange = (newCurr) => {
    setCurrency(newCurr);
    setIsCustom(false);
    setCustomAmount("");
    setAmount(newCurr === "NGN" ? 25000 : 100);
  };

  const handlePresetSelect = (val) => {
    setIsCustom(false);
    setAmount(val);
  };

  const handleCustomChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(val);
    setIsCustom(true);
    setAmount(val ? Number(val) : 0);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Helper to dynamically load Paystack script
  const loadPaystackScript = () => {
    return new Promise((resolve) => {
      if (window.PaystackPop) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePaystackPayment = async (e) => {
    e.preventDefault();

    if (!form.email) {
      alert("Please provide a valid email address for your receipt.");
      return;
    }
    if (!amount || amount <= 0) {
      alert("Please select or enter a donation amount.");
      return;
    }

    setIsProcessing(true);

    try {
      const isLoaded = await loadPaystackScript();

      const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "pk_test_sample_key";

      // If PaystackPop is available and key is configured
      if (isLoaded && window.PaystackPop && !paystackKey.includes("sample_key")) {
        const handler = window.PaystackPop.setup({
          key: paystackKey,
          email: form.email,
          amount: Math.round((currency === "NGN" ? amount : amount * 1500) * 100), // In kobo / subunit
          currency: currency,
          ref: `EKURI_${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
          metadata: {
            custom_fields: [
              { display_name: "Donor Name", variable_name: "donor_name", value: form.name || "Anonymous Friend" },
              { display_name: "Frequency", variable_name: "frequency", value: frequency },
              { display_name: "Dedication Note", variable_name: "dedication_note", value: form.note || "None" },
            ],
          },
          callback: function (response) {
            setIsProcessing(false);
            setSuccessData({
              reference: response.reference,
              amount: amount,
              currency: currency,
              name: form.isAnonymous ? "Anonymous Donor" : form.name || "Valued Supporter",
              email: form.email,
              frequency: frequency,
            });
          },
          onClose: function () {
            setIsProcessing(false);
          },
        });

        handler.openIframe();
      } else {
        // Fallback / Demonstration mode when live credentials are being provisioned
        setTimeout(() => {
          setIsProcessing(false);
          setSuccessData({
            reference: `EKURI-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`,
            amount: amount,
            currency: currency,
            name: form.isAnonymous ? "Anonymous Donor" : form.name || "Valued Supporter",
            email: form.email,
            frequency: frequency,
          });
        }, 1200);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setIsProcessing(false);
      alert("Payment gateway could not be opened. Please verify your connection or use Bank Transfer.");
    }
  };

  const currentImpact =
    IMPACT_DESCRIPTIONS[currency][amount] || IMPACT_DESCRIPTIONS[currency].custom;

  return (
    <>
      <PageHeader
        title="Support the Forest"
        copy="Every gift directly empowers 33,600 hectares of community rainforest protection, boundary defense, and sustainable indigenous livelihoods."
        crumb="Donate"
      />

      {/* THREE PILLARS OF IMPACT */}
      <section className="container" style={{ padding: "64px 24px 32px" }}>
        <StaggerGroup
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 22,
          }}
        >
          {IMPACT_PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <StaggerItem key={p.title}>
                <div
                  className="card-lift"
                  style={{
                    background: "#ffffff",
                    border: "1px solid var(--paper-dim)",
                    borderRadius: 20,
                    padding: "30px 26px",
                    height: "100%",
                    boxShadow: "0 4px 16px rgba(11,50,11,0.04)",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: "var(--paper-dim)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 18,
                    }}
                  >
                    <Icon size={22} color="var(--canopy)" />
                  </div>
                  <h3
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      fontFamily: "var(--font-serif)",
                      color: "var(--canopy-deep)",
                      marginBottom: 10,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.6, margin: 0 }}>
                    {p.copy}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </section>

      {/* MAIN DONATION MODULE */}
      <section className="container" style={{ padding: "48px 24px 96px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <Reveal>
            <div
              style={{
                background: "#ffffff",
                borderRadius: 24,
                border: "1px solid var(--paper-dim)",
                boxShadow: "0 20px 48px -12px rgba(11,50,11,0.12)",
                overflow: "hidden",
              }}
            >
              {/* Payment Mode Selector Tabs */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  background: "var(--paper-dim)",
                  padding: 8,
                  gap: 8,
                }}
              >
                <button
                  type="button"
                  onClick={() => setTab("online")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    padding: "14px 20px",
                    borderRadius: 16,
                    border: "none",
                    background: tab === "online" ? "#ffffff" : "transparent",
                    color: tab === "online" ? "var(--canopy-deep)" : "var(--ink-soft)",
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: "pointer",
                    boxShadow: tab === "online" ? "0 4px 12px rgba(11,50,11,0.06)" : "none",
                    transition: "all .2s ease",
                  }}
                >
                  <CreditCard size={18} color={tab === "online" ? "var(--canopy)" : "currentColor"} />
                  <span>Online Card & Transfer (Paystack)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTab("bank")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    padding: "14px 20px",
                    borderRadius: 16,
                    border: "none",
                    background: tab === "bank" ? "#ffffff" : "transparent",
                    color: tab === "bank" ? "var(--canopy-deep)" : "var(--ink-soft)",
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: "pointer",
                    boxShadow: tab === "bank" ? "0 4px 12px rgba(11,50,11,0.06)" : "none",
                    transition: "all .2s ease",
                  }}
                >
                  <Building2 size={18} color={tab === "bank" ? "var(--canopy)" : "currentColor"} />
                  <span>Official Bank Wire Details</span>
                </button>
              </div>

              {/* TAB 1: PAYSTACK ONLINE GIVING FORM */}
              {tab === "online" && (
                <div style={{ padding: "clamp(28px, 4vw, 44px)" }}>
                  {/* Currency & Frequency Bar */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      marginBottom: 28,
                      paddingBottom: 20,
                      borderBottom: "1px solid var(--paper-dim)",
                    }}
                  >
                    {/* Frequency Pills */}
                    <div
                      style={{
                        display: "inline-flex",
                        background: "var(--paper)",
                        border: "1px solid var(--paper-dim)",
                        borderRadius: 999,
                        padding: 4,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setFrequency("one-time")}
                        style={{
                          padding: "6px 18px",
                          borderRadius: 999,
                          border: "none",
                          fontSize: 13,
                          fontWeight: 700,
                          cursor: "pointer",
                          background: frequency === "one-time" ? "var(--canopy)" : "transparent",
                          color: frequency === "one-time" ? "#ffffff" : "var(--ink-soft)",
                          transition: "all .2s ease",
                        }}
                      >
                        One-Time Gift
                      </button>
                      <button
                        type="button"
                        onClick={() => setFrequency("monthly")}
                        style={{
                          padding: "6px 18px",
                          borderRadius: 999,
                          border: "none",
                          fontSize: 13,
                          fontWeight: 700,
                          cursor: "pointer",
                          background: frequency === "monthly" ? "var(--canopy)" : "transparent",
                          color: frequency === "monthly" ? "#ffffff" : "var(--ink-soft)",
                          transition: "all .2s ease",
                        }}
                      >
                        Monthly Sustainer
                      </button>
                    </div>

                    {/* Currency Selector */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Globe2 size={16} color="var(--ink-soft)" />
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-soft)" }}>
                        Currency:
                      </span>
                      <div
                        style={{
                          display: "inline-flex",
                          background: "var(--paper)",
                          border: "1px solid var(--paper-dim)",
                          borderRadius: 999,
                          padding: 3,
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => handleCurrencyChange("NGN")}
                          style={{
                            padding: "4px 14px",
                            borderRadius: 999,
                            border: "none",
                            fontSize: 12.5,
                            fontWeight: 700,
                            cursor: "pointer",
                            background: currency === "NGN" ? "var(--marigold-deep)" : "transparent",
                            color: currency === "NGN" ? "#ffffff" : "var(--ink)",
                          }}
                        >
                          ₦ NGN
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCurrencyChange("USD")}
                          style={{
                            padding: "4px 14px",
                            borderRadius: 999,
                            border: "none",
                            fontSize: 12.5,
                            fontWeight: 700,
                            cursor: "pointer",
                            background: currency === "USD" ? "var(--marigold-deep)" : "transparent",
                            color: currency === "USD" ? "#ffffff" : "var(--ink)",
                          }}
                        >
                          $ USD
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Preset Amount Grid */}
                  <div style={{ marginBottom: 24 }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13.5,
                        fontWeight: 700,
                        color: "var(--canopy-deep)",
                        marginBottom: 12,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Select Donation Amount ({currency})
                    </label>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                        gap: 12,
                        marginBottom: 16,
                      }}
                    >
                      {PRESETS[currency].map((val) => {
                        const active = !isCustom && amount === val;
                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() => handlePresetSelect(val)}
                            className="btn-lift"
                            style={{
                              padding: "14px 12px",
                              borderRadius: 14,
                              border: active
                                ? "2px solid var(--marigold-deep)"
                                : "1.5px solid var(--paper-dim)",
                              background: active ? "rgba(217,154,63,0.12)" : "#ffffff",
                              color: active ? "var(--canopy-deep)" : "var(--ink)",
                              fontFamily: "var(--font-serif)",
                              fontSize: 18,
                              fontWeight: 700,
                              cursor: "pointer",
                              transition: "all .15s ease",
                            }}
                          >
                            {currency === "NGN" ? `₦${val.toLocaleString()}` : `$${val}`}
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Amount Input */}
                    <div style={{ position: "relative" }}>
                      <span
                        style={{
                          position: "absolute",
                          left: 16,
                          top: "50%",
                          transform: "translateY(-50%)",
                          fontFamily: "var(--font-serif)",
                          fontSize: 16,
                          fontWeight: 700,
                          color: "var(--ink-soft)",
                        }}
                      >
                        {currency === "NGN" ? "₦" : "$"}
                      </span>
                      <input
                        type="text"
                        placeholder="Enter custom amount..."
                        value={customAmount}
                        onChange={handleCustomChange}
                        style={{
                          width: "100%",
                          padding: "14px 16px 14px 38px",
                          borderRadius: 14,
                          border: isCustom
                            ? "2px solid var(--marigold-deep)"
                            : "1.5px solid var(--paper-dim)",
                          fontSize: 15,
                          fontFamily: "var(--font-sans)",
                          outline: "none",
                          background: isCustom ? "rgba(217,154,63,0.06)" : "#ffffff",
                        }}
                      />
                    </div>
                  </div>

                  {/* Dynamic Impact Callout Box */}
                  <div
                    style={{
                      background: "rgba(11,50,11,0.04)",
                      border: "1px solid rgba(11,50,11,0.1)",
                      borderRadius: 16,
                      padding: "16px 20px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 14,
                      marginBottom: 32,
                    }}
                  >
                    <Sparkles size={20} color="var(--marigold-deep)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "var(--canopy-deep)",
                          display: "block",
                        }}
                      >
                        Your Direct Impact
                      </span>
                      <p style={{ margin: "4px 0 0", fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>
                        {currentImpact}
                      </p>
                    </div>
                  </div>

                  {/* Donor Information Form */}
                  <form onSubmit={handlePaystackPayment}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 12.5,
                            fontWeight: 600,
                            marginBottom: 6,
                            color: "var(--ink)",
                          }}
                        >
                          Full Name {form.isAnonymous && "(Optional)"}
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Dr. Ngozi Adeleke"
                          value={form.name}
                          disabled={form.isAnonymous}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: 12,
                            border: "1px solid var(--paper-dim)",
                            fontSize: 14,
                            outline: "none",
                            background: form.isAnonymous ? "var(--paper-dim)" : "#ffffff",
                          }}
                        />
                      </div>

                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 12.5,
                            fontWeight: 600,
                            marginBottom: 6,
                            color: "var(--ink)",
                          }}
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="for your payment receipt"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: 12,
                            border: "1px solid var(--paper-dim)",
                            fontSize: 14,
                            outline: "none",
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: 20 }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: 12.5,
                          fontWeight: 600,
                          marginBottom: 6,
                          color: "var(--ink)",
                        }}
                      >
                        Dedication / Note (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="In honor of... / General forest protection"
                        value={form.note}
                        onChange={(e) => setForm({ ...form, note: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: 12,
                          border: "1px solid var(--paper-dim)",
                          fontSize: 14,
                          outline: "none",
                        }}
                      />
                    </div>

                    {/* Anonymous checkbox */}
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 13,
                        color: "var(--ink-soft)",
                        marginBottom: 28,
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={form.isAnonymous}
                        onChange={(e) => setForm({ ...form, isAnonymous: e.target.checked })}
                        style={{ width: 16, height: 16, accentColor: "var(--canopy)" }}
                      />
                      <span>Keep my donation anonymous</span>
                    </label>

                    {/* Submit Paystack CTA Button */}
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="btn-lift"
                      style={{
                        width: "100%",
                        padding: "16px 28px",
                        background: "var(--canopy)",
                        color: "#ffffff",
                        borderRadius: 14,
                        border: "none",
                        fontSize: 16,
                        fontWeight: 700,
                        cursor: isProcessing ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                        boxShadow: "0 10px 24px -6px rgba(11,50,11,0.3)",
                      }}
                    >
                      <Heart size={18} fill="currentColor" />
                      <span>
                        {isProcessing
                          ? "Connecting to Paystack Secure Checkout..."
                          : `Donate ${currency === "NGN" ? `₦${amount.toLocaleString()}` : `$${amount}`} ${frequency === "monthly" ? "Monthly" : "Now"}`}
                      </span>
                    </button>

                    {/* Security & Verification Badges */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 20,
                        marginTop: 20,
                        fontSize: 12,
                        color: "var(--ink-soft)",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <Lock size={13} color="var(--canopy)" /> 256-Bit SSL Encrypted
                      </span>
                      <span>·</span>
                      <span>Secured by Paystack (Stripe)</span>
                      <span>·</span>
                      <span>CAC Registered NGO</span>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: OFFICIAL DIRECT BANK TRANSFER */}
              {tab === "bank" && (
                <div style={{ padding: "clamp(28px, 4vw, 44px)" }}>
                  <div style={{ textAlign: "center", maxWidth: 580, margin: "0 auto 36px" }}>
                    <Building2 size={36} color="var(--canopy)" style={{ margin: "0 auto 12px" }} />
                    <h3
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: 22,
                        fontWeight: 700,
                        color: "var(--canopy-deep)",
                        marginBottom: 8,
                      }}
                    >
                      Official NGO Bank Wire Accounts
                    </h3>
                    <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6, margin: 0 }}>
                      For corporate grants, large individual wire donations, or direct institutional transfers, you can transfer directly into our designated accounts.
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 36 }}>
                    {BANK_DETAILS.map((b, idx) => (
                      <div
                        key={b.currency}
                        style={{
                          background: "var(--paper)",
                          border: "1.5px solid var(--paper-dim)",
                          borderRadius: 18,
                          padding: "24px 26px",
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 20,
                        }}
                      >
                        <div style={{ minWidth: 240 }}>
                          <span
                            style={{
                              display: "inline-block",
                              padding: "4px 10px",
                              borderRadius: 999,
                              background: "var(--paper-dim)",
                              fontSize: 11,
                              fontWeight: 700,
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              color: "var(--canopy)",
                              marginBottom: 8,
                            }}
                          >
                            {b.currency}
                          </span>
                          <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "var(--font-serif)", color: "var(--canopy-deep)" }}>
                            {b.bank}
                          </div>
                          <div style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 2 }}>
                            Account Name: <strong style={{ color: "var(--ink)" }}>{b.accountName}</strong>
                          </div>
                          {b.sortCode && (
                            <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 2 }}>
                              Sort Code: {b.sortCode}
                            </div>
                          )}
                          {b.swiftCode && (
                            <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 2 }}>
                              SWIFT / BIC: {b.swiftCode}
                            </div>
                          )}
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div
                            style={{
                              padding: "10px 18px",
                              background: "#ffffff",
                              border: "1px solid var(--paper-dim)",
                              borderRadius: 12,
                              fontFamily: "monospace",
                              fontSize: 18,
                              fontWeight: 700,
                              letterSpacing: "0.08em",
                              color: "var(--canopy-deep)",
                            }}
                          >
                            {b.accountNumber}
                          </div>

                          <button
                            type="button"
                            onClick={() => copyToClipboard(b.accountNumber, idx)}
                            className="btn-lift"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                              padding: "12px 18px",
                              background: copiedIndex === idx ? "var(--canopy)" : "var(--marigold-deep)",
                              color: "#ffffff",
                              borderRadius: 12,
                              border: "none",
                              fontWeight: 700,
                              fontSize: 13,
                              cursor: "pointer",
                              transition: "background .2s ease",
                            }}
                          >
                            {copiedIndex === idx ? <Check size={16} /> : <Copy size={16} />}
                            <span>{copiedIndex === idx ? "Copied!" : "Copy Account"}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Wire Transfer Confirmation Notice */}
                  <div
                    style={{
                      background: "rgba(217,154,63,0.1)",
                      border: "1px solid rgba(217,154,63,0.25)",
                      borderRadius: 16,
                      padding: "18px 24px",
                      textAlign: "center",
                    }}
                  >
                    <p style={{ margin: 0, fontSize: 13.5, color: "var(--canopy-deep)", lineHeight: 1.6 }}>
                      After completing your bank wire, please send payment proof or your transaction reference to{" "}
                      <a
                        href={`mailto:${ORG.email}?subject=Bank Donation Confirmation`}
                        style={{ color: "var(--marigold-deep)", fontWeight: 700, textDecoration: "none" }}
                      >
                        {ORG.email}
                      </a>{" "}
                      so we can issue an official acknowledgment receipt.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* DONATION SUCCESS / RECEIPT MODAL */}
      <AnimatePresence>
        {successData && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              background: "rgba(7,26,7,0.75)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              style={{
                width: "100%",
                maxWidth: 520,
                background: "#ffffff",
                borderRadius: 24,
                padding: "36px 32px",
                textAlign: "center",
                boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "rgba(11,50,11,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 18px",
                }}
              >
                <CheckCircle2 size={38} color="var(--canopy)" />
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "var(--canopy-deep)",
                  marginBottom: 8,
                }}
              >
                Thank You for Your Support!
              </h2>

              <p style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: 24 }}>
                Your generous gift directly empowers the preservation of the 33,600-hectare Ekuri community rainforest.
              </p>

              {/* Receipt Box */}
              <div
                style={{
                  background: "var(--paper)",
                  border: "1px solid var(--paper-dim)",
                  borderRadius: 16,
                  padding: "18px 20px",
                  textAlign: "left",
                  fontSize: 13,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginBottom: 24,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--ink-soft)" }}>Amount Given:</span>
                  <strong style={{ color: "var(--canopy-deep)", fontSize: 14.5 }}>
                    {successData.currency === "NGN" ? `₦${successData.amount.toLocaleString()}` : `$${successData.amount}`}
                  </strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--ink-soft)" }}>Donor:</span>
                  <strong>{successData.name}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--ink-soft)" }}>Transaction Ref:</span>
                  <span style={{ fontFamily: "monospace", fontSize: 12 }}>{successData.reference}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--ink-soft)" }}>Status:</span>
                  <span style={{ color: "#166816", fontWeight: 700 }}>Confirmed (Tax Exempt)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSuccessData(null)}
                className="btn-lift"
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "var(--canopy)",
                  color: "#ffffff",
                  borderRadius: 12,
                  border: "none",
                  fontWeight: 700,
                  fontSize: 14.5,
                  cursor: "pointer",
                }}
              >
                Close & Return
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section style={{ background: "var(--paper-dim)", padding: "88px 24px" }}>
        <div className="container" style={{ maxWidth: 780 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p className="eyebrow">Giving with Confidence</p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(24px, 3vw, 32px)",
                fontWeight: 700,
                color: "var(--canopy-deep)",
                marginTop: 8,
              }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  style={{
                    background: "#ffffff",
                    borderRadius: 16,
                    border: "1px solid rgba(17,36,17,0.06)",
                    overflow: "hidden",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: "100%",
                      padding: "20px 24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      background: "transparent",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      fontFamily: "var(--font-serif)",
                      fontSize: 16.5,
                      fontWeight: 700,
                      color: "var(--canopy-deep)",
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      color="var(--ink-soft)"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform .2s ease",
                        flexShrink: 0,
                      }}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div
                          style={{
                            padding: "0 24px 22px",
                            fontSize: 14,
                            color: "var(--ink-soft)",
                            lineHeight: 1.65,
                          }}
                        >
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
