import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Building2,
  Smartphone,
  Lock,
  X,
  Copy,
  Check,
  ShieldCheck,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

/**
 * Realistic Paystack Checkout Experience
 * Provides an authentic Paystack payment modal with Card, Direct Bank Transfer,
 * and USSD options for donors.
 */
export default function PaystackModal({
  isOpen,
  onClose,
  amount,
  currency,
  donorName,
  donorEmail,
  onSuccess,
}) {
  const [channel, setChannel] = useState("card"); // "card" | "transfer" | "ussd"
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [selectedBank, setSelectedBank] = useState("gtb");
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Timer for transfer window (30 mins countdown)
  const [timeLeft, setTimeLeft] = useState(1795); // seconds

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const formattedMinutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const formattedSeconds = String(timeLeft % 60).padStart(2, "0");

  const formattedAmount =
    currency === "NGN" ? `₦${amount.toLocaleString()}` : `$${amount.toLocaleString()}`;

  // Autofill test card for rapid demonstration
  const handleAutofillTestCard = () => {
    setCardNumber("4084 0840 8408 4084");
    setCardExpiry("12/28");
    setCardCvv("408");
  };

  const handleCompletePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const generatedRef = `PSTK_${Date.now()}_${Math.floor(Math.random() * 899999 + 100000)}`;
      onSuccess(generatedRef);
    }, 1800);
  };

  const copyTransferAccount = () => {
    navigator.clipboard.writeText("8092384719");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(3, 14, 5, 0.75)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 16 }}
        transition={{ duration: 0.25 }}
        style={{
          width: "100%",
          maxWidth: 620,
          background: "#ffffff",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.4)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* PAYSTACK HEADER */}
        <div
          style={{
            background: "#011b33",
            color: "#ffffff",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "rgba(255, 255, 255, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 6,
              }}
            >
              <img
                src="/assets/img/ekuri-logo.png"
                alt="Ekuri Initiative"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 700, letterSpacing: "-0.01em" }}>
                The Ekuri Initiative
              </div>
              <div style={{ fontSize: 12, color: "rgba(255, 255, 255, 0.7)" }}>
                {donorEmail || "donor@ekuri.org"}
              </div>
            </div>
          </div>

          <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#00c3f7", fontWeight: 700 }}>
                Amount to Pay
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "var(--font-serif)", color: "#ffffff" }}>
                {formattedAmount}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: "rgba(255, 255, 255, 0.12)",
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                cursor: "pointer",
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* PAYSTACK BODY: SIDEBAR + CONTENT */}
        <div style={{ display: "grid", gridTemplateColumns: "190px 1fr", minHeight: 380 }}>
          {/* LEFT CHANNEL SELECTION BAR */}
          <div
            style={{
              background: "#f4f6f8",
              borderRight: "1px solid #e1e6eb",
              padding: "16px 10px",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#6c7a89",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                padding: "4px 10px 8px",
              }}
            >
              Pay With
            </span>

            <button
              type="button"
              onClick={() => setChannel("card")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 14px",
                borderRadius: 12,
                border: "none",
                background: channel === "card" ? "#0ba4db" : "transparent",
                color: channel === "card" ? "#ffffff" : "#2c3e50",
                fontWeight: 700,
                fontSize: 13.5,
                textAlign: "left",
                cursor: "pointer",
                transition: "all .15s ease",
              }}
            >
              <CreditCard size={17} />
              <span>Card</span>
            </button>

            <button
              type="button"
              onClick={() => setChannel("transfer")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 14px",
                borderRadius: 12,
                border: "none",
                background: channel === "transfer" ? "#0ba4db" : "transparent",
                color: channel === "transfer" ? "#ffffff" : "#2c3e50",
                fontWeight: 700,
                fontSize: 13.5,
                textAlign: "left",
                cursor: "pointer",
                transition: "all .15s ease",
              }}
            >
              <Building2 size={17} />
              <span>Transfer</span>
            </button>

            <button
              type="button"
              onClick={() => setChannel("ussd")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 14px",
                borderRadius: 12,
                border: "none",
                background: channel === "ussd" ? "#0ba4db" : "transparent",
                color: channel === "ussd" ? "#ffffff" : "#2c3e50",
                fontWeight: 700,
                fontSize: 13.5,
                textAlign: "left",
                cursor: "pointer",
                transition: "all .15s ease",
              }}
            >
              <Smartphone size={17} />
              <span>USSD</span>
            </button>

            <div style={{ marginTop: "auto", padding: "10px", textAlign: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: "#6c7a89" }}>
                <Lock size={12} color="#0ba4db" /> Secured by Paystack
              </div>
            </div>
          </div>

          {/* RIGHT CHANNEL DETAIL CONTAINER */}
          <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column" }}>
            {/* PROCESSING OVERLAY */}
            {isProcessing ? (
              <div
                style={{
                  height: "100%",
                  minHeight: 280,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    border: "3px solid #e1e6eb",
                    borderTopColor: "#0ba4db",
                    marginBottom: 16,
                  }}
                />
                <h4 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 6px", color: "#011b33" }}>
                  Verifying with Bank...
                </h4>
                <p style={{ fontSize: 13, color: "#6c7a89", margin: 0 }}>
                  Please wait while Paystack confirms your transaction.
                </p>
              </div>
            ) : (
              <>
                {/* 1. CARD PAYMENT TAB */}
                {channel === "card" && (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                      <label style={{ fontSize: 12.5, fontWeight: 700, color: "#2c3e50" }}>
                        CARD NUMBER
                      </label>
                      <button
                        type="button"
                        onClick={handleAutofillTestCard}
                        style={{
                          fontSize: 11.5,
                          fontWeight: 700,
                          color: "#0ba4db",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Sparkles size={13} /> Autofill Test Card
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="4084 0840 8408 4084"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: 10,
                        border: "1.5px solid #dce2e6",
                        fontSize: 15,
                        fontFamily: "monospace",
                        letterSpacing: "0.08em",
                        marginBottom: 16,
                        outline: "none",
                      }}
                    />

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#2c3e50", marginBottom: 6 }}>
                          CARD EXPIRY
                        </label>
                        <input
                          type="text"
                          placeholder="MM / YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: 10,
                            border: "1.5px solid #dce2e6",
                            fontSize: 14,
                            outline: "none",
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#2c3e50", marginBottom: 6 }}>
                          CVV
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="123"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: 10,
                            border: "1.5px solid #dce2e6",
                            fontSize: 14,
                            outline: "none",
                          }}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCompletePayment}
                      style={{
                        width: "100%",
                        padding: "14px",
                        background: "#0ba4db",
                        color: "#ffffff",
                        borderRadius: 10,
                        border: "none",
                        fontSize: 15,
                        fontWeight: 700,
                        cursor: "pointer",
                        boxShadow: "0 4px 14px rgba(11, 164, 219, 0.4)",
                      }}
                    >
                      Pay {formattedAmount}
                    </button>
                  </div>
                )}

                {/* 2. DIRECT BANK TRANSFER TAB */}
                {channel === "transfer" && (
                  <div>
                    <div style={{ textAlign: "center", marginBottom: 16 }}>
                      <p style={{ fontSize: 13, color: "#2c3e50", margin: "0 0 4px", fontWeight: 600 }}>
                        Transfer {formattedAmount} to the dynamic account below:
                      </p>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: "#e67e22", fontWeight: 700 }}>
                        <Clock size={13} /> Expires in {formattedMinutes}:{formattedSeconds}
                      </div>
                    </div>

                    {/* Virtual Account Box */}
                    <div
                      style={{
                        background: "#f7fafc",
                        border: "1.5px dashed #cbd5e0",
                        borderRadius: 14,
                        padding: "16px 20px",
                        marginBottom: 20,
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: 12, textTransform: "uppercase", color: "#718096", fontWeight: 700 }}>
                        Bank Name
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#1a202c", marginBottom: 10 }}>
                        Wema Bank / Titan (Paystack)
                      </div>

                      <div style={{ fontSize: 12, textTransform: "uppercase", color: "#718096", fontWeight: 700 }}>
                        Account Number
                      </div>
                      <div
                        style={{
                          fontSize: 24,
                          fontWeight: 800,
                          fontFamily: "monospace",
                          color: "#011b33",
                          letterSpacing: "0.1em",
                          margin: "4px 0 10px",
                        }}
                      >
                        8092 384 719
                      </div>

                      <button
                        type="button"
                        onClick={copyTransferAccount}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "6px 14px",
                          borderRadius: 8,
                          background: copied ? "#27ae60" : "#0ba4db",
                          color: "#ffffff",
                          border: "none",
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copied ? "Account Copied!" : "Copy Account Number"}</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleCompletePayment}
                      style={{
                        width: "100%",
                        padding: "14px",
                        background: "#27ae60",
                        color: "#ffffff",
                        borderRadius: 10,
                        border: "none",
                        fontSize: 15,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      I have sent {formattedAmount}
                    </button>
                  </div>
                )}

                {/* 3. USSD PAYMENT TAB */}
                {channel === "ussd" && (
                  <div>
                    <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#2c3e50", marginBottom: 8 }}>
                      CHOOSE YOUR BANK
                    </label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: 10,
                        border: "1.5px solid #dce2e6",
                        fontSize: 14,
                        marginBottom: 18,
                        outline: "none",
                        background: "#ffffff",
                      }}
                    >
                      <option value="gtb">Guaranty Trust Bank (GTBank - *737#)</option>
                      <option value="zenith">Zenith Bank (*966#)</option>
                      <option value="access">Access Bank (*901#)</option>
                      <option value="firstbank">First Bank (*894#)</option>
                      <option value="uba">United Bank for Africa (UBA - *919#)</option>
                    </select>

                    <div
                      style={{
                        background: "#f7fafc",
                        border: "1px solid #e1e6eb",
                        borderRadius: 12,
                        padding: "16px",
                        textAlign: "center",
                        marginBottom: 20,
                      }}
                    >
                      <div style={{ fontSize: 12, color: "#6c7a89", marginBottom: 4 }}>
                        Dial the following code on your phone:
                      </div>
                      <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "monospace", color: "#011b33" }}>
                        {selectedBank === "gtb" && `*737*000*${amount}#`}
                        {selectedBank === "zenith" && `*966*000*${amount}#`}
                        {selectedBank === "access" && `*901*000*${amount}#`}
                        {selectedBank === "firstbank" && `*894*000*${amount}#`}
                        {selectedBank === "uba" && `*919*000*${amount}#`}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCompletePayment}
                      style={{
                        width: "100%",
                        padding: "14px",
                        background: "#0ba4db",
                        color: "#ffffff",
                        borderRadius: 10,
                        border: "none",
                        fontSize: 15,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      I have dialed the USSD code
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
