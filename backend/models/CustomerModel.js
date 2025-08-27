const mongoose = require("mongoose");

// small helper to convert a name into slug
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

// compute a base string for slug
function getSlugBase(doc) {
  const fromName = (doc.name && doc.name.trim()) || (doc.penname && doc.penname.trim());
  if (fromName) return slugify(fromName);
  if (doc.email) return slugify(String(doc.email).split("@")[0]);
  return slugify(doc._id?.toString() || "");
}

const customerschema = new mongoose.Schema({
  name: { type: String, default: "" },
  penname: { type: String, default: "" },
  email: { type: String, default: "" },
  password: { type: String, default: "" , select: false }, // never expose by default
  contact: { type: Number, default: 0 },
  address: { type: String, default: "N/A" },
  bio: { type: String, default: "" },
  facebook: { type: String },
  linkdin: { type: String },   // consider alias: 'linkedin'
  twiter: { type: String },    // consider alias: 'twitter'
  instagram: { type: String },
  Image: { type: String },     // consider 'image'
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: "user", default: null },
  verificationToken: String,
  tokenExpirationTime: Date,
  bedgeverify: { type: Boolean, default: 0 },
  otp: { type: String, default: null },
  otpExpiration: { type: Date, default: null },
  isVerified: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },

  // SEO slug field
  slug: { type: String, unique: true, index: true }
}, {
  timestamps: false
});

// Ensure unique index explicitly (useful if autoIndex is off in prod)
customerschema.index({ slug: 1 }, { unique: true });

/**
 * Create slug on first save only (immutable).
 * If you want slug to change when name/penname change, set IMMUTABLE_SLUG=false.
 */
const IMMUTABLE_SLUG = true;
const MAX_SLUG_LEN = 60;

customerschema.pre("validate", async function(next) {
  try {
    // Only set if new or slug is empty, or immutability disabled
    const shouldGenerate =
      !this.slug || this.isNew || (!IMMUTABLE_SLUG && (this.isModified("name") || this.isModified("penname")));

    if (!shouldGenerate) return next();

    // base
    const baseRaw = getSlugBase(this) || "user";
    const base = baseRaw.slice(0, MAX_SLUG_LEN);

    // Build regex: ^base(-NUMBER)?$
    const esc = base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`^${esc}(?:-(\\d+))?$`, "i");

    // Find all existing slugs matching this base
    const rows = await mongoose.models.Customer
      .find({ slug: { $regex: regex } }, { slug: 1 })
      .lean();

    if (!rows.length) {
      this.slug = base;
      return next();
    }

    // Collect used numeric suffixes
    const used = new Set();
    for (const r of rows) {
      const m = String(r.slug).toLowerCase().match(regex);
      used.add(m && m[1] ? Number(m[1]) : 0);
    }

    // Find smallest free suffix
    let n = 1;
    while (used.has(n)) n++;

    // Ensure space for suffix when base already at limit
    const suffix = `-${n}`;
    const trimmedBase = base.slice(0, Math.max(0, MAX_SLUG_LEN - suffix.length));
    this.slug = `${trimmedBase}${suffix}`;

    next();
  } catch (err) {
    next(err);
  }
});

// Optional safety net: convert duplicate-key into a clean retry once
customerschema.post("save", async function(doc, next) {
  // if two docs raced, one may get E11000; this hook won't see it.
  // Keep as comment to show intent; dups are best handled where you call create().
  next();
});

module.exports = mongoose.model("Customer", customerschema);
