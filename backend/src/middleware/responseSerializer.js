// Middleware to serialize MongoDB responses for frontend compatibility
// Converts _id to id and formats timestamps

const serializeDocument = (doc) => {
  if (!doc) return doc;
  
  if (Array.isArray(doc)) {
    return doc.map(serializeDocument);
  }
  
  if (doc._doc || doc.toObject) {
    const obj = doc.toObject ? doc.toObject() : doc._doc;
    const serialized = { ...obj };
    
    // Convert _id to id
    if (serialized._id) {
      serialized.id = serialized._id.toString();
      delete serialized._id;
    }
    
    // Convert nested _id fields
    Object.keys(serialized).forEach(key => {
      if (serialized[key] && typeof serialized[key] === 'object') {
        if (serialized[key]._id) {
          serialized[key] = serializeDocument(serialized[key]);
        }
      }
    });
    
    return serialized;
  }
  
  return doc;
};

const responseSerializer = (req, res, next) => {
  const originalJson = res.json.bind(res);
  
  res.json = function(data) {
    if (data && data.data) {
      data.data = serializeDocument(data.data);
    } else if (data && !data.success && !data.message) {
      // If it's a direct document, serialize it
      data = serializeDocument(data);
    }
    
    return originalJson(data);
  };
  
  next();
};

module.exports = responseSerializer;
