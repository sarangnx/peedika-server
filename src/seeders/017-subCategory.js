// parent_sub_category_id: null,
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('sub_category', [
            // ====== Grocery ======
            // parent_category_id: 1

            {
                sub_category_id: 1,
                parent_category_id: 1,
                sub_category_name: 'Breakfast & Cereals'
            },
            {
                sub_category_id: 6,
                parent_category_id: 1,
                sub_category_name: 'Dairy & Eggs'
            },
            {
                sub_category_id: 17,
                parent_category_id: 1,
                sub_category_name: 'Flours & Sooji'
            },
            {
                sub_category_id: 23,
                parent_category_id: 1,
                sub_category_name: 'Instant Food'
            },
            {
                sub_category_id: 28,
                parent_category_id: 1,
                sub_category_name: 'Noodles & Pasta'
            },
            {
                sub_category_id: 31,
                parent_category_id: 1,
                sub_category_name: 'Oil & Ghee'
            },
            {
                sub_category_id: 40,
                parent_category_id: 1,
                sub_category_name: 'Pulses & Dals'
            },
            {
                sub_category_id: 43,
                parent_category_id: 1,
                sub_category_name: 'Rice & Rice products'
            },
            {
                sub_category_id: 49,
                parent_category_id: 1,
                sub_category_name: 'Salt & Sugar'
            },
            {
                sub_category_id: 54,
                parent_category_id: 1,
                sub_category_name: 'Sauces, Pickles & Chutney'
            },
            {
                sub_category_id: 58,
                parent_category_id: 1,
                sub_category_name: 'Spices & Masalas'
            },
            {
                sub_category_id: 64,
                parent_category_id: 1,
                sub_category_name: 'Tea & Coffee'
            },

            // ====== Vegetable & Fruits ======
            // parent_category_id: 2
            {
                sub_category_id: 67,
                parent_category_id: 2,
                sub_category_name: 'Fresh Vegetable'
            },
            {
                sub_category_id: 68,
                parent_category_id: 2,
                sub_category_name: 'Fresh Fruits'
            },

            // ====== Bakery & Beverages ======
            // parent_category_id: 3

            {
                sub_category_id: 69,
                parent_category_id: 3,
                sub_category_name: 'Bread & Cakes'
            },
            {
                sub_category_id: 72,
                parent_category_id: 3,
                sub_category_name: 'Biscuit'
            },
            {
                sub_category_id: 73,
                parent_category_id: 3,
                sub_category_name: 'Icecream'
            },
            {
                sub_category_id: 74,
                parent_category_id: 3,
                sub_category_name: 'Beverages'
            },
            {
                sub_category_id: 80,
                parent_category_id: 3,
                sub_category_name: 'Chocolate & Sweets'
            },
            {
                sub_category_id: 85,
                parent_category_id: 3,
                sub_category_name: 'Dry Fruits'
            },
            {
                sub_category_id: 93,
                parent_category_id: 3,
                sub_category_name: 'Snacks'
            },

            // ====== Household ======
            // parent_category_id: 4
            
            {
                sub_category_id: 100,
                parent_category_id: 4,
                sub_category_name: 'Car Care'
            },
            {
                sub_category_id: 103,
                parent_category_id: 4,
                sub_category_name: 'Cleaning Accessories'
            },
            {
                sub_category_id: 110,
                parent_category_id: 4,
                sub_category_name: 'Dish Wash'
            },
            {
                sub_category_id: 114,
                parent_category_id: 4,
                sub_category_name: 'Disposable & Party Accessories'
            },
            {
                sub_category_id: 115,
                parent_category_id: 4,
                sub_category_name: 'Home Decor'
            },
            {
                sub_category_id: 117,
                parent_category_id: 4,
                sub_category_name: 'Home Fragrance & Repellers'
            },
            {
                sub_category_id: 120,
                parent_category_id: 4,
                sub_category_name: 'Household Cleaning'
            },
            {
                sub_category_id: 123,
                parent_category_id: 4,
                sub_category_name: 'Kitchenwares'
            },
            {
                sub_category_id: 128,
                parent_category_id: 4,
                sub_category_name: 'Laundry'
            },
            {
                sub_category_id: 138,
                parent_category_id: 4,
                sub_category_name: 'Pooja Needs'
            },
            {
                sub_category_id: 142,
                parent_category_id: 4,
                sub_category_name: 'Sundries'
            },
            {
                sub_category_id: 149,
                parent_category_id: 4,
                sub_category_name: 'Tissues & Foils'
            },
            
            // ====== Health & Beauty ======
            // parent_category_id: 5
            
            {
                sub_category_id: 152,
                parent_category_id: 5,
                sub_category_name: 'Bath & Beauty care'
            },
            {
                sub_category_id: 158,
                parent_category_id: 5,
                sub_category_name: 'Dental care'
            },
            {
                sub_category_id: 163,
                parent_category_id: 5,
                sub_category_name: 'Deos & perfumes'
            },
            {
                sub_category_id: 169,
                parent_category_id: 5,
                sub_category_name: 'Facial care & Cosmetics'
            },
            {
                sub_category_id: 172,
                parent_category_id: 5,
                sub_category_name: 'Feminine Care & Hygiene'
            },
            {
                sub_category_id: 174,
                parent_category_id: 5,
                sub_category_name: 'Hair care and Colourant'
            },
            {
                sub_category_id: 181,
                parent_category_id: 5,
                sub_category_name: 'Hand & Footcare'
            },
            {
                sub_category_id: 184,
                parent_category_id: 5,
                sub_category_name: 'Healthcare & Wellness'
            },
            {
                sub_category_id: 191,
                parent_category_id: 5,
                sub_category_name: 'Men\'s Shaving'
            },
            {
                sub_category_id: 196,
                parent_category_id: 5,
                sub_category_name: 'Accessories'
            },

            // ====== Moms & Babies ======
            // parent_category_id: 6

            {
                sub_category_id: 197,
                parent_category_id: 6,
                sub_category_name: 'Bath'
            },
            {
                sub_category_id: 202,
                parent_category_id: 6,
                sub_category_name: 'Diapers'
            },

            // ====== Pet Food ======
            // parent_category_id: 7

            {
                sub_category_id: 205,
                parent_category_id: 7,
                sub_category_name: 'Cow Food'
            },
            {
                sub_category_id: 206,
                parent_category_id: 7,
                sub_category_name: 'Kozhitheeta'
            },
            {
                sub_category_id: 207,
                parent_category_id: 7,
                sub_category_name: 'Thena'
            },
            {
                sub_category_id: 208,
                parent_category_id: 7,
                sub_category_name: 'Fish Food (Meen Theeta)'
            },
            {
                sub_category_id: 209,
                parent_category_id: 7,
                sub_category_name: 'Goat Food (Adu Theeta)'
            },

            // ====== Stationery ======
            // parent_category_id: 8

            {
                sub_category_id: 210,
                parent_category_id: 8,
                sub_category_name: 'Colours'
            },
            {
                sub_category_id: 214,
                parent_category_id: 8,
                sub_category_name: 'Craft Materails & tools'
            },
            {
                sub_category_id: 218,
                parent_category_id: 8,
                sub_category_name: 'Files & Folders'
            },
            {
                sub_category_id: 219,
                parent_category_id: 8,
                sub_category_name: 'Markers & Highlighters'
            },
            {
                sub_category_id: 225,
                parent_category_id: 8,
                sub_category_name: 'Notebooks & Diaries'
            },
            {
                sub_category_id: 230,
                parent_category_id: 8,
                sub_category_name: 'Office Desk Accessories'
            },
            {
                sub_category_id: 236,
                parent_category_id: 8,
                sub_category_name: 'Painting Accessories'
            },
            {
                sub_category_id: 238,
                parent_category_id: 8,
                sub_category_name: 'Paper & Envelopes'
            },
            {
                sub_category_id: 246,
                parent_category_id: 8,
                sub_category_name: 'Pen, Pencils & Chalk'
            },
            {
                sub_category_id: 254,
                parent_category_id: 8,
                sub_category_name: 'School Supplies'
            },
        ],{});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('sub_category', null, {});
    }
};
