DROP TABLE IF EXISTS NutritionTracker;

CREATE TABLE NutritionTracker
(
    Calories INTEGER NOT NULL,
    Carbs INTEGER NOT NULL,
    Fat INTEGER NOT NULL,
    Proteins INTEGER NOT NULL,
    FoodName VARCHAR(255) PRIMARY KEY,
    Quantity INTEGER NOT NULL,
    Email VARCHAR(255)
);