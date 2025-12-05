const Footer = require('../models/Footer.model');

const FooterController = {
  /**
   * Get footer data
   */
  async getFooter(req, res) {
    try {
      const footer = await Footer.findOne();
      
      if (!footer) {
        return res.status(404).json({
          success: false,
          message: 'Footer data not found'
        });
      }

      res.json({
        success: true,
        data: footer
      });
    } catch (error) {
      console.error('Error fetching footer:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch footer data',
        error: error.message
      });
    }
  },

  /**
   * Update footer data
   */
  async updateFooter(req, res) {
    try {
      const footerData = req.body;
      
      // Validate required fields
      if (!footerData.brand || !footerData.socialLinks || !footerData.quickLinks || !footerData.bottomBar) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: brand, socialLinks, quickLinks, bottomBar'
        });
      }

      let footer = await Footer.findOne();
      
      if (!footer) {
        footer = new Footer(footerData);
      } else {
        Object.assign(footer, footerData);
      }

      await footer.save();

      res.json({
        success: true,
        data: footer,
        message: 'Footer updated successfully'
      });
    } catch (error) {
      console.error('Error updating footer:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update footer data',
        error: error.message
      });
    }
  }
};

module.exports = FooterController;
