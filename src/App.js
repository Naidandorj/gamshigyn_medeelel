import { useState, useEffect } from "react";

// ============================================================
// INITIAL DATA
// ============================================================
const INITIAL_DISASTERS = [
  {
    id: 1,
    name: "Улаанбаатарын үер",
    type: "Үер",
    location: "Улаанбаатар, Хан-Уул дүүрэг",
    date: "2023-07-15",
    measures: "Иргэдийг нүүлгэн шилжүүлэх, эрэн хайх баг илгээх",
    risks: "100+ гэр өрх эрсдэлд орсон, 3 хүн амь насаа алдсан",
    lesson: "Урьдчилан сэрэмжлүүлэх систем шаардлагатай",
  },
  {
    id: 2,
    name: "Говийн ган",
    type: "Ган",
    location: "Өмнөговь аймаг",
    date: "2022-05-01",
    measures: "Малчдад тэжээл нийлүүлэх, усны нөөц бүрдүүлэх",
    risks: "50,000 мал хорогдсон, 300 өрх хохирсон",
    lesson: "Бэлчээр хамгаалах, усны нөөц бэлтгэх",
  },
  {
    id: 3,
    name: "Дорнодын зуд",
    type: "Зуд",
    location: "Дорнод аймаг",
    date: "2024-02-10",
    measures: "Нисдэг тэрэгээр тэжээл хүргэх, малчдыг нүүлгэх",
    risks: "Малын 30% хорогдсон, эдийн засгийн хохирол 2 тэрбум",
    lesson: "Өвөлжилтийн бэлтгэлийг эрт хийх шаардлагатай",
  },
];

const TYPES = ["Үер", "Ган", "Зуд", "Газар хөдлөлт", "Цөлжилт", "Түймэр", "Хүчтэй цас", "Шуурга", "Бусад"];

// ============================================================
// UTILS
// ============================================================
function generateId() {
  return Date.now() + Math.random();
}

function getTypeColor(type) {
  const map = {
    Үер: "#3b82f6",
    Ган: "#f59e0b",
    Зуд: "#8b5cf6",
    "Газар хөдлөлт": "#ef4444",
    Цөлжилт: "#84cc16",
    Түймэр: "#f97316",
    "Хүчтэй цас": "#06b6d4",
    Шуурга: "#64748b",
    Бусад: "#6b7280",
  };
  return map[type] || "#6b7280";
}

// ============================================================
// COMPONENTS
// ============================================================

function Badge({ type }) {
  return (
    <span
      style={{
        background: getTypeColor(type) + "22",
        color: getTypeColor(type),
        border: `1px solid ${getTypeColor(type)}55`,
        borderRadius: 20,
        padding: "2px 10px",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.5,
        whiteSpace: "nowrap",
      }}
    >
      {type}
    </span>
  );
}

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0f172a",
          border: "1px solid #1e293b",
          borderRadius: 20,
          padding: 28,
          width: "100%",
          maxWidth: 520,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function FormField({ label, required, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", color: "#94a3b8", fontSize: 12, fontWeight: 600, marginBottom: 5, letterSpacing: 0.8, textTransform: "uppercase" }}>
        {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  background: "#1e293b",
  border: "1px solid #334155",
  borderRadius: 10,
  color: "#f1f5f9",
  padding: "10px 12px",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

// ============================================================
// DISASTER FORM
// ============================================================
function DisasterForm({ initial, onSave, onCancel }) {
  const empty = { name: "", type: TYPES[0], location: "", date: "", measures: "", risks: "", lesson: "" };
  const [form, setForm] = useState(initial || empty);

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  function handleSave() {
    if (!form.name || !form.location || !form.date) {
      alert("Нэр, байршил, огноо заавал бөглөнө!");
      return;
    }
    onSave(form);
  }

  return (
    <div>
      <h2 style={{ color: "#f1f5f9", fontSize: 18, fontWeight: 800, marginBottom: 20, marginTop: 0 }}>
        {initial ? "✏️ Мэдээлэл засах" : "➕ Гамшиг нэмэх"}
      </h2>

      <FormField label="Гамшгийн нэр" required>
        <input style={inputStyle} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Жишээ: Улаанбаатарын үер" />
      </FormField>

      <FormField label="Төрөл" required>
        <select style={inputStyle} value={form.type} onChange={(e) => set("type", e.target.value)}>
          {TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </FormField>

      <FormField label="Байршил" required>
        <input style={inputStyle} value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="Аймаг, дүүрэг, байршил" />
      </FormField>

      <FormField label="Огноо" required>
        <input style={{ ...inputStyle, colorScheme: "dark" }} type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
      </FormField>

      <FormField label="Авсан арга хэмжээ">
        <textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} value={form.measures} onChange={(e) => set("measures", e.target.value)} placeholder="Яаралтай арга хэмжээ..." />
      </FormField>

      <FormField label="Болсон эрсдэл">
        <textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} value={form.risks} onChange={(e) => set("risks", e.target.value)} placeholder="Хохирол, эрсдэлийн мэдээлэл..." />
      </FormField>

      <FormField label="Сургамж">
        <textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} value={form.lesson} onChange={(e) => set("lesson", e.target.value)} placeholder="Ирээдүйд авах арга хэмжээ..." />
      </FormField>

      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button
          onClick={handleSave}
          style={{ flex: 1, background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", color: "#fff", border: "none", borderRadius: 12, padding: "12px 0", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
        >
          Хадгалах
        </button>
        <button
          onClick={onCancel}
          style={{ flex: 1, background: "#1e293b", color: "#94a3b8", border: "1px solid #334155", borderRadius: 12, padding: "12px 0", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
        >
          Болих
        </button>
      </div>
    </div>
  );
}

// ============================================================
// DETAIL VIEW
// ============================================================
function DetailView({ disaster, onEdit, onDelete, onClose, isAdmin }) {
  const rows = [
    { icon: "🏷️", label: "Төрөл", value: <Badge type={disaster.type} /> },
    { icon: "📍", label: "Байршил", value: disaster.location },
    { icon: "📅", label: "Огноо", value: disaster.date },
    { icon: "🚨", label: "Арга хэмжээ", value: disaster.measures },
    { icon: "⚠️", label: "Эрсдэл", value: disaster.risks },
    { icon: "📖", label: "Сургамж", value: disaster.lesson },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <h2 style={{ color: "#f1f5f9", fontSize: 17, fontWeight: 800, margin: 0, flex: 1, marginRight: 10 }}>{disaster.name}</h2>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748b", fontSize: 22, cursor: "pointer", padding: 0 }}>✕</button>
      </div>

      {rows.map((r) => (
        <div key={r.label} style={{ borderBottom: "1px solid #1e293b", paddingBottom: 12, marginBottom: 12 }}>
          <div style={{ color: "#64748b", fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 4 }}>
            {r.icon} {r.label}
          </div>
          <div style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.5 }}>{r.value || "—"}</div>
        </div>
      ))}

      {isAdmin && (
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button
            onClick={onEdit}
            style={{ flex: 1, background: "#1e40af22", color: "#60a5fa", border: "1px solid #1e40af55", borderRadius: 10, padding: "10px 0", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
          >
            ✏️ Засах
          </button>
          <button
            onClick={onDelete}
            style={{ flex: 1, background: "#7f1d1d22", color: "#f87171", border: "1px solid #7f1d1d55", borderRadius: 10, padding: "10px 0", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
          >
            🗑️ Устгах
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// CARD
// ============================================================
function DisasterCard({ disaster, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: 16,
        padding: 16,
        cursor: "pointer",
        transition: "all 0.2s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = getTypeColor(disaster.type) + "88"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.transform = "none"; }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${getTypeColor(disaster.type)}, transparent)` }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <span style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 15, flex: 1, marginRight: 8 }}>{disaster.name}</span>
        <Badge type={disaster.type} />
      </div>
      <div style={{ color: "#64748b", fontSize: 12, marginBottom: 4 }}>📍 {disaster.location}</div>
      <div style={{ color: "#64748b", fontSize: 12, marginBottom: 8 }}>📅 {disaster.date}</div>
      {disaster.lesson && (
        <div style={{ background: "#1e293b", borderRadius: 8, padding: "6px 10px", color: "#94a3b8", fontSize: 12, lineHeight: 1.4 }}>
          📖 {disaster.lesson.length > 80 ? disaster.lesson.slice(0, 80) + "…" : disaster.lesson}
        </div>
      )}
    </div>
  );
}

// ============================================================
// LOGIN SCREEN
// ============================================================
function LoginScreen({ onLogin }) {
  const [mode, setMode] = useState("user"); // "user" | "admin"
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const ADMIN_PASS = "admin123";

  function handleLogin() {
    if (mode === "admin" && pass !== ADMIN_PASS) {
      setErr("Нууц үг буруу!");
      return;
    }
    onLogin(mode);
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#020817",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: 24,
      backgroundImage: "radial-gradient(ellipse at 20% 50%, #1e3a5f22 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #3b0764 0%, transparent 50%)",
    }}>
      <div style={{ marginBottom: 40, textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🌪️</div>
        <h1 style={{ color: "#f1f5f9", fontSize: 26, fontWeight: 900, margin: 0, letterSpacing: -0.5 }}>
          Гамшгийн Мэдээллийн Сан
        </h1>
        <p style={{ color: "#475569", fontSize: 13, marginTop: 6 }}>Монгол Улсын гамшгийн бүртгэл</p>
      </div>

      <div style={{ width: "100%", maxWidth: 340, background: "#0f172a", border: "1px solid #1e293b", borderRadius: 24, padding: 28 }}>
        <div style={{ display: "flex", background: "#020817", borderRadius: 12, padding: 4, marginBottom: 24 }}>
          {["user", "admin"].map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setErr(""); setPass(""); }}
              style={{
                flex: 1, padding: "10px 0", borderRadius: 10, border: "none",
                background: mode === m ? "linear-gradient(135deg,#3b82f6,#8b5cf6)" : "transparent",
                color: mode === m ? "#fff" : "#64748b",
                fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.2s",
              }}
            >
              {m === "user" ? "👤 Хэрэглэгч" : "🔐 Админ"}
            </button>
          ))}
        </div>

        {mode === "admin" && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6, letterSpacing: 0.8, textTransform: "uppercase" }}>
              Нууц үг
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => { setPass(e.target.value); setErr(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Нууц үг оруулна уу"
              style={{ ...inputStyle, marginBottom: 0 }}
            />
            {err && <div style={{ color: "#f87171", fontSize: 12, marginTop: 6 }}>{err}</div>}
            <div style={{ color: "#334155", fontSize: 11, marginTop: 4 }}>Туршилтын нууц үг: admin123</div>
          </div>
        )}

        <button
          onClick={handleLogin}
          style={{
            width: "100%", background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
            color: "#fff", border: "none", borderRadius: 12, padding: "13px 0",
            fontWeight: 800, fontSize: 15, cursor: "pointer",
            boxShadow: "0 8px 24px rgba(99,102,241,0.35)",
          }}
        >
          Нэвтрэх →
        </button>
      </div>
    </div>
  );
}

// ============================================================
// STATS
// ============================================================
function StatsBar({ disasters }) {
  const byType = disasters.reduce((acc, d) => { acc[d.type] = (acc[d.type] || 0) + 1; return acc; }, {});
  const topType = Object.entries(byType).sort((a, b) => b[1] - a[1])[0];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 20 }}>
      {[
        { label: "Нийт гамшиг", value: disasters.length, icon: "📊" },
        { label: "Төрөл", value: Object.keys(byType).length, icon: "🏷️" },
        { label: "Хамгийн их", value: topType ? topType[0] : "—", icon: "⚠️", small: true },
      ].map((s) => (
        <div key={s.label} style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 14, padding: "12px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
          <div style={{ color: "#f1f5f9", fontWeight: 800, fontSize: s.small ? 11 : 20 }}>{s.value}</div>
          <div style={{ color: "#475569", fontSize: 10, marginTop: 2 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [role, setRole] = useState(null);
  const [disasters, setDisasters] = useState(() => {
    try {
      const saved = localStorage.getItem("disasters_mn");
      return saved ? JSON.parse(saved) : INITIAL_DISASTERS;
    } catch { return INITIAL_DISASTERS; }
  });
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("Бүгд");
  const [modal, setModal] = useState(null); // null | {type: "add"|"edit"|"detail", data?}
  const [activeTab, setActiveTab] = useState("list");

  useEffect(() => {
    try { localStorage.setItem("disasters_mn", JSON.stringify(disasters)); } catch {}
  }, [disasters]);

  const isAdmin = role === "admin";

  function handleAdd(form) {
    setDisasters((d) => [...d, { ...form, id: generateId() }]);
    setModal(null);
  }

  function handleEdit(form) {
    setDisasters((d) => d.map((x) => (x.id === modal.data.id ? { ...form, id: x.id } : x)));
    setModal(null);
  }

  function handleDelete(id) {
    if (!confirm("Энэ гамшгийн бичлэгийг устгах уу?")) return;
    setDisasters((d) => d.filter((x) => x.id !== id));
    setModal(null);
  }

  const filtered = disasters.filter((d) => {
    const matchType = filterType === "Бүгд" || d.type === filterType;
    const matchSearch = !search || [d.name, d.location, d.type, d.lesson, d.risks].some(
      (f) => f && f.toLowerCase().includes(search.toLowerCase())
    );
    return matchType && matchSearch;
  });

  if (!role) return <LoginScreen onLogin={setRole} />;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#020817",
      color: "#f1f5f9",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      paddingBottom: 80,
    }}>
      {/* HEADER */}
      <div style={{
        background: "linear-gradient(135deg,#0f172a,#1e1b4b)",
        borderBottom: "1px solid #1e293b",
        padding: "16px 16px 12px",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, color: "#475569" }}>🌪️ Гамшгийн Мэдээллийн Сан</div>
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#f1f5f9" }}>
              {isAdmin ? "🔐 Админ хэсэг" : "👤 Хэрэглэгч хэсэг"}
            </h1>
          </div>
          <button
            onClick={() => setRole(null)}
            style={{ background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", borderRadius: 10, padding: "7px 12px", fontSize: 12, cursor: "pointer", fontWeight: 600 }}
          >
            Гарах
          </button>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {/* STATS */}
        <StatsBar disasters={disasters} />

        {/* SEARCH */}
        <div style={{ position: "relative", marginBottom: 12 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#475569", fontSize: 16 }}>🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Хайх... (нэр, байршил, сургамж)"
            style={{ ...inputStyle, paddingLeft: 36 }}
          />
        </div>

        {/* FILTER */}
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8, marginBottom: 16, scrollbarWidth: "none" }}>
          {["Бүгд", ...TYPES].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              style={{
                whiteSpace: "nowrap",
                padding: "6px 14px",
                borderRadius: 20,
                border: filterType === t ? "none" : "1px solid #1e293b",
                background: filterType === t
                  ? (t === "Бүгд" ? "linear-gradient(135deg,#3b82f6,#8b5cf6)" : getTypeColor(t))
                  : "#0f172a",
                color: filterType === t ? "#fff" : "#64748b",
                fontWeight: 600,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", color: "#334155", padding: 40 }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🔍</div>
              <div>Илэрц олдсонгүй</div>
            </div>
          )}
          {filtered.map((d) => (
            <DisasterCard
              key={d.id}
              disaster={d}
              onClick={() => setModal({ type: "detail", data: d })}
            />
          ))}
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "#0f172a",
        borderTop: "1px solid #1e293b",
        display: "flex",
        padding: "10px 16px 16px",
        gap: 12,
      }}>
        {isAdmin && (
          <button
            onClick={() => setModal({ type: "add" })}
            style={{
              flex: 1,
              background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
              color: "#fff",
              border: "none",
              borderRadius: 14,
              padding: "13px 0",
              fontWeight: 800,
              fontSize: 15,
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(99,102,241,0.4)",
            }}
          >
            ➕ Гамшиг нэмэх
          </button>
        )}
        {!isAdmin && (
          <div style={{ flex: 1, textAlign: "center", color: "#334155", fontSize: 12, padding: "10px 0" }}>
            👁️ Зөвхөн үзэх эрхтэй • {filtered.length} гамшиг
          </div>
        )}
      </div>

      {/* MODALS */}
      <Modal open={modal?.type === "add"} onClose={() => setModal(null)}>
        <DisasterForm onSave={handleAdd} onCancel={() => setModal(null)} />
      </Modal>

      <Modal open={modal?.type === "edit"} onClose={() => setModal(null)}>
        <DisasterForm initial={modal?.data} onSave={handleEdit} onCancel={() => setModal(null)} />
      </Modal>

      <Modal open={modal?.type === "detail"} onClose={() => setModal(null)}>
        {modal?.data && (
          <DetailView
            disaster={modal.data}
            isAdmin={isAdmin}
            onEdit={() => setModal({ type: "edit", data: modal.data })}
            onDelete={() => handleDelete(modal.data.id)}
            onClose={() => setModal(null)}
          />
        )}
      </Modal>
    </div>
  );
}
