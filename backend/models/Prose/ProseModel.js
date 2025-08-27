const mongoose = require('mongoose');

const proseschema = new mongoose.Schema({
  title: { type: String, default: null, required: true },
  prose: { type: String, default: null, required: true },
  language: { type: String, default: null, required: true },
  Image: { type: String, default: "no-image.jpg" },
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'user', default: null },
  Category_id: { type: mongoose.SchemaTypes.ObjectId, ref: 'prose_Category', default: null },
  tags: [{ type: String }],
  status: { type: Boolean, default: true },
  isApproved: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now() },

  // NEW FIELD
  slug: { type: String, required: true, unique: true, index: true },
});

// Clean prose content
proseschema.pre("save", function (next) {
  if (this.prose && typeof this.prose === "string") {
    this.prose = this.prose.replace(/<\/?p>/g, ""); // remove <p> and </p>
  }
  next();
});

// Helper: Unicode-safe slug generator
function toSlug(str) {
  return String(str)
    .normalize("NFKC")                // normalize Unicode
    .toLowerCase()                    // lowercase for latin scripts
    .replace(/[\s\-_]+/g, "-")        // spaces/underscores → hyphen
    .replace(/[^\p{L}\p{N}-]+/gu, "") // keep letters/numbers/hyphen only (Unicode aware)
    .replace(/-+/g, "-")              // collapse multiple hyphens
    .replace(/^-|-$/g, "");           // trim hyphens
}

// Pre-validate: generate unique slug from title
proseschema.pre("validate", async function (next) {
  if (!this.title) return next(new Error("Title is required to generate slug"));

  if (this.isNew || this.isModified("title") || !this.slug) {
    let base = toSlug(this.title);
    if (!base) base = "untitled";

    const regex = new RegExp(`^${base}(?:-(\\d+))?$`, "u");
    const existing = await this.constructor.find({ slug: regex }, { slug: 1 }).lean();

    if (existing.length === 0) {
      this.slug = base;
      return next();
    }

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

module.exports = mongoose.model("prose", proseschema);
