import dijkstra from "../utils/dijkstra.js";
import airportGraph from "../data/airportGraph.js";

export const getFlightRoute = (req, res) => {
  const { from, to, mode = "distance" } = req.query;

  if (!from || !to) return res.status(400).json({ message: "from and to are required" });
  if (!airportGraph[mode]) return res.status(400).json({ message: "Invalid mode" });

  const graph = airportGraph[mode];
  const result = dijkstra(graph, from.toUpperCase(), to.toUpperCase());

  if (result.path.length === 0)
    return res.status(404).json({ message: "No route found" });

  res.json({ ...result, mode });
};