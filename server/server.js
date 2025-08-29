import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Use require for CommonJS packages
const jsonServer = require('json-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

const JWT_SECRET = 'your-secret-key-here-change-in-production';

// Enable CORS
server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Auth routes
server.post('/api/auth/register', async (req, res) => {
    try {
        const { name, surname, cellNumber, email, password } = req.body;

        console.log('Registration attempt:', { name, surname, cellNumber, email });

        if (!name || !surname || !cellNumber || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const db = router.db;

        // Check if user already exists
        const existingUser = db.get('users').find({ email }).value();
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user with all fields
        const newUser = {
            id: Date.now().toString(),
            name,
            surname,
            cellNumber,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
            profileImage: "",
            notificationsEnabled: true,
            darkMode: false,
            emailNotifications: true,
            phone: cellNumber,
            address: "",
            lastLogin: new Date().toISOString()
        };

        // Save user to database
        db.get('users').push(newUser).write();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, {
            expiresIn: '24h'
        });

        console.log('User registered successfully:', newUser.email);

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                surname: newUser.surname,
                cellNumber: newUser.cellNumber,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

server.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Login attempt:', { email });

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const db = router.db;
        const user = db.get('users').find({ email }).value();

        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            console.log('Invalid password for:', email);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: '24h'
        });

        console.log('Login successful:', email);

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                surname: user.surname,
                cellNumber: user.cellNumber,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Protected profile route
server.get('/api/profile', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        const db = router.db;
        const userData = db.get('users').find({ id: user.userId }).value();

        if (!userData) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return user data without password
        res.json({
            user: {
                id: userData.id,
                name: userData.name,
                surname: userData.surname,
                cellNumber: userData.cellNumber,
                email: userData.email,
                createdAt: userData.createdAt
            }
        });
    });
});

// Health check endpoint
server.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() });
});

// Use json-server routes
server.use('/api', router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`👤 Register: http://localhost:${PORT}/api/auth/register`);
    console.log(`🔐 Login: http://localhost:${PORT}/api/auth/login`);
    console.log(`👥 Users API: http://localhost:${PORT}/api/users`);
});