const mongoose = require("mongoose");

const sherschema = new mongoose.Schema({
  title: { type: String, required: true, default: null },
  sher: { type: String, required: true, default: null },
  language: { type: String, required: true, default: null },
  Image: { type: String, default: "no-image.jpg" },
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: "user", default: null },
  Category_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "sher_Category",
    default: null,
  },
  tags: [{ type: String }],
  status: { type: Boolean, default: true },
  isApproved: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now() },

  // NEW:
  slug: { type: String, required: true, unique: true, index: true },
});

// Preserve line breaks in `sher`
sherschema.pre("save", function (next) {
  if (this.sher && typeof this.sher === "string") {
    this.sher = this.sher.replace(/<\/?p>/g, "\n");
    this.sher = this.sher.replace(/<br\s*\/?>/gi, "\n");
  }
  next();
});

// Helper: Unicode-safe slug generator (keeps Hindi letters)
function toSlug(str) {
  return String(str)
    .normalize("NFKC")                // normalize unicode
    .toLowerCase()                    // case-insensitive for latin scripts
    .replace(/[\s\-_]+/g, "-")        // spaces/underscores → hyphen
    .replace(/[^\p{L}\p{N}-]+/gu, "") // keep letters/numbers/hyphen only (Unicode aware)
    .replace(/-+/g, "-")              // collapse multiple hyphens
    .replace(/^-|-$/g, "");           // trim hyphens at ends
}

// Ensure slug exists & is unique; update if title changed
sherschema.pre("validate", async function (next) {
  if (!this.title) return next(new Error("Title is required to generate slug"));

  // Only (re)generate if new or title modified or slug missing
  if (this.isNew || this.isModified("title") || !this.slug) {
    let base = toSlug(this.title);
    if (!base) base = "untitled";

    // Find conflicting slugs (including numbered variants)
    const regex = new RegExp(`^${base}(?:-(\\d+))?$`, "u");

    const existing = await this.constructor.find({ slug: regex }, { slug: 1 }).lean();

    if (existing.length === 0) {
      this.slug = base;
      return next();
    }

    // Determine next available numeric suffix
    const taken = new Set(existing.map(d => d.slug));
    if (!taken.has(base)) {
      this.slug = base;
      return next();
    }

    let i = 2;
    while (taken.has(`${base}-${i}`)) i++;
    this.slug = `${base}-${i}`;
  }

  next();
});

module.exports = mongoose.model("sher", sherschema);
