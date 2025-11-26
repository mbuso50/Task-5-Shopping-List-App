const jsonServer = require('json-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

console.log('Starting Complete CommonJS server...');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

console.log('Server instances created');

const JWT_SECRET = 'your-secret-key-here-change-in-production';
server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

server.use(middlewares);
server.use(jsonServer.bodyParser);

console.log('Middlewares applied');

// Health check endpoint
server.get('/api/health', (req, res) => {
    console.log('Health check received');
    res.json({
        status: 'OK',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        server: 'Complete CommonJS'
    });
});

// User Registration
server.post('/api/auth/register', async (req, res) => {
    try {
        console.log('Registration attempt:', req.body);
        const { name, surname, cellNumber, email, password } = req.body;
        if (!name || !surname || !cellNumber || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const db = router.db;
        const existingUser = db.get('users').find({ email }).value();
        if (existingUser) {
            console.log('User already exists:', email);
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
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
        db.get('users').push(newUser).write();
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
        res.status(500).json({ error: 'Internal server error: ' + error.message });
    }
});

// User Login
server.post('/api/auth/login', async (req, res) => {
    try {
        console.log('Login attempt:', req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const db = router.db;
        const user = db.get('users').find({ email }).value();

        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            console.log('Invalid password for:', email);
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        db.get('users').find({ email }).assign({ lastLogin: new Date().toISOString() }).write();

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
        res.status(500).json({ error: 'Internal server error: ' + error.message });
    }
});
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
server.use('/api', router);

const PORT = process.env.PORT || 3001;
server.on('error', (error) => {
    console.error('Server error:', error);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

console.log('Starting server listen on port', PORT);

const httpServer = server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is ACTUALLY RUNNING on port ${PORT}`);
    console.log(`Health: curl http://localhost:${PORT}/api/health`);
    console.log(`Register: curl -X POST http://localhost:${PORT}/api/auth/register`);
    console.log(`Login: curl -X POST http://localhost:${PORT}/api/auth/login`);
    console.log(`Server started at: ${new Date().toISOString()}`);
});
process.on('SIGINT', () => {
    console.log('Shutting down server gracefully...');
    httpServer.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

console.log('Server process should stay running...');