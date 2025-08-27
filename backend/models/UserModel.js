const mongoose = require("mongoose");

// Helper function
function slugify(text) {
  return String(text || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

const userschema = new mongoose.Schema({
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  password: { type: String, default: "" },
  userType: { type: Number, default: 2 }, // 1= admin, 2=customer
  Image: { type: String, default: "" },
  created_at: { type: Date, default: Date.now() },
  verificationToken: String,
  tokenExpirationTime: Date,
  tokenVerificationTime: { type: Date, default: null },
  bedgeverify: { type: Boolean, default: 0 },
  otp: { type: String, default: null },
  otpExpiration: { type: Date, default: null },
  passwordResetTime: { type: Date, default: null },
  status: { type: Boolean, default: 0 },

  // Add slug field
  slug: { type: String, unique: true, index: true },
});

// Unique index
userschema.index({ slug: 1 }, { unique: true });

const IMMUTABLE_SLUG = true;
const MAX_SLUG_LEN = 60;

userschema.pre("validate", async function (next) {
  try {
    const shouldGenerate =
      !this.slug ||
      this.isNew ||
      (!IMMUTABLE_SLUG && this.isModified("name"));

    if (!shouldGenerate) return next();

    const baseRaw = slugify(this.name) || slugify(this.email.split("@")[0]) || "user";
    const base = baseRaw.slice(0, MAX_SLUG_LEN);

    const esc = base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`^${esc}(?:-(\\d+))?$`, "i");

    // Check slugs in BOTH collections (User + Customer)
    const userRows = await mongoose.models.user.find(
      { slug: { $regex: regex } },
      { slug: 1 }
    ).lean();

    const customerRows = await mongoose.models.Customer.find(
      { slug: { $regex: regex } },
      { slug: 1 }
    ).lean();

    const rows = [...userRows, ...customerRows];

    if (!rows.length) {
      this.slug = base;
      return next();
    }

    const used = new Set();
    for (const r of rows) {
      const m = String(r.slug).toLowerCase().match(regex);
      used.add(m && m[1] ? Number(m[1]) : 0);
    }

    let n = 1;
    while (used.has(n)) n++;

    const suffix = `-${n}`;
    const trimmedBase = base.slice(0, Math.max(0, MAX_SLUG_LEN - suffix.length));
    this.slug = `${trimmedBase}${suffix}`;

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("user", userschema);
