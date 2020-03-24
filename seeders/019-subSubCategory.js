
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('sub_sub_category', [
            {
                sub_sub_category_id: 2,
                sub_category_id: 1,
                sub_sub_category_name: 'Corn Flakes'
            },
            {
                sub_sub_category_id: 3,
                sub_category_id: 1,
                sub_sub_category_name: 'Honey'
            },
            {
                sub_sub_category_id: 4,
                sub_category_id: 1,
                sub_sub_category_name: 'Jam'
            },
            {
                sub_sub_category_id: 5,
                sub_category_id: 1,
                sub_sub_category_name: 'Oats'
            },
            {
                sub_sub_category_id: 7,
                sub_category_id: 6,
                sub_sub_category_name: 'Butter'
            },
            {
                sub_sub_category_id: 8,
                sub_category_id: 6,
                sub_sub_category_name: 'Curd'
            },
            {
                sub_sub_category_id: 9,
                sub_category_id: 6,
                sub_sub_category_name: 'Condensed Milk'
            },
            {
                sub_sub_category_id: 10,
                sub_category_id: 6,
                sub_sub_category_name: 'Dairy Whitener'
            },
            {
                sub_sub_category_id: 11,
                sub_category_id: 6,
                sub_sub_category_name: 'Milk'
            },
            {
                sub_sub_category_id: 12,
                sub_category_id: 6,
                sub_sub_category_name: 'Eggs'
            },
            {
                sub_sub_category_id: 18,
                sub_category_id: 17,
                sub_sub_category_name: 'Atta'
            },
            {
                sub_sub_category_id: 19,
                sub_category_id: 17,
                sub_sub_category_name: 'Maida'
            },
            {
                sub_sub_category_id: 20,
                sub_category_id: 17,
                sub_sub_category_name: 'Rice Flours (Ari podi)'
            },
            {
                sub_sub_category_id: 21,
                sub_category_id: 17,
                sub_sub_category_name: 'Sooji & Rava'
            },
            {
                sub_sub_category_id: 22,
                sub_category_id: 17,
                sub_sub_category_name: 'others'
            },
            {
                sub_sub_category_id: 24,
                sub_category_id: 23,
                sub_sub_category_name: 'Instant Mix'
            },
            {
                sub_sub_category_id: 25,
                sub_category_id: 23,
                sub_sub_category_name: 'Pappads'
            },
            {
                sub_sub_category_id: 26,
                sub_category_id: 23,
                sub_sub_category_name: 'Ready to cook'
            },
            {
                sub_sub_category_id: 27,
                sub_category_id: 23,
                sub_sub_category_name: 'Ready to eat'
            },
            {
                sub_sub_category_id: 29,
                sub_category_id: 28,
                sub_sub_category_name: 'Noodles'
            },
            {
                sub_sub_category_id: 30,
                sub_category_id: 28,
                sub_sub_category_name: 'Vermicelli'
            },
            {
                sub_sub_category_id: 32,
                sub_category_id: 31,
                sub_sub_category_name: 'Coconut Oil'
            },
            {
                sub_sub_category_id: 33,
                sub_category_id: 31,
                sub_sub_category_name: 'Ghee (Neyyu)'
            },
            {
                sub_sub_category_id: 34,
                sub_category_id: 31,
                sub_sub_category_name: 'Sunflower Oil'
            },
            {
                sub_sub_category_id: 35,
                sub_category_id: 31,
                sub_sub_category_name: 'Rice bran oil (Thavidenna)'
            },
            {
                sub_sub_category_id: 36,
                sub_category_id: 31,
                sub_sub_category_name: 'Palmolein'
            },
            {
                sub_sub_category_id: 37,
                sub_category_id: 31,
                sub_sub_category_name: 'Gingelly Oil (Nallenna)'
            },
            {
                sub_sub_category_id: 38,
                sub_category_id: 31,
                sub_sub_category_name: 'Lamp Oil (Vilakkenna)'
            },
            {
                sub_sub_category_id: 39,
                sub_category_id: 31,
                sub_sub_category_name: 'Other oils'
            },
            {
                sub_sub_category_id: 41,
                sub_category_id: 40,
                sub_sub_category_name: 'Pulses'
            },
            {
                sub_sub_category_id: 42,
                sub_category_id: 40,
                sub_sub_category_name: 'Dals'
            },
            {
                sub_sub_category_id: 44,
                sub_category_id: 43,
                sub_sub_category_name: 'Basmati (biriyani)'
            },
            {
                sub_sub_category_id: 45,
                sub_category_id: 43,
                sub_sub_category_name: 'Raw Rice (Pachari)'
            },
            {
                sub_sub_category_id: 46,
                sub_category_id: 43,
                sub_sub_category_name: 'Rice'
            },
            {
                sub_sub_category_id: 47,
                sub_category_id: 43,
                sub_sub_category_name: 'Rice Products'
            },
            {
                sub_sub_category_id: 48,
                sub_category_id: 43,
                sub_sub_category_name: 'Other Flours'
            },
            {
                sub_sub_category_id: 50,
                sub_category_id: 49,
                sub_sub_category_name: 'Jaggery (Sharkara)'
            },
            {
                sub_sub_category_id: 51,
                sub_category_id: 49,
                sub_sub_category_name: 'Salt'
            },
            {
                sub_sub_category_id: 52,
                sub_category_id: 49,
                sub_sub_category_name: 'Sugar (Panchasara)'
            },
            {
                sub_sub_category_id: 53,
                sub_category_id: 49,
                sub_sub_category_name: 'Other Sweetners'
            },
            {
                sub_sub_category_id: 55,
                sub_category_id: 54,
                sub_sub_category_name: 'Pickles & Chutneys'
            },
            {
                sub_sub_category_id: 56,
                sub_category_id: 54,
                sub_sub_category_name: 'Vinegar'
            },
            {
                sub_sub_category_id: 57,
                sub_category_id: 54,
                sub_sub_category_name: 'Ketchup & Sauce'
            },
            {
                sub_sub_category_id: 59,
                sub_category_id: 58,
                sub_sub_category_name: 'Essences & Food flavours'
            },
            {
                sub_sub_category_id: 60,
                sub_category_id: 58,
                sub_sub_category_name: 'Grinded spices'
            },
            {
                sub_sub_category_id: 61,
                sub_category_id: 58,
                sub_sub_category_name: 'Pastes & Purees'
            },
            {
                sub_sub_category_id: 62,
                sub_category_id: 58,
                sub_sub_category_name: 'Ready Mix Masalas'
            },
            {
                sub_sub_category_id: 63,
                sub_category_id: 58,
                sub_sub_category_name: 'Whole spice & Herbs'
            },
            {
                sub_sub_category_id: 65,
                sub_category_id: 64,
                sub_sub_category_name: 'Tea'
            },
            {
                sub_sub_category_id: 66,
                sub_category_id: 64,
                sub_sub_category_name: 'Coffee'
            },
            {
                sub_sub_category_id: 70,
                sub_category_id: 69,
                sub_sub_category_name: 'Bread, Bun & Rusk'
            },
            {
                sub_sub_category_id: 71,
                sub_category_id: 69,
                sub_sub_category_name: 'Cakes & Cup Cakes'
            },
            {
                sub_sub_category_id: 75,
                sub_category_id: 74,
                sub_sub_category_name: 'Energy Drinks'
            },
            {
                sub_sub_category_id: 76,
                sub_category_id: 74,
                sub_sub_category_name: 'Health Drinks'
            },
            {
                sub_sub_category_id: 77,
                sub_category_id: 74,
                sub_sub_category_name: 'Juices & Instant Drink Mix'
            },
            {
                sub_sub_category_id: 243,
                sub_category_id: 74,
                sub_sub_category_name: 'Mineral Water'
            },
            {
                sub_sub_category_id: 78,
                sub_category_id: 74,
                sub_sub_category_name: 'Soft Drinks'
            },
            {
                sub_sub_category_id: 79,
                sub_category_id: 74,
                sub_sub_category_name: 'Milk Drinks'
            },
            {
                sub_sub_category_id: 81,
                sub_category_id: 80,
                sub_sub_category_name: 'Lollipop & Candy'
            },
            {
                sub_sub_category_id: 82,
                sub_category_id: 80,
                sub_sub_category_name: 'Chocolate'
            },
            {
                sub_sub_category_id: 83,
                sub_category_id: 80,
                sub_sub_category_name: 'Mints & Chewing gums'
            },
            {
                sub_sub_category_id: 84,
                sub_category_id: 80,
                sub_sub_category_name: 'Sweets'
            },
            {
                sub_sub_category_id: 86,
                sub_category_id: 85,
                sub_sub_category_name: 'Almond (Badam)'
            },
            {
                sub_sub_category_id: 87,
                sub_category_id: 85,
                sub_sub_category_name: 'Cashew (kashuvandi)'
            },
            {
                sub_sub_category_id: 88,
                sub_category_id: 85,
                sub_sub_category_name: 'Dates (Eenthapazham)'
            },
            {
                sub_sub_category_id: 89,
                sub_category_id: 85,
                sub_sub_category_name: 'Raisins (Unaka Munthiri / Kismis)'
            },
            {
                sub_sub_category_id: 90,
                sub_category_id: 85,
                sub_sub_category_name: 'Pista & Peanut (Nilakadala)'
            },
            {
                sub_sub_category_id: 91,
                sub_category_id: 85,
                sub_sub_category_name: 'Seeds'
            },
            {
                sub_sub_category_id: 92,
                sub_category_id: 85,
                sub_sub_category_name: 'Other dry fruits'
            },
            {
                sub_sub_category_id: 94,
                sub_category_id: 93,
                sub_sub_category_name: 'Chips'
            },
            {
                sub_sub_category_id: 95,
                sub_category_id: 93,
                sub_sub_category_name: 'Mixture & Chakli'
            },
            {
                sub_sub_category_id: 96,
                sub_category_id: 93,
                sub_sub_category_name: 'Namkeen'
            },
            {
                sub_sub_category_id: 97,
                sub_category_id: 93,
                sub_sub_category_name: 'Sweet snacks'
            },
            {
                sub_sub_category_id: 98,
                sub_category_id: 93,
                sub_sub_category_name: 'Traditional snacks (cherukadikal)'
            },
            {
                sub_sub_category_id: 99,
                sub_category_id: 93,
                sub_sub_category_name: 'Popcorn'
            },
            {
                sub_sub_category_id: 101,
                sub_category_id: 100,
                sub_sub_category_name: 'Car Cleaning Accessories'
            },
            {
                sub_sub_category_id: 102,
                sub_category_id: 100,
                sub_sub_category_name: 'Car Freshners'
            },
            {
                sub_sub_category_id: 104,
                sub_category_id: 103,
                sub_sub_category_name: 'Broom'
            },
            {
                sub_sub_category_id: 105,
                sub_category_id: 103,
                sub_sub_category_name: 'Brushes'
            },
            {
                sub_sub_category_id: 106,
                sub_category_id: 103,
                sub_sub_category_name: 'Bucket & Mug'
            },
            {
                sub_sub_category_id: 107,
                sub_category_id: 103,
                sub_sub_category_name: 'Dust Bin & Dust Pan'
            },
            {
                sub_sub_category_id: 108,
                sub_category_id: 103,
                sub_sub_category_name: 'Mop'
            },
            {
                sub_sub_category_id: 109,
                sub_category_id: 103,
                sub_sub_category_name: 'Sponges & Scrubs'
            },
            {
                sub_sub_category_id: 111,
                sub_category_id: 110,
                sub_sub_category_name: 'Dish Wash Bar'
            },
            {
                sub_sub_category_id: 112,
                sub_category_id: 110,
                sub_sub_category_name: 'Dish Wash Liquids'
            },
            {
                sub_sub_category_id: 113,
                sub_category_id: 110,
                sub_sub_category_name: 'Dish Wash Powder'
            },
            {
                sub_sub_category_id: 116,
                sub_category_id: 115,
                sub_sub_category_name: 'Mat'
            },
            {
                sub_sub_category_id: 244,
                sub_category_id: 115,
                sub_sub_category_name: 'Net & Plastic Padutha'
            },
            {
                sub_sub_category_id: 118,
                sub_category_id: 117,
                sub_sub_category_name: 'Air Freshners'
            },
            {
                sub_sub_category_id: 119,
                sub_category_id: 117,
                sub_sub_category_name: 'Insect Repellers'
            },
            {
                sub_sub_category_id: 121,
                sub_category_id: 120,
                sub_sub_category_name: 'Bathroom cleaning'
            },
            {
                sub_sub_category_id: 122,
                sub_category_id: 120,
                sub_sub_category_name: 'Surface & Floor cleaning'
            },
            {
                sub_sub_category_id: 124,
                sub_category_id: 123,
                sub_sub_category_name: 'Bottles, Jug, Flask'
            },
            {
                sub_sub_category_id: 125,
                sub_category_id: 123,
                sub_sub_category_name: 'Cutting Aids'
            },
            {
                sub_sub_category_id: 126,
                sub_category_id: 123,
                sub_sub_category_name: 'Gas & Stove accessories'
            },
            {
                sub_sub_category_id: 127,
                sub_category_id: 123,
                sub_sub_category_name: 'Kitchen Needs'
            },
            {
                sub_sub_category_id: 129,
                sub_category_id: 128,
                sub_sub_category_name: 'Cloth Clips'
            },
            {
                sub_sub_category_id: 130,
                sub_category_id: 128,
                sub_sub_category_name: 'Washing Liquids'
            },
            {
                sub_sub_category_id: 131,
                sub_category_id: 128,
                sub_sub_category_name: 'Washing Powder'
            },
            {
                sub_sub_category_id: 132,
                sub_category_id: 128,
                sub_sub_category_name: 'Fabric conditioner & freshners'
            },
            {
                sub_sub_category_id: 133,
                sub_category_id: 128,
                sub_sub_category_name: 'Hanger'
            },
            {
                sub_sub_category_id: 134,
                sub_category_id: 128,
                sub_sub_category_name: 'Laundry basket'
            },
            {
                sub_sub_category_id: 135,
                sub_category_id: 128,
                sub_sub_category_name: 'Laundry brush'
            },
            {
                sub_sub_category_id: 136,
                sub_category_id: 128,
                sub_sub_category_name: 'Stain Remover'
            },
            {
                sub_sub_category_id: 137,
                sub_category_id: 128,
                sub_sub_category_name: 'Washing bar'
            },
            {
                sub_sub_category_id: 139,
                sub_category_id: 138,
                sub_sub_category_name: 'Pooja Accessories'
            },
            {
                sub_sub_category_id: 140,
                sub_category_id: 138,
                sub_sub_category_name: 'Pooja Fragrances'
            },
            {
                sub_sub_category_id: 141,
                sub_category_id: 138,
                sub_sub_category_name: 'Pooja Oil'
            },
            {
                sub_sub_category_id: 143,
                sub_category_id: 142,
                sub_sub_category_name: 'Candles'
            },
            {
                sub_sub_category_id: 144,
                sub_category_id: 142,
                sub_sub_category_name: 'CFL, Tubes & Bulbs'
            },
            {
                sub_sub_category_id: 145,
                sub_category_id: 142,
                sub_sub_category_name: 'Home Electronics'
            },
            {
                sub_sub_category_id: 146,
                sub_category_id: 142,
                sub_sub_category_name: 'Matchbox & Lighters'
            },
            {
                sub_sub_category_id: 147,
                sub_category_id: 142,
                sub_sub_category_name: 'Plastic Rope'
            },
            {
                sub_sub_category_id: 148,
                sub_category_id: 142,
                sub_sub_category_name: 'Other sundries'
            },
            {
                sub_sub_category_id: 150,
                sub_category_id: 149,
                sub_sub_category_name: 'Foils & Food wrapper'
            },
            {
                sub_sub_category_id: 151,
                sub_category_id: 149,
                sub_sub_category_name: 'Kitchen Tissue'
            },
            {
                sub_sub_category_id: 154,
                sub_category_id: 152,
                sub_sub_category_name: 'Bath sponge & brush'
            },
            {
                sub_sub_category_id: 155,
                sub_category_id: 152,
                sub_sub_category_name: 'Soap'
            },
            {
                sub_sub_category_id: 156,
                sub_category_id: 152,
                sub_sub_category_name: 'Talcum powder'
            },
            {
                sub_sub_category_id: 157,
                sub_category_id: 152,
                sub_sub_category_name: 'Body cream, lotions & oils'
            },
            {
                sub_sub_category_id: 159,
                sub_category_id: 158,
                sub_sub_category_name: 'Tooth Paste'
            },
            {
                sub_sub_category_id: 160,
                sub_category_id: 158,
                sub_sub_category_name: 'Tooth Brush'
            },
            {
                sub_sub_category_id: 161,
                sub_category_id: 158,
                sub_sub_category_name: 'Tooth Powder'
            },
            {
                sub_sub_category_id: 162,
                sub_category_id: 158,
                sub_sub_category_name: 'Tooth pick & Tongue cleaner'
            },
            {
                sub_sub_category_id: 164,
                sub_category_id: 163,
                sub_sub_category_name: 'Body Spray'
            },
            {
                sub_sub_category_id: 165,
                sub_category_id: 163,
                sub_sub_category_name: 'Deo'
            },
            {
                sub_sub_category_id: 166,
                sub_category_id: 163,
                sub_sub_category_name: 'Perfumes for men'
            },
            {
                sub_sub_category_id: 167,
                sub_category_id: 163,
                sub_sub_category_name: 'Perfumes for Women'
            },
            {
                sub_sub_category_id: 168,
                sub_category_id: 163,
                sub_sub_category_name: 'Perfume Oil'
            },
            {
                sub_sub_category_id: 170,
                sub_category_id: 169,
                sub_sub_category_name: 'Face Wash'
            },
            {
                sub_sub_category_id: 171,
                sub_category_id: 169,
                sub_sub_category_name: 'Face Cream'
            },
            {
                sub_sub_category_id: 173,
                sub_category_id: 172,
                sub_sub_category_name: 'Sanitary pads & Hygiene'
            },
            {
                sub_sub_category_id: 175,
                sub_category_id: 174,
                sub_sub_category_name: 'Colourants & Mehndi'
            },
            {
                sub_sub_category_id: 176,
                sub_category_id: 174,
                sub_sub_category_name: 'Comb & Brushes'
            },
            {
                sub_sub_category_id: 177,
                sub_category_id: 174,
                sub_sub_category_name: 'Conditioner'
            },
            {
                sub_sub_category_id: 178,
                sub_category_id: 174,
                sub_sub_category_name: 'Hair Oil'
            },
            {
                sub_sub_category_id: 179,
                sub_category_id: 174,
                sub_sub_category_name: 'Shampoo'
            },
            {
                sub_sub_category_id: 180,
                sub_category_id: 174,
                sub_sub_category_name: 'Hair cream & spray'
            },
            {
                sub_sub_category_id: 182,
                sub_category_id: 181,
                sub_sub_category_name: 'Nail Care'
            },
            {
                sub_sub_category_id: 183,
                sub_category_id: 181,
                sub_sub_category_name: 'Hand wash'
            },
            {
                sub_sub_category_id: 185,
                sub_category_id: 184,
                sub_sub_category_name: 'Glove'
            },
            {
                sub_sub_category_id: 186,
                sub_category_id: 184,
                sub_sub_category_name: 'Pain relief'
            },
            {
                sub_sub_category_id: 187,
                sub_category_id: 184,
                sub_sub_category_name: 'First Aid Products'
            },
            {
                sub_sub_category_id: 188,
                sub_category_id: 184,
                sub_sub_category_name: 'Earbuds & Safety Pins'
            },
            {
                sub_sub_category_id: 190,
                sub_category_id: 184,
                sub_sub_category_name: 'Nail Cutter'
            },
            {
                sub_sub_category_id: 192,
                sub_category_id: 191,
                sub_sub_category_name: 'After shave lotion'
            },
            {
                sub_sub_category_id: 193,
                sub_category_id: 191,
                sub_sub_category_name: 'Shaving brush'
            },
            {
                sub_sub_category_id: 194,
                sub_category_id: 191,
                sub_sub_category_name: 'Razor & Blade'
            },
            {
                sub_sub_category_id: 195,
                sub_category_id: 191,
                sub_sub_category_name: 'Shaving foam & Gel'
            },
            {
                sub_sub_category_id: 198,
                sub_category_id: 197,
                sub_sub_category_name: 'Bath lotion & cream'
            },
            {
                sub_sub_category_id: 199,
                sub_category_id: 197,
                sub_sub_category_name: 'Baby oil'
            },
            {
                sub_sub_category_id: 245,
                sub_category_id: 197,
                sub_sub_category_name: 'Baby powder & puff'
            },
            {
                sub_sub_category_id: 200,
                sub_category_id: 197,
                sub_sub_category_name: 'Baby Shampoo'
            },
            {
                sub_sub_category_id: 201,
                sub_category_id: 197,
                sub_sub_category_name: 'Baby wash & soap'
            },
            {
                sub_sub_category_id: 203,
                sub_category_id: 202,
                sub_sub_category_name: 'Diapers'
            },
            {
                sub_sub_category_id: 204,
                sub_category_id: 202,
                sub_sub_category_name: 'Wipes'
            },
            {
                sub_sub_category_id: 211,
                sub_category_id: 210,
                sub_sub_category_name: 'Crayons'
            },
            {
                sub_sub_category_id: 212,
                sub_category_id: 210,
                sub_sub_category_name: 'Sketch Pen'
            },
            {
                sub_sub_category_id: 213,
                sub_category_id: 210,
                sub_sub_category_name: 'Water Colour'
            },
            {
                sub_sub_category_id: 215,
                sub_category_id: 214,
                sub_sub_category_name: 'Craft Scissors'
            },
            {
                sub_sub_category_id: 216,
                sub_category_id: 214,
                sub_sub_category_name: 'Glue & Glue Stick'
            },
            {
                sub_sub_category_id: 217,
                sub_category_id: 214,
                sub_sub_category_name: 'Glues & Adhesives'
            },
            {
                sub_sub_category_id: 220,
                sub_category_id: 219,
                sub_sub_category_name: 'Correction Pen & Whiteners'
            },
            {
                sub_sub_category_id: 221,
                sub_category_id: 219,
                sub_sub_category_name: 'Highlighter pen'
            },
            {
                sub_sub_category_id: 222,
                sub_category_id: 219,
                sub_sub_category_name: 'CD Marker'
            },
            {
                sub_sub_category_id: 223,
                sub_category_id: 219,
                sub_sub_category_name: 'Permanent Marker'
            },
            {
                sub_sub_category_id: 224,
                sub_category_id: 219,
                sub_sub_category_name: 'White Board Markers'
            },
            {
                sub_sub_category_id: 226,
                sub_category_id: 225,
                sub_sub_category_name: 'Graph Book'
            },
            {
                sub_sub_category_id: 227,
                sub_category_id: 225,
                sub_sub_category_name: 'Notebook & Notepad'
            },
            {
                sub_sub_category_id: 228,
                sub_category_id: 225,
                sub_sub_category_name: 'Scrap Book'
            },
            {
                sub_sub_category_id: 229,
                sub_category_id: 225,
                sub_sub_category_name: 'Handbook & diaries'
            },
            {
                sub_sub_category_id: 231,
                sub_category_id: 230,
                sub_sub_category_name: 'Adhesive Tape'
            },
            {
                sub_sub_category_id: 232,
                sub_category_id: 230,
                sub_sub_category_name: 'Labels & Stickers'
            },
            {
                sub_sub_category_id: 233,
                sub_category_id: 230,
                sub_sub_category_name: 'Paper cutter & Scissors'
            },
            {
                sub_sub_category_id: 234,
                sub_category_id: 230,
                sub_sub_category_name: 'Pins & Blinder Clips'
            },
            {
                sub_sub_category_id: 235,
                sub_category_id: 230,
                sub_sub_category_name: 'Stapler, Staple pins & Puncher'
            },
            {
                sub_sub_category_id: 237,
                sub_category_id: 236,
                sub_sub_category_name: 'Painting Brush'
            },
            {
                sub_sub_category_id: 239,
                sub_category_id: 238,
                sub_sub_category_name: 'Chart Paper'
            },
            {
                sub_sub_category_id: 240,
                sub_category_id: 238,
                sub_sub_category_name: 'Envelopes'
            },
            {
                sub_sub_category_id: 241,
                sub_category_id: 238,
                sub_sub_category_name: 'Paper'
            },
            {
                sub_sub_category_id: 242,
                sub_category_id: 238,
                sub_sub_category_name: 'Presentation Paper'
            },
            {
                sub_sub_category_id: 247,
                sub_category_id: 246,
                sub_sub_category_name: 'Pen'
            },
            {
                sub_sub_category_id: 248,
                sub_category_id: 246,
                sub_sub_category_name: 'Chalk'
            },
            {
                sub_sub_category_id: 249,
                sub_category_id: 246,
                sub_sub_category_name: 'Duster'
            },
            {
                sub_sub_category_id: 250,
                sub_category_id: 246,
                sub_sub_category_name: 'Eraser & Sharpner'
            },
            {
                sub_sub_category_id: 251,
                sub_category_id: 246,
                sub_sub_category_name: 'Ink & Refill'
            },
            {
                sub_sub_category_id: 252,
                sub_category_id: 246,
                sub_sub_category_name: 'Pencils'
            },
            {
                sub_sub_category_id: 253,
                sub_category_id: 246,
                sub_sub_category_name: 'Scale'
            },
            {
                sub_sub_category_id: 255,
                sub_category_id: 254,
                sub_sub_category_name: 'Instrument boxes'
            },
        ],{});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('sub_sub_category', null, {});
    }
};
