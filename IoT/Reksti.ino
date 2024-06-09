#include <DHT.h>
#include <DHT_U.h>

#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define DHTPIN 4

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels

// Declaration for an SSD1306 display connected to I2C (SDA, SCL pins)
#define OLED_RESET     -1 // Reset pin # (or -1 if sharing Arduino reset pin)
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

#define GAS 16
#define BUZZER 19

#define BTN_1 17
#define BTN_2 5
#define BTN_3 18

class FoodFreshness {
  public:
    String categoryName;
    float humidityUpperLimit;
    float humidityLowerLimit;
    float temperatureUpperLimit;
    float temperatureLowerLimit;

    // Constructor
    FoodFreshness(String name, float humUp, float humLow, float tempUp, float tempLow) {
      categoryName = name;
      humidityUpperLimit = humUp;
      humidityLowerLimit = humLow;
      temperatureUpperLimit = tempUp;
      temperatureLowerLimit = tempLow;
    }

    // Method to check if the given humidity and temperature are within limits
    bool isFresh(float currentHumidity, float currentTemperature) {
      return (currentHumidity >= humidityLowerLimit && currentHumidity <= humidityUpperLimit &&
              currentTemperature >= temperatureLowerLimit && currentTemperature <= temperatureUpperLimit);
    }
};


// Food freshness categories
const int NUM_CATEGORIES = 10;
String categories[NUM_CATEGORIES] = {
  "Soup", "Pasta", "Fried Food", "Salad", "Bread", 
  "Cheese", "Meat", "Fish", "Fruit", "Vegetables"
};

FoodFreshness foodCategories[NUM_CATEGORIES] = {
  FoodFreshness("Soup", 90.0, 70.0, 60.0, 50.0),
  FoodFreshness("Pasta", 85.0, 65.0, 30.0, 10.0),
  FoodFreshness("Fried Food", 75.0, 50.0, 25.0, 5.0),
  FoodFreshness("Salad", 95.0, 80.0, 10.0, 2.0),
  FoodFreshness("Bread", 60.0, 40.0, 25.0, 10.0),
  FoodFreshness("Cheese", 85.0, 65.0, 15.0, 5.0),
  FoodFreshness("Meat", 90.0, 70.0, 5.0, -5.0),
  FoodFreshness("Fish", 90.0, 70.0, 5.0, -5.0),
  FoodFreshness("Fruit", 90.0, 70.0, 10.0, 2.0),
  FoodFreshness("Vegetables", 95.0, 75.0, 10.0, 0.0)
};


int currentCategoryIndex = 0;
int displayStartIndex = 0;
const int maxDisplayLines = 6;
bool selected = false;

void setup() {
  
  Serial.begin(115200);

  // SSD1306_SWITCHCAPVCC = generate display voltage from 3.3V internally
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) { 
    Serial.println(F("SSD1306 allocation failed"));
    for(;;); // Don't proceed, loop forever
  }

  // Show initial display buffer contents on the screen --
  // the library initializes this with an Adafruit splash screen.
  display.display();
  
  // Clear the buffer
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 10);

  dht.begin();
  
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    display.println("Failed to initialize DHT11");
    display.display();
    for(;;); // Don't proceed, loop forever
  }
  display.println("DHT11 Initialized");
  display.display();

  pinMode(BUZZER, OUTPUT);
  pinMode(GAS, INPUT);
  digitalWrite(BUZZER, LOW);
  delay(100);
  digitalWrite(BUZZER, HIGH);
  delay(100);
  digitalWrite(BUZZER, LOW);
  delay(100);
  digitalWrite(BUZZER, HIGH);
  delay(100);
  digitalWrite(BUZZER, LOW);
  delay(100);
  digitalWrite(BUZZER, HIGH);

  pinMode(BTN_1, INPUT);
  pinMode(BTN_2, INPUT);
  pinMode(BTN_3, INPUT);
}

void loop() {
  // Read button states
  int btn1State = digitalRead(BTN_1);
  int btn2State = digitalRead(BTN_2);
  int btn3State = digitalRead(BTN_3);

  if (!selected) {
    // Navigate menu
    if (btn2State == HIGH && currentCategoryIndex < NUM_CATEGORIES - 1) {
      currentCategoryIndex++;
      if (currentCategoryIndex >= displayStartIndex + maxDisplayLines) {
        displayStartIndex++;
      }
      delay(200); // Debounce delay
    }
    if (btn3State == HIGH && currentCategoryIndex > 0) {
      currentCategoryIndex--;
      if (currentCategoryIndex < displayStartIndex) {
        displayStartIndex--;
      }
      delay(200); // Debounce delay
    }

    // Display current menu
    displayMenu();

    // Select category
    if (btn1State == HIGH) {
      selected = true;
      delay(200); // Debounce delay
    }
  } else {
    // Display selected category
    display.clearDisplay();
    display.setTextSize(1);
    display.setTextColor(SSD1306_WHITE, SSD1306_BLACK);
    display.setCursor(0, 0);
    display.print("Selected: ");
    display.println(categories[currentCategoryIndex]);

    // Read humidity and temperature
    float h = dht.readHumidity();
    float t = dht.readTemperature();

    display.setTextColor(SSD1306_WHITE);
    display.setCursor(0, 10);
    display.print(F("Humidity: "));
    display.println(h);
    display.print(F("Tempertr: "));
    display.println(t);

    // Display optimal values
    display.setCursor(0, 28);
    display.print(F("O. Tmp: "));
    display.print(foodCategories[currentCategoryIndex].temperatureLowerLimit);
    display.print(" - ");
    display.println(foodCategories[currentCategoryIndex].temperatureUpperLimit);

    display.setCursor(0, 38);
    display.print(F("O. Hum: "));
    display.print(foodCategories[currentCategoryIndex].humidityLowerLimit);
    display.print(" - ");
    display.println(foodCategories[currentCategoryIndex].humidityUpperLimit);

    // Check gas sensor
    int gas = digitalRead(GAS);
    if (!gas) {
      display.setCursor(0, 50);
      display.setTextColor(SSD1306_BLACK, SSD1306_WHITE);
      display.println(F("GAS DETECTED"));
      display.setTextColor(SSD1306_WHITE, SSD1306_BLACK);
      digitalWrite(BUZZER, LOW);
      delay(1000);
      digitalWrite(BUZZER, HIGH);
    }

    display.display();

    // Wait for menu button to go back to menu
    if (btn1State == HIGH) {
      selected = false;
      delay(200); // Debounce delay
    }
  }
}

void displayMenu() {
  display.clearDisplay();
  for (int i = displayStartIndex; i < min(displayStartIndex + maxDisplayLines, NUM_CATEGORIES); i++) {
    String line;
    if (i == currentCategoryIndex) {
      // Highlighted item
      display.setTextColor(SSD1306_BLACK, SSD1306_WHITE);
      display.setCursor(5, (i - displayStartIndex) * 10);
      line = " > " + categories[i] + " ";
    } else {
      display.setTextColor(SSD1306_WHITE, SSD1306_BLACK);
      display.setCursor(0, (i - displayStartIndex) * 10);
      line = " " + categories[i] + " ";
    }
    display.print(line);
  }
  display.display();
}