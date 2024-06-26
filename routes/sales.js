import express from "express";
import {
  getAllSales,
  getSalebyId,
  getSalesByLocation,
  getSalesfiltered,
  getTopTen,
} from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

// nos devuelva una venta (sales) particular por _id
router.get("/id/:id", async (req, res) => {
  const id = req.params.id;
  //console.log(id);
  try {
    const sale = await getSalebyId(id);
    if (sale) {
      res.json(sale);
    } else {
      res.status(404).json({ message: "No Existe Venta." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
});

//filtrar las ventas por localización (storeLocation).
router.get("/location/:location", async (req, res) => {
  const location = req.params.location;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  try {
    res.json(await getSalesByLocation(location, pageSize, page));
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
});

//"storeLocation": "London",
//"purchaseMethod": "In store"
//"couponUsed": false,
//filtrar tanto por localización como purchaseMethod y ademas (couponUsed)
router.get("/filteredby", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const location = req.query.location;
  const method = req.query.method;
  const cupon = req.query.cupon;

  //console.log(typeof(cupon));

  try {
    res.json(await getSalesfiltered(cupon, method, location, pageSize, page));
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
});

// endpoint que retorne los 10 productos mas vendidos
router.get("/topten", async (req, res) => {
  try {
    res.json(await getTopTen());
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
});

export default router;
