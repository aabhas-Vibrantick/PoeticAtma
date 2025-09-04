const mongoose = require("mongoose");

const blogschema = new mongoose.Schema({
  title: { type: String, default: null, required: true },
  description: { type: String, default: null },
  blog: { type: String, default: null },
  Image: { type: String, default: "no-image.jpg" },
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: "user", default: null },
  Category_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Blog_Category",
    default: null,
  },
  status: { type: Boolean, default: true },
  tags: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },

  // NEW FIELD
  slug: { type: String, required: true, unique: true, index: true },
});


blogschema.pre("save", function (next) {
  if (this.blog && typeof this.blog === "string") {
    this.blog = this.blog.replace(/<\/?p>/g, "\n");
    this.blog = this.blog.replace(/<br\s*\/?>/gi, "\n");
  }
  next();
});

// Helper: Unicode-safe slug generator
function toSlug(str) {
  return String(str)
    .normalize("NFKC")                // normalize Unicode
    .toLowerCase()
    .replace(/[\s\-_]+/g, "-")        // spaces/underscores → hyphen
    .replace(/[^\p{L}\p{N}-]+/gu, "") // keep letters/numbers/hyphen (Unicode safe)
    .replace(/-+/g, "-")              // collapse multiple hyphens
    .replace(/^-|-$/g, "");           // trim hyphens
}

// Pre-validate: generate unique slug from title
blogschema.pre("validate", async function (next) {
  if (!this.title) return next(new Error("Title is required to generate slug"));

  if (this.isNew || this.isModified("title") || !this.slug) {
    let base = toSlug(this.title);
    if (!base) base = "untitled";

    // check if slug exists already
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

module.exports = mongoose.model("Blog", blogschema);
