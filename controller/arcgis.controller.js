const ArcGis = require('../models/arcgis.model');

const arcGisCtrl = {
  create: async (req, res) => {
    const { IDBD, Name, Color, Body } = req.body;

    const newData = await ArcGis.create({ IDBD, Name, Color, Body });

    await newData.save();

    return res.json(newData);
  },
  get: async (req, res) => {
    try {
      const data = await ArcGis.find();

      return res.json({
        success: true,
        message: 'get data successfully!',
        data,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: 'Internal server error!' });
    }
  },
};

module.exports = arcGisCtrl;
