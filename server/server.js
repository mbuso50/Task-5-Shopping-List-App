// task-5-shopping-list-app/server/server.js
import jsonServer from 'json-server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Secret key for JWT (in production, use environment variable)
const JWT_SECRET = 'your-secret-key-here';

// Use CORS and default middlewares
server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom routes for authentication
server.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if user already exists
        const db = router.db;
        const existingUser = db.get('users').find({ email }).value();

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };

        // Save user to database
        db.get('users').push(newUser).write();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, {
            expiresIn: '24h'
        });

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: { id: newUser.id, name: newUser.name, email: newUser.email }
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

server.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user
        const db = router.db;
        const user = db.get('users').find({ email }).value();

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: '24h'
        });

        res.json({
            message: 'Login successful',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Verify token middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Protected routes example
server.get('/api/profile', authenticateToken, (req, res) => {
    const db = router.db;
    const user = db.get('users').find({ id: req.user.userId }).value();

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: { id: user.id, name: user.name, email: user.email } });
});

// Use JSON server router
server.use('/api', router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});