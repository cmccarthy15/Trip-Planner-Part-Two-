const Sequelize = require('sequelize');
const {INTEGER, STRING, TEXT, VIRTUAL, ARRAY, FLOAT} = Sequelize;

const db = new Sequelize('postgres://localhost:5432/trip-planner', {logging: false});



const Hotel = db.define('hotel', {
    name: {
        type: STRING,
        allowNull: false
    },
    num_stars: {
        type: FLOAT,
        allowNull: false,
        validate: {
            max: 5,
            min:0
        }
    },
    amenities: {
        type: STRING        
    }
});

const Place = db.define('place', {
    address: {
        type: STRING,
        allowNull:false
    },
    city: {
        type: STRING,
        allowNull: false
    },
    state: {
        type: STRING,
        allowNull:false
    },
    phone: {
        type: STRING
    },
    location: {
        type: ARRAY(FLOAT),
        allowNull: false
    }
});

const Activity = db.define('activity', {
    name: {
        type: STRING,
        allowNull: false
    },
    age_range: {
        type: STRING,
        defaultValue: "UNKNOWN. BRING CHILDREN AT YOUR PERIL."
    }
});

const Restaurant = db.define('restaurant', {
    name: {
        type: STRING,
        allowNull: false
    },
    cuisine: {
        type: STRING
    },
    price: {
        type: INTEGER,
        allowNull: false,
        validate: {
            max: 5,
            min: 0
        }
    }
});

Restaurant.belongsTo(Place, { onDelete: 'cascade' }); 
Hotel.belongsTo(Place, { onDelete: 'cascade' });
Activity.belongsTo(Place, { onDelete: 'cascade' });

module.exports = { db, Hotel, Restaurant, Place, Activity };