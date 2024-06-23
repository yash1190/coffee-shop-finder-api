const express = require('express');
const router = express.Router();
const CoffeeShop = require('../models/CoffeeShop');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         category:
 *           type: string
 *           enum: [coffee, food, drinks]
 *     CoffeeShop:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - rating
 *       properties:
 *         name:
 *           type: string
 *         address:
 *           type: string
 *         rating:
 *           type: number
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *         favorite:
 *           type: boolean
 */

/**
 * @swagger
 * /coffeeShops:
 *   post:
 *     summary: Create a new coffee shop
 *     tags: [CoffeeShops]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CoffeeShop'
 *     responses:
 *       201:
 *         description: The coffee shop was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoffeeShop'
 *       500:
 *         description: Some server error
 */
router.post('/', async (req, res) => {
  const { name, address, rating, products } = req.body;

  try {
    const newCoffeeShop = new CoffeeShop({
      name,
      address,
      rating,
      products,
    });

    const savedCoffeeShop = await newCoffeeShop.save();
    res.status(201).json(savedCoffeeShop);
  } catch (error) {
    console.error('Error saving coffee shop:', error.message);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /coffeeShops:
 *   get:
 *     summary: Returns the list of all the coffee shops
 *     tags: [CoffeeShops]
 *     responses:
 *       200:
 *         description: The list of coffee shops
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CoffeeShop'
 *       500:
 *         description: Some server error
 */
router.get('/', async (req, res) => {
  try {
    const shops = await CoffeeShop.find();
    res.json(shops);
  } catch (error) {
    console.error('Error fetching coffee shops:', error.message);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /coffeeShops/search:
 *   get:
 *     summary: Search coffee shops by name
 *     tags: [CoffeeShops]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search term
 *     responses:
 *       200:
 *         description: The list of coffee shops matching the search term
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CoffeeShop'
 *       500:
 *         description: Some server error
 */
router.get('/search', async (req, res) => {
  const searchTerm = req.query.q;

  try {
    const shops = await CoffeeShop.find({ name: { $regex: searchTerm, $options: 'i' } });
    res.json(shops);
  } catch (error) {
    console.error('Error searching coffee shops:', error.message);
    res.status(500).json({ message: 'Error searching coffee shops: ' + error.message });
  }
});

/**
 * @swagger
 * /coffeeShops/{id}:
 *   get:
 *     summary: Get a coffee shop by ID
 *     tags: [CoffeeShops]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The coffee shop ID
 *     responses:
 *       200:
 *         description: The coffee shop description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoffeeShop'
 *       404:
 *         description: Coffee shop not found
 *       500:
 *         description: Some server error
 */
router.get('/:id', async (req, res) => {
  try {
    const shop = await CoffeeShop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ message: 'Coffee shop not found' });
    }
    res.json(shop);
  } catch (error) {
    console.error('Error fetching coffee shop by ID:', error.message);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /coffeeShops/{id}/favorite:
 *   put:
 *     summary: Toggle favorite status of a coffee shop by ID
 *     tags: [CoffeeShops]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The coffee shop ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               favorite:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: The coffee shop was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoffeeShop'
 *       404:
 *         description: Coffee shop not found
 *       500:
 *         description: Some server error
 */
router.put('/:id/favorite', async (req, res) => {
  try {
    const coffeeShopId = req.params.id;
    const { favorite } = req.body;

    const updatedCoffeeShop = await CoffeeShop.findByIdAndUpdate(
      coffeeShopId,
      { favorite },
      { new: true }
    );

    if (!updatedCoffeeShop) {
      return res.status(404).json({ message: 'Coffee shop not found' });
    }

    res.json(updatedCoffeeShop);
  } catch (error) {
    console.error('Error toggling favorite:', error.message);
    res.status(500).json({ message: 'Error toggling favorite: ' + error.message });
  }
});

/**
 * @swagger
 * /coffeeShops/{id}/products/{category}:
 *   get:
 *     summary: Get products by category from a coffee shop
 *     tags: [CoffeeShops]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The coffee shop ID
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: The product category
 *     responses:
 *       200:
 *         description: The products from the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Coffee shop not found
 *       500:
 *         description: Some server error
 */
router.get('/:id/products/:category', async (req, res) => {
  const { id, category } = req.params;

  try {
    const shop = await CoffeeShop.findById(id);
    if (!shop) {
      return res.status(404).json({ message: 'Coffee shop not found' });
    }

    const products = shop.products.filter(product => product.category === category);
    res.json(products);
  } catch (error) {
    console.error(`Error fetching ${category} products for coffee shop with ID ${id}:`, error.message);
    res.status(500).json({ message: `Error fetching ${category} products: ${error.message}` });
  }
});

module.exports = router;
