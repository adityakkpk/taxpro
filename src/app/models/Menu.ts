import mongoose from 'mongoose';

const submenuSchema = new mongoose.Schema({
  title: { type: String, required: true },
  href: { type: String, required: true }
});

const menuSchema = new mongoose.Schema({
  title: { type: String, required: true },
  href: { type: String, required: true },
  submenu: [submenuSchema]
}, { timestamps: true });

export const Menu = mongoose.models.Menu || mongoose.model('Menu', menuSchema);