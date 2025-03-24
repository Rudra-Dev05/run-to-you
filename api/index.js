export default function handler(req, res) {
  res.status(200).json({
    message: 'API is working!',
    status: 'Server is running in serverless mode for demo purposes'
  });
} 