import SavedRoute from "../models/SavedRoute.js";

export const saveRoute = async (req, res) => {
  const { from, to, path, totalWeight, mode } = req.body;
  try {
    const route = await SavedRoute.create({
      user: req.user._id, from, to, path, totalWeight, mode,
    });
    res.status(201).json(route);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRoutes = async (req, res) => {
  try {
    const routes = await SavedRoute.find({ user: req.user._id }).sort("-createdAt");
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteRoute = async (req, res) => {
  try {
    const route = await SavedRoute.findById(req.params.id);
    if (!route) return res.status(404).json({ message: "Not found" });
    if (route.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    await route.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};