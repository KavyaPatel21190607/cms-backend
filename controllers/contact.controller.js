const Contact = require('../models/Contact.model');
const ContactMessage = require('../models/ContactMessage.model');

// Get contact data
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact data not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact data',
      error: error.message
    });
  }
};

// Update contact data
exports.updateContact = async (req, res) => {
  try {
    let contact = await Contact.findOne();
    
    if (!contact) {
      contact = new Contact(req.body);
    } else {
      Object.assign(contact, req.body);
    }

    await contact.save();

    res.json({
      success: true,
      message: 'Contact data updated successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating contact data',
      error: error.message
    });
  }
};

// Handle contact form submission
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Save message to database
    const contactMessage = new ContactMessage({
      name,
      email,
      subject,
      message,
      status: 'new',
      read: false
    });

    await contactMessage.save();

    console.log('Contact form submission:', { name, email, subject, message });

    res.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
      data: contactMessage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form',
      error: error.message
    });
  }
};

// Get all contact messages (for CMS)
exports.getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 }); // Most recent first

    res.json({
      success: true,
      data: {
        messages: messages
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact messages',
      error: error.message
    });
  }
};

// Mark message as read
exports.markMessageAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    
    const message = await ContactMessage.findByIdAndUpdate(
      id,
      { read: true, status: 'read' },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating message',
      error: error.message
    });
  }
};

// Delete contact message
exports.deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;
    
    const message = await ContactMessage.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting message',
      error: error.message
    });
  }
};

// Update message status
exports.updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const message = await ContactMessage.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating message status',
      error: error.message
    });
  }
};
