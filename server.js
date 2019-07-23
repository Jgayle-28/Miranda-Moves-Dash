const express = require('express');

const app = express();

app.get('/', (req, res) => res.json({ msg: 'Welcome to Movely' }));

//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/moves', require('./routes/moves'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
