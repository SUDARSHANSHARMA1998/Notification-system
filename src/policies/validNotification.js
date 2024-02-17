const isValidEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
  
const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\+\d{1,3}\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };
  
const validNotification = (req, res, next) => {
    // Check if the request body is not empty
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body cannot be empty' });
    }
  
    // Validate message field
    if (!req.body.message || req.body.message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }
  
    // Validate channels field
    if (!req.body.channels || !Array.isArray(req.body.channels) || req.body.channels.length === 0) {
      return res.status(400).json({ error: 'At least one channel must be specified' });
    }
  
    // Validate recipient field
    const recipient = req.body.recipient;
    if (!recipient || typeof recipient !== 'object') {
      return res.status(400).json({ error: 'Recipient information is required' });
    }
    
    // Validate recipient's name
    if (!recipient.name || recipient.name.trim() === '') {
      return res.status(400).json({ error: 'Recipient name is required' });
    }

    // Check if channels contains only allowed values
    const allowedChannels = ['SMS', 'Email'];
    const invalidChannels = req.body.channels.filter(channel => !allowedChannels.includes(channel));
    if (invalidChannels.length > 0) {
        return res.status(400).json({ error: `Invalid channel(s): ${invalidChannels.join(', ')}` });
    }
  
    // Validate recipient's emailId if Email channel is included
    if (req.body.channels.includes('Email')) {
      if (!recipient.emailId || recipient.emailId.trim() === '' || !isValidEmail(recipient.emailId)) {
        return res.status(400).json({ error: 'Invalid or missing email address' });
      }
    }
  
    // Validate recipient's phoneNumber if SMS channel is included
    if (req.body.channels.includes('SMS')) {
      if (!recipient.phoneNumber || recipient.phoneNumber.trim() === '' || !isValidPhoneNumber(recipient.phoneNumber)) {
        return res.status(400).json({ error: 'Invalid or missing phone number' });
      }
    }

    next();
  };
  

  module.exports = {
    validNotification
  };
  